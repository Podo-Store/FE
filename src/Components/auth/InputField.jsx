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
      <div className="errorMessageWrap">
        {!isValid && value.length > 0 ? (
          <div>{errorMessage}</div>
        ) : isDuplicated && value.length > 0 ? (
          <div>중복된 {title}입니다.</div>
        ) : (
          isValid && value.length > 0 && <div className="NerrorMessageWrap">{validMessage}</div>
        )}
      </div>
    </div>
  );
};

export default InputField;
