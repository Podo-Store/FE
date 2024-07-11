import InputField from "../Components/auth/InputField";
import InsideBtn from "../Components/auth/InsideBtn";
import BottomBtn from "../Components/auth/BottomBtn";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FindBar.css";

const FindId = () => {
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");

  // 인증하기, 확인 버튼이 클릭되지 않으면 에러 메시지를 띄우지 않음
  const [isSendEmailBtnPressed, setIsSendEmailBtnPressed] = useState(false);
  const [isEmailCodeConfirmBtnPressed, setIsEmailCodeConfirmBtnPressed] = useState(false);

  const [isRegisteredEmail, setIsRegisteredEmail] = useState(true);
  const [isEmailCodeCorrect, setIsEmailCodeCorrect] = useState(true);
  const [notAllFormWritten, setNotAllFormWritten] = useState(true);

  const [sendEmailBtnEnabled, setSendEmailBtnEnabled] = useState(false);
  const [sendEmailCodeConfirmBtnEnabled, setEmailCodeConfirmBtnEnabled] = useState(false);

  const navigate = useNavigate();
  const [showingIDPermitted, setShowingIDPermitted] = useState(false);

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

    // 초기화: false
    setIsRegisteredEmail(false);

    // 이메일 가입 여부 확인 API 호출, 조건문 사용
    setIsRegisteredEmail(true);
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
    setIsEmailCodeCorrect(true);
  };

  // 모든 폼이 작성되고, 인증이 완료되면 버튼 활성화
  useEffect(() => {
    if (email.length > 0 && emailCode.length > 0 && isRegisteredEmail && isEmailCodeCorrect) {
      setNotAllFormWritten(false);
    } else {
      setNotAllFormWritten(true); // 변경된 부분
    }
  }, [email, emailCode, isRegisteredEmail, isEmailCodeCorrect]);

  if (!showingIDPermitted)
    return (
      <div className="section-find">
        <InputField
          title="이메일"
          type="text"
          placeholder="podo@store.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          errorMessage="가입되지 않은 이메일입니다."
          isValid={isRegisteredEmail && !isSendEmailBtnPressed}
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
          isValid={isEmailCodeCorrect && !isEmailCodeConfirmBtnPressed}
          additionalElement={
            <InsideBtn
              onClick={onClickEmailCodeConfirmBtn}
              disabled={!sendEmailCodeConfirmBtnEnabled}
            >
              확인
            </InsideBtn>
          }
        />

        <BottomBtn
          onClick={() => {
            // 인증번호 일치 로직 검사: onClickEmailCodeConfirmBtn에서 이미 시행
            setShowingIDPermitted(true);
          }}
          disabled={notAllFormWritten}
        >
          아이디 찾기
        </BottomBtn>
      </div>
    );
  /*
  return (
    <div className="section-find">
      <h4 className="find-id__title">가입하신 아이디는 다음과 같습니다</h4>
      <div className="section-column">
        <p>아이디</p>
        <p>qwer1234</p>
      </div>
      <div className="section-column">
        <p>가입날짜</p>
        <p>2024.03.04</p>
      </div>
      <Button size="large" onClick={() => navigate("/login")}>
        로그인 하러 가기
      </Button>
    </div>
  );
  */
};

export default FindId;
