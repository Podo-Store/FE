import { nextPurpleArrow } from "../../../assets/image/auth/signUp";

import "./../../../styles/colors.css";
import "./../../../styles/text.css";
import "./../../../styles/utilities.css";

const NextGreyButton = ({ onNext }) => {
  return (
    <div className="j-content-end c-pointer" id="next-button" onClick={onNext}>
      <p className="p-medium-medium c-main">다음 단계</p>
      <img src={nextPurpleArrow} alt="next" />
    </div>
  );
};

export default NextGreyButton;
