// /src/components/modal/modalLayout.tsx
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import RoundButton_135x40 from "@/components/button/RoundButton_135x40";

type linkModalProps = {
  isOpen: boolean;
  url?: string | null;

  description?: string; // 기본: "연결된 공연 상세 링크로 이동하게 됩니다."
  cancelText?: string; // 기본: "취소하기"
  confirmText?: string; // 기본: "이동하기"

  onClose: () => void; // 취소/닫기
  onConfirm: () => void; // 이동하기
};

const DEFAULT_DESC = "연결된 공연 상세 링크로\n이동하게 됩니다.";

function toDisplayHost(raw?: string | null) {
  if (!raw) return "";
  try {
    const u = new URL(raw);
    return u.host;
  } catch {
    // URL이 완전하지 않을 수도 있어서 fallback
    return raw.replace(/^https?:\/\//, "").split("/")[0] ?? raw;
  }
}

const LinkModal = ({
  isOpen,
  url,
  description = DEFAULT_DESC,
  cancelText = "취소하기",
  confirmText = "이동하기",
  onClose,
  onConfirm,
}: linkModalProps) => {
  const displayHost = useMemo(() => toDisplayHost(url), [url]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
  }, [isOpen, onClose, onConfirm]);

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
          "w-[220px] h-[177px] sm:w-[390px] sm:h-[252px] md:w-[500px] md:h-[324px] py-[20px] sm:py-[30px] md:py-[40px]",
          "rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[20px]">
          {/* URL (1줄 말줄임) */}
          <p className="text-center text-black truncate p-xs-medium sm:p-large-medium md:h4-medium">
            {displayHost || "외부 링크"}
          </p>
          <p className="text-[#3C3C3C] text-center mt-[8px] whitespace-pre-line p-small-medium sm:h4-medium md:h3-medium">
            {description}
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
            이동하기
          </RoundButton_135x40>
        </button>
      </div>
    </div>,
    document.body
  );
};

export default LinkModal;
