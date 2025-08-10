import clsx from "clsx";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

import { nextPurpleArrow } from "../../../assets/image/auth/signUp";

import "./../../../styles/colors.css";
import "./../../../styles/text.css";
import "./../../../styles/utilities.css";

const NextPurpleButton = ({ onNext }) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  return (
    <div
      className="flex justify-end items-center cursor-pointer"
      id="next-button"
      onClick={onNext}
    >
      <p
        className={clsx(
          "c-main",
          !isSmallMobile ? "p-medium-medium" : "p-12-400"
        )}
      >
        다음 단계
      </p>
      <img src={nextPurpleArrow} alt="next" />
    </div>
  );
};

export default NextPurpleButton;
