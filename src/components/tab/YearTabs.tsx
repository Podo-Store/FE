import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type YearTabsProps = {
  years: number[];
  active: number;
  onChange: (y: number) => void;
};

/** md 이상에서만 보이는 연도 탭 + 하단 슬라이드 바 */
export function YearTabs({ years, active, onChange }: YearTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const [sliderStyle, setSliderStyle] = useState<{
    left: number;
    width: number;
  }>({
    left: 0,
    width: 0,
  });

  // 각 연도 버튼의 ref 보관
  const setBtnRef = (y: number) => (el: HTMLButtonElement | null) => {
    btnRefs.current[y] = el;
  };

  // 현재 active 연도의 버튼 위치 -> 슬라이더 스타일 계산
  const recalc = () => {
    const container = containerRef.current;
    const activeBtn = btnRefs.current[active];
    if (!container || !activeBtn) return;
    const cRect = container.getBoundingClientRect();
    const bRect = activeBtn.getBoundingClientRect();
    setSliderStyle({
      left: bRect.left - cRect.left,
      width: bRect.width,
    });
  };

  useLayoutEffect(recalc, [active]);
  useEffect(() => {
    // 리사이즈/폰트 로딩 등 환경 변화 대응
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", recalc);
    const id = window.setTimeout(recalc, 0); // 폰트 적용 후 한 번 더
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
      window.clearTimeout(id);
    };
  }, []);

  const yearButtons = useMemo(
    () =>
      years.map((y) => (
        <button
          key={y}
          ref={setBtnRef(y)}
          onClick={() => onChange(y)}
          className={`px-[12px] sm:px-[16px] px-[20px] py-[12px] sm:py-[15px] text-left transition-colors
            ${
              active === y
                ? "text-[#F2F2F2]"
                : "text-[#BDBDBD] hover:text-[#EDEDED]"
            }`}
        >
          <span className="p-medium-bold sm:h4-bold md:company-title-medium tracking-tight">
            {y}
          </span>
        </button>
      )),
    [years, active, onChange]
  );

  return (
    <div className="">
      <div ref={containerRef} className="relative w-full">
        {/* 바탕 라인 (선택) */}
        <div className="absolute left-0 right-0 h-[5px] bg-[#F2F2F2]/90" />
        {/* 이동하는 보라 슬라이드 바 */}
        <div
          className="absolute h-[5px] bg-[#8B5CF6] transition-all duration-300 ease-out will-change-transform"
          style={{ left: sliderStyle.left, width: sliderStyle.width }}
        />
        <div className="flex ">{yearButtons}</div>
      </div>
    </div>
  );
}
