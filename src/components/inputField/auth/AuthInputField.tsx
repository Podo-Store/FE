import CheckerMessage from "../../auth/signUp/ErrorMessages/CheckerMessage.jsx";
import ErrorMessage from "../../auth/signUp/ErrorMessages/ErrorMessage.jsx";

import { AuthInputFieldProps } from "./types";

import "./AuthInputField.css";

/**
 * @param {object} props
 * @param {string} [props.title] - [deprecated] title
 * @param {object} [props.style] - style
 * @param {boolean} [props.readOnly] - 읽기 전용 여부
 * @param {boolean} [props.disabledMode] - 선택 가능 여부
 * @param {object} [props.rightElement] - input field 우측 element
 * @param {boolean} [props.checkerShowFlag] - checker 메시지 표시 여부
 * @param {object[{ checkedFlag: boolean, message: string }]} [props.checkerMessages]
 * - checker 메시지 조건 및 내용 배열, e.g. checkerMessages={[{ checkedFlag: idChecker.format, message: "영어와 숫자를 반드시 포함해야 해요." }, ...]}
 * @param {boolean} [props.errorFlag] - error 메시지 표시 여부
 * @param {string} [props.errorMessage] - error 메시지
 * @param {boolean} [props.errorMessageCustomFlag] - [deprecated] custom error 메시지 표시 여부 (default: false)
 */
const AuthInputField: React.FC<AuthInputFieldProps> = ({
  title,
  style,
  // 추가 요소
  readOnly = false,
  disabledMode = false, // ✅ 새로운 prop
  rightElement,

  checkerShowFlag,
  checkerMessages = [], // [{ checkedFlag: boolean, message: string }, ... ]

  errorFlag,
  errorMessage,

  errorMessageCustomFlag = false,
  ...props
}) => {
  return (
    <div className="auth-input-field">
      <label htmlFor={title}>{title}</label>
      <div className="input-wrap" style={{ ...style }}>
        <input
          className={"input" + rightElement ? " non-right-element" : ""}
          readOnly={readOnly || disabledMode}
          tabIndex={disabledMode ? -1 : props.tabIndex}
          style={{
            ...(readOnly || disabledMode
              ? { border: "1px solid #000000" }
              : {}),
            ...(disabledMode ? { pointerEvents: "none" } : {}),
            ...style,
          }}
          {...props}
        />
        {rightElement ? (
          <div className="right-element">{rightElement}</div>
        ) : null}
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
