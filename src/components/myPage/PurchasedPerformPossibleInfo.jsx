import { useNavigate } from "react-router-dom";

const PurchasedPerformPossibleInfo = ({ script }) => {
  const navigate = useNavigate();
  return (
    <div className="f-dir-column j-content-end">
      <p className={`p-medium-regular ${script.orderStatus === "PASS" ? "" : "c-grey4"}`}>
        공연 가능 횟수 : {script.possibleCount} 번
      </p>
      <p
        className={`p-12-400 t-underline ${
          script.possibleCount !== 0 && script.orderStatus === "PASS"
            ? "c-pointer"
            : "c-grey4 c-default"
        }`}
        onClick={() => {
          if (script.possibleCount !== 0 && script.orderStatus === "PASS") {
            navigate(`/mypage/purchased/performance-refund/${script.id}`);
          }
        }}
      >
        환불 신청
      </p>
    </div>
  );
};

export default PurchasedPerformPossibleInfo;
