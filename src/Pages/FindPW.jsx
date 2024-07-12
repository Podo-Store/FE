import InputField from "../Components/auth/InputField";
import InsideBtn from "../Components/auth/InsideBtn";
import BottomBtn from "../Components/auth/BottomBtn";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FindBar.css";

const FindPW = () => {
  const User = {
    id: "podostore",
    email: "podo@store.com",
    emailCode: "123456",
  };

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");

  const [idValid, setIdValid] = useState(false);

  // 인증하기, 확인 버튼이 클릭되지 않으면 에러 메시지를 띄우지 않음
  const [isSendIdBtnPressed, setIsSendIdBtnPressed] = useState(false);
  const [isSendEmailBtnPressed, setIsSendEmailBtnPressed] = useState(false);
  const [isEmailCodeConfirmBtnPressed, setIsEmailCodeConfirmBtnPressed] = useState(false);

  const [isNotRegisteredId, setIsNotRegisteredId] = useState(true);
  const [isNotRegisteredEmail, setIsNotRegisteredEmail] = useState(false);
  const [isEmailCodeCorrect, setIsEmailCodeCorrect] = useState(true);
  const [notAllFormWritten, setNotAllFormWritten] = useState(true);

  const [sendEmailBtnEnabled, setSendEmailBtnEnabled] = useState(false);
  const [sendEmailCodeConfirmBtnEnabled, setEmailCodeConfirmBtnEnabled] = useState(false);

  const navigate = useNavigate();
  const [showingPwPermitted, setShowingPwPermitted] = useState(false);

  // id
  useEffect(() => {
    const regex = /^[a-zA-Z0-9]{5,10}$/;
    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  }, [id]);

  const onClickIdConfirmBtn = () => {
    setIsSendIdBtnPressed(true);
    // 아이디 가입 여부 확인 API 호출, 조건문 사용
    if (id === User.id) {
      setIsNotRegisteredId(false);
    } else {
      setIsNotRegisteredId(true);
    }
  };

  // email
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

  if (!showingPwPermitted)
    return (
      <div className="section-find">
        <InputField
          title="아이디"
          type="text"
          placeholder="podostore"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          errorMessage={
            // 아이디 형식에 맞지 않을 경우
            idValid === false && id.length > 0
              ? "5 ~ 10자의 영문 및 숫자를 포함해야 합니다."
              : // 가입되지 않은 아이디일 경우
              isNotRegisteredId === true && id.length > 0
              ? "가입되지 않은 아이디입니다."
              : ""
          }
          isValid={
            idValid === false || (isNotRegisteredId === true && isSendIdBtnPressed === true)
              ? false
              : true
          }
          additionalElement={
            <InsideBtn onClick={onClickIdConfirmBtn} disabled={!idValid}>
              확인
            </InsideBtn>
          }
        />
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
            // 인증번호 일치 로직 검사: onClickEmailCodeConfirmBtn에서 이미 시행
            setShowingPwPermitted(true);
          }}
          disabled={notAllFormWritten}
        >
          비밀번호 재설정하기
        </BottomBtn>
      </div>
    );
};

export default FindPW;
