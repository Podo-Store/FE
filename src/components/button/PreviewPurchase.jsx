import "./PreviewPurchase.css";
import "./../../styles/text.css";

const PreviewPurchase = ({ text, onClick, style }) => {
  return (
    <button
      className="p-xs-bold c-white t-align-center preview-purchase-btn"
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  );
};

export default PreviewPurchase;
