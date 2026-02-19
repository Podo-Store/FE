// /src/components/modal/modalLayout.tsx
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import RoundButton_135x40 from "@/components/button/RoundButton_135x40";

type DownloadScriptModalProps = {
  isOpen?: boolean;
  onClose: () => void; // 취소/닫기
  onConfirm: () => void; // 다운로드
};

const DownloadScriptModal = ({ isOpen, onClose, onConfirm }: DownloadScriptModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="모달 닫기"
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={clsx(
          "relative z-[10000] bg-white flex flex-col items-center justify-between",
          "w-[220px] h-[266px] sm:w-[390px] sm:h-[356px] md:w-[500px] md:h-[422px] py-[20px] sm:py-[30px] md:py-[40px] px-[26px] sm:px-[14px] md:px-[30px]",
          "rounded-[30px] shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[10px] sm:gap-[20px]">
          <h1 className="text-center text-black truncate p-medium-medium sm:h5-medium md:h3-medium">
            대본 다운로드 안내
          </h1>
          <p className="text-[#3C3C3C] text-center mt-[8px] whitespace-pre-line p-12-medium sm:p-medium-medium md:h5-medium">
            대본을 다운로드하면 해당{" "}
            <span className="p-12-bold sm:p-medium-bold md:h5-bold">
              주문 건에 대한 공연권은 환불이 불가합니다.
            </span>
            <br />
            <br />
            또한 대본은{" "}
            <span className="p-12-bold sm:p-medium-bold md:h5-bold">
              주문 건당 1회만 다운로드 가능
            </span>
            합니다.
            <br />
            (공연 가능 횟수와는 별개이며, 동일 주문 1건 기준입니다.)
            <br />
            <br />
            다운로드를 진행하시겠습니까?
          </p>
        </div>

        <button className="flex gap-[10px] sm:gap-[15px]">
          <RoundButton_135x40
            color="white"
            onClick={onClose}
            size="w-[89px] h-[28px] sm:w-[135px] sm:h-[40px]"
            font="p-xs-bold sm:p-medium-bold"
          >
            취소하기
          </RoundButton_135x40>
          <RoundButton_135x40
            color="purple"
            onClick={onConfirm}
            size="w-[89px] h-[28px] sm:w-[135px] sm:h-[40px]"
            font="p-xs-bold sm:p-medium-bold"
          >
            다운로드
          </RoundButton_135x40>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default DownloadScriptModal;
