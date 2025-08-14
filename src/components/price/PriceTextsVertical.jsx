import PriceText from "./PriceText";
import "./PriceTextsVertical.scss";

const PriceTextsVertical = ({
  scriptPrice,
  performPrice,
  script = true,
  performance = true,
}) => {
  return (
    <div className="price-texts-vertical">
      <PriceText type="script" value={scriptPrice}></PriceText>
      <hr />
      <PriceText type="perform" value={performPrice}></PriceText>
    </div>
  );
};

export default PriceTextsVertical;
