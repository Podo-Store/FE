import "./SmallOnOffBtn.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

/**
 * @param {Object} props - Component properties
 * @param {string} props.text - 표시 글자
 * @param {function} props.onClick - onClick
 * @param {string} props.color - "white", "grey" or "gray", "purple"
 * @param {string} [props.type] - type: "submit", etc.
 * @param {boolean} [props.disabled] - in "purple", disabled
 * @returns
 */
const SmallOnOffBtn = ({ text, onClick, type, color, disabled = false }) => {
  return color === "white" ? (
    <button
      className="c-pointer p-medium-bold c-main small-on-off-btn"
      id="white"
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  ) : color === "grey" || color === "gray" ? (
    <button className="c-pointer small-on-off-btn" id="grey" onClick={onClick} type={type}>
      <p className="p-medium-bold c-white">{text}</p>
    </button>
  ) : (
    <button
      className="c-pointer small-on-off-btn"
      id="purple"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <p className="p-medium-bold c-white">{text}</p>
    </button>
  );
};

export default SmallOnOffBtn;
