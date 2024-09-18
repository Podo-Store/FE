import AuthInputField from "../auth/AuthInputField";

const PerformInputField = ({
  placeholder,
  value,
  onChange,
  onClick,
  onBlur,
  maxLength,
  onKeyDown,
  rightElement,
  readOnly,
}) => {
  return (
    <AuthInputField
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      maxLength={maxLength}
      onKeyDown={onKeyDown}
      rightElement={rightElement}
      readOnly={readOnly}
      errorMessageCustomFlag="true"
      style={{ width: "39.3125rem", height: "42px" }}
    />
  );
};

export default PerformInputField;
