import AuthInputField from "../auth/AuthInputField.tsx";

import useWindowDimensions from "@/hooks/useWindowDimensions.ts";

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
  const { width } = useWindowDimensions();
  const { isSmallMobile } = useWindowDimensions().widthConditions;

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
      fontMode={!isSmallMobile ? "default" : "xs"}
      style={
        !(width < 768)
          ? { width: "39.3125rem", height: "42px" }
          : { width: "100%", height: "42px" }
      }
    />
  );
};

export default PerformInputField;
