import './SignIn.css';
import MainNav from './MainNav';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const User = {
  id: 'test',
  pw: '123',
};

function SignIn() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
  };

  const onClickConfirmButton = () => {
    if (id === User.id && pw === User.pw) {
      alert('로그인 성공');
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <div className="Signin">
      <MainNav />
      <div className="page">
        <div className="titleWrap">로그인</div>
        <div className="contentWrap">
          <div className="inputTitle">아이디</div>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder="podostore"
              value={id}
              onChange={handleId}
            />
          </div>

          <div style={{ marginTop: '26px' }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              type="password"
              className="input"
              placeholder="Lovepodo_S2"
              value={pw}
              onChange={handlePassword}
            />
          </div>
        </div>
        <div>
          <Link to="/signup">아이디/비밀번호 찾기</Link> |
          <Link to="/signup"> 회원가입</Link>
        </div>
        <div>
          <button onClick={onClickConfirmButton} className="bottomButton">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
