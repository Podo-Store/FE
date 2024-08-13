import InputField from "../../components/auth/InputField";
import InsideBtn from "../../components/auth/InsideBtn";
import BottomBtn from "../../components/auth/BottomBtn";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FindBar.css";
import axios from "axios";
import { SERVER_URL } from "../../constants/ServerURL";

const FindPW = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [receivedEmailCode, setReceivedEmailCode] = useState("");
  const [receivedAccessToken, setReceivedAccessToken] = useState("");

  const [idValid, setIdValid] = useState(false);

  // 인증하기, 확인 버튼이 클릭되지 않으면 에러 메시지를 띄우지 않음
  const [isSendIdBtnPressed, setIsSendIdBtnPressed] = useState(false);
  const [isSendEmailBtnPressed, setIsSendEmailBtnPressed] = useState(false);
  const [isEmailCodeConfirmBtnPressed, setIsEmailCodeConfirmBtnPressed] = useState(false);

  const [isNotRegisteredId, setIsNotRegisteredId] = useState(true);
  const [isNotRegisteredEmail, setIsNotRegisteredEmail] = useState(true);
  const [isEmailCodeCorrect, setIsEmailCodeCorrect] = useState(false);
  const [notAllFormWritten, setNotAllFormWritten] = useState(true);

  const [sendEmailBtnEnabled, setSendEmailBtnEnabled] = useState(false);
  const [sendEmailCodeConfirmBtnEnabled, setEmailCodeConfirmBtnEnabled] = useState(false);

  const navigate = useNavigate();
  const [showingPwPermitted, setShowingPwPermitted] = useState(false);

  // 결과 화면 요소
  const [newPw, setNewPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const [notResetAllow, setNotResetAllow] = useState(true);

  // id
  useEffect(() => {
    const regex = /^[a-zA-Z0-9]{5,10}$/;
    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  }, [id]);

  const onClickIdConfirmBtn = async () => {
    // 아이디 가입 여부 확인 API 호출, 조건문 사용
    try {
      const response = await axios.post(`${SERVER_URL}auth/checkUserId`, {
        userId: id,
        check: false,
      });
      if (response.data === true) {
        setIsNotRegisteredId(false);
      }
    } catch (error) {
      setIsNotRegisteredId(true);
    }
    setIsSendIdBtnPressed(true);
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

  const onClickSendEmailBtn = async () => {
    // 이메일 가입 여부 확인 API 호출, 조건문 사용
    alert("이메일 전송 중입니다. 잠시만 기다려주세요.");
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
      const response = await axios.post(`${SERVER_URL}auth/findPassword`, {
        userId: id,
        email: email,
        authNum: emailCode,
      });
      setReceivedAccessToken(response.data.accessToken);
      setIsEmailCodeCorrect(true);
    } catch (error) {
      console.log(error.response.data.error);
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
      setNotAllFormWritten(true);
    }
  }, [email, emailCode, isNotRegisteredEmail, isEmailCodeCorrect]);

  // 결과 페이지: Line 121 ~ Line 163

  // newPw
  useEffect(() => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,11}$/;
    if (regex.test(newPw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }, [newPw]);

  const handleNewPassword = (e) => {
    setNewPw(e.target.value);
  };

  // PW Check
  useEffect(() => {
    if (newPw === pwCheck) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  }, [newPw, pwCheck]);

  const handlePasswordCheck = (e) => {
    setPwCheck(e.target.value);
  };

  const onClickResetPwBtn = async () => {
    // 비밀번호 재설정 API 호출
    try {
      const response = await axios.post(
        `${SERVER_URL}auth/resetPassword`,
        {
          password: newPw,
          confirmPassword: pwCheck,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${receivedAccessToken}`,
          },
        }
      );
      alert("비밀번호가 재설정되었습니다.");
      navigate("/signin");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (newPw.length > 0 && pwValid && pwCheck.length > 0 && pwCheckValid) {
      setNotResetAllow(false);
    } else {
      setNotResetAllow(true);
    }
  }, [newPw, pwValid, pwCheck, pwCheckValid]);

  if (!showingPwPermitted)
    return (
      <div className="section-find" id="input">
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
          // TODO: showErrorMsg 반영
          showErrorMsg={true}
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
          // TODO: showErrorMsg 반영
          showErrorMsg={true}
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
          // TODO: showErrorMsg 반영
          showErrorMsg={true}
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

  return (
    <div className="section-find" id="input">
      <InputField
        title="새로운 비밀번호"
        type="password"
        placeholder="5~11자의 영문, 숫자, 특수문자 포함"
        value={newPw}
        onChange={handleNewPassword}
        errorMessage="5~11자의 영문, 숫자, 특수문자를 포함해야 합니다."
        isValid={pwValid}
        // TODO: showErrorMsg 반영
        showErrorMsg={true}
      />
      <InputField
        title="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 한번 입력해주세요."
        value={pwCheck}
        onChange={handlePasswordCheck}
        errorMessage="비밀번호가 일치하지 않습니다."
        validMessage="비밀번호가 일치합니다."
        isValid={pwCheckValid}
        // TODO: showErrorMsg 반영
        showErrorMsg={true}
      />
      <BottomBtn onClick={onClickResetPwBtn} disabled={notResetAllow}>
        비밀번호 재설정하기
      </BottomBtn>
    </div>
  );
};

export default FindPW;
