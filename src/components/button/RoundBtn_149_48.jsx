import Button from "./RoundBtn_135_40.jsx";

/**
 * @param {Object} props - Component properties
 * @param {string} props.children - 표시 글자
 * @param {function} props.onClick - onClick
 * @param {string} props.color - "white", "grey" or "gray", "purple"
 * @param {string} [props.type] - type: "submit", etc.
 * @param {boolean} [props.disabled] - in "purple", disabled
 * @param {Object} [props.style] - additional style
 * @returns
 */

const RoundBtn_149_48 = ({ children, onClick, type, color, disabled = false, style }) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      color={color}
      disabled={disabled}
      style={{ ...style, width: "149px", height: "48px" }}
    >
      {children}
    </Button>
  );
};

export default RoundBtn_149_48;
