import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthSideBtnInputField from "../../components/inputField/auth/sideBtn/AuthSideBtnInputField.jsx";
import BottomBtn from "../../components/auth/BottomBtn";
import InnerBox from "./../../components/auth/InnerBox.jsx";

import { SERVER_URL } from "../../constants/ServerURL";

import "./FindBar.css";
import "./ErrorMessageWrap.css";

const FindID = () => {
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [receivedEmailCode, setReceivedEmailCode] = useState("");

  const [emailSended, setEmailSended] = useState(false);
  // 인증하기, 확인 버튼이 클릭되지 않으면 에러 메시지를 띄우지 않음
  const [isSendEmailBtnPressed, setIsSendEmailBtnPressed] = useState(false);
  const [isEmailCodeConfirmBtnPressed, setIsEmailCodeConfirmBtnPressed] = useState(false);

  const [isNotCorrectEmailFormat, setIsNotCorrectEmailFormat] = useState(false);
  const [isNotRegisteredEmail, setIsNotRegisteredEmail] = useState(false);
  const [idEmailNotMatch, setIdEmailNotMatch] = useState(false);

  const [isEmailCodeCorrect, setIsEmailCodeCorrect] = useState(false);
  const [notAllFormWritten, setNotAllFormWritten] = useState(true);

  const [sendEmailBtnEnabled, setSendEmailBtnEnabled] = useState(false);
  const [sendEmailCodeConfirmBtnEnabled, setEmailCodeConfirmBtnEnabled] = useState(false);

  const [showingIDPermitted, setShowingIDPermitted] = useState(false);

  const [foundId, setFoundId] = useState("");
  const [foundRegisteredDate, setFoundRegisteredDate] = useState("");

  const navigate = useNavigate();

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
    // initialize
    setIsNotCorrectEmailFormat(false);
    setIsNotRegisteredEmail(false);

    alert("이메일 전송 중입니다. 잠시만 기다려주세요.");
    try {
      const response = await axios.post(`${SERVER_URL}auth/find/mailSend`, {
        email: email,
        flag: false,
      });
      setReceivedEmailCode(response.data);

      setEmailSended(true);
      alert("이메일이 전송되었습니다.");
    } catch (error) {
      if (error.response.data === "이메일 유효성 검사 실패") {
        setIsNotCorrectEmailFormat(true);
      } else if (error.response.data === "사용자 정보 없음") {
        setIsNotRegisteredEmail(true);
      } else if (error.response.data === "아이디와 이메일의 정보가 일치하지 않습니다.") {
        setIdEmailNotMatch(true);
      }
    }
    // 인증하기 버튼 눌림 -> 에러 메시지 허용
    setIsSendEmailBtnPressed(true);
  };

  useEffect(() => {
    if (emailCode.length > 0) {
      setEmailCodeConfirmBtnEnabled(true);
    } else {
      setEmailCodeConfirmBtnEnabled(false);
    }
  }, [emailCode]);

  const onClickEmailCodeConfirmBtn = async () => {
    // 이메일 코드 확인 API 호출, 조건문 사용
    try {
      const response = await axios.post(`${SERVER_URL}auth/findUserId`, {
        email: email,
        authNum: emailCode,
      });
      setIsEmailCodeCorrect(true);

      setFoundId(response.data.data[0]);
      setFoundRegisteredDate(response.data.data[1]);
    } catch (error) {
      setIsEmailCodeCorrect(false);
    }
    // 확인 버튼 눌림 -> 에러 메시지 허용
    setIsEmailCodeConfirmBtnPressed(true);
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
        <AuthSideBtnInputField
          title="이메일"
          type="text"
          placeholder="podo@store.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          errorMessageCustomFlag={true}
          sideBtnTitle="인증"
          sideBtnOnClick={onClickSendEmailBtn}
          sideBtnDisabled={!sendEmailBtnEnabled}
        />

        <div className="error-message-wrap">
          {/* showErrorMsg가 true일 때만 렌더링, 없을 경우에도 공간 확보 */}
          {isSendEmailBtnPressed ? (
            isNotCorrectEmailFormat && email.length > 0 ? (
              <p>이메일 형식이 올바르지 않습니다.</p>
            ) : isNotRegisteredEmail && email.length > 0 ? (
              <p>가입되지 않은 이메일입니다.</p>
            ) : idEmailNotMatch && email.length > 0 ? (
              <p>아이디와 이메일의 정보가 일치하지 않습니다.</p>
            ) : emailSended ? (
              <p id="validMessage">메일을 보냈습니다.</p>
            ) : (
              <p> </p>
            )
          ) : (
            <p> </p>
          )}
        </div>

        <AuthSideBtnInputField
          title="인증번호 확인"
          type="text"
          placeholder="123456"
          value={emailCode}
          onChange={(e) => {
            setEmailCode(e.target.value);
          }}
          errorMessageCustomFlag={true}
          sideBtnTitle="확인"
          sideBtnOnClick={onClickEmailCodeConfirmBtn}
          sideBtnDisabled={!sendEmailCodeConfirmBtnEnabled}
        />
        <div className="error-message-wrap">
          {/* showErrorMsg가 true일 때만 렌더링, 없을 경우에도 공간 확보 */}
          {isEmailCodeConfirmBtnPressed ? (
            !isEmailCodeCorrect && emailCode.length > 0 ? (
              <p>인증 번호가 일치하지 않습니다.</p>
            ) : isEmailCodeCorrect && emailCode.length > 0 ? (
              <p id="validMessage">인증 번호가 일치합니다.</p>
            ) : null
          ) : (
            <p> </p>
          )}
          <p id="resend" onClick={onClickSendEmailBtn}>
            {emailSended ? "인증 번호 다시 보내기" : " "}
          </p>
        </div>

        <BottomBtn
          id="findID-btn"
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
      <h4 className="find-id-title">이메일과 일치하는 아이디입니다.</h4>
      <InnerBox>
        <div className="section-column">
          <p id="title">아이디</p>
          <p>{foundId}</p>
        </div>
        <div className="section-column">
          <p id="title">가입일</p>
          <p>{foundRegisteredDate}</p>
        </div>
      </InnerBox>
      <BottomBtn onClick={() => navigate("/signin")}>로그인 하러 가기</BottomBtn>
    </div>
  );
};

export default FindID;
