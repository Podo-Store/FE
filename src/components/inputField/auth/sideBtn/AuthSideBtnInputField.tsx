import AuthInputField from "../AuthInputField";
import AuthInsideBtn from "./AuthInsideBtn";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { AuthSideBtnInputFieldProps } from "../types";

const AuthSideBtnInputField: React.FC<AuthSideBtnInputFieldProps> = ({
  sideBtnTitle,
  sideBtnOnClick,
  sideBtnDisabled,
  ...props
}) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;
  return (
    <AuthInputField
      fontMode={isSmallMobile ? "12" : "default"}
      style={{
        width: "100%",
        ...(isSmallMobile ? { height: "48px" } : {}),
      }}
      rightButton={
        <AuthInsideBtn
          title={sideBtnTitle}
          onClick={sideBtnOnClick}
          disabled={sideBtnDisabled}
        />
      }
      {...props}
    />
  );
};

export default AuthSideBtnInputField;
