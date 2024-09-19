import { errorChecked } from "../../../../assets/image/auth/signUp";

import "./ErrorMessage.css";
import "./../../../../styles/text.css";
import "./../../../../styles/utilities.css";

const errorMessage = ({ message }) => {
  return (
    <div className="d-flex error-message" id="error">
      <img src={errorChecked} alt="errorChecked"></img>
      <p className="p-small-medium c-red">{message}</p>
    </div>
  );
};

export default errorMessage;
