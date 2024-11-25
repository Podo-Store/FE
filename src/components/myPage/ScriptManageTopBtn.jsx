import RoundBtnXsBold from "../button/RoundBtnXsBold";

const ScriptManageTopBtn = ({ script }) => {
  return (
    <div className="d-flex" style={{ gap: "10px" }}>
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
