import InputField from "../Components/auth/InputField";
import InsideBtn from "../Components/auth/InsideBtn";
import BottomBtn from "../Components/auth/BottomBtn";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FindBar.css";

const FindID = () => {
  const User = {
    email: "podo@store.com",
    emailCode: "123456",
  };

  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");

  // 인증하기, 확인 버튼이 클릭되지 않으면 에러 메시지를 띄우지 않음
  const [isSendEmailBtnPressed, setIsSendEmailBtnPressed] = useState(false);
  const [isEmailCodeConfirmBtnPressed, setIsEmailCodeConfirmBtnPressed] = useState(false);

  const [isNotRegisteredEmail, setIsNotRegisteredEmail] = useState(false);
  const [isEmailCodeCorrect, setIsEmailCodeCorrect] = useState(true);
  const [notAllFormWritten, setNotAllFormWritten] = useState(true);

  const [sendEmailBtnEnabled, setSendEmailBtnEnabled] = useState(false);
  const [sendEmailCodeConfirmBtnEnabled, setEmailCodeConfirmBtnEnabled] = useState(false);

  const navigate = useNavigate();
  const [showingIDPermitted, setShowingIDPermitted] = useState(false);

  const [foundId, setFoundId] = useState("");
  const [foundRegisteredDate, setFoundRegisteredDate] = useState("");

  useEffect(() => {
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(email)) {
      setSendEmailBtnEnabled(true);
    } else {
      setSendEmailBtnEnabled(false);
    }
  }, [email]);

  const onClickSendEmailBtn = () => {
    // 인증하기 버튼 눌림 -> 에러 메시지 허용
    setIsSendEmailBtnPressed(true);

    // 초기화: true (가입되지 않은 이메일)
    setIsNotRegisteredEmail(true);

    // 이메일 가입 여부 확인 API 호출, 조건문 사용
    if (email === User.email) {
      setIsNotRegisteredEmail(false);
    }
  };

  useEffect(() => {
    if (emailCode.length > 0) {
      setEmailCodeConfirmBtnEnabled(true);
    } else {
      setEmailCodeConfirmBtnEnabled(false);
    }
  }, [emailCode]);

  const onClickEmailCodeConfirmBtn = () => {
    // 확인 버튼 눌림 -> 에러 메시지 허용
    setIsEmailCodeConfirmBtnPressed(true);

    // 초기화: false
    setIsEmailCodeCorrect(false);

    // 이메일 코드 확인 API 호출, 조건문 사용
    if (email === User.email && emailCode === User.emailCode) {
      setIsEmailCodeCorrect(true);
    } else {
      setIsEmailCodeCorrect(false);
    }
  };

  // 모든 폼이 작성되고, 인증이 완료되면 버튼 활성화
  useEffect(() => {
    if (email.length > 0 && emailCode.length > 0 && !isNotRegisteredEmail && isEmailCodeCorrect) {
      setNotAllFormWritten(false);
    } else {
      setNotAllFormWritten(true); // 변경된 부분
    }
  }, [email, emailCode, isNotRegisteredEmail, isEmailCodeCorrect]);

  if (!showingIDPermitted)
    return (
      <div className="section-find" id="input">
        <InputField
          title="이메일"
          type="text"
          placeholder="podo@store.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          errorMessage="가입되지 않은 이메일입니다."
          // 가입되지 않은 이메일이면서 인증하기 버튼이 눌린 경우 에러 메시지 표시
          isValid={!(isNotRegisteredEmail && isSendEmailBtnPressed)}
          additionalElement={
            <InsideBtn onClick={onClickSendEmailBtn} disabled={!sendEmailBtnEnabled}>
              인증하기
            </InsideBtn>
          }
        />
        <InputField
          title="인증 번호"
          type="text"
          placeholder="123456"
          value={emailCode}
          onChange={(e) => {
            setEmailCode(e.target.value);
          }}
          errorMessage="인증번호가 일치하지 않습니다."
          isValid={!(!isEmailCodeCorrect && isEmailCodeConfirmBtnPressed)}
          additionalElement={
            <InsideBtn
              onClick={onClickEmailCodeConfirmBtn}
              disabled={!sendEmailCodeConfirmBtnEnabled}
            >
              확인
            </InsideBtn>
          }
          resendMessageCondition={isSendEmailBtnPressed && !isNotRegisteredEmail}
          resendMessage="인증 번호 다시 보내기"
          resendOnClick={onClickSendEmailBtn}
        />

        <BottomBtn
          onClick={() => {
            // 인증번호 일치 로직 검사: onClickEmailCodeConfirmBtn에서 이미 시행. 별도 시행 X
            setShowingIDPermitted(true);

            // 이메일에 맞는 아이디 찾기 API 호출
            setFoundId("podostore");
            setFoundRegisteredDate("2024.03.04");
          }}
          disabled={notAllFormWritten}
        >
          아이디 찾기
        </BottomBtn>
      </div>
    );

  return (
    <div className="section-find">
      <h4 className="find-id__title">이메일과 일치하는 아이디입니다.</h4>
      <div className="innerBox">
        <div className="section-column">
          <p>아이디 : {foundId}</p>
        </div>
        <div className="section-column">
          <p>가입날짜 : {foundRegisteredDate}</p>
        </div>
      </div>
      <BottomBtn onClick={() => navigate("/signin")}>로그인 하러 가기</BottomBtn>
    </div>
  );
};

export default FindID;
