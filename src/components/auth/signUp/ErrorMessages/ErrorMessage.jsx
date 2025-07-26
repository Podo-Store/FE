import { errorChecked } from "../../../../assets/image/auth/signUp";

import "./ErrorMessage.css";
import "./../../../../styles/text.css";
import "./../../../../styles/utilities.css";
import clsx from "clsx";

const errorMessage = ({ message, smallMessage = false }) => {
  return (
    <div className="d-flex error-message" id="error">
      <img
        src={errorChecked}
        alt="errorChecked"
        style={smallMessage && { width: "14px", height: "14px" }}
      ></img>
      <p
        className={clsx(
          !smallMessage ? "p-small-medium" : "p-xs-medium",
          "c-red"
        )}
      >
        {message}
      </p>
    </div>
  );
};

export default errorMessage;
