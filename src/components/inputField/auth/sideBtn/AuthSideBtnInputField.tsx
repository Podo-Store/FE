import AuthInputField from "../AuthInputField";
import AuthInsideBtn from "./AuthInsideBtn";

import { AuthSideBtnInputFieldProps } from "../types";

const AuthSideBtnInputField: React.FC<AuthSideBtnInputFieldProps> = ({
  sideBtnTitle,
  sideBtnOnClick,
  sideBtnDisabled,
  ...props
}) => {
  return (
    <AuthInputField
      className="input"
      rightElement={
        <AuthInsideBtn title={sideBtnTitle} onClick={sideBtnOnClick} disabled={sideBtnDisabled} />
      }
      {...props}
    />
  );
};

export default AuthSideBtnInputField;
