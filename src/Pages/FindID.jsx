import InputField from "../Components/auth/InputField";
import InsideBtn from "../Components/auth/InsideBtn";
import BottomBtn from "../Components/auth/BottomBtn";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FindBar.css";
import axios from "axios";
import { SERVER_URL } from "../Components/constants/ServerURL";

const FindID = () => {
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [receivedEmailCode, setReceivedEmailCode] = useState("");

  // 인증하기, 확인 버튼이 클릭되지 않으면 에러 메시지를 띄우지 않음
  const [isSendEmailBtnPressed, setIsSendEmailBtnPressed] = useState(false);
  const [isEmailCodeConfirmBtnPressed, setIsEmailCodeConfirmBtnPressed] = useState(false);

  const [isNotRegisteredEmail, setIsNotRegisteredEmail] = useState(true);
  const [isEmailCodeCorrect, setIsEmailCodeCorrect] = useState(false);
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

  const onClickSendEmailBtn = async () => {
    // 인증하기 버튼 눌림 -> 에러 메시지 허용
    setIsSendEmailBtnPressed(true);

    // 이메일 가입 여부 확인 API 호출, 조건문 사용
    try {
      const response = await axios.post(`${SERVER_URL}auth/mailSend`, {
        email: email,
        check: false,
      });
      setReceivedEmailCode(response.data);

      alert("이메일이 전송되었습니다.");
      setIsNotRegisteredEmail(false);
    } catch (error) {
      alert("이메일 전송에 실패했습니다.");
      setIsNotRegisteredEmail(true);
    }
  };

  useEffect(() => {
    if (emailCode.length > 0) {
      setEmailCodeConfirmBtnEnabled(true);
    } else {
      setEmailCodeConfirmBtnEnabled(false);
    }
  }, [emailCode]);

  const onClickEmailCodeConfirmBtn = async () => {
    // 확인 버튼 눌림 -> 에러 메시지 허용
    setIsEmailCodeConfirmBtnPressed(true);

    // 이메일 코드 확인 API 호출, 조건문 사용
    try {
      const response = await axios.post(`${SERVER_URL}auth/findUserId`, {
        email: email,
        authNum: emailCode,
      });
      setIsEmailCodeCorrect(true);

      setFoundId(response.data[0]);
      setFoundRegisteredDate(response.data[1]);
    } catch (error) {
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
            setShowingIDPermitted(true);
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
