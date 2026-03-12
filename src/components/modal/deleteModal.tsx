// /src/components/modal/modalLayout.tsx
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import RoundButton_420x40 from "@/components/button/RoundButton_420x40";

type modalProps = {
  isOpen: boolean;

  onClose: () => void; // 취소/닫기
  onConfirm: () => void; // 이동하기
};

const DeleteModal = ({ isOpen, onConfirm }: modalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") onConfirm();
    };

    document.addEventListener("keydown", onKeyDown);

    // body scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onConfirm]);

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
      />

      {/* Modal */}
      <div
        className={clsx(
          "relative z-[10000] bg-white flex flex-col items-center justify-between",
          "w-[220px] h-[186px] sm:w-[390px] sm:h-[260px] md:w-[500px] md:h-[310px] py-[20px] sm:py-[30px] md:py-[40px]",
          "rounded-[30px] shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[20px]">
          {/* URL (1줄 말줄임) */}
          <p className="text-center text-black truncate p-medium-medium sm:h5-medium md:h3-medium">
            계정 삭제 완료
          </p>
          <p className="text-[#3C3C3C] text-center mt-[8px] whitespace-pre-line p-12-medium sm:p-medium-medium md:h5-medium">
            계정 삭제가 완료되었습니다. <br />
            그동안 포도상점을 이용해주셔서 진심으로 감사합니다.
            <br />
            더욱 성장하는 포도상점이 되겠습니다.
          </p>
        </div>

        <button className="flex gap-[10px] sm:gap-[15px]">
          <RoundButton_420x40 color="purple" onClick={onConfirm} font="p-xs-bold sm:p-medium-bold">
            메인페이지로 이동하기
          </RoundButton_420x40>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default DeleteModal;
