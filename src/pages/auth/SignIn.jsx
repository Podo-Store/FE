import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../Loading";

import { BottomBtn, Box, RectangleForm } from "../../components/auth";
import { AuthInputField, AuthPwInputField } from "../../components/inputField";

import AuthContext from "../../contexts/AuthContext";

import { SERVER_URL } from "../../constants/ServerURL.js";

import bar from "../../assets/image/auth/bar.svg";

import "./SignIn.css";
import "./../../styles/utilities.css";

function SignIn() {
  const { login } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [isIdPwMatch, setIsIdPwMatch] = useState(true);

  const [idPwNull, setIdPwNull] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setShowErrorMsg(false);
    if (id === "" || pw === "") {
      setIdPwNull(true);
    } else {
      setIdPwNull(false);
    }
  }, [id, pw]);

  const onClickConfirmButton = async () => {
    // initialize
    setIsLoading(true);
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
      }
    } catch (error) {
      if (error.response.data.error === "signin error") {
        alert("로그인 오류, 다시 시도해 주세요.");
      }
      setIsIdPwMatch(false);
    }
    setShowErrorMsg(true);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="signIn">
      <div className="signIn-wrap">
        <Box>
          <RectangleForm onSubmit={onClickConfirmButton}>
            {/* Form 요소에 onSubmit을 사용 */}
            <div className="title h2-medium t-center">로그인</div>
            <div className="contentWrap">
              <AuthInputField
                type="text"
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={(event) => {
                  setId(event.target.value);
                }}
              />
              <AuthPwInputField
                placeholder="비밀번호를 입력해주세요."
                value={pw}
                onChange={(event) => {
                  setPw(event.target.value);
                }}
                errorFlag={showErrorMsg && !isIdPwMatch}
                errorMessage="아이디 혹은 비밀번호가 일치하지 않습니다."
              />
            </div>

            <div style={{ height: "32px" }}></div>

            <div>
              <BottomBtn type="submit" disabled={idPwNull}>
                로그인
              </BottomBtn>
            </div>
            <div className="extraLink">
              <div className="d-flex">
                <p
                  className="p-small-regular c-pointer"
                  onClick={() => {
                    navigate("/signin/find/0");
                  }}
                >
                  아이디
                </p>
                <p className="p-small-regular c-default">/</p>
                <p
                  className="p-small-regular c-pointer"
                  onClick={() => {
                    navigate("/signin/find/1");
                  }}
                >
                  비밀번호 찾기
                </p>
              </div>
              <img src={bar} alt="|" />
              <p
                className="p-small-regular c-pointer"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입
              </p>
            </div>
          </RectangleForm>
        </Box>
      </div>
    </div>
  );
}

export default SignIn;
