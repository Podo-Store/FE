import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Loading from "../Loading";

import { BottomBtn, Box, RectangleForm } from "../../components/auth";
import { AuthInputField, AuthPwInputField } from "../../components/inputField";

import AuthContext from "../../contexts/AuthContext";

import { SERVER_URL } from "../../constants/ServerURL.js";

import bar from "../../assets/image/auth/bar.svg";

import "./SignIn.scss";
import "./../../styles/utilities.css";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import clsx from "clsx";

function SignIn() {
  const { login } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [isIdPwMatch, setIsIdPwMatch] = useState(true);

  const [idPwNull, setIdPwNull] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { isSmallMobile } = useWindowDimensions().widthConditions;

  const from = location.state?.from?.pathname || "/"; // 이전 페이지로 이동

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
        login(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.nickname
        );

        setIsIdPwMatch(true);
        navigate(from, { replace: true });
        navigate(-1); // 왠진 모르겠지만 해줘야 정상 작동함..
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
            <div
              className={clsx(
                "title t-center",
                !isSmallMobile ? "h2-medium" : "h5-medium"
              )}
            >
              로그인
            </div>
            <div className="contentWrap">
              <AuthInputField
                type="text"
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={(event) => {
                  setId(event.target.value);
                }}
                fontMode={isSmallMobile ? "12" : "default"}
                style={{
                  width: "100%",
                  ...(isSmallMobile ? { height: "48px" } : {}),
                }}
              />
              <AuthPwInputField
                placeholder="비밀번호를 입력해주세요."
                value={pw}
                onChange={(event) => {
                  setPw(event.target.value);
                }}
                fontMode={isSmallMobile ? "12" : "default"}
                style={{
                  width: "100%",
                  ...(isSmallMobile ? { height: "48px" } : {}),
                }}
                errorFlag={showErrorMsg && !isIdPwMatch}
                errorMessage="아이디 혹은 비밀번호가 일치하지 않습니다."
              />
            </div>

            <div style={{ height: "32px" }}></div>

            <div className="w-full">
              <BottomBtn
                type="submit"
                disabled={idPwNull}
                style={{ width: "100%" }}
              >
                로그인
              </BottomBtn>
            </div>
            <div className="extraLink">
              <div className="d-flex">
                <p
                  className={clsx(
                    "c-pointer",
                    !isSmallMobile ? "p-small-regular" : "p-xs-regular"
                  )}
                  onClick={() => {
                    navigate("/signin/find/0");
                  }}
                >
                  아이디/비밀번호 찾기
                </p>
              </div>
              <img src={bar} alt="|" />
              <p
                className={clsx(
                  "c-pointer",
                  !isSmallMobile ? "p-small-regular" : "p-xs-regular"
                )}
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
