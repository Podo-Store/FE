import "./SignUp.css";
import axios from "axios";
import MainNav from "../MainNav";
import InputField from "../../components/auth/InputField";
import BottomBtn from "../../components/auth/BottomBtn";
import Page from "../../components/auth/Page";
import RightSide from "../../components/auth/RightSide";
import Box from "../../components/auth/Box";
import InsideBtn from "../../components/auth/InsideBtn";
import { useEffect, useState, useCallback } from "react";
import { SERVER_URL } from "../../components/constants/ServerURL";
import { Link, useNavigate } from "react-router-dom";
import loading from "../../assets/image/auth/loading.svg";
import check from "../../assets/image/auth/check.svg";

function SignUp() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwcheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");

  const [receivedEmailCode, setReceivedEmailCode] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwcheckValid, setPwCheckValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailCodeValid, setEmailCodeValid] = useState(false);

  const [emailSendBtn, setEmailSendBtn] = useState(false);

  const [idDuplicated, setIdDuplicated] = useState(false);
  const [nameDuplicated, setNameDuplicated] = useState(false);
  const [emailDuplicated, setEmailDuplicated] = useState(false);
  const [emailSended, setEmailSended] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [emailCodeConfirmBtnEnabled, setEmailCodeConfirmBtnEnabled] = useState(false);
  // 이메일 인증
  const [formValue, setFormValue] = useState({ email: "" });
  const [isGetCode, setIsGetCode] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [count, setCount] = useState(0);

  // ID
  useEffect(() => {
    const regex = /^[a-zA-Z0-9]{5,10}$/;
    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  }, [id]);

  const handleId = (e) => {
    setId(e.target.value);
  };

  // 아이디 중복 체크
  // 세부 주석은 emailSend 참고
  useEffect(() => {
    if (id.length > 0) {
      checkIdDuplicated(id);
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
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,11}$/;
    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }, [pw]);

  const handlePassword = (e) => {
    setPw(e.target.value);
  };

  // PW Check
  useEffect(() => {
    if (pw === pwcheck) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  }, [pw, pwcheck]);

  const PasswordCheck = (e) => {
    setPwCheck(e.target.value);
  };

  // Name
  useEffect(() => {
    const regex = /^[가-힣a-zA-Z0-9]{3,8}$/;
    if (regex.test(name)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  }, [name]);

  const handleName = (e) => {
    setName(e.target.value);
  };

  // 닉네임 중복 체크
  useEffect(() => {
    if (name.length > 0) {
      checkNameDuplicated(name);
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
      }
    }
  };

  // Email
  useEffect(() => {
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // (이메일) 인증하기 버튼 활성화
  useEffect(() => {
    if (emailValid && email.length > 0) {
      setEmailSendBtn(true);
    }
  }, [email]);

  const onClickEmailSend = async () => {
    setEmailSended(true); // -> 메일을 보냈습니다. 메세지 표출
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
    } catch (error) {
      if (error.response.data.error === "이메일 중복") {
        setEmailDuplicated(true);
      }
      setEmailSended(false);
      setEmailCodeConfirmBtnEnabled(false);
    }
  };

  const handleEmailCode = (e) => {
    setEmailCode(e.target.value);
  };

  // 이메일 인증 확인 버튼
  const onClickConfirmButton = async () => {
    alert("서버로부터의 응답을 기다리고 있습니다. 잠시만 기다려 주세요.");
    try {
      const response = await axios.post(`${SERVER_URL}auth/mailauthCheck`, {
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
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, emailCodeValid]);

  const onClickRegisterAllowButton = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}auth/signup`, {
        userId: id,
        email: email,
        password: pw,
        confirmPassword: pwcheck,
        nickname: name,
        authNum: emailCode,
      });
      alert("회원가입 성공");
      navigate("/signup/success");
    } catch (error) {
      alert("회원가입 실패");
    }

    /*
    if (idValid && pwValid && pwcheckValid && nameValid && emailValid && emailCodeValid) {
      alert("회원가입 성공");
      navigate("/signup/success");
    } else {
      alert("회원가입 실패");
    }
      */
  };

  return (
    <div className="signUp">
      <MainNav />
      <Box>
        <div className="left-side"></div>
        <RightSide>
          <Page>
            <div>
              <div className="titleWrap">
                <p>귀한 곳에</p>
                <p>이런 누추한 분이...</p>
              </div>
              <div className="contentWrap">
                <InputField
                  title="아이디"
                  type="text"
                  placeholder="5~10자의 영문 및 숫자 포함"
                  value={id}
                  onChange={handleId}
                  errorMessage="5 ~ 10자의 영문 및 숫자를 포함해야 합니다."
                  validMessage="사용 가능한 아이디입니다."
                  isValid={idValid}
                  isDuplicated={idDuplicated}
                  // TODO: showErrorMsg 반영
                  showErrorMsg={true}
                />

                <InputField
                  title="비밀번호"
                  type="password"
                  placeholder="5~11자의 영문, 숫자, 특수문자 포함"
                  value={pw}
                  onChange={handlePassword}
                  errorMessage="5~11자의 영문, 숫자, 특수문자를 포함해야 합니다."
                  validMessage="사용 가능한 비밀번호 입니다."
                  isValid={pwValid}
                  // TODO: showErrorMsg 반영
                  showErrorMsg={true}
                />

                <InputField
                  title="비밀번호 확인"
                  type="password"
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  value={pwcheck}
                  onChange={PasswordCheck}
                  errorMessage="비밀번호가 일치하지 않습니다."
                  validMessage="비밀번호가 일치합니다."
                  isValid={pwcheckValid}
                  // TODO: showErrorMsg 반영
                  showErrorMsg={true}
                />

                <InputField
                  title="닉네임"
                  type="text"
                  placeholder="3~8자의 한글, 영문, 숫자 사용 가능"
                  value={name}
                  onChange={handleName}
                  errorMessage="3~8자의 한글, 영문, 숫자만 사용 가능합니다."
                  validMessage="사용 가능한 닉네임 입니다."
                  isValid={nameValid}
                  isDuplicated={nameDuplicated}
                  // TODO: showErrorMsg 반영
                  showErrorMsg={true}
                />

                {/* TODO: component로 모듈화 */}
                {/* 예외 상황 존재, component 분리 X */}
                <div className="inputTitle">이메일</div>
                <div className="inputWrap">
                  <input
                    type="text"
                    className="input"
                    placeholder="podo@store.com"
                    value={email}
                    onChange={handleEmail}
                  />
                  <InsideBtn onClick={onClickEmailSend} disabled={!emailSendBtn}>
                    인증하기
                  </InsideBtn>
                </div>

                <div className="errorMessageWrap">
                  {!emailValid && email.length > 0 ? (
                    <div>이메일 형식이 올바르지 않습니다.</div>
                  ) : emailDuplicated && email.length > 0 ? (
                    <div>중복된 이메일입니다.</div>
                  ) : (
                    emailSended && <div className="NerrorMessageWrap">메일을 보냈습니다.</div>
                  )}
                </div>

                <div style={{ marginTop: "10px" }} className="inputTitle">
                  인증 번호 입력
                </div>
                <div className="inputWrap">
                  <input
                    type="text"
                    className="input"
                    placeholder="인증 번호 6자리 입력"
                    value={emailCode}
                    onChange={handleEmailCode}
                  />
                  <InsideBtn onClick={onClickConfirmButton} disabled={!emailCodeConfirmBtnEnabled}>
                    확인
                  </InsideBtn>
                </div>
                <div className="errorMessage_resend_Wrap">
                  <div className="errorMessageWrap">
                    {!emailCodeValid && emailCode.length > 0 && (
                      <div>인증 번호가 일치하지 않습니다.</div>
                    )}
                  </div>
                  {emailSended ? (
                    <div className="errorMessageWrap" onClick={onClickEmailSend}>
                      인증 번호 다시 보내기
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <BottomBtn onClick={onClickRegisterAllowButton} disabled={notAllow}>
                  회원가입
                </BottomBtn>
              </div>
            </div>
          </Page>
        </RightSide>
      </Box>
    </div>
  );
}

export default SignUp;
