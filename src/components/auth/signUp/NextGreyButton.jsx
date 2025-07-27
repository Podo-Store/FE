import { nextGreyArrow } from "../../../assets/image/auth/signUp";

import "./../../../styles/colors.css";
import "./../../../styles/text.css";
import "./../../../styles/utilities.css";

import clsx from "clsx";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

/** 현재는 비활성화 버튼으로 사용 */
const NextGreyButton = ({ onNext }) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  return (
    <div
      className="flex justify-end items-center cursor-default"
      id="next-button"
      onClick={onNext}
    >
      <p
        className={clsx(
          "c-grey",
          !isSmallMobile ? "p-medium-medium" : "p-12-400"
        )}
      >
        다음 단계
      </p>
      <img src={nextGreyArrow} alt="next" />
    </div>
  );
};

export default NextGreyButton;
