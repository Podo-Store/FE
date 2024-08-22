import "./SignUpSuccess.css";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import BottomBtn from "../../components/auth/BottomBtn";
import Box from "../../components/auth/Box";
import RectangleForm from "../../components/auth/RectangleForm";

function SignUpSuccess() {
  const navigate = useNavigate();

  return (
    <div className="signUpSuccess">
      <MainNav />
      <div className="signUp-success-wrap">
        <Box>
          <RectangleForm>
            <h1>회원가입 완료</h1>
            <BottomBtn onClick={() => navigate("/")}>메인 페이지</BottomBtn>
          </RectangleForm>
        </Box>
      </div>
    </div>
  );
}

export default SignUpSuccess;
