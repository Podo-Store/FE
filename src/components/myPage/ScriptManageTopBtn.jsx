import ScriptManageEachTopBtn from "./ScriptManageEachTopBtn";

import "./ScriptManageTopBtn.scss";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const ScriptManageTopBtn = ({ script, className }) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;
  const scriptContentPrefix = !isSmallMobile ? "대본 판매" : "판매";
  const performanceContentPrefix = !isSmallMobile ? "공연권 판매" : "판매";

  return (
    <div className={"script-manage-top-btn d-flex " + className}>
      {script.script ? (
        <ScriptManageEachTopBtn disabled={false}>
          {scriptContentPrefix} 중
        </ScriptManageEachTopBtn>
      ) : (
        <ScriptManageEachTopBtn disabled={true}>
          {scriptContentPrefix} 중지
        </ScriptManageEachTopBtn>
      )}
      {script.performance ? (
        <ScriptManageEachTopBtn disabled={false}>
          {performanceContentPrefix} 중
        </ScriptManageEachTopBtn>
      ) : (
        <ScriptManageEachTopBtn disabled={true}>
          {performanceContentPrefix} 중지
        </ScriptManageEachTopBtn>
      )}
    </div>
  );
};

export default ScriptManageTopBtn;
