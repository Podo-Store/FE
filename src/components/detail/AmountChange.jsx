import circleAddBtn from "../../assets/image/button/circleAddBtn.svg";
import circleSubBtn from "../../assets/image/button/circleSubBtn.svg";

import "./AmountChange.scss";

const AmountChange = ({ purchasePerformAmount, setPurchasePerformAmount }) => {
  return (
    <div className="amount-change flex justify-content items-center gap-[10px]">
      <img
        src={circleSubBtn}
        alt="minus"
        style={
          purchasePerformAmount === 1
            ? { cursor: "default", opacity: "0.3" }
            : { cursor: "pointer" }
        }
        onClick={() => {
          if (purchasePerformAmount === 1) {
            return;
          }
          setPurchasePerformAmount(purchasePerformAmount - 1);
        }}
      ></img>
      <p className="p-large-medium">{purchasePerformAmount}</p>
      <img
        src={circleAddBtn}
        alt="plus"
        className="c-pointer"
        onClick={() => {
          setPurchasePerformAmount(purchasePerformAmount + 1);
        }}
      ></img>
    </div>
  );
};

export default AmountChange;
