import clsx from "clsx";
import { PropsWithChildren } from "react";

import ic_outline_check_circle from "./../../assets/image/myPage/ic_outline_check_circle.svg";
import ic_outline_disabled_circle from "./../../assets/image/myPage/ic_outline_disabled_circle.svg";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface ScriptManageEachTopBtnProps extends PropsWithChildren {
  disabled?: boolean;
}

const ScriptManageEachTopBtn: React.FC<ScriptManageEachTopBtnProps> = ({
  children,
  disabled = false,
}) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  const sizeClassName = !isSmallMobile
    ? "w-[100px] h-[32px]"
    : "w-[56px] h-[14px]";

  const baseClassName =
    "flex justify-center items-center gap-[5px] rounded-[50px] box-border cursor-default";
  const postClassName = !disabled
    ? "border border-solid border-(--Main) bg-(--purple10)"
    : "bg-(--grey4)";

  return (
    <div className={clsx(baseClassName, sizeClassName, postClassName)}>
      <img
        className={!isSmallMobile ? "size-[15px]" : "size-[8px]"}
        src={!disabled ? ic_outline_check_circle : ic_outline_disabled_circle}
        alt="check"
      ></img>
      <p
        className={clsx(
          !isSmallMobile ? "p-xs-bold" : "text-[8px] font-[700] leading-[14px]",
          !disabled ? "text-(--Main)" : "text-[#fff]"
        )}
      >
        {children}
      </p>
    </div>
  );
};

export default ScriptManageEachTopBtn;
