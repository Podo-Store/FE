import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import BottomBtn from "../../components/auth/BottomBtn";
import InnerBox from "./../../components/auth/InnerBox.jsx";
import EmailCodeErrorMessages from "../../components/auth/signUp/ErrorMessages/EmailCodeErrorMessages.jsx";
import { CheckerMessage } from "../../components/auth/signUp/index.js";
import {
  AuthSideBtnInputField,
  AuthSideBtnTimerInputField,
} from "../../components/inputField";

import { EMAIL_REGEX } from "../../constants/regex";
import { SERVER_URL } from "../../constants/ServerURL";

import formatDate from "../../utils/formatDate.js";

import "./FindBar.scss";
import "./../../components/auth/signUp/ErrorMessages/AuthErrorMessages.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

const FindID = () => {
  const isAuthenticated = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [emailChecker, setEmailChecker] = useState({
    show: false,
    format: false,
  });
  const [emailSended, setEmailSended] = useState(false);
  const [isRegisteredEmail, setIsRegisteredEmail] = useState({
    show: false,
    registered: false,
  });

  const [emailCode, setEmailCode] = useState("");
  const [emailCodeChecker, setEmailCodeChecker] = useState({
    show: false,
    match: false,
  });

  const [timerReset, setTimerReset] = useState(false);

  const [showingIDPermitted, setShowingIDPermitted] = useState(false);

  // ID 찾기 완료
  const [foundId, setFoundId] = useState("");
  const [foundRegisteredDate, setFoundRegisteredDate] = useState("");
  const { isSmallMobile, isMobile } = useWindowDimensions().widthConditions;
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated.isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

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
    setIsRegisteredEmail({ show: false, registered: false });

    setEmailSended(true);
    // 타이머 리셋
    setTimerReset(true);
    setTimeout(() => setTimerReset(false), 100); // 타이머 리셋 상태를 빠르게 해제

    try {
      await axios.post(`${SERVER_URL}auth/find/mailSend`, {
        email: email,
        flag: false,
        userId: "",
      });

      setEmailSended(true);
    } catch (error) {
      if (error.response.data.error === "사용자 정보 없음") {
        setIsRegisteredEmail({ show: true, registered: false });
      } else {
        alert("이메일 전송에 실패했습니다.");
      }
      setEmailSended(false);
    }
  };
  const onClickConfirmButton = async () => {
    // 이메일 코드 확인 API 호출, 조건문 사용
    try {
      const response = await axios.post(`${SERVER_URL}auth/findUserId`, {
        email: email,
        authNum: emailCode,
      });
      setEmailCodeChecker({ show: true, match: true });

      setFoundId(response.data.userId);
      setFoundRegisteredDate(response.data.date);
    } catch (error) {
      setEmailCodeChecker({ show: true, match: false });
    }
  };

  if (!showingIDPermitted)
    return (
      <div className=" section-find" id="input">
        <div id="input-field" className="">
          <AuthSideBtnInputField
            placeholder="이메일을 입력해주세요."
            value={email}
            onClick={() => {
              setEmailChecker({ ...emailChecker, show: true });
            }}
            onChange={(event) => {
              setIsRegisteredEmail({ show: false, registered: false });
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
              {
                checkedFlag: emailChecker.format,
                message: "올바른 이메일 형식을 포함해야 해요.",
              },
            ]}
            errorFlag={isRegisteredEmail.show}
            errorMessage="가입되지 않은 이메일입니다."
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
              setShowingIDPermitted(true);
            }}
            disabled={
              !(
                emailChecker.format &&
                isRegisteredEmail &&
                emailCodeChecker.match
              )
            }
          >
            아이디 찾기
          </BottomBtn>
        </div>
      </div>
    );

  return (
    <div className="f-dir-column" id="founded">
      <p
        className={` t-align-center ${
          isSmallMobile ? "p-medium-medium" : "p-large-medium"
        }`}
      >
        이메일과 일치하는 아이디입니다.
      </p>
      <InnerBox>
        <div className="mx-auto w-fit">
          <div className=" section-column">
            <p className={` ${isSmallMobile ? "p-medium-bold" : "h5-bold"}`}>
              아이디
            </p>
            <p
              className={` ${
                isSmallMobile ? "p-medium-regular" : "h5-regular"
              }`}
            >
              {foundId}
            </p>
          </div>
          <div className="section-column">
            <p className={` ${isSmallMobile ? "p-medium-bold" : "h5-bold"}`}>
              가입일
            </p>
            <p
              className={` ${
                isSmallMobile ? "p-medium-regular" : "h5-regular"
              }`}
            >
              {formatDate(foundRegisteredDate)}
            </p>
          </div>
        </div>
      </InnerBox>
      <BottomBtn onClick={() => navigate("/signin")}>로그인하러 가기</BottomBtn>
    </div>
  );
};

export default FindID;
