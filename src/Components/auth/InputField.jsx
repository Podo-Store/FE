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
  errorMessage,
  validMessage,
  isValid,
  isDuplicated,
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
        />
        {additionalElement}
      </div>
      <div className="errorMessage_resend_Wrap">
        <div className="errorMessageWrap">
          {!isValid && value.length > 0 ? (
            <div>{errorMessage}</div>
          ) : isDuplicated && value.length > 0 ? (
            <div>중복된 {title}입니다.</div>
          ) : (
            isValid && value.length > 0 && <div className="NerrorMessageWrap">{validMessage}</div>
          )}
          {resendMessageCondition ? (
            <div className="errorMessageWrap" onClick={resendOnClick}>
              <p>{resendMessage}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InputField;
