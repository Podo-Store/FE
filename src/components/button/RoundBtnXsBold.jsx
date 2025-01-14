import "./RoundBtnXsBold.scss";

/**
 * @param {Object} props - Component properties
 * @param {string} props.children - 표시 글자
 * @param {string} props.text - [deprecated] 표시 글자
 * @param {function} props.onClick - onClick
 * @param {string} props.color - "white", "grey" or "gray", "purple"
 * @param {string} [props.type] - type: "submit", etc.
 * @param {boolean} [props.disabled] - in "purple", disabled
 * @param {Object} [props.style] - additional style
 * @returns
 */
const RoundBtnXsBold = ({ children, onClick, type, color, disabled = false, style }) => {
  return color === "white" ? (
    <button
      className="xs-bold-btn c-pointer p-xs-bold c-main f-center"
      id="white"
      onClick={onClick}
      type={type}
      style={{ ...style }}
    >
      {children}
    </button>
  ) : color === "grey" || color === "gray" ? (
    <button
      className="xs-bold-btn c-pointer p-xs-bold c-white f-center"
      id="grey"
      onClick={onClick}
      type={type}
      style={{ ...style }}
    >
      {children}
    </button>
  ) : (
    <button
      className="xs-bold-btn c-pointer p-xs-bold c-white f-center"
      id="purple"
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{ ...style }}
    >
      {children}
    </button>
  );
};

export default RoundBtnXsBold;
