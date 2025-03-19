import RoundBtnXsBold from "../button/RoundBtnXsBold";

import "./ScriptManageTopBtn.scss";

const ScriptManageTopBtn = ({ script, className }) => {
  return (
    <div className={"script-manage-top-btn d-flex " + className}>
      {script.script ? (
        <RoundBtnXsBold disabled={false}>대본 판매 중</RoundBtnXsBold>
      ) : (
        <RoundBtnXsBold disabled={true}>대본 판매 중지</RoundBtnXsBold>
      )}
      {script.performance ? (
        <RoundBtnXsBold disabled={false}>공연권 판매 중</RoundBtnXsBold>
      ) : (
        <RoundBtnXsBold disabled={true}>공연권 판매 중지</RoundBtnXsBold>
      )}
    </div>
  );
};

export default ScriptManageTopBtn;
