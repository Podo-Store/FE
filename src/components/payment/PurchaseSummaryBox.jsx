import { formatPrice } from "../../utils/formatPrice";
import "./PurchaseSummaryBox.css";

const PurchaseSummaryBox = ({
  title,
  buyScript,
  scriptPrice,
  buyPerform,
  performPrice,
  totalPrice,
}) => {
  return (
    <div className="purchase-summary-box">
      <h4>{title}</h4>
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
