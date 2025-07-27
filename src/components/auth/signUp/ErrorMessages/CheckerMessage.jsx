import { nonChecked, checked } from "../../../../assets/image/auth/signUp";

import "./CheckerMessage.css";
import "./../../../../styles/text.css";
import "./../../../../styles/utilities.css";
import clsx from "clsx";

const CheckerMessage = ({
  checkedFlag = false,
  message,
  smallMessage = false,
}) => {
  return (
    <div className="d-flex checker-message" id="error">
      <img
        src={checkedFlag ? checked : nonChecked}
        alt="checked"
        style={smallMessage ? { width: "14px", height: "14px" } : {}}
      ></img>
      <p
        className={clsx(
          !smallMessage ? "p-small-medium" : "p-xs-medium",
          checkedFlag ? "c-main" : "c-grey"
        )}
      >
        {message}
      </p>
    </div>
  );
};

export default CheckerMessage;
