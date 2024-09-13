import "./SmallOnOffBtn.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

/**
 *
 * @param {string} text - 표시 글자
 * @param onClick - onClick
 * @param type - type
 * @param {string} color - "white", "grey" or "gray", "purple"
 * @param {boolean} disabled - in "purple", disabled
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
