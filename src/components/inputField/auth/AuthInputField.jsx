import "./AuthInputField.css";

const AuthInputField = ({
  title,
  type,
  placeholder,
  value,
  onChange,
  style,
  // 추가 요소
  readOnly = false,
  rightElement,

  errorMessage,
  showErrorMsg,
  isValid,
  isDuplicated,
  validMessage,

  onClick,
  onBlur,

  // 공연권 신청
  maxLength,
  onKeyDown,

  // 커스텀 에러 메시지: AuthInputField를 사용한 component에서 error 메시지 정의, (default: false)
  // errorMessageCustomFlag true로 고정, false case has been deprecated.
  errorMessageCustomFlag = false,
}) => {
  return (
    <div className="auth-input-field">
      <label for={title}>{title}</label>
      <div className="input-wrap" style={{ ...style }}>
        <input
          id={title}
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          maxLength={maxLength}
          readOnly={readOnly}
          onKeyDown={onKeyDown}
          style={readOnly ? { border: "1px solid #000000" } : null}
        />
        {rightElement ? <div className="right-element">{rightElement}</div> : null}
      </div>
      {/* DEPRECATED: errorMessageCustomFlag true로 고정 */}

      {/* errorMessage가 있거나,
      errorMessageCustomFlag가 false 경우에만 렌더링, 없을 경우 공간 X */}
      {!errorMessageCustomFlag ? (
        errorMessage ? (
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
        ) : null
      ) : null}
    </div>
  );
};

export default AuthInputField;
