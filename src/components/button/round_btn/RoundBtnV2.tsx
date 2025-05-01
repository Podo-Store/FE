import clsx from "clsx";

import { RoundBtnV2Props } from "./types/roundBtnV2Props";

import "./RoundBtnV2.scss";

/**
 * button component
 *
 * className이나 style에 폰트 적용 필요. e.g. p-large-bold
 *
 * 기본 크기: 195px x 48px
 * @param color - "white" | "grey" | "purple"(default)
 */
const RoundBtnV2: React.FC<RoundBtnV2Props> = ({ color = "purple", className, ...props }) => {
  const baseClass = "__round-btn__";

  return <button className={clsx(className, baseClass)} id={color} {...props}></button>;
};

export default RoundBtnV2;
