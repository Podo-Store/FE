import clsx from "clsx";
import { ReactNode } from "react";

interface RoundButton135x40Props {
  color: "white" | "grey" | "purple";
  className?: string;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  size?: string;
  font?: string;
}

const COLOR_CLASS = {
  white: "bg-white text-[#6A39C0] border-[3px] border-[#6A39C0]",
  grey: "bg-[#d9d9d9] text-white",
  purple: "bg-[#6A39C0] text-white",
} as const;

const RoundButton_135x40 = ({
  children,
  color,
  onClick,
  disabled,
  className,
  size = "w-[129px] h-[40px] sm:w-[135px]",
  font = "p-small-bold sm:p-medium-bold",
}: RoundButton135x40Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full flex items-center justify-center transition",
        COLOR_CLASS[color],
        disabled && "bg-[#d9d9d9] cursor-not-allowed",
        className,
        size,
        font
      )}
    >
      {children}
    </button>
  );
};

export default RoundButton_135x40;
