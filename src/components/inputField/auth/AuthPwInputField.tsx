import { useState } from "react";

import AuthInputField from "./AuthInputField";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { AuthInputFieldProps } from "./types";

import invisible from "../../../assets/image/auth/invisible.svg";
import visible from "../../../assets/image/auth/visible.svg";

const AuthPwInputField: React.FC<AuthInputFieldProps> = ({ ...props }) => {
  const [toggleVisibility, setToggleInvisible] = useState(true);
  const { isSmallMobile } = useWindowDimensions().widthConditions;
  return (
    <AuthInputField
      type={toggleVisibility ? "password" : "text"}
      fontMode={isSmallMobile ? "12" : "default"}
      style={{
        width: "100%",
        ...(isSmallMobile ? { height: "48px" } : {}),
      }}
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
