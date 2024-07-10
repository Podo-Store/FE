import "./SignIn.css";
import MainNav from "./MainNav";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSide from "../Components/auth/RightSide";
import Page from "../Components/auth/Page";
import InputField from "../Components/auth/InputField";
import BottomBtn from "../Components/auth/BottomBtn";

const User = {
  id: "test",
  pw: "123",
};

function SignIn() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [idPwMatchErrorMessage, setIdPwMatchErrorMessage] = useState(true);

  const [idPwNull, setIdPwNull] = useState(true);

  const handleId = (e) => {
    setId(e.target.value);
  };

  useEffect(() => {
    if (id === "" || pw === "") {
      setIdPwNull(true);
    } else {
      setIdPwNull(false);
    }
  }, [id, pw]);

  const handlePassword = (e) => {
    setPw(e.target.value);
  };

  const onClickConfirmButton = () => {
    if (id === User.id && pw === User.pw) {
      setIdPwMatchErrorMessage(true);
      // 로그인 완료 페이지로 이동 추가
    } else {
      setIdPwMatchErrorMessage(false);
    }
  };

  return (
    <div className="signIn">
      <MainNav />
      <div className="box">
        <div className="left-side"></div>
        <RightSide>
          <Page>
            <div>
              <div className="titleWrap">로그인 하려고요?</div>
              <div className="contentWrap">
                <InputField
                  title="아이디"
                  type="text"
                  placeholder="podostore"
                  value={id}
                  onChange={handleId}
                />
                <InputField
                  title="비밀번호"
                  type="password"
                  placeholder="Lovepodo_S2"
                  value={pw}
                  onChange={handlePassword}
                  errorMessage="아이디 / 비밀번호 오류"
                  isValid={idPwMatchErrorMessage}
                />
              </div>
              <div>
                <BottomBtn onClick={onClickConfirmButton} disabled={idPwNull}>
                  로그인
                </BottomBtn>
              </div>
              <div className="extraLink">
                <Link to="/signup">아이디/비밀번호 찾기</Link> | <Link to="/signup"> 회원가입</Link>
              </div>
            </div>
          </Page>
        </RightSide>
      </div>
    </div>
  );
}

export default SignIn;
