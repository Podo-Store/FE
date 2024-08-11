import { useState } from "react";
import MyPageMenu from "../../components/myPage/MyPageMenu";
import Footer from "../Footer";
import MainNav from "../MainNav";
import InputField from "./../../components/auth/InputField.jsx";
import rightArrow from "./../../assets/image/myPage/rightArrow.svg";
import "./AccountInfoChange.css";

const AccountInfoChange = () => {
  const [typedPassword, setTypedPassword] = useState("");

  const handleTypedPassword = (event) => {
    setTypedPassword(event.target.value);
  };
  return (
    <div className="account-info-change">
      <MainNav />
      <div className="account-info-change-wrap">
        <MyPageMenu nickname="nickname" currentPage="2" />
        <div className="content-side">
          <h1>회원 정보 수정</h1>
          <h6>회원 정보 수정을 위해서 비밀번호를 다시 한번 입력해주세요.</h6>
          <div className="inputField-wrap">
            <InputField
              type="password"
              placeholder="비밀번호 입력"
              value={typedPassword}
              onChange={handleTypedPassword}
            ></InputField>
            {/* TODO: InsideBtn 대신 해당 컴포넌트 분리 및 사용 */}
            <button className="input-btn">입력</button>
          </div>
          <div className="unregister-btn">
            <p>회원 탈퇴</p>
            <img src={rightArrow}></img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountInfoChange;
