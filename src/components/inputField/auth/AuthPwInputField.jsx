import AuthInputField from "./AuthInputField";
import invisible from "../../../assets/image/auth/invisible.svg";
import { useState } from "react";

const AuthPwInputField = ({
  title,
  placeholder,
  value,
  onChange,
  // 추가 요소
  errorMessage,
  showErrorMsg,
  isValid,
  validMessage,
}) => {
  const [toggleInvisible, setToggleInvisible] = useState(true);

  return (
    <AuthInputField
      title={title}
      type={toggleInvisible ? "password" : "text"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rightElement={
        <img
          src={invisible}
          alt="invisible"
          onClick={() => {
            setToggleInvisible(!toggleInvisible);
          }}
        />
      }
      errorMessage={errorMessage}
      validMessage={validMessage}
      isValid={isValid}
      showErrorMsg={showErrorMsg}
    />
  );
};

export default AuthPwInputField;
