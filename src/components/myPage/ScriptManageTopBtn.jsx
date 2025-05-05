import ScriptManageEachTopBtn from "./ScriptManageEachTopBtn";

import "./ScriptManageTopBtn.scss";

const ScriptManageTopBtn = ({ script, className }) => {
  return (
    <div className={"script-manage-top-btn d-flex " + className}>
      {script.script ? (
        <ScriptManageEachTopBtn disabled={false}>대본 판매 중</ScriptManageEachTopBtn>
      ) : (
        <ScriptManageEachTopBtn disabled={true}>대본 판매 중지</ScriptManageEachTopBtn>
      )}
      {script.performance ? (
        <ScriptManageEachTopBtn disabled={false}>공연권 판매 중</ScriptManageEachTopBtn>
      ) : (
        <ScriptManageEachTopBtn disabled={true}>공연권 판매 중지</ScriptManageEachTopBtn>
      )}
    </div>
  );
};

export default ScriptManageTopBtn;
