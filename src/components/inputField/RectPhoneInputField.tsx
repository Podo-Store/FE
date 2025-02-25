import RectInputField from "./RectInputField";

const RectPhoneInputField = ({
  onChange,
  ...props
}: {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  // onChange를 그대로 거치지 않고, formatPhoneNum을 거쳐서 onChange로 넘김
  const formatPhoneNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/\D/g, ""); // 숫자만 남기기

    if (inputValue.length > 2) inputValue = inputValue.slice(0, 3) + "-" + inputValue.slice(3);
    if (inputValue.length > 7) inputValue = inputValue.slice(0, 8) + "-" + inputValue.slice(8, 12);

    // onChange({ target: { value: inputValue } });
    if (onChange) {
      const newEvent = {
        ...event,
        target: {
          ...(event.target as HTMLInputElement),
          value: inputValue,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(newEvent);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      let inputValue = (event.target as HTMLInputElement).value;

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
      // onChange({ target: { value: inputValue } });
      if (onChange) {
        const newEvent = {
          ...event,
          target: {
            ...(event.target as HTMLInputElement),
            value: inputValue,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(newEvent);
      }
    }
  };

  return (
    <RectInputField onChange={formatPhoneNum} onKeyDown={onKeyDown} maxLength={13} {...props} />
  );
};

export default RectPhoneInputField;
