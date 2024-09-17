import PerformInputField from "./PerformInputField";

import closeBtn from "../../../assets/image/button/PopupClose.svg";

/**
 * @param {Object} props - Component properties
 * @param {boolean} props.onDelete - 삭제 버튼 표시 (기존에 입력됐었던 양식의 경우 수정 불가) 및 삭제 기능 callback 함수
 * @returns
 */
const PerformDateInputField = ({ placeholder, value, onChange, onClick, onBlur, onDelete }) => {
  // onChange를 그대로 거치지 않고, formatDateTime을 거쳐서 onChange로 넘김
  const formatDateTime = (event) => {
    let inputValue = event.target.value.replace(/\D/g, ""); // 숫자만 남기기

    // 구분자 추가
    if (inputValue.length > 3) inputValue = inputValue.slice(0, 4) + "-" + inputValue.slice(4);
    if (inputValue.length > 6) inputValue = inputValue.slice(0, 7) + "-" + inputValue.slice(7);
    if (inputValue.length > 8) inputValue = inputValue.slice(0, 10) + " " + inputValue.slice(10);
    if (inputValue.length > 11) inputValue = inputValue.slice(0, 13) + ":" + inputValue.slice(13);

    // target.value 값
    onChange({ target: { value: inputValue } });
  };

  const onKeyDown = (event) => {
    if (event.key === "Backspace") {
      let inputValue = event.target.value;

      // 구분자 앞에 있는 숫자도 함께 지우도록 처리
      if (inputValue.endsWith("-") || inputValue.endsWith(" ") || inputValue.endsWith(":")) {
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
    <PerformInputField
      placeholder={placeholder}
      value={value}
      onChange={formatDateTime}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      rightElement={onDelete ? <img src={closeBtn} alt="delete" onClick={onDelete} /> : null}
      maxLength="16"
    />
  );
};

export default PerformDateInputField;
