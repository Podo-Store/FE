import { useNavigate } from "react-router-dom";

import BottomBtn from "../../components/auth/BottomBtn";
import Box from "../../components/auth/Box";
import RectangleForm from "../../components/auth/RectangleForm";

import signUpSuccess from "../../assets/image/auth/signUp/signUpSuccess.png";

import "./SignUpSuccess.css";

function SignUpSuccess() {
  const navigate = useNavigate();

  return (
    <div className="signUpSuccess">
      <div className="signUp-success-wrap">
        <Box>
          <RectangleForm>
            <h1>회원가입 완료</h1>
            <img src={signUpSuccess} alt="회원가입 완료" />
            <BottomBtn onClick={() => navigate("/signin")}>로그인하러 가기</BottomBtn>
          </RectangleForm>
        </Box>
      </div>
    </div>
  );
}

export default SignUpSuccess;
