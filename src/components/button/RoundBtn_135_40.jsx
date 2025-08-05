import "./RoundBtn_135_40.scss";
import useWindowDimensions from "@/hooks/useWindowDimensions";
/**
 * @param {Object} props - Component properties
 * @param {string} props.children - 표시 글자
 * @param {string} [props.text] - [deprecated] 표시 글자
 * @param {function} props.onClick - onClick
 * @param {string} props.color - "white", "grey" or "gray", "purple"
 * @param {string} [props.type] - type: "submit", etc.
 * @param {boolean} [props.disabled] - in "purple", disabled
 * @param {Object} [props.style] - additional style
 * @returns
 */
const RoundBtn_135_40 = ({
  children,
  text,
  onClick,
  type,
  color,
  disabled = false,
  style,
}) => {
  const {
    widthConditions: { isSmallMobile },
  } = useWindowDimensions();

  return color === "white" ? (
    <button
      className={`small-on-off-btn c-pointer c-main f-center ${
        isSmallMobile ? "p-small-bold" : "p-medium-bold"
      }`}
      id="white"
      onClick={onClick}
      type={type}
      style={{ ...style }}
    >
      {text ? text : children}
    </button>
  ) : color === "grey" || color === "gray" ? (
    <button
      className={`${
        isSmallMobile ? "p-small-bold" : "p-medium-bold"
      } small-on-off-btn c-pointer  c-white f-center`}
      id="grey"
      onClick={onClick}
      type={type}
      style={{ ...style }}
    >
      {text ? text : children}
    </button>
  ) : (
    <button
      className={`${
        isSmallMobile ? "p-small-bold" : "p-medium-bold"
      } small-on-off-btn c-pointer  c-white f-center`}
      id="purple"
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{ ...style }}
    >
      {text ? text : children}
    </button>
  );
};

export default RoundBtn_135_40;
