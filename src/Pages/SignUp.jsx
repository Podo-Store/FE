import "./SignUp.css";
import axios from "axios";
import MainNav from "./MainNav";
import InputField from "../Components/auth/InputField";
import BottomBtn from "../Components/auth/BottomBtn";
import Page from "../Components/auth/Page";
import RightSide from "../Components/auth/RightSide";
import Box from "../Components/auth/Box";
import InsideBtn from "../Components/auth/InsideBtn";

import { useEffect, useState, useCallback } from "react";
import { SERVER_URL } from "../Components/constants/ServerURL";
import { Link } from "react-router-dom";
import loading from "../assets/image/auth/loading.svg";
import check from "../assets/image/auth/check.svg";

const api = {
  emailCheck: "https://example.com/api/emailCheck",
};

// 테스트 데이터
const User = {
  email: "podo@store.com",
  pw: "password1234@",
  emailCode: "123456",
};

function SignUp() {
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

  const [emailsendbtn, setEmailSendBtn] = useState(true);

  const [idDuplicated, setCheckIdDuplicated] = useState(false);
  const [nameDuplicated, setCheckNameDuplicated] = useState(false);
  const [emailDuplicated, setCheckEmailDuplicated] = useState(false);
  const [emailSended, setCheckEmailSended] = useState(false);
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
    if (id.length > 0 && checkIdDuplicated(id)) {
      setCheckIdDuplicated(true);
    } else {
      setCheckIdDuplicated(false);
    }
  }, [id]);

  const checkIdDuplicated = async () => {
    // 아이디 중복 체크 API 연결, 조건문 사용
    try {
      const response = await axios.post(`${SERVER_URL}auth/checkUserId`, {
        userId: id,
        check: true,
      });
      if (response.data === true) {
        setCheckIdDuplicated(false);
      } else {
        if (response.data.error === "이미 존재하는 아이디") {
          setCheckIdDuplicated(true);
        }
      }
    } catch (error) {
      console.error("아이디 오류:", error);
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
    if (name.length > 0 && checkNameDuplicated(name)) {
      setCheckNameDuplicated(true);
    } else {
      setCheckNameDuplicated(false);
    }
  }, [name]);

  const checkNameDuplicated = (name) => {
    // 닉네임 중복 체크 API 연결, 조건문 사용
    setCheckNameDuplicated(false);
    return nameDuplicated;
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
    if (emailValid) {
      setEmailSendBtn(false);
      return;
    }
    setEmailSendBtn(true);
  }, [emailValid]);

  const emailSend = async () => {
    // 이메일 인증 코드 API 연결
    setCheckEmailSended(true); // -> 메일을 보냈습니다. 메세지 표출
    try {
      const response = await axios.post(`${SERVER_URL}//auth/mailSend`, {
        email: email,
        check: true,
      });
      // 응답이 숫자일 경우 (인증번호만 반환)
      if (!isNaN(response.data)) {
        setReceivedEmailCode(response.data);
        // 인증 번호 다시 보내기 활성화. 여기서는 Do nothing.
        // 인증 번호 입력 칸의 '확인' 버튼 활성화
        setEmailCodeConfirmBtnEnabled(true);
      } else {
        // 응답이 JSON 형식일 경우 (오류 메시지 처리)
        // 중복된 이메일일 경우
        if (response.data.error === "이메일 중복") {
          setCheckEmailDuplicated(true);
        }
      }
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  const handleEmailCode = (e) => {
    setEmailCode(e.target.value);
  };

  // 이메일 인증 확인 버튼
  const onClickConfirmButton = () => {
    if (email === User.email && emailCode === User.emailCode) {
      alert("이메일 인증 완료");
      setEmailCodeValid(true);
    } else {
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

  const onClickRegisterAllowButton = () => {
    if (idValid && pwValid && pwcheckValid && nameValid && emailValid && emailCodeValid) {
      alert("회원가입 성공");
    } else {
      alert("회원가입 실패");
    }
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
                />

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
                  <InsideBtn onClick={emailSend} disabled={emailsendbtn}>
                    인증하기
                  </InsideBtn>
                </div>

                <div className="errorMessageWrap">
                  {emailDuplicated && email.length > 0 ? (
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
                    {!pwValid && pw.length > 0 && <div>인증 번호가 일치하지 않습니다.</div>}
                  </div>
                  {emailSended ? (
                    <div className="errorMessageWrap" onClick={emailSend}>
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
