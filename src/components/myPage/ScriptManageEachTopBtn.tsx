import clsx from "clsx";
import { PropsWithChildren } from "react";

import ic_outline_check_circle from "./../../assets/image/myPage/ic_outline_check_circle.svg";
import ic_outline_disabled_circle from "./../../assets/image/myPage/ic_outline_disabled_circle.svg";

interface ScriptManageEachTopBtnProps extends PropsWithChildren {
  disabled?: boolean;
}

const ScriptManageEachTopBtn: React.FC<ScriptManageEachTopBtnProps> = ({
  children,
  disabled = false,
}) => {
  const baseClassName =
    "flex justify-center items-center gap-[5px] w-[100px] h-[32px] rounded-[50px] box-border cursor-default";
  const postClassName = !disabled
    ? "border border-solid border-(--Main) bg-(--purple10)"
    : "bg-(--grey4)";

  return (
    <div className={clsx(baseClassName, postClassName)}>
      <img
        className="size-[15px]"
        src={!disabled ? ic_outline_check_circle : ic_outline_disabled_circle}
        alt="check"
      ></img>
      <p className={clsx("p-xs-bold", !disabled ? "text-(--Main)" : "text-[#fff]")}>{children}</p>
    </div>
  );
};

export default ScriptManageEachTopBtn;
