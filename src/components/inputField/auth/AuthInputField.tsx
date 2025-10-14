import CheckerMessage from "../../auth/signUp/ErrorMessages/CheckerMessage.jsx";
import ErrorMessage from "../../auth/signUp/ErrorMessages/ErrorMessage.jsx";

import { AuthInputFieldProps } from "./types";

import "./AuthInputField.css";
import clsx from "clsx";
import useWindowDimensions from "@/hooks/useWindowDimensions.js";

/**
 * @param {object} props
 * @param {string} [props.title] - [deprecated] title
 * @param {object} [props.rightButton] - input field 우측 button
 * @param {object} [props.style] - style
 * @param {string} [props.fontMode] - "default" | "12" | "xs"
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
  fontMode = "default",
  readOnly = false,
  disabledMode = false, // ✅ 새로운 prop
  rightElement,
  rightButton,

  checkerShowFlag,
  checkerMessages = [], // [{ checkedFlag: boolean, message: string }, ... ]

  errorFlag,
  errorMessage,

  errorMessageCustomFlag = false,
  ...props
}) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;
  return (
    <div className="auth-input-field">
      <label htmlFor={title}>{title}</label>
      <div className="input-wrap" style={{ ...style }}>
        <input
          className={clsx(
            "input",
            rightElement && "non-right-element",
            fontMode === "default"
              ? "p-small-regular"
              : fontMode === "12"
              ? "p-12-400"
              : fontMode === "xs"
              ? "p-xs-regular"
              : "p-small-regular"
          )}
          readOnly={readOnly || disabledMode}
          tabIndex={disabledMode ? -1 : props.tabIndex}
          style={{
            ...(readOnly || disabledMode
              ? { border: "1px solid #000000" }
              : {}),
            ...(disabledMode ? { pointerEvents: "none" } : {}),
            ...(rightElement && (fontMode === "12" || fontMode === "xs")
              ? { paddingRight: "60px" }
              : {}),
            ...style,
          }}
          {...props}
        />
        {rightElement ? (
          <div className="right-element right-[15px] sm:right-[18px] md:right-[30px]">
            {rightElement}
          </div>
        ) : null}
        {rightButton ? (
          <div className="right-element right-[8px] sm:right-[10px] ">
            {rightButton}
          </div>
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
                  smallMessage={fontMode === "12" || fontMode === "xs"}
                />
              ))}
            </div>
          ) : null}
          {errorFlag ? (
            <div id="error-wrap">
              <ErrorMessage
                message={errorMessage}
                smallMessage={fontMode === "12" || fontMode === "xs"}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default AuthInputField;
