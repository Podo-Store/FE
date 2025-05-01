import RoundBtnV2 from "./RoundBtnV2";

import { RoundBtnV2Props } from "./types/roundBtnV2Props";

/**
 * p-xs-bold button component
 * @param color - "white" | "grey" | "purple"
 */
const RoundBtnV2XsBold: React.FC<RoundBtnV2Props> = ({ color, className, ...props }) => {
  return <RoundBtnV2 color={color} className={"p-xs-bold " + className} {...props} />;
};

export default RoundBtnV2XsBold;
