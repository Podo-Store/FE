import { useNavigate } from "react-router-dom";

import Button from "./../button/RoundBtn_149_48";

import "./PurchasedScriptBtn.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

/**
 *
 * @param {object} props
 * @param {number} props.id - id
 * @param {number} props.possibleAmount - 공연 가능 횟수
 * @param {boolean} props.paymentStatus - true: 결제 완료, false: 결제 미완료
 * @returns
 */
const PurchasedPerformBtn = ({ id, possibleAmount = 0, paymentStatus = false }) => {
  const navigate = useNavigate();
  return (
    <div className="j-content-between purchased-script-btn">
      <div className="f-dir-column j-content-end">
        <p className={`p-medium-regular ${!paymentStatus ? "c-grey4" : ""}`}>
          공연 가능 횟수 : {possibleAmount} 번
        </p>
        <p
          className={`p-12-400 t-underline ${
            possibleAmount === 0 || !paymentStatus ? "c-grey4 c-default" : "c-pointer"
          }`}
          onClick={() => {
            if (possibleAmount !== 0 && paymentStatus) {
              navigate(`/mypage/purchased/performance-refund/${id}`);
            }
          }}
        >
          환불 신청
        </p>
      </div>

      <Button
        disabled={!paymentStatus}
        onClick={() => {
          navigate(`/mypage/purchased/performance-info/${id}`);
        }}
      >
        {paymentStatus ? "공연 신청 정보" : "입금 확인 중"}
      </Button>
    </div>
  );
};

export default PurchasedPerformBtn;
