import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type TabLayoutProps = {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
};

/** md 이상에서만 보이는 연도 탭 + 하단 슬라이드 바 */
export function TabLayout({ tabs, activeTab, onChange }: TabLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [sliderStyle, setSliderStyle] = useState<{
    left: number;
    width: number;
  }>({
    left: 0,
    width: 0,
  });
  const setBtnRef = (tab: string) => (el: HTMLButtonElement | null) => {
    btnRefs.current[tab] = el;
  };

  // ✅ activeTab을 deps로 갖는 recalc
  const recalc = useCallback(() => {
    const container = containerRef.current;
    const activeBtn = btnRefs.current[activeTab];
    if (!container || !activeBtn) return;

    const cRect = container.getBoundingClientRect();
    const bRect = activeBtn.getBoundingClientRect();

    setSliderStyle({
      left: bRect.left - cRect.left,
      width: bRect.width,
    });
  }, [activeTab]);

  useLayoutEffect(() => {
    recalc();
  }, [recalc]);

  useEffect(() => {
    const ro = new ResizeObserver(() => recalc());
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", recalc);
    const id = window.setTimeout(recalc, 0);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
      window.clearTimeout(id);
    };
  }, [recalc]); // ✅ 여기 중요!

  const tabButtons = useMemo(
    () =>
      tabs.map((tab) => (
        <button
          key={tab}
          ref={setBtnRef(tab)}
          onClick={() => onChange(tab)}
          className={`p-[10px] text-left transition-colors ${
            activeTab === tab
              ? "text-[#000]"
              : "text-[var(--grey6)] hover:text-[#000]"
          }`}
        >
          <span className="p-small-medium sm:h5-medium tracking-tight">
            {tab}
          </span>
        </button>
      )),
    [tabs, activeTab, onChange]
  );

  return (
    <div className="">
      <div ref={containerRef} className="relative w-full">
        <div className="flex ">{tabButtons}</div>
        {/* 바탕 라인 (선택) */}
        <div className="absolute right-[50%] translate-x-[50%] h-[1px] bg-[#E2E2E2]/90 w-screen" />
        {/* 이동하는 보라 슬라이드 바 */}
        <div
          className="absolute translate-y-[-40%] h-[4px] bg-[var(--purple4)] transition-all duration-300 ease-out will-change-transform"
          style={{ left: sliderStyle.left, width: sliderStyle.width }}
        />
      </div>
    </div>
  );
}
