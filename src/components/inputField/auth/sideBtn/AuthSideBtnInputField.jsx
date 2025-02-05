import AuthInputField from "../AuthInputField";
import AuthInsideBtn from "./AuthInsideBtn";

const AuthSideBtnInputField = ({ sideBtnTitle, sideBtnOnClick, sideBtnDisabled, ...props }) => {
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
