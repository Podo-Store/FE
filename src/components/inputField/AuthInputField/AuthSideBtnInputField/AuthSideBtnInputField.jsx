import AuthInputField from "../AuthInputField";
import AuthInsideBtn from "./AuthInsideBtn";

const AuthSideBtnInputField = ({
  title,
  type,
  placeholder,
  value,
  onChange,
  // 추가 요소
  errorMessage,
  showErrorMsg,
  isValid,
  isDuplicated,
  validMessage,

  errorMessageCustomFlag,

  sideBtnTitle,
  sideBtnOnClick,
  sideBtnDisabled,
}) => {
  return (
    <AuthInputField
      title={title}
      type={type}
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rightElement={
        <AuthInsideBtn title={sideBtnTitle} onClick={sideBtnOnClick} disabled={sideBtnDisabled} />
      }
      errorMessage={errorMessage}
      isValid={isValid}
      isDuplicated={isDuplicated}
      validMessage={validMessage}
      showErrorMsg={showErrorMsg}
      errorMessageCustomFlag={errorMessageCustomFlag}
    />
  );
};

export default AuthSideBtnInputField;
