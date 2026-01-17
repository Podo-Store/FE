import clsx from "clsx";
import { ReactNode } from "react";

interface RoundButton135x40Props {
  color: "white" | "grey" | "purple";
  className?: string;
  onClick: () => void;
  children: ReactNode;
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
  className,
}: RoundButton135x40Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "w-[129px] h-[40px] p-small-bold sm:p-medium-bold sm:w-[135px] rounded-full flex items-center justify-center transition",
        COLOR_CLASS[color],
        className
      )}
    >
      {children}
    </button>
  );
};

export default RoundButton_135x40;
