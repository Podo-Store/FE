import RoundBtnV2 from "./RoundBtnV2";

import { RoundBtnV2Props } from "./types/roundBtnV2Props";

/**
 * p-large-bold button component
 * @param color - "white" | "grey" | "purple"
 */
const RoundBtnV2LargeBold: React.FC<RoundBtnV2Props> = ({ color, className, ...props }) => {
  return <RoundBtnV2 color={color} className={"p-large-bold " + className} {...props} />;
};

export default RoundBtnV2LargeBold;
