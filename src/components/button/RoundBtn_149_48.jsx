import Button from "./RoundBtn_135_40.jsx";
import useWindowDimensions from "@/hooks/useWindowDimensions";

/**
 * @param {Object} props - Component properties
 * @param {string} props.color - "white", "grey" or "gray", "purple"
 * @param {boolean} [props.disabled] - in "purple", disabled
 * @param {Object} [props.style] - additional style
 * @returns
 */

const RoundBtn_149_48 = ({ disabled = false, ...props }) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  return (
    <Button
      disabled={disabled}
      {...props}
      style={
        !isSmallMobile
          ? { width: "149px", height: "48px" }
          : { width: "129px", height: "40px" }
      }
    ></Button>
  );
};

export default RoundBtn_149_48;
