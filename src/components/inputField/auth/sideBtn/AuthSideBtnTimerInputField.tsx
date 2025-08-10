import { useEffect, useState } from "react";

import AuthInputField from "../AuthInputField";
import AuthInsideBtn from "./AuthInsideBtn";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { AuthSideBtnInputFieldProps } from "../types";

import "./../../../../styles/colors.css";
import "./../../../../styles/text.css";
import "./../../../../styles/utilities.css";
import clsx from "clsx";

interface AuthSideBtnTimerInputFieldProps extends AuthSideBtnInputFieldProps {
  timerStart: boolean;
  timerStop: boolean;
  timerReset: boolean;
  setTimerValue: (value: number) => void;
}

/**
 * AuthSideBtnInputField + Timer
 * 추가 props 설명
 * @param {*} props
 * @param {boolean} props.timerStartControl - Timer start condition: true일 때
 * @param {boolean} props.timerResetControl - Timer reset condition: true일 때
 * @param {boolean} props.timerPauseControl - 일시정지
 * @param {boolean} props.timerStopControl - 정지, 초기화
 * @param {function} props.setTimerValue - Timer callback function
 * @returns
 */
const AuthSideBtnTimerInputField: React.FC<AuthSideBtnTimerInputFieldProps> = ({
  fontMode = "default",
  sideBtnTitle,
  sideBtnOnClick,
  sideBtnDisabled,
  timerStart, // 타이머 시작 제어
  timerStop, // 타이머 정지 제어
  timerReset,
  setTimerValue,
  ...props
}) => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 300초 = 5분
  const [timerVisible, setTimerVisible] = useState(false);
  const { isSmallMobile } = useWindowDimensions().widthConditions;
  useEffect(() => {
    if (timerStart && !timerStop && timeLeft > 0) {
      setTimerVisible(true);
      const id = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setTimerId(id);

      return () => clearInterval(id);
    }

    if (timeLeft === 0 || timerStop) {
      timerId && clearInterval(timerId);
      setTimerVisible(false);
      setTimeLeft(300); // 초기화
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerStart, timerStop, timeLeft]);

  useEffect(() => {
    if (timerReset) {
      timerId && clearInterval(timerId);
      setTimeLeft(300); // 타이머를 300초로 초기화
      setTimerVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerReset]);

  useEffect(() => {
    if (setTimerValue && timeLeft >= 0) {
      setTimerValue(timeLeft);
    }
  }, [timeLeft, setTimerValue]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  return (
    <div>
      <AuthInputField
        className="input"
        fontMode={isSmallMobile ? "12" : fontMode}
        style={{
          width: "100%",
          ...(isSmallMobile ? { height: "48px" } : {}),
        }}
        rightElement={
          <div className="flex items-center">
            <AuthInsideBtn
              title={sideBtnTitle}
              onClick={sideBtnOnClick}
              disabled={sideBtnDisabled}
            />
            {timerStart ? (
              <p
                className={clsx(
                  "c-main c-default",
                  timerVisible ? "" : "c-white",
                  fontMode === "default" ? "p-medium-medium" : "text-[8px]"
                )}
                style={
                  fontMode === "default"
                    ? { transform: "translate(-4.5rem, 0)" }
                    : { transform: "translate(-3.5rem, 0)" }
                }
              >
                {timerVisible ? formatTime(timeLeft) : "."}
              </p>
            ) : (
              <p
                className="p-medium-medium c-white c-default"
                style={{ transform: "translate(-4.5rem, 0)" }}
              >
                &nbsp;
              </p>
            )}
          </div>
        }
        {...props}
      />
    </div>
  );
};

export default AuthSideBtnTimerInputField;
