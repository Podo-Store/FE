import PriceText from "./PriceText";

const PriceTextsVertical = ({ scriptPrice, performPrice }) => {
  return (
    <div className="price-texts-vertical">
      <PriceText type="script" value={scriptPrice}></PriceText>
      <PriceText type="perform" value={performPrice}></PriceText>
    </div>
  );
};

export default PriceTextsVertical;
