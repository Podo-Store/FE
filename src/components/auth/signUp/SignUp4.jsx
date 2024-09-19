import axios from "axios";
import { useEffect, useState } from "react";

import { AuthSideBtnInputField, AuthSideBtnTimerInputField } from "../../inputField";
import { Selector, ErrorMessage, PreviousButton, CheckerMessage } from ".";
import SignUpCheckBox from "./SignUpCheckBox";
import BottomBtn from "../BottomBtn";

import { EMAIL_REGEX } from "../../../constants/regex";
import { SERVER_URL } from "../../../constants/ServerURL";

/**
 *
 * @param {*} onClickRegisterAllowButton - 회원가입 완료 버튼 클릭 시 호출되는 함수
 */
const SignUp4 = ({ onPrevious, userInfo, setUserInfo, onClickRegisterAllowButton }) => {
  const [email, setEmail] = useState(userInfo.email);
  const [emailChecker, setEmailChecker] = useState({
    show: false,
    format: false,
  });
  const [emailDuplicated, setEmailDuplicated] = useState(false);
  // receivedEmailCode: 현재 작동 X
  const [receivedEmailCode, setReceivedEmailCode] = useState("");
  const [emailSended, setEmailSended] = useState(false);

  const [emailCode, setEmailCode] = useState(userInfo.emailCode);
  const [emailCodeChecker, setEmailCodeChecker] = useState({
    show: false,
    match: false,
  });

  // 타이머 관련 state
  const [timerValue, setTimerValue] = useState(0);
  const [timerStartCondition, setTimerStartCondition] = useState(false);
  const [timerResetCondition, setTimerResetCondition] = useState(false);
  const [timerStopCondition, setTimerStopCondition] = useState(false); // 타이머 정지 상태

  const [checkBoxCondition, setCheckBoxCondition] = useState({
    age: false,
    collectAndUse: false,
    handOver: false,
    policy: false,
  });

  useEffect(() => {
    const checker = {
      show: email.length > 0,
      format: EMAIL_REGEX.test(email),
    };

    setEmailChecker(checker);

    // 에러 메시지 초기화
    setEmailDuplicated(false);
  }, [email]);

  const onClickEmailSend = async () => {
    setEmailSended(false);
    setEmailDuplicated(false);
    setTimerResetCondition(true); // 타이머 리셋
    setTimerResetCondition(false); // 리셋 후 타이머 상태 초기화
    setTimerStartCondition(true); // 타이머 시작

    setTimerStopCondition(false); // 정지 상태 해제

    setEmailSended(true);

    // 이메일 발송 API 호출
    try {
      const response = await axios.post(`${SERVER_URL}auth/mailSend`, {
        email: email,
        check: true,
      });

      setReceivedEmailCode(response.data);
      setEmailSended(true);
    } catch (error) {
      if (error.response.data.error === "이메일 중복") {
        setEmailDuplicated(true);
        setTimerResetCondition(true); // 타이머 리셋
        setTimerStopCondition(true); // 중복 시 타이머 정지
      }
      setEmailSended(false);
    }
  };

  useEffect(() => {
    const checker = {
      show: emailCode.length > 0,
      match: false,
    };

    setEmailCodeChecker(checker);

    // 에러 메시지 초기화
    setEmailCodeChecker({ show: false, match: false });
  }, [emailCode]);

  const onClickConfirmButton = async () => {
    /*
    if (receivedEmailCode !== emailCode) {
      setEmailCodeChecker({ show: true, match: false });
      return;
    }*/

    try {
      await axios.post(`${SERVER_URL}auth/mailauthCheck`, {
        email: email,
        authNum: emailCode,
      });
      setEmailCodeChecker({ show: true, match: true });
    } catch (error) {
      setEmailCodeChecker({ show: true, match: false });
    }
  };

  // 타이머 종료 후 상태를 false로 설정
  useEffect(() => {
    if (timerStartCondition === 0) {
      setTimerStartCondition(false);
    }
  }, [timerStartCondition]);

  // 타이머가 리셋된 후 상태를 false로 다시 설정
  useEffect(() => {
    if (timerResetCondition) {
      setTimerResetCondition(false); // 타이머 리셋 후 상태 초기화
    }
  }, [timerResetCondition]);

  useEffect(() => {
    if (timerValue === 0) {
      setEmailSended(false);
    }
  }, [timerValue]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        emailChecker.format &&
        !emailDuplicated &&
        emailCodeChecker.match &&
        checkBoxCondition.age &&
        checkBoxCondition.collectAndUse &&
        checkBoxCondition.handOver &&
        checkBoxCondition.policy
      ) {
        if (event.key === "Enter") {
          event.preventDefault();
          setUserInfo({ ...userInfo, email: email, emailCode: emailCode });
          onClickRegisterAllowButton();
        }
      }
    };

    // keydown 이벤트 리스너 추가
    document.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    userInfo,
    setUserInfo,
    onClickRegisterAllowButton,
    email,
    emailCode,
    emailChecker,
    emailDuplicated,
    emailCodeChecker,
    checkBoxCondition,
  ]);

  return (
    <div>
      <Selector index={4} />

      <AuthSideBtnInputField
        placeholder="이메일을 입력해주세요."
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        errorMessageCustomFlag="true"
        sideBtnTitle="인증"
        sideBtnOnClick={onClickEmailSend}
        sideBtnDisabled={!(emailChecker.show && emailChecker.format)}
      />
      <div className="f-dir-column" id="error-wrap">
        {emailSended ? (
          <CheckerMessage checkedFlag={true} message="메일이 전송되었습니다." />
        ) : null}
        {emailChecker.show ? (
          <div className="f-dir-column" id="error">
            {!emailChecker.format ? (
              <ErrorMessage
                show={emailChecker.show && !emailChecker.format}
                message="올바른 이메일 형식이 아닙니다."
              />
            ) : null}
            {emailDuplicated ? (
              <ErrorMessage show={emailDuplicated} message="이미 사용 중인 이메일입니다." />
            ) : null}
          </div>
        ) : null}
      </div>

      {emailChecker.show ? <div style={{ height: "1.81rem" }}></div> : null}

      <AuthSideBtnTimerInputField
        placeholder="인증번호를 입력해주세요."
        value={emailCode}
        onChange={(event) => {
          setEmailCode(event.target.value);
        }}
        errorMessageCustomFlag="true"
        sideBtnTitle="확인"
        sideBtnOnClick={onClickConfirmButton}
        sideBtnDisabled={!emailSended}
        timerStartControl={timerStartCondition}
        timerResetControl={timerResetCondition}
        timerPauseControl={emailCodeChecker.match}
        timerStopControl={timerStopCondition}
        setTimerValue={setTimerValue}
      />

      <div className="f-dir-column" id="error-wrap">
        <div className="j-content-between">
          {emailCodeChecker.show ? (
            emailCodeChecker.match ? (
              <CheckerMessage checkedFlag={true} message="인증이 완료되었습니다." />
            ) : (
              <ErrorMessage show={emailCodeChecker.match} message="인증번호가 정확하지 않습니다." />
            )
          ) : (
            // default 상태 빈 문자
            <p></p>
          )}
          {emailSended ? (
            <p className="p-xs-under c-grey4 c-pointer" onClick={onClickEmailSend}>
              메일 다시 보내기
            </p>
          ) : null}
        </div>
      </div>

      <SignUpCheckBox setCheckBoxCondition={setCheckBoxCondition} />

      <div style={{ height: "1.94rem" }}></div>
      {/* email이 올바르고, emailCode가 일치하며, 모든 체크박스가 체크되어 있을 때 버튼 활성화 */}

      <BottomBtn
        onClick={() => {
          setUserInfo({ ...userInfo, email: email, emailCode: emailCode });
          onClickRegisterAllowButton();
        }}
        disabled={
          !(
            emailChecker.format &&
            !emailDuplicated &&
            emailCodeChecker.match &&
            checkBoxCondition.age &&
            checkBoxCondition.collectAndUse &&
            checkBoxCondition.handOver &&
            checkBoxCondition.policy
          )
        }
      >
        회원가입
      </BottomBtn>

      <div className="j-content-between">
        <PreviousButton
          onPrevious={() => {
            setUserInfo({ ...userInfo, email: email, emailCode: emailCode });
            onPrevious();
          }}
        />
      </div>
    </div>
  );
};

export default SignUp4;
