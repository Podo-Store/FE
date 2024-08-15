import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import { InputField, BottomBtn, Box, Page, RightSide } from "../../components/auth";
import { SERVER_URL } from "../../constants/ServerURL";
import AuthContext from "../../contexts/AuthContext";
import "./SignIn.css";

function SignIn() {
  const { login } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [isIdPwMatch, setIsIdPwMatch] = useState(true);

  const [idPwNull, setIdPwNull] = useState(true);

  const navigate = useNavigate();

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

  const onClickConfirmButton = async () => {
    // initialize
    setIsIdPwMatch(false);
    try {
      const response = await axios.post(`${SERVER_URL}auth/signin`, {
        userId: id,
        password: pw,
      });

      if (response.data.accessToken && response.data.refreshToken) {
        // accessToken을 쿠키에 저장 -> context 호출
        login(response.data.accessToken, response.data.refreshToken, response.data.nickname);

        setIsIdPwMatch(true);
        navigate("/");
      } else {
        setIsIdPwMatch(false);
        setShowErrorMsg(true);
      }
    } catch (error) {
      if (error.response.data.error === "signin error") {
        alert("로그인 오류, 다시 시도해 주세요.");
      } else {
      }
      setIsIdPwMatch(false);
      setShowErrorMsg(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onClickConfirmButton();
    }
  };

  return (
    <div className="signIn">
      <MainNav />
      <Box>
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
                  onKeyPress={handleKeyPress}
                />
                <InputField
                  title="비밀번호"
                  type="password"
                  placeholder="Lovepodo_S2"
                  value={pw}
                  onChange={handlePassword}
                  onKeyPress={handleKeyPress}
                  errorMessage="아이디 / 비밀번호 오류"
                  isValid={isIdPwMatch}
                  showErrorMsg={showErrorMsg}
                />
              </div>
              <div>
                <BottomBtn onClick={onClickConfirmButton} disabled={idPwNull}>
                  로그인
                </BottomBtn>
              </div>
              <div className="extraLink">
                <Link to="/signin/find">아이디/비밀번호 찾기</Link> |{" "}
                <Link to="/signup"> 회원가입</Link>
              </div>
            </div>
          </Page>
        </RightSide>
      </Box>
    </div>
  );
}

export default SignIn;
