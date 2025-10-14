import axios from "axios";
import { useEffect, useState } from "react";

import {
  AuthSideBtnInputField,
  AuthSideBtnTimerInputField,
} from "../../inputField";
import { Selector, PreviousButton, CheckerMessage } from ".";
import SignUpCheckBox from "./SignUpCheckBox";
import BottomBtn from "../BottomBtn";

import { EMAIL_REGEX } from "../../../constants/regex";
import { SERVER_URL } from "../../../constants/ServerURL";
import EmailCodeErrorMessages from "./ErrorMessages/EmailCodeErrorMessages";
import useWindowDimensions from "@/hooks/useWindowDimensions";

/**
 *
 * @param {*} onClickRegisterAllowButton - 회원가입 완료 버튼 클릭 시 호출되는 함수
 */
const SignUp4 = ({
  onPrevious,
  userInfo,
  setUserInfo,
  onClickRegisterAllowButton,
}) => {
  const [email, setEmail] = useState(userInfo.email);
  const [emailChecker, setEmailChecker] = useState({
    show: false,
    format: false,
  });
  const [emailDuplicated, setEmailDuplicated] = useState(false);

  const [emailSended, setEmailSended] = useState(false);

  const [emailCode, setEmailCode] = useState(userInfo.emailCode);
  const [emailCodeChecker, setEmailCodeChecker] = useState({
    show: false,
    match: false,
  });

  const [checkBoxCondition, setCheckBoxCondition] = useState({
    age: false,
    collectAndUse: false,
    handOver: false,
    policy: false,
  });

  const [timerReset, setTimerReset] = useState(false);

  const { isSmallMobile } = useWindowDimensions().widthConditions;

  useEffect(() => {
    setEmailChecker({ ...emailChecker, format: EMAIL_REGEX.test(email) });
    setEmailDuplicated(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const onClickEmailSend = async () => {
    // initialize
    setEmailSended(false);
    setEmailDuplicated(false);
    setEmailCodeChecker({ show: false, match: false });

    setEmailSended(true);
    // 타이머 리셋
    setTimerReset(true);
    setTimeout(() => setTimerReset(false), 100); // 타이머 리셋 상태를 빠르게 해제

    // 이메일 발송 API 호출
    try {
      await axios.post(`${SERVER_URL}auth/mailSend`, {
        email: email,
      });

      setEmailSended(true);
    } catch (error) {
      if (error.response.data.error === "이메일 중복") {
        setEmailDuplicated(true);
      } else {
        alert("이메일 전송에 실패했습니다.");
      }
      setEmailSended(false);
    }
  };

  const onClickConfirmButton = async () => {
    // initialize
    setEmailCodeChecker({ show: false, match: false });

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

    document.addEventListener("keydown", handleKeyDown);

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
        onClick={() => {
          setEmailChecker({ ...emailChecker, show: true });
        }}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        onBlur={() => {
          setEmailChecker({ ...emailChecker, show: false });
        }}
        fontMode={!isSmallMobile ? "default" : "12"}
        style={isSmallMobile ? { height: "48px" } : {}}
        sideBtnTitle="인증"
        sideBtnOnClick={onClickEmailSend}
        sideBtnDisabled={!emailChecker.format}
        checkerShowFlag={email.length > 0}
        checkerMessages={[
          {
            checkedFlag: emailChecker.format,
            message: "올바른 이메일 형식을 포함해야 해요.",
          },
        ]}
        errorFlag={emailDuplicated}
        errorMessage="중복된 이메일입니다."
      />
      {/* 메일 전송 메시지: 별도로 지정 */}
      <div className="f-dir-column" id="error-wrap">
        {emailSended && emailCode.length === 0 ? (
          <CheckerMessage
            checkedFlag={true}
            message="메일이 전송되었습니다."
            smallMessage={isSmallMobile ? true : false}
          />
        ) : null}
      </div>

      <div style={{ height: "1rem" }}></div>

      <AuthSideBtnTimerInputField
        placeholder="인증번호를 입력해주세요."
        value={emailCode}
        onChange={(event) => {
          setEmailCodeChecker({ show: false, match: false });
          setEmailCode(event.target.value);
        }}
        fontMode={!isSmallMobile ? "default" : "12"}
        style={isSmallMobile ? { height: "48px" } : {}}
        errorMessageCustomFlag="true" // 이메일 인증 관련 메시지 커스텀
        sideBtnTitle="확인"
        sideBtnOnClick={onClickConfirmButton}
        sideBtnDisabled={!emailSended}
        timerStart={emailSended} // 이메일 발송 여부로 타이머 시작 제어
        timerStop={emailCodeChecker.match || emailDuplicated} // 인증번호 일치 여부 또는 이메일 중복 여부로 타이머 정지 제어
        timerReset={timerReset}
        setTimerValue={(value) => {
          if (value === 0) setEmailSended(false); // 타이머가 0이 되면 이메일 발송 상태 해제
        }}
      />
      {/* 메일 인증 메시지 */}
      <EmailCodeErrorMessages
        emailCodeChecker={emailCodeChecker}
        emailSended={emailSended}
        onClickEmailSend={onClickEmailSend}
      />

      <SignUpCheckBox setCheckBoxCondition={setCheckBoxCondition} />

      <div style={{ height: "1.94rem" }}></div>

      <BottomBtn
        onClick={() => {
          setUserInfo({ ...userInfo, email: email, emailCode: emailCode });
          // 비동기 처리 이슈, parameter로 전달
          onClickRegisterAllowButton(email, emailCode);
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
        style={isSmallMobile ? { width: "100%" } : {}}
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
