import { useNavigate } from "react-router-dom";
import "./ScriptManageBtn.css";

const ReviewCompleted = {
  REVIEW_COMPLETED: true,
  UNDER_REVIEWING: false,
};

const ScriptManageBtn = ({ reviewCompleted, scriptSale = false, performSale = false, id }) => {
  const navigate = useNavigate();

  const onClickDetail = () => {
    navigate(`/mypage/scriptmanage/detail/${id}`);
  };

  return (
    <div className="script-manage-btn">
      {
        {
          [ReviewCompleted.REVIEW_COMPLETED]: (
            <div className="script-manage-flex">
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
              <button id="detail" onClick={onClickDetail}>
                작품 관리
              </button>
            </div>
          ),
          [ReviewCompleted.UNDER_REVIEWING]: (
            <div className="script-manage-flex">
              <div> </div>
              <button id="detail" disabled="true">
                심사 중
              </button>
            </div>
          ),
        }[reviewCompleted]
      }
    </div>
  );
};

export default ScriptManageBtn;
