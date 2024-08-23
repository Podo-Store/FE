import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import { BottomBtn, Box, RectangleForm } from "../../components/auth";
import {
  AuthInputField,
  AuthPwInputField,
  AuthSideBtnInputField,
} from "../../components/inputField";

import { SERVER_URL } from "../../constants/ServerURL";
import { ID_REGEX, PW_REGEX, NAME_REGEX, EMAIL_REGEX } from "../../constants/regex";

import "./SignUp.css";
import "./ErrorMessageWrap.css";

function SignUp() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");

  const [receivedEmailCode, setReceivedEmailCode] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailCodeValid, setEmailCodeValid] = useState(false);

  const [emailSendBtn, setEmailSendBtn] = useState(false);

  const [idDuplicated, setIdDuplicated] = useState(false);
  const [nameDuplicated, setNameDuplicated] = useState(false);
  const [emailDuplicated, setEmailDuplicated] = useState(false);
  const [emailSended, setEmailSended] = useState(false);

  // showErrorMsg
  const [showIdErrorMsg, setShowIdErrorMsg] = useState(false);
  const [showPwErrorMsg, setShowPwErrorMsg] = useState(false);
  const [showPwCheckErrorMsg, setShowPwCheckErrorMsg] = useState(false);
  const [showNameErrorMsg, setShowNameErrorMsg] = useState(false);
  const [showEmailErrorMsg, setShowEmailErrorMsg] = useState(false);
  const [showEmailCodeErrorMsg, setShowEmailCodeErrorMsg] = useState(false);

  const [notRegisterAllow, setNotRegisterAllow] = useState(true);

  const [emailCodeConfirmBtnEnabled, setEmailCodeConfirmBtnEnabled] = useState(false);

  // ID
  useEffect(() => {
    if (id.length > 0) {
      setShowIdErrorMsg(true);
    } else {
      setShowIdErrorMsg(false);
    }

    if (ID_REGEX.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  }, [id]);

  const checkIdDuplicated = async (id) => {
    // 아이디 중복 체크 API 연결, 조건문 사용
    try {
      const response = await axios.post(`${SERVER_URL}auth/checkUserId`, {
        userId: id,
        check: true,
      });
      if (response.data === true) {
        setIdDuplicated(false);
      }
    } catch (error) {
      if (error.response.data.error === "이미 존재하는 아이디") {
        setIdDuplicated(true);
      }
    }
  };

  // PW
  useEffect(() => {
    if (pw.length > 0) {
      setShowPwErrorMsg(true);
    } else {
      setShowPwErrorMsg(false);
    }

    if (PW_REGEX.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }, [pw]);

  // PW Check
  useEffect(() => {
    if (pw === pwCheck) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }

    if (pwCheck.length > 0) {
      setShowPwCheckErrorMsg(true);
    } else {
      setShowPwCheckErrorMsg(false);
    }
  }, [pw, pwCheck]);

  // Name
  useEffect(() => {
    if (name.length > 0) {
      setShowNameErrorMsg(true);
    } else {
      setShowNameErrorMsg(false);
    }

    if (NAME_REGEX.test(name)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  }, [name]);

  const checkNameDuplicated = async () => {
    // 닉네임 중복 체크 API 연결
    try {
      const response = await axios.post(`${SERVER_URL}auth/checkNickname`, {
        nickname: name,
      });
      if (response.data === true) {
        setNameDuplicated(false);
      }
    } catch (error) {
      if (error.response.data.error === "닉네임 중복") {
        setNameDuplicated(true);
      } else {
        alert("오류가 발생했습니다.");
      }
    }
  };

  // Email
  useEffect(() => {
    if (email.length > 0) {
      setShowEmailErrorMsg(true);
    } else {
      setShowEmailErrorMsg(false);
    }

    if (EMAIL_REGEX.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  // (이메일) 인증하기 버튼 활성화
  useEffect(() => {
    if (emailValid && email.length > 0) {
      setEmailSendBtn(true);
    }
  }, [email, emailValid]);

  const onClickEmailSend = async () => {
    // 이메일 인증 코드 발송 API 연결
    try {
      const response = await axios.post(`${SERVER_URL}auth/mailSend`, {
        email: email,
        check: true,
      });
      // 응답이 숫자일 경우 (인증번호만 반환)

      setReceivedEmailCode(response.data);
      // 인증 번호 다시 보내기 활성화. 여기서는 Do nothing.
      // 인증 번호 입력 칸의 '확인' 버튼 활성화
      setEmailCodeConfirmBtnEnabled(true);
      setEmailDuplicated(false);

      setEmailSended(true);
    } catch (error) {
      if (error.response.data.error === "이메일 중복") {
        setEmailDuplicated(true);
      }
      setEmailSended(false);
      setEmailCodeConfirmBtnEnabled(false);
    }
  };

  // 이메일 인증 확인 버튼
  const onClickConfirmButton = async () => {
    setShowEmailCodeErrorMsg(true);
    try {
      await axios.post(`${SERVER_URL}auth/mailauthCheck`, {
        email: email,
        authNum: emailCode,
      });
      alert("이메일 인증 완료");
      setEmailCodeValid(true);
    } catch (error) {
      alert("이메일 인증 실패");
      setEmailCodeValid(false);
    }
  };

  // 회원가입 버튼 활성화
  useEffect(() => {
    if (emailValid && emailCodeValid) {
      setNotRegisterAllow(false);
    } else {
      setNotRegisterAllow(true);
    }
  }, [emailValid, emailCodeValid]);

  const onClickRegisterAllowButton = async () => {
    try {
      await axios.post(`${SERVER_URL}auth/signup`, {
        userId: id,
        email: email,
        password: pw,
        confirmPassword: pwCheck,
        nickname: name,
        authNum: emailCode,
      });
      alert("회원가입 성공");
      navigate("/signup/success");
    } catch (error) {
      alert("회원가입 실패");
    }
  };

  return (
    <div className="signUp">
      <MainNav />
      <div className="signUp-wrap">
        <Box>
          <RectangleForm>
            <h1 className="titleWrap">회원가입</h1>
            <div className="contentWrap">
              <AuthInputField
                title="아이디"
                type="text"
                placeholder="5~10자의 영문 및 숫자 포함"
                value={id}
                onChange={(event) => {
                  setId(event.target.value);
                  if (id.length > 0) {
                    setShowIdErrorMsg(true);
                  }
                }}
                errorMessage="5 ~ 10자의 영문 및 숫자를 포함해야 합니다."
                validMessage="사용 가능한 아이디입니다."
                isValid={idValid}
                isDuplicated={idDuplicated}
                showErrorMsg={showIdErrorMsg}
                onBlur={() => {
                  checkIdDuplicated(id);
                }}
              />

              <AuthPwInputField
                title="비밀번호"
                placeholder="5~11자의 영문, 숫자, 특수문자 포함"
                value={pw}
                onChange={(event) => {
                  setPw(event.target.value);
                }}
                errorMessage="5~11자의 영문, 숫자, 특수문자를 포함해야 합니다."
                validMessage="사용 가능한 비밀번호 입니다."
                isValid={pwValid}
                showErrorMsg={showPwErrorMsg}
              />

              <AuthInputField
                title="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 다시 한번 입력해주세요."
                value={pwCheck}
                onChange={(event) => {
                  setPwCheck(event.target.value);
                }}
                errorMessage="비밀번호가 일치하지 않습니다."
                validMessage="비밀번호가 일치합니다."
                isValid={pwCheckValid}
                showErrorMsg={showPwCheckErrorMsg}
              />

              <AuthInputField
                title="닉네임"
                type="text"
                placeholder="3~8자의 한글, 영문, 숫자 사용 가능"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                errorMessage="3~8자의 한글, 영문, 숫자만 사용 가능합니다."
                validMessage="사용 가능한 닉네임 입니다."
                isValid={nameValid}
                isDuplicated={nameDuplicated}
                showErrorMsg={showNameErrorMsg}
                onBlur={() => {
                  checkNameDuplicated(name);
                }}
              />

              <AuthSideBtnInputField
                title="이메일"
                type="text"
                placeholder="podo@store.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                errorMessageCustomFlag={true}
                sideBtnTitle="인증"
                sideBtnOnClick={onClickEmailSend}
                sideBtnDisabled={!emailSendBtn}
              />
              <div className="error-message-wrap">
                {/* showErrorMsg가 true일 때만 렌더링, 없을 경우에도 공간 확보 */}
                {showEmailErrorMsg ? (
                  !emailValid && email.length > 0 ? (
                    <p>이메일 형식이 올바르지 않습니다.</p>
                  ) : emailDuplicated && email.length > 0 ? (
                    <p>중복된 이메일입니다.</p>
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
                placeholder="인증번호 6자리 입력"
                value={emailCode}
                onChange={(event) => {
                  setEmailCode(event.target.value);
                }}
                errorMessageCustomFlag={true}
                sideBtnTitle="확인"
                sideBtnOnClick={onClickConfirmButton}
                sideBtnDisabled={!emailCodeConfirmBtnEnabled}
              />
              <div className="error-message-wrap">
                {/* showErrorMsg가 true일 때만 렌더링, 없을 경우에도 공간 확보 */}
                {showEmailCodeErrorMsg ? (
                  !emailCodeValid && emailCode.length > 0 ? (
                    <p>인증 번호가 일치하지 않습니다.</p>
                  ) : emailCodeValid && emailCode.length > 0 ? (
                    <p id="validMessage">인증 번호가 일치합니다.</p>
                  ) : null
                ) : (
                  <p> </p>
                )}
                <p id="resend" onClick={onClickEmailSend}>
                  {emailSended ? "인증 번호 다시 보내기" : " "}
                </p>
              </div>
            </div>
            <div className="bottom-btn-wrap">
              <BottomBtn onClick={onClickRegisterAllowButton} disabled={notRegisterAllow}>
                회원가입
              </BottomBtn>
            </div>
          </RectangleForm>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
