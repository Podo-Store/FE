import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import { Box } from "../../components/auth";
import { SignUp1, SignUp2, SignUp3, SignUp4 } from "../../components/auth/signUp";
import Loading from "../Loading";

import { SERVER_URL } from "../../constants/ServerURL";

import "./SignUpDefault.css";
import "../../components/auth/signUp/ErrorMessages/AuthErrorMessages.css";
import "../../styles/text.css";
import "../../styles/utilities.css";

const SignUpDefault = () => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    name: "",
    email: "",
    emailCode: "",
  });
  const [duplicatedStatus, setDuplicatedStatus] = useState({
    name: false,
  });

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 이전 단계
  const onPrevious = () => {
    setStep(step - 1);
  };
  // 다음 단계
  const onNext = () => {
    setStep(step + 1);
  };

  // 회원가입 완료 버튼 클릭 시
  const onClickRegisterAllowButton = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${SERVER_URL}auth/signup`, {
        userId: userInfo.id,
        email: userInfo.email,
        password: userInfo.pw,
        confirmPassword: userInfo.pwCheck,
        nickname: userInfo.name,
        authNum: userInfo.emailCode,
      });
      navigate("/signup/success");
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <MainNav />
      <div className="sign-up-default">
        <div style={{ height: "18.519vh" }}></div>
        <Box>
          <div style={{ width: "82.5%" }}>
            <h2 className="h2-medium t-align-center" id="title">
              회원가입
            </h2>
            {step === 1 && (
              <SignUp1 onNext={onNext} userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
            {step === 2 && (
              <SignUp2
                onPrevious={onPrevious}
                onNext={onNext}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            )}
            {step === 3 && (
              <SignUp3
                onPrevious={onPrevious}
                onNext={onNext}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                duplicatedStatus={duplicatedStatus}
                setDuplicatedStatus={setDuplicatedStatus}
              />
            )}
            {step === 4 && (
              <SignUp4
                onPrevious={onPrevious}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setIsLoading={setIsLoading}
                onClickRegisterAllowButton={onClickRegisterAllowButton}
              />
            )}
          </div>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpDefault;
