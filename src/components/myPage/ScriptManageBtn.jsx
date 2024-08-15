import "./ScriptManageBtn.css";

const ScriptManageBtn = ({ scriptSale = false, performSale = false, id }) => {
  return (
    <div className="script-manage-btn">
      <div className="sale-status">
        {scriptSale ? (
          <button className="sale-status-enabled">대본 판매 중</button>
        ) : (
          <button className="sale-status-disabled">대본 판매 중지</button>
        )}
        {performSale ? (
          <button className="sale-status-enabled">공연권 판매 중</button>
        ) : (
          <button className="sale-status-disabled">공연권 판매 중지</button>
        )}
      </div>
      <button id="detail">작품 관리</button>
    </div>
  );
};

export default ScriptManageBtn;
