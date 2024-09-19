import { formatPrice } from "../../utils/formatPrice";

import "./PurchaseSummaryBox.css";
import "./../../styles/text.css";

/**
 * @param {number} page - 0: 구매 페이지, 1: 구매 완료 페이지
 */
const PurchaseSummaryBox = ({
  title,
  page,
  buyScript,
  scriptPrice = 0,
  buyPerform,
  performPrice = 0,
  totalPrice = 0,
}) => {
  return (
    <div className="purchase-summary-box">
      {page === 0 ? (
        <h4 className="p-large-bold">{title}</h4>
      ) : (
        <h4 className="h5-bold">{title}</h4>
      )}
      <div style={{ height: "1.08rem" }}></div>
      <div className="price-wrap">
        <p>대본 가격</p>
        {buyScript ? <p>{formatPrice(scriptPrice)}원</p> : <p> - 원</p>}
      </div>
      <div className="price-wrap">
        <p>공연권 가격</p>
        {buyPerform ? <p>{formatPrice(performPrice)}원</p> : <p> - 원</p>}
      </div>
      <hr></hr>
      <div className="price-wrap">
        <p>총 금액</p>
        <p>{formatPrice(totalPrice)}원</p>
      </div>
    </div>
  );
};

export default PurchaseSummaryBox;
