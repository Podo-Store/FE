import "./OnOffBtn.scss";
import "./../../styles/text.css";

/**
 * @param {Object} props - Component properties
 * @param {string} props.text - 표시 글자
 * @param {function} props.onClick - onClick
 * @param {string} props.color - "white", "purple". default: "purple"
 * @param {boolean} [props.disabled] - in "purple", disabled
 * @param {Object} [props.style] - style
 * @returns
 */
const OnOffBtn = ({ children, text, color = "purple", onClick, disabled = false, style }) => {
  return color === "white" ? (
    <button
      className="on-off-btn c-pointer p-large-bold c-main"
      id="white"
      disabled={disabled}
      onClick={onClick}
    >
      {text || children}
    </button>
  ) : (
    <button
      className="on-off-btn c-pointer p-large-bold c-white"
      id="purple"
      disabled={disabled}
      onClick={onClick}
      style={{ ...style }}
    >
      {text || children}
    </button>
  );
};

export default OnOffBtn;
