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

  const handleKeyDown = (event) => {
    if (!idPwNull && event.key === "Enter") {
      // form 기본 기능 막기
      event.preventDefault();
      onClickConfirmButton();
    }
  };

  // Enter키 적용
  // 컴포넌트가 마운트될 때 document에 이벤트 리스너 추가
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [id, pw, handleKeyDown]); // id와 pw가 변경될 때마다 리스너가 다시 설정됨

  return (
    <div className="signIn">
      <MainNav />
      <Box>
        <div className="left-side"></div>
        <RightSide>
          <Page>
            <form onKeyDown={handleKeyDown}>
              {" "}
              {/* Form 요소로 감싸 enter키 로직 사용*/}
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
            </form>
          </Page>
        </RightSide>
      </Box>
    </div>
  );
}

export default SignIn;
