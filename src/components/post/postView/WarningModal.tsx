import wargninIcon from "@/assets/image/post/ic_warning.svg";
import { useEffect } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface WarningModalProps {
  onClose: () => void;
}

const WarningModal = ({ onClose }: WarningModalProps) => {
  //   useEffect(() => {
  //     document.body.style.overflow = "hidden"; // 스크롤 잠금
  //     return () => {
  //       document.body.style.overflow = "auto"; // 모달 닫히면 복구
  //     };
  //   }, []);

  const { widthConditions } = useWindowDimensions();
  const { isSmallMobile } = widthConditions;

  return (
    <div
      className={`box-border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  border border-[#2A2323] rounded-[30px] bg-[var(--grey1)] pdf-warning z-10 overflow-hidden`}
      style={{
        boxShadow:
          "0 8px 24px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        className={`flex flex-row items-center justify-between box-border border bg-[#2A2323] px-[19px] ${
          isSmallMobile ? "h-[35px] w-[235px]" : "h-[35px] w-[340px]"
        }`}
      >
        <div
          className={`flex flex-row gap-[6px] items-center ${
            isSmallMobile ? "gap-[4px]" : "gap-[6px]"
          }`}
        >
          <img
            src={wargninIcon}
            alt="경고 모달"
            className={`object-contain ${
              isSmallMobile ? "w-[20px] h-[20px]" : "w-[25px] h-[25px]"
            }`}
          />
          <span
            className={`text-[#FF5900] translate-y-[2px] ${
              isSmallMobile ? "p-small-medium" : "p-medium-medium"
            }`}
          >
            Warning
          </span>
        </div>
        <button onClick={onClose} className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-[#FBFBFB] group-hover:text-[#FF5900] transition-colors duration-200"
          >
            <path d="M11.0119 10L16.1388 3.88867C16.2248 3.78711 16.1525 3.63281 16.0197 3.63281H14.4611C14.3693 3.63281 14.2814 3.67383 14.2209 3.74414L9.99234 8.78516L5.76383 3.74414C5.70523 3.67383 5.61734 3.63281 5.52359 3.63281H3.965C3.83219 3.63281 3.75992 3.78711 3.84586 3.88867L8.97281 10L3.84586 16.1113C3.82661 16.134 3.81426 16.1617 3.81028 16.1911C3.80629 16.2205 3.81084 16.2505 3.82339 16.2775C3.83593 16.3044 3.85594 16.3272 3.88104 16.3431C3.90615 16.359 3.93528 16.3674 3.965 16.3672H5.52359C5.61539 16.3672 5.70328 16.3262 5.76383 16.2559L9.99234 11.2148L14.2209 16.2559C14.2795 16.3262 14.3673 16.3672 14.4611 16.3672H16.0197C16.1525 16.3672 16.2248 16.2129 16.1388 16.1113L11.0119 10Z" />
          </svg>
        </button>
      </div>

      <p
        className={`text-center mt-[22px] ${
          isSmallMobile ? "p-12-medium" : "p-small-medium"
        }`}
      >
        작품을 무단 복사하거나 <br />
        불법 게재 등의 방법으로 악용 시 <br />
        민사 및 형사 책임의 대상이 됩니다.
      </p>
    </div>
  );
};

export default WarningModal;
