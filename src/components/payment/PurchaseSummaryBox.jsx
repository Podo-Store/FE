import { formatPrice } from "../../utils/formatPrice";

import "./PurchaseSummaryBox.css";
import "./../../styles/text.css";
import useWindowDimensions from "@/hooks/useWindowDimensions";

/**
 * @param {Object} props - Component properties
 * @param {number} props.page - 0: 구매 페이지, 1: 구매 완료 페이지
 * @param {string} props.scriptTitle - 구매 완료 페이지 대본 제목
 */
const PurchaseSummaryBox = ({
  title,
  page,
  buyScript,
  scriptPrice = 0,
  buyPerform,
  performPrice = 0,
  performAmount = 0,
  totalPrice = 0,

  // 구매 완료 페이지
  scriptTitle,

  // responsive 관련 props
  setLeftPadding = false,
  style,
  ...props
}) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;
  const priceWrapClassName =
    page === 0
      ? `price-wrap ${setLeftPadding ? "left-padding" : ""}`
      : `price-wrap ${isSmallMobile ? "no-padding" : ""}`;

  return (
    <div className="purchase-summary-box" style={style} {...props}>
      {page === 0 ? (
        // 구매 페이지
        <h4 className="p-medium-bold sm:p-large-bold">{title}</h4>
      ) : (
        // 구매 완료 페이지
        <h4 className="p-medium-bold sm:h5-bold">{title}</h4>
      )}
      <div style={{ height: "11.6px" }}></div>
      <div className={priceWrapClassName}>
        <p className="p-small-regular sm:p-medium-regular">
          {page === 0 ? (
            "대본 가격"
          ) : (
            <span className="flex items-center">
              <span>대본&nbsp;</span>
              <span className="inline-block max-w-[85px] sm:max-w-[185px] overflow-hidden text-ellipsis whitespace-nowrap">
                {scriptTitle}
              </span>
              <span>&nbsp;{buyScript ? 1 : "-"} 개</span>
            </span>
          )}
        </p>
        <p className="p-small-regular sm:p-medium-regular whitespace-nowrap">
          {buyScript ? formatPrice(scriptPrice) : "-"} 원
        </p>
      </div>
      <div className={priceWrapClassName}>
        <p className="p-small-regular sm:p-medium-regular whitespace-nowrap">
          {page === 0 ? (
            "공연권 가격"
          ) : (
            <span className="flex items-center">
              <span>공연권&nbsp;</span>
              <span className="inline-block max-w-[70px] sm:max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap">
                {scriptTitle}
              </span>
              <span>&nbsp;{buyPerform ? performAmount : "-"} 개</span>
            </span>
          )}
        </p>
        <p className="p-small-regular sm:p-medium-regular whitespace-nowrap">
          {buyPerform ? formatPrice(performPrice * performAmount) : "-"} 원
        </p>
      </div>
      <hr
        style={
          page === 0
            ? {
                marginTop: "12.08px",
                marginBottom: "14.92px",
                marginRight: "12.97px",
              }
            : {
                marginTop: "12.08px",
                marginBottom: "14.92px",
              }
        }
      ></hr>
      <div className={priceWrapClassName}>
        <p className="p-medium-regular sm:p-large-regular">총 금액</p>
        <p className="p-medium-regular sm:p-large-regular">
          {formatPrice(
            (buyScript ? scriptPrice : 0) +
              (buyPerform ? performPrice * performAmount : 0)
          )}
          원
        </p>
      </div>
    </div>
  );
};

export default PurchaseSummaryBox;
