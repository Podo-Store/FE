import "./SignUpSuccess.css";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import RightSide from "../../components/auth/RightSide";
import Page from "../../components/auth/Page";
import BottomBtn from "../../components/auth/BottomBtn";
import Box from "../../components/auth/Box";

function SignUpSuccess() {
  const navigate = useNavigate();

  return (
    <div className="signUpSuccess">
      <MainNav />
      <Box>
        <div className="left-side"></div>
        <RightSide>
          <Page>
            <div className="contentWrap">
              <h4>회원 가입 완료</h4>
              <div className="contentBox">
                <div className="textBlock">
                  <p>You're safe now.</p>
                  <p>당신은 이제 안전합니다.</p>
                </div>
                <div className="textBlock">
                  <p>From here, it's 'we'.</p>
                  <p>여기서부터는 이제 '우리'입니다.</p>
                </div>
              </div>
              <BottomBtn onClick={() => navigate("/")}>메인 페이지</BottomBtn>
            </div>
          </Page>
        </RightSide>
      </Box>
    </div>
  );
}

export default SignUpSuccess;
