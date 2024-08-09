import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import { formatPrice } from "../../utils/formatPrice";
import "./PriceText.css";

const PriceText = ({ type, value }) => {
  return (
    <div className="price-text">
      <img
        src={type === "script" ? scriptImg : type === "perform" ? performImg : null}
        alt="img"
      ></img>
      <h6>{formatPrice(value)}원</h6>
    </div>
  );
};

export default PriceText;
