import axios from "axios";
import { useState, useEffect } from "react";

import ResetPW from "./ResetPW";
import BottomBtn from "../../components/auth/BottomBtn";
import EmailCodeErrorMessages from "../../components/auth/signUp/ErrorMessages/EmailCodeErrorMessages.jsx";
import { CheckerMessage } from "../../components/auth/signUp/index.js";
import {
  AuthInputField,
  AuthSideBtnInputField,
  AuthSideBtnTimerInputField,
} from "../../components/inputField";

import { ID_FORMAT_REGEX, ID_LENGTH_REGEX, EMAIL_REGEX } from "./../../constants/regex.js";
import { SERVER_URL } from "../../constants/ServerURL";

import "./FindBar.css";

const FindPW = () => {
  const [id, setId] = useState("");
  const [idChecker, setIdChecker] = useState({
    show: false,
    format: false,
    length: false,
  });
  const [isRegisteredId, setIsRegisteredId] = useState({
    show: false,
    registered: false,
  });

  const [email, setEmail] = useState("");
  const [emailChecker, setEmailChecker] = useState({
    show: false,
    format: false,
  });
  const [emailSended, setEmailSended] = useState(false);
  const [isEmailMatchToId, setIsEmailMatchToId] = useState({
    show: false,
    match: false,
  });

  const [emailCode, setEmailCode] = useState("");
  const [emailCodeChecker, setEmailCodeChecker] = useState({
    show: false,
    match: false,
  });

  const [timerReset, setTimerReset] = useState(false);

  const [resetPwPermitted, setResetPwPermitted] = useState(false);

  // PW 재설정
  const [receivedAccessToken, setReceivedAccessToken] = useState("");

  useEffect(() => {
    const newIdChecker = {
      show: id.length > 0,
      format: ID_FORMAT_REGEX.test(id),
      length: ID_LENGTH_REGEX.test(id),
    };
    setIdChecker(newIdChecker);
  }, [id]);

  const checkIsRegisteredId = async () => {
    // initialize
    setIsRegisteredId({ show: false, registered: false });

    try {
      const response = await axios.post(`${SERVER_URL}auth/checkUserId`, {
        userId: id,
        check: false,
      });
      if (response.data === true) {
        setIsRegisteredId({ show: true, registered: true });
      }
    } catch (error) {
      setIsRegisteredId({ show: true, registered: false });
    }
  };

  useEffect(() => {
    const checker = {
      show: email.length > 0,
      format: EMAIL_REGEX.test(email),
    };

    setEmailChecker(checker);
  }, [email]);

  const onClickEmailSend = async () => {
    // initialize
    setEmailSended(false);
    setIsEmailMatchToId({ show: false, match: false });

    setEmailSended(true);
    // 타이머 리셋
    setTimerReset(true);
    setTimeout(() => setTimerReset(false), 100); // 타이머 리셋 상태를 빠르게 해제

    try {
      await axios.post(`${SERVER_URL}auth/find/mailSend`, {
        email: email,
        flag: true,
        userId: id,
      });

      setEmailSended(true);
    } catch (error) {
      if (error.response.data.error === "아이디와 이메일의 정보가 일치하지 않습니다.") {
        setIsEmailMatchToId({ show: true, match: false });
      } else {
        alert("이메일 전송에 실패했습니다.");
      }
      setEmailSended(false);
    }
  };

  const onClickConfirmButton = async () => {
    // 이메일 코드 확인 API 호출
    try {
      const response = await axios.post(`${SERVER_URL}auth/findPassword`, {
        email: email,
        authNum: emailCode,
        userId: id,
      });
      setReceivedAccessToken(response.data.accessToken);

      setEmailCodeChecker({ show: true, match: true });
    } catch (error) {
      setEmailCodeChecker({ show: true, match: false });
    }
  };

  if (resetPwPermitted) {
    return <ResetPW receivedAccessToken={receivedAccessToken} />;
  }

  return (
    <div className="section-find" id="input">
      <div id="input-field">
        <AuthInputField
          placeholder="아이디를 입력해주세요."
          value={id}
          onClick={() => {
            setIdChecker({ ...idChecker, show: true });
          }}
          onChange={(event) => {
            setIsRegisteredId({ show: false, registered: false });
            setId(event.target.value);
          }}
          onBlur={() => {
            checkIsRegisteredId();
            setIdChecker({ ...idChecker, show: false });
          }}
          checkerShowFlag={idChecker.show}
          checkerMessages={[
            { checkedFlag: idChecker.format, message: "영어와 숫자를 반드시 포함해야 해요." },
            { checkedFlag: idChecker.length, message: "5 ~ 10자만 가능해요." },
          ]}
          errorFlag={isRegisteredId.show && !isRegisteredId.registered}
          errorMessage="가입되지 않은 아이디입니다."
        />

        <div style={{ height: "30px" }}></div>

        <AuthSideBtnInputField
          placeholder="이메일을 입력해주세요."
          value={email}
          onClick={() => {
            setEmailChecker({ ...emailChecker, show: true });
          }}
          onChange={(event) => {
            setIsEmailMatchToId({ show: false, match: false });
            setEmail(event.target.value);
          }}
          onBlur={() => {
            setEmailChecker({ ...emailChecker, show: false });
          }}
          sideBtnTitle="인증"
          sideBtnOnClick={onClickEmailSend}
          sideBtnDisabled={!emailChecker.format}
          checkerShowFlag={emailChecker.show}
          checkerMessages={[
            { checkedFlag: emailChecker.format, message: "올바른 이메일 형식을 포함해야 해요." },
          ]}
          errorFlag={isEmailMatchToId.show && !isEmailMatchToId.match}
          errorMessage="등록된 이메일과 다릅니다."
        />

        {/* 메일 전송 메시지: 별도로 지정 */}
        <div className="f-dir-column" id="error-wrap">
          {emailSended && emailCode.length === 0 ? (
            <CheckerMessage checkedFlag={true} message="메일이 전송되었습니다." />
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
          errorMessageCustomFlag="true"
          sideBtnTitle="확인"
          sideBtnOnClick={onClickConfirmButton}
          sideBtnDisabled={!emailSended}
          timerStart={emailSended} // 이메일 발송 여부로 타이머 시작 제어
          timerStop={emailCodeChecker.match} // 인증번호 일치 여부 또는 이메일 중복 여부로 타이머 정지 제어
          timerReset={timerReset}
          setTimerValue={(value) => {
            if (value === 0) setEmailSended(false); // 타이머가 0이 되면 이메일 발송 상태 해제
          }}
        />

        <EmailCodeErrorMessages
          emailCodeChecker={emailCodeChecker}
          emailSended={emailSended}
          onClickEmailSend={onClickEmailSend}
        />

        <div style={{ height: "29px" }}></div>
        <BottomBtn
          onClick={() => {
            setResetPwPermitted(true);
          }}
          disabled={
            !(
              idChecker.format &&
              idChecker.length &&
              emailChecker.format &&
              isEmailMatchToId &&
              emailCodeChecker.match
            )
          }
        >
          비밀번호 재설정하기
        </BottomBtn>
      </div>
    </div>
  );
};

export default FindPW;
