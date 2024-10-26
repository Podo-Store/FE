import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import BottomBtn from "../../components/auth/BottomBtn";
import Box from "../../components/auth/Box";
import RectangleForm from "../../components/auth/RectangleForm";

import "./SignUpSuccess.css";

function SignUpSuccess() {
  const navigate = useNavigate();

  return (
    <div className="signUpSuccess">
      <MainNav />
      <div className="signUp-success-wrap">
        <Box>
          <RectangleForm>
            <h1>회원가입 완료</h1>
            <BottomBtn onClick={() => navigate("/signin")}>로그인하러 가기</BottomBtn>
          </RectangleForm>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpSuccess;
