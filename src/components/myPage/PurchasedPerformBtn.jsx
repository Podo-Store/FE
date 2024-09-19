import { useNavigate } from "react-router-dom";

import "./PurchasedScriptBtn.css";

const PurchasedPerformBtn = ({ id, title }) => {
  const navigate = useNavigate();
  return (
    <div className="purchased-script-btn">
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
