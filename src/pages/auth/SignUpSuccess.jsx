import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomBtn from "../../components/auth/BottomBtn";
import Box from "../../components/auth/Box";
import RectangleForm from "../../components/auth/RectangleForm";

import AuthContext from "@/contexts/AuthContext";

import signUpSuccess from "../../assets/image/auth/signUp/signUpSuccess.png";

import "./SignUpSuccess.scss";
import Loading from "../Loading";

function SignUpSuccess() {
  // 로딩: 기본 true 상태
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
    setIsLoading(false);
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="signUpSuccess">
      <div className="signUp-success-wrap">
        <Box>
          <RectangleForm>
            <h1>회원가입 완료</h1>
            <img src={signUpSuccess} alt="회원가입 완료" />
            <BottomBtn
              onClick={() => navigate("/signin")}
              style={{ width: "100%" }}
            >
              로그인하러 가기
            </BottomBtn>
          </RectangleForm>
        </Box>
      </div>
    </div>
  );
}

export default SignUpSuccess;
