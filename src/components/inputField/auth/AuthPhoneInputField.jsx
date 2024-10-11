import AuthInputField from "./AuthInputField";

const AuthPhoneInputField = ({ placeholder, value, onChange, onClick, onBlur }) => {
  // onChange를 그대로 거치지 않고, formatPhoneNum을 거쳐서 onChange로 넘김
  const formatPhoneNum = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ""); // 숫자만 남기기

    if (inputValue.length > 2) inputValue = inputValue.slice(0, 3) + "-" + inputValue.slice(3);
    if (inputValue.length > 7) inputValue = inputValue.slice(0, 8) + "-" + inputValue.slice(8, 12);

    onChange({ target: { value: inputValue } });
  };

  const onKeyDown = (event) => {
    if (event.key === "Backspace") {
      let inputValue = event.target.value;

      // 구분자 앞에 있는 숫자도 함께 지우도록 처리
      if (inputValue.endsWith("-")) {
        // 구분자와 그 앞의 숫자를 지움
        inputValue = inputValue.slice(0, -2);
      } else {
        // 마지막 숫자만 지움
        inputValue = inputValue.slice(0, -1);
      }

      // 기본 Backspace 동작 방지
      event.preventDefault();
      // target.value 값
      onChange({ target: { value: inputValue } });
    }
  };

  return (
    <AuthInputField
      placeholder={placeholder}
      value={value}
      onChange={formatPhoneNum}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      maxLength="13"
    />
  );
};

export default AuthPhoneInputField;
