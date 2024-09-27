import { useNavigate } from "react-router-dom";

import "./PurchasedScriptBtn.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

const PurchasedPerformBtn = ({ id, possibleAmount = 1 }) => {
  const navigate = useNavigate();
  return (
    <div className="j-content-between purchased-script-btn">
      <div className="f-dir-column j-content-end">
        <p className="p-medium-regular">공연 가능 횟수 : {possibleAmount} 번</p>
        <p
          className="c-pointer"
          id="refund-btn"
          onClick={() => {
            navigate(`/mypage/purchased/performance-refund/${id}`);
          }}
        >
          환불 신청
        </p>
      </div>

      <button
        id="purchased-perform"
        onClick={() => {
          navigate(`/mypage/purchased/performance-info/${id}`);
        }}
      >
        공연 신청 정보
      </button>
    </div>
  );
};

export default PurchasedPerformBtn;
