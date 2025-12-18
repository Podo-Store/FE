import { twJoin } from "tailwind-merge";
import toggle_slide_center from "@/assets/image/button/toggle-slide/toggle_slide_center.svg";
import "./ToggleSlideV2.css";

interface ToggleSlideV2Props {
  toggle: boolean;
  onChangeToggle: () => void;
}

const ToggleSlideV2 = ({ toggle, onChangeToggle }: ToggleSlideV2Props) => {
  return (
    <div className="flex items-center w-[198px] h-[48px] relative border border-[#6a39c0] rounded-[30px] overflow-hidden box-border">
      {/* 슬라이딩 배경 */}
      <div
        className={twJoin(
          "w-[111px] h-[calc(100%-6px)] absolute top-0 bottom-0 m-[3px] bg-[#6a39c0] rounded-[30px] transition-all duration-300 ease-in-out",
          toggle ? "slide-right" : "slide-left"
        )}
      />

      <button
        className={twJoin(
          "flex-1 flex items-center justify-center gap-[6px] relative border-none bg-transparent cursor-pointer select-none z-10",
          "transition-colors duration-300 ease-in-out",
          !toggle ? "text-white" : "text-[#BABABA]"
        )}
        onClick={onChangeToggle}
        type="button"
      >
        <span className="h5-bold whitespace-nowrap">대본</span>
      </button>

      <img className="z-20" src={toggle_slide_center} alt="" />

      <button
        className={twJoin(
          "flex-1 flex items-center justify-center gap-[6px] relative border-none bg-transparent cursor-pointer select-none z-10",
          "transition-colors duration-300 ease-in-out",
          toggle ? "text-white" : "text-[#BABABA]"
        )}
        onClick={onChangeToggle}
        type="button"
      >
        <span className="h5-bold whitespace-nowrap">공연권</span>
      </button>
    </div>
  );
};

export default ToggleSlideV2;
