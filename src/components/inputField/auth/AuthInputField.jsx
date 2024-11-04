import CheckerMessage from "./../../auth/signUp/ErrorMessages/CheckerMessage.jsx";
import ErrorMessage from "./../../auth/signUp/ErrorMessages/ErrorMessage.jsx";

import "./AuthInputField.css";

/**
 * @param {object} props
 * @param {boolean} props.readOnly - 읽기 전용 여부
 * @param {boolean} props.checkerShowFlag - checker 메시지 표시 여부
 * @param {object[{ checkedFlag: boolean, message: string }]} props.checkerMessages
 * - checker 메시지 조건 및 내용 배열, checkerMessages={[{ checkedFlag: idChecker.format, message: "영어와 숫자를 반드시 포함해야 해요." }, ...]}
 *
 */
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

  checkerShowFlag,
  checkerMessages = [], // [{ checkedFlag: boolean, message: string }, ... ]

  errorFlag,
  errorMessage,

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

      {/* errorMessageCustomFlag가 false 경우에만 렌더링, 없을 경우 공간 X */}
      {!errorMessageCustomFlag ? (
        <div className="f-dir-column">
          {checkerShowFlag ? (
            <div className="f-dir-column" id="error-wrap">
              {checkerMessages.map((checker, index) => (
                <CheckerMessage
                  key={index}
                  checkedFlag={checker.checkedFlag}
                  message={checker.message}
                />
              ))}
            </div>
          ) : null}
          {errorFlag ? (
            <div id="error-wrap">
              <ErrorMessage message={errorMessage} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default AuthInputField;
