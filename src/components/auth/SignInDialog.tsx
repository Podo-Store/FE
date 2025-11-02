import axios from "axios";
import clsx from "clsx";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Loading from "../../pages/Loading";

import { BottomBtn } from ".";
import { AuthInputField, AuthPwInputField } from "../inputField";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import AuthContext from "../../contexts/AuthContext";

import { SERVER_URL } from "../../constants/ServerURL.js";

import bar from "../../assets/image/auth/bar.svg";

import "./SignInDialog.scss";
import "./../../styles/utilities.css";
import { Dialog } from "@mui/material";
import googleBtn from "@/assets/image/auth/googleBtn.svg";
import kakaoBtn from "@/assets/image/auth/kakaoBtn.svg";
import naverBtn from "@/assets/image/auth/naverBtn.svg";

function SignInDialog() {
  const { login } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [isIdPwMatch, setIsIdPwMatch] = useState(true);

  const [idPwNull, setIdPwNull] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { isMobile, isSmallMobile } = useWindowDimensions().widthConditions;

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
      const { data } = await axios.post(`${SERVER_URL}auth/signin`, {
        userId: id,
        password: pw,
      });

      if (data.accessToken && data.refreshToken) {
        // accessToken을 쿠키에 저장 -> context 호출
        login(data.accessToken, data.refreshToken, data.nickname);

        setIsIdPwMatch(true);
        // 이전 페이지로 이동 (중복 네비게이션 제거)
        navigate(from, { replace: true });
      } else {
        setIsIdPwMatch(false);
      }
    } catch (error) {
      // AxiosError 안전 처리
      // @ts-ignore - 런타임 안전을 위해 옵셔널 체이닝 사용
      if (error?.response?.data?.error === "signin error") {
        alert("로그인 오류, 다시 시도해 주세요.");
      }
      setIsIdPwMatch(false);
    }
    setShowErrorMsg(true);
    setIsLoading(false);
  };

  const handleClose = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Dialog
      open
      onClose={handleClose}
      keepMounted
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 0,
            width: isMobile ? "450px" : isSmallMobile ? "280px" : "500px",
            borderRadius: "30px",
          },
        },
      }}
    >
      <form className="signin-dialog" onSubmit={onClickConfirmButton}>
        <div
          className={clsx(
            "title t-center",
            !isSmallMobile ? "h2-medium" : "h5-medium"
          )}
        >
          로그인
        </div>
        <div className="content-wrap">
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

        <div className="h-[32px]"></div>

        <div className="w-full">
          <BottomBtn
            type="submit"
            disabled={idPwNull}
            style={{ width: "100%" }}
          >
            로그인
          </BottomBtn>
        </div>

        <div className="mt-[25px] sm:mt-[30px] mb-[35px] sm:mb-[40px]">
          <div className="flex justify-between items-center">
            <hr className="w-[69px] sm:w-[31.884057971014492753623188405797%] border-[1.5px] border-[#BABABA]"></hr>
            <p className="p-xs-medium sm:p-small-medium c-grey5">다른 계정으로 로그인</p>
            <hr className="w-[69px] sm:w-[31.884057971014492753623188405797%] border-[1.5px] border-[#BABABA]"></hr>
          </div>

          <div className="flex justify-center items-center gap-[22.5px] sm:gap-[30px] mt-[25px] sm:mt-[30px]">
            <button className="size-[45px] sm:size-[60px] cursor-pointer">
              <img src={naverBtn} alt="naver" />  
            </button>
            <button className="size-[45px] sm:size-[60px] cursor-pointer">
              <img src={kakaoBtn} alt="kakao" />
            </button> 
            <button className="size-[45px] sm:size-[60px] cursor-pointer">
              <img src={googleBtn} alt="google" />
            </button>
          </div>
        </div>

        <div className="extra-link">
          <div className="flex">
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
          <img className="cursor-default" src={bar} alt="|" />
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
      </form>
    </Dialog>
  );
}

export default SignInDialog;
