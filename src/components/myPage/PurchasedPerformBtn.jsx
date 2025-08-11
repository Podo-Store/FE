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
 * @param {string} props.orderStatus - WAIT: 입금 확인 중, PASS: 결제 완료, REJECT: 결제 취소
 * @returns
 */
const PurchasedPerformBtn = ({ id, possibleCount = 0, orderStatus = "WAIT", style }) => {
  const navigate = useNavigate();
  return (
    <div className="purchased-script-btn">
      <Button
        disabled={orderStatus !== "PASS"}
        onClick={() => {
          navigate(`/mypage/purchased/performance-info/${id}`);
        }}
        style={style}
      >
        {orderStatus === "PASS" ? "공연 신청 정보" : "입금 확인 중"}
      </Button>
    </div>
  );
};

export default PurchasedPerformBtn;
