import "./PriceTextsVertical.css";
import PriceText from "./PriceText";

const PriceTextsHorizontal = ({ scriptPrice, performPrice }) => {
  return (
    <div className="price-texts-vertical">
      <PriceText type="script" value={scriptPrice}></PriceText>
      <PriceText type="perform" value={performPrice}></PriceText>
    </div>
  );
};

export default PriceTextsHorizontal;
