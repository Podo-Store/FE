import "./AuthInputField.css";

const AuthInputField = ({
  title,
  type,
  placeholder,
  value,
  onChange,
  // 추가 요소
  rightElement,

  errorMessage,
  showErrorMsg,
  isValid,
  isDuplicated,
  validMessage,
}) => {
  return (
    <div className="auth-input-field">
      <label for={title}>{title}</label>
      <div className="input-wrap">
        <input
          id={title}
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {rightElement ? <div className="right-element">{rightElement}</div> : null}
      </div>

      {/* errorMessage가 있을 경우에만 렌더링, 없을 경우 공간 X */}
      {errorMessage ? (
        <div className="error-message-wrap">
          {/* showErrorMsg가 true일 때만 렌더링, 없을 경우에도 공간 확보 */}
          {showErrorMsg ? (
            !isValid && value.length > 0 ? (
              <p>{errorMessage}</p>
            ) : isDuplicated && value.length > 0 ? (
              <p>중복된 {title}입니다.</p>
            ) : isValid && value.length > 0 ? (
              <p id="validMessage">{validMessage}</p>
            ) : null
          ) : (
            <p> </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AuthInputField;
