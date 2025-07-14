import PriceText from "./PriceText";

const PriceTextsVertical = ({
  scriptPrice,
  performPrice,
  script = true,
  performance = true,
}) => {

  return (
    <div className="price-texts-vertical">
      {script ? (
        <PriceText type="script" value={scriptPrice}></PriceText>
      ) : (
        <></>
      )}
      {performance ? (
        <PriceText type="perform" value={performPrice}></PriceText>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PriceTextsVertical;
