import { previousArrow } from "../../../assets/image/auth/signUp";

import "./../../../styles/colors.css";
import "./../../../styles/text.css";
import "./../../../styles/utilities.css";

import clsx from "clsx";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

const PreviousButton = ({ onPrevious }) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  return (
    <div
      className="flex justify-start items-center cursor-pointer"
      id="next-button"
      onClick={onPrevious}
    >
      <img src={previousArrow} alt="previous" />
      <p
        className={clsx(
          "p-medium-medium c-grey",
          !isSmallMobile ? "p-medium-medium" : "p-12-400"
        )}
      >
        이전 단계
      </p>
    </div>
  );
};

export default PreviousButton;
