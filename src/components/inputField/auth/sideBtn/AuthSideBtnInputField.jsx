import AuthInputField from "../AuthInputField";
import AuthInsideBtn from "./AuthInsideBtn";

const AuthSideBtnInputField = ({
  title,
  type,
  placeholder,
  value,
  onChange,
  // 추가 요소
  onClick,
  onBlur,

  checkerShowFlag,
  checkerMessages,

  errorFlag,
  errorMessage,

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
      onClick={onClick}
      onBlur={onBlur}
      rightElement={
        <AuthInsideBtn title={sideBtnTitle} onClick={sideBtnOnClick} disabled={sideBtnDisabled} />
      }
      errorMessageCustomFlag={errorMessageCustomFlag}
      checkerShowFlag={checkerShowFlag}
      checkerMessages={checkerMessages}
      errorFlag={errorFlag}
      errorMessage={errorMessage}
    />
  );
};

export default AuthSideBtnInputField;
