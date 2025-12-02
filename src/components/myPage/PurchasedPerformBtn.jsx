import { useNavigate } from "react-router-dom";

import Button from "./../button/RoundBtn_149_48";

import "./PurchasedScriptBtn.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

/**
 *
 * @param {object} props
 * @param {number} props.id - id
 * @param {number} props.possibleCount - 공연 가능 횟수
 * @returns
 */
const PurchasedPerformBtn = ({ id, possibleCount = 0, style }) => {
  const navigate = useNavigate();
  return (
    <div className="purchased-script-btn">
      <Button
        onClick={() => {
          navigate(`/mypage/purchased/performance-info/${id}`);
        }}
        style={style}
      >
        공연 신청 정보
      </Button>
    </div>
  );
};

export default PurchasedPerformBtn;
