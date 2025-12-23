import React, { RefObject, useEffect, useRef } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { twMerge } from "tailwind-merge";

interface GrayPopupProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  className?: string;
}

/**
 * className으로 width 설정 가능, default: w-[271px]
 */
const GrayPopup = ({ children, onClose, className, ...props }: GrayPopupProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOutside } = useOutsideClick({ ref: ref as RefObject<HTMLElement> });

  useEffect(() => {
    if (isOutside) {
      onClose();
    }
  }, [isOutside, onClose]);

  return (
    <div
      className={twMerge(
        "absolute top-0 p-[11px] w-[271px] bg-[#F5F5F5] shadow-[0_0_5px_0_rgba(0,0,0,0.25)] z-[1000] whitespace-normal break-words",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
};

export default GrayPopup;
