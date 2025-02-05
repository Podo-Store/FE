import { useState } from "react";

import AuthInputField from "./AuthInputField";

import invisible from "../../../assets/image/auth/invisible.svg";
import visible from "../../../assets/image/auth/visible.svg";

const AuthPwInputField = ({ ...props }) => {
  const [toggleVisibility, setToggleInvisible] = useState(true);

  return (
    <AuthInputField
      type={toggleVisibility ? "password" : "text"}
      rightElement={
        <img
          src={toggleVisibility ? invisible : visible}
          alt="visibility toggle"
          onClick={() => {
            setToggleInvisible(!toggleVisibility);
          }}
          style={!toggleVisibility ? { transform: "translate(0.1rem, 0)" } : {}}
        />
      }
      {...props}
    />
  );
};

export default AuthPwInputField;
