import clsx from "clsx";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import "./RoundBtn_135_40.scss";
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
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  const baseClassName = clsx(
    "small-on-off-btn cursor-pointer f-center",
    !isSmallMobile ? "p-medium-bold" : "p-small-bold"
  );

  return color === "white" ? (
    <button
      className={clsx(baseClassName, "c-main")}
      id="white"
      onClick={onClick}
      type={type}
      style={{ ...style }}
    >
      {text ? text : children}
    </button>
  ) : color === "grey" || color === "gray" ? (
    <button
      className={clsx(baseClassName, "c-white")}
      id="grey"
      onClick={onClick}
      type={type}
      style={{ ...style }}
    >
      {text ? text : children}
    </button>
  ) : (
    <button
      className={clsx(baseClassName, "c-white")}
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
