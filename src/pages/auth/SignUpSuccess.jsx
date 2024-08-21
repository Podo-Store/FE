import "./SignUpSuccess.css";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Form from "../../components/auth/Form";
import BottomBtn from "../../components/auth/BottomBtn";
import Box from "../../components/auth/Box";

function SignUpSuccess() {
  const navigate = useNavigate();

  return (
    <div className="signUpSuccess">
      <MainNav />
      <div className="signUp-success-wrap">
        <Box>
          <Form>
            <h1>회원가입 완료</h1>
            <BottomBtn onClick={() => navigate("/")}>메인 페이지</BottomBtn>
          </Form>
        </Box>
      </div>
    </div>
  );
}

export default SignUpSuccess;
