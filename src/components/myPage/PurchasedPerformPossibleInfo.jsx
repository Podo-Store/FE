import { useNavigate } from "react-router-dom";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const PurchasedPerformPossibleInfo = ({ script }) => {
  const navigate = useNavigate();
  const { isSmallMobile } = useWindowDimensions().widthConditions;
  return (
    <div className="f-dir-column j-content-end">
      <p
        className={`${!isSmallMobile ? "p-medium-regular" : "p-xs-regular"} ${
          script.orderStatus === "PASS" ? "" : "c-grey4"
        }`}
      >
        공연 가능 횟수 : {script.possibleCount} 번
      </p>
      <p
        className={`${
          !isSmallMobile ? "p-12-400" : "text-[8px] font-[400] leading-[14px]"
        } t-underline ${
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
