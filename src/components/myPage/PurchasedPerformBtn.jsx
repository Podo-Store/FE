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
const PurchasedPerformBtn = ({ id, possibleCount = 0, orderStatus = "WAIT" }) => {
  const navigate = useNavigate();
  return (
    <div className="j-content-between purchased-script-btn">
      <div className="f-dir-column j-content-end">
        <p className={`p-medium-regular ${orderStatus === "PASS" ? "" : "c-grey4"}`}>
          공연 가능 횟수 : {possibleCount} 번
        </p>
        <p
          className={`p-12-400 t-underline ${
            possibleCount !== 0 && orderStatus === "PASS" ? "c-pointer" : "c-grey4 c-default"
          }`}
          onClick={() => {
            if (possibleCount !== 0 && orderStatus === "PASS") {
              navigate(`/mypage/purchased/performance-refund/${id}`);
            }
          }}
        >
          환불 신청
        </p>
      </div>

      <Button
        disabled={orderStatus !== "PASS"}
        onClick={() => {
          navigate(`/mypage/purchased/performance-info/${id}`);
        }}
      >
        {orderStatus === "PASS" ? "공연 신청 정보" : "입금 확인 중"}
      </Button>
    </div>
  );
};

export default PurchasedPerformBtn;
