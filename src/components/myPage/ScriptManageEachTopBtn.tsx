import { PropsWithChildren } from "react";

import ic_outline_check_circle from "./../../assets/image/myPage/ic_outline_check_circle.svg";

const ScriptManageEachTopBtn: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex justify-center items-center gap-[5px] w-[100px] h-[32px] rounded-[50px] border border-solid border-(--Main) bg-(--purple10) cursor-default">
      <img className="size-[15px]" src={ic_outline_check_circle} alt="check"></img>
      <p className="p-xs-bold text-(--Main)">{children}</p>
    </div>
  );
};

export default ScriptManageEachTopBtn;
