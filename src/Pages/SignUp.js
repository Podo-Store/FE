import "./SignUp.css";
import MainNav from "./MainNav";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

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

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwcheckValid, setPwCheckValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailCodeValid, setEmailCodeValid] = useState(false);

  const [emailsendbtn, setEmailSendBtn] = useState(true);

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

  const emailSend = () => {
    // 만약 중복된 이메일일 경우, "중복된 이메일입니다." 메세지 표출
    if (checkEmailDuplicated(email) == true) {
      // 중복된 이메일입니다. 메세지 표출만 시행. 여기서는 Do nothing.
    } else {
      // 이메일 인증 코드 API 연결
      setCheckEmailSended(true); // -> 메일을 보냈습니다. 메세지 표출
      // 인증 번호 다시 보내기 활성화. 여기서는 Do nothing.
      // 인증 번호 입력 칸의 '확인' 버튼 활성화
      setEmailCodeConfirmBtnEnabled(true);
    }
  };

  const checkEmailDuplicated = (email) => {
    // 이메일 중복 체크 API 연결, 조건문 사용
    setCheckEmailDuplicated(false);
    return emailDuplicated;
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
      <div className="box">
        <div className="page">
          <div className="titleWrap">
            <p>귀한 곳에</p>
            <p>이런 누추한 분이...</p>
          </div>
          <div className="contentWrap">
            <div className="inputTitle">아이디</div>
            <div className="inputWrap">
              <input
                type="text"
                className="input"
                placeholder="5~10자의 영문 및 숫자 포함"
                value={id}
                onChange={handleId}
              />
            </div>
            <div className="errorMessageWrap">
              {/* <div>중복된 아이디입니다.</div> 수정 필요 */}
              {!idValid && id.length > 0 ? (
                <div>5 ~ 10자의 영문 및 숫자를 포함해야 합니다.</div>
              ) : (
                idValid &&
                id.length > 0 && <div className="NerrorMessageWrap">사용 가능한 아이디입니다.</div>
              )}
            </div>

            <div style={{ marginTop: "10px" }} className="inputTitle">
              비밀번호
            </div>
            <div className="inputWrap">
              <input
                type="password"
                className="input"
                placeholder=" 5~11자의 영문, 숫자, 특수문자 포함"
                value={pw}
                onChange={handlePassword}
              />
            </div>
            <div className="errorMessageWrap">
              {!pwValid && pw.length > 0 ? (
                <div>5~11자의 영문, 숫자, 특수문자를 포함해야 합니다.</div>
              ) : (
                pwValid &&
                pw.length > 0 && (
                  <div className="NerrorMessageWrap">사용 가능한 비밀번호 입니다.</div>
                )
              )}
            </div>

            <div style={{ marginTop: "10px" }} className="inputTitle">
              비밀번호 확인
            </div>
            <div className="inputWrap">
              <input
                type="password"
                className="input"
                placeholder="비밀번호를 다시 한번 입력해주세요."
                value={pwcheck}
                onChange={PasswordCheck}
              />
            </div>
            <div className="errorMessageWrap">
              {!pwcheckValid && pwcheck.length > 0 ? (
                <div>비밀번호가 일치하지 않습니다.</div>
              ) : (
                pwcheckValid &&
                pwcheck.length > 0 && (
                  <div className="NerrorMessageWrap">비밀번호가 일치합니다.</div>
                )
              )}
            </div>

            <div style={{ marginTop: "10px" }} className="inputTitle">
              닉네임
            </div>
            <div className="inputWrap">
              <input
                type="text"
                className="input"
                placeholder="3~8자의 한글, 영문, 숫자 사용 가능"
                value={name}
                onChange={handleName}
              />
            </div>
            <div className="errorMessageWrap">
              {!nameValid && name.length > 0 ? (
                <div>3~8자의 한글, 영문, 숫자만 사용 가능합니다.</div>
              ) : emailDuplicated && name.length > 0 ? (
                <div>중복된 닉네임입니다.</div>
              ) : (
                nameValid &&
                name.length > 0 && (
                  <div className="NerrorMessageWrap">사용 가능한 닉네임 입니다.</div>
                )
              )}
            </div>

            <div className="inputTitle">이메일</div>
            <div className="inputWrap">
              <input
                type="text"
                className="input"
                placeholder="podo@store.com"
                value={email}
                onChange={handleEmail}
              />
              <button onClick={emailSend} disabled={emailsendbtn} className="insideButton">
                인증하기
              </button>
            </div>

            <div className="errorMessageWrap">
              {!pwcheckValid && pwcheck.length > 0 ? (
                <div>비밀번호가 일치하지 않습니다.</div>
              ) : (
                pwcheckValid &&
                pwcheck.length > 0 && (
                  <div className="NerrorMessageWrap">비밀번호가 일치합니다.</div>
                )
              )}
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
              <button
                onClick={onClickConfirmButton}
                disabled={!emailCodeConfirmBtnEnabled}
                className="insideButton"
              >
                확인
              </button>
            </div>
            <div className="errorMessage_resend_Wrap">
              <div className="errorMessageWrap">
                {!pwValid && pw.length > 0 && <div>인증 번호가 일치하지 않습니다.</div>}
              </div>
              {emailSended ? <div className="errorMessageWrap">인증 번호 다시 보내기</div> : null}
            </div>
          </div>
          <div>
            <button
              onClick={onClickRegisterAllowButton}
              disabled={notAllow}
              className="bottomButton"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
