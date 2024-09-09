import { useEffect, useState } from "react";

import AuthInputField from "../AuthInputField";
import AuthInsideBtn from "./AuthInsideBtn";

import "./../../../../styles/colors.css";
import "./../../../../styles/text.css";
import "./../../../../styles/utilities.css";

/**
 * AuthSideBtnInputField + Timer
 * 추가 props 설명
 * @param {*} timerStartControl - Timer start condition: true일 때
 * @param {*} timerResetControl - Timer reset condition: true일 때
 * @param {*} setTimerValue - Timer callback function
 * @returns
 */
const AuthSideBtnTimerInputField = ({
  title,
  type,
  placeholder,
  value,
  onChange,
  // 추가 요소
  errorMessage,
  showErrorMsg,
  isValid,
  isDuplicated,
  validMessage,

  errorMessageCustomFlag,

  sideBtnTitle,
  sideBtnOnClick,
  sideBtnDisabled,

  // 타이머 control
  timerStartControl,
  timerResetControl,
  timerStopControl,
  // 타이머 callback function
  setTimerValue,
}) => {
  const [timerId, setTimerId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 300초 = 5분

  useEffect(() => {
    // 타이머가 시작해야 하는 조건: timerStartControl이 true일 때
    if (timerStartControl && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      setTimerId(timerId);

      return () => clearInterval(timerId); // 메모리 누수를 방지하기 위해 타이머를 정리
    } else if (timeLeft === 0) {
      setTimeLeft(0); // 타이머가 0일 때 멈추도록 설정
    }
  }, [timerStartControl, timeLeft]);

  useEffect(() => {
    setTimerValue(timeLeft);
  }, [timeLeft, setTimerValue]);

  useEffect(() => {
    if (timerResetControl) {
      setTimeLeft(300);
    }
  }, [timerResetControl]);

  useEffect(() => {
    if (timerStopControl) {
      // 타이머 일시 정지
      clearInterval(timerId);
      setTimerId(null); // 타이머 ID 초기화
    }
  }, [timerStopControl, timerId]);

  // 시간을 분:초 형식으로 변환하는 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <div>
      <AuthInputField
        title={title}
        type={type}
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rightElement={
          <div className="d-flex" style={{ transform: "translate(0, -0.5rem)" }}>
            <AuthInsideBtn
              title={sideBtnTitle}
              onClick={sideBtnOnClick}
              disabled={sideBtnDisabled}
            />
            {timerStartControl ? (
              <p
                className="p-medium-medium c-main c-default"
                style={{ transform: "translate(-4.5rem, 0.5rem)" }}
              >
                {formatTime(timeLeft)}
              </p>
            ) : (
              <p className="p-medium-medium">d</p>
            )}
          </div>
        }
        errorMessage={errorMessage}
        isValid={isValid}
        isDuplicated={isDuplicated}
        validMessage={validMessage}
        showErrorMsg={showErrorMsg}
        errorMessageCustomFlag={errorMessageCustomFlag}
      />
    </div>
  );
};

export default AuthSideBtnTimerInputField;
