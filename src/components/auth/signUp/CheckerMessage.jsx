import { nonChecked, checked } from "../../../assets/image/auth/signUp";

import "./../../../styles/text.css";
import "./../../../styles/utilities.css";

const CheckerMessage = ({ checkedFlag = false, message }) => {
  return (
    <div className="d-flex" id="error">
      <img src={checkedFlag ? checked : nonChecked} alt="checked"></img>
      <p className={`p-small-medium ${checkedFlag ? "c-main" : "c-grey"}`}>{message}</p>
    </div>
  );
};

export default CheckerMessage;
