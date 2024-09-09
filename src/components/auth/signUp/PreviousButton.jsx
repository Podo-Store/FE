import { previousArrow } from "../../../assets/image/auth/signUp";

import "./../../../styles/colors.css";
import "./../../../styles/text.css";
import "./../../../styles/utilities.css";

const PreviousButton = ({ onPrevious }) => {
  return (
    <div className="d-flex c-pointer" id="next-button" onClick={onPrevious}>
      <img src={previousArrow} alt="previous" />
      <p className="p-medium-medium c-grey">이전 단계</p>
    </div>
  );
};

export default PreviousButton;
