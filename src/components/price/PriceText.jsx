import { formatPrice } from "../../utils/formatPrice";

import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import "./PriceText.css";

/**
 * @param type - "script" or "perform"
 * @param value - price
 */
const PriceText = ({ type, value }) => {
  const { widthConditions } = useWindowDimensions();
  const { isSmallMobile } = widthConditions;
  return (
    <div className="price-text">
      {type === "script" ? (
        <img
          className={` ${
            isSmallMobile ? "w-[2.5vw] min-w-[8px] aspect-[4/5]" : "w-[12px]"
          }`}
          src={scriptImg}
          alt="script"
          style={{
            marginLeft: "0.1rem",
          }}
        ></img>
      ) : type === "perform" ? (
        <img
          className={` ${
            isSmallMobile
              ? "w-[3.125vw] min-w-[10px] aspect-square"
              : "w-[15px]"
          }`}
          src={performImg}
          alt="perform"
        ></img>
      ) : null}

      <h6 className={`${isSmallMobile ? "p-xs-regular" : "p-medium-regular"}`}>
        {formatPrice(value) === "0" ? "무료" : `${formatPrice(value)}원`}
      </h6>
    </div>
  );
};

export default PriceText;
