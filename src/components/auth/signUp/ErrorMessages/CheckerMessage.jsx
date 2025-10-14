import { nonChecked, checked } from "../../../../assets/image/auth/signUp";

import "./CheckerMessage.css";
import "./../../../../styles/text.css";
import "./../../../../styles/utilities.css";
import clsx from "clsx";

const CheckerMessage = ({
  checkedFlag = false,
  message = "",
  smallMessage = false,
}) => {
  return (
    <div className="d-flex checker-message" id="error">
      <img
        className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px]"
        src={checkedFlag ? checked : nonChecked}
        alt="checked"
        style={
          smallMessage
            ? { width: "14px", height: "14px" }
            : { width: "20px", height: "20px" }
        }
      />
      <p
        className={`whitespace-nowrap 
          ${checkedFlag ? "c-main" : "c-grey"}
          ${smallMessage ? "p-xs-medium" : "p-smll-medium"}
        `}
      >
        {message}
      </p>
    </div>
  );
};

export default CheckerMessage;
