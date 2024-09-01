import { formatPrice } from "../../utils/formatPrice";

import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";

import "./PriceText.css";

/**
 * @param type - "script" or "perform"
 * @param value - price
 */
const PriceText = ({ type, value }) => {
  return (
    <div className="price-text">
      {type === "script" ? (
        <img
          src={scriptImg}
          alt="script"
          style={{ width: "0.75rem", height: "0.9375rem", marginLeft: "0.1rem" }}
        ></img>
      ) : type === "perform" ? (
        <img
          src={performImg}
          alt="perform"
          style={{ width: "0.9375rem", height: "0.9375rem" }}
        ></img>
      ) : null}

      <h6>{formatPrice(value)}원</h6>
    </div>
  );
};

export default PriceText;
