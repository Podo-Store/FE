import React from "react";
import "./InputField.css";

// inputTitle + inputWrap
const InputField = ({
  // 필수 사항
  title,
  type,
  placeholder,
  value,
  onChange,
  // 선택 사항
  readonly = false,

  errorMessage,
  validMessage,
  isValid,
  isDuplicated,
  showErrorMsg,
  additionalElement,
  // 선택 사항 2: 재전송
  resendMessageCondition,
  resendMessage,
  resendOnClick,
}) => {
  return (
    <div className="inputField">
      <div className="inputTitle">{title}</div>
      <div className="inputWrap">
        <input
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readonly={readonly}
        />
        {additionalElement}
      </div>
      {errorMessage ? (
        <div className="errorMessage_resend_Wrap">
          <div className="errorMessageWrap">
            {showErrorMsg ? (
              !isValid && value.length > 0 ? (
                <div>{errorMessage}</div>
              ) : isDuplicated && value.length > 0 ? (
                <div>중복된 {title}입니다.</div>
              ) : (
                isValid &&
                value.length > 0 && <div className="NerrorMessageWrap">{validMessage}</div>
              )
            ) : (
              <div> </div>
            )}
          </div>
          {resendMessageCondition ? (
            <div className="resend" onClick={resendOnClick}>
              <p>{resendMessage}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default InputField;
