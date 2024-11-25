import { formatPrice } from "../../utils/formatPrice";

import "./PurchaseSummaryBox.css";
import "./../../styles/text.css";

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
}) => {
  return (
    <div className="purchase-summary-box">
      {page === 0 ? (
        // 구매 페이지
        <h4 className="p-large-bold">{title}</h4>
      ) : (
        // 구매 완료 페이지
        <h4 className="h5-bold">{title}</h4>
      )}
      <div style={{ height: "11.6px" }}></div>
      <div className="price-wrap">
        <p className="p-medium-regular">
          {page === 0 ? "대본 가격" : `대본 ${scriptTitle} ${buyScript ? 1 : "-"} 개`}
        </p>
        <p className="p-medium-regular">{buyScript ? formatPrice(scriptPrice) : "-"} 원</p>
      </div>
      <div className="price-wrap">
        <p className="p-medium-regular">
          {page === 0
            ? "공연권 가격"
            : `공연권 ${scriptTitle} ${buyPerform ? performAmount : "-"} 개`}
        </p>
        <p className="p-medium-regular">
          {buyPerform ? formatPrice(performPrice * performAmount) : "-"} 원
        </p>
      </div>
      <hr
        style={
          page === 0
            ? { marginTop: "12.08px", marginBottom: "14.92px", marginRight: "12.97px" }
            : null
        }
      ></hr>
      <div className="price-wrap">
        <p className="p-large-regular">총 금액</p>
        <p className="p-large-regular">
          {formatPrice(
            (buyScript ? scriptPrice : 0) + (buyPerform ? performPrice * performAmount : 0)
          )}
          원
        </p>
      </div>
    </div>
  );
};

export default PurchaseSummaryBox;
