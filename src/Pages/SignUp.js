import './SignUp.css';
import MainNav from './MainNav';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const api = {
  emailCheck: 'https://example.com/api/emailCheck',
};

const User = {
  email: 'test@naver.com',
  pw: 'qwer123@@@',
};

function SignUp() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwcheck, setPwCheck] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwcheckValid, setPwCheckValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);
  const [emailsendbtn, setEmailSendBtn] = useState(true);

  // 이메일 인증
  const [formValue, setFormValue] = useState({ email: '' });
  const [isGetCode, setIsGetCode] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const [count, setCount] = useState(0);

  // ID
  // 동기 방식으로 처리해야 실시간으로 체크 가능(useEffect)
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
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,11}$/;
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

  const emailsend = () => {};

  // 인증하기 버튼 활성화
  useEffect(() => {
    if (emailValid) {
      setEmailSendBtn(false);
      return;
    }
    setEmailSendBtn(true);
  }, [emailValid]);

  // 회원가입 버튼
  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.pw) {
      alert('회원가입 완료');
    } else {
      alert('회원가입 실패');
    }
  };

  // 회원가입 버튼 활성화
  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  return (
    <div className="Signin">
      <MainNav />
      <div className="page">
        <div className="titleWrap">회원가입</div>
        <div className="contentWrap">
          <div className="inputTitle">아이디</div>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder="5~10자의 영문 및 숫자"
              value={id}
              onChange={handleId}
            />
          </div>
          <div className="errorMessageWrap">
            {!idValid && id.length > 0 ? (
              <div>올바른 아이디를 입력해주세요.</div>
            ) : (
              idValid &&
              id.length > 0 && (
                <div className="NerrorMessageWrap">유효한 아이디입니다.</div>
              )
            )}
          </div>

          <div style={{ marginTop: '26px' }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              type="password"
              className="input"
              placeholder="영문, 숫자, 특수문자 포함 5~11자"
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
                <div className="NerrorMessageWrap">유효한 비밀번호 입니다.</div>
              )
            )}
          </div>

          <div style={{ marginTop: '26px' }} className="inputTitle">
            비밀번호 확인
          </div>
          <div className="inputWrap">
            <input
              type="password"
              className="input"
              placeholder="영문, 숫자, 특수문자 포함 5~11자"
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

          <div style={{ marginTop: '26px' }} className="inputTitle">
            닉네임
          </div>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder="한글, 영문, 숫자 3~8자"
              value={name}
              onChange={handleName}
            />
          </div>
          <div className="errorMessageWrap">
            {!nameValid && name.length > 0 ? (
              <div>8자 이하의 한글, 영문, 숫자만 사용 가능합니다.</div>
            ) : (
              nameValid &&
              name.length > 0 && (
                <div className="NerrorMessageWrap">
                  사용 가능한 닉네임 입니다.
                </div>
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
          </div>
          <div className="errorMessageWrap">
            {!emailValid && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )}
          </div>
          <button
            onClick={emailsend}
            disabled={emailsendbtn}
            className="bottomButton"
          >
            인증하기
          </button>

          <div style={{ marginTop: '26px' }} className="inputTitle">
            인증 번호 입력
          </div>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder="인증번호 6자리 입력"
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && (
              <div>인증번호가 일치 하지 않습니다.</div>
            )}
          </div>
          <button onClick={onClickConfirmButton} className="bottomButton">
            확인
          </button>
        </div>
        <div>
          <button
            onClick={onClickConfirmButton}
            disabled={notAllow}
            className="bottomButton"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
