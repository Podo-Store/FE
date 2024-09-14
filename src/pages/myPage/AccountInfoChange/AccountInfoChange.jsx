import { useContext, useState } from "react";

import MainNav from "../../MainNav.jsx";
import Footer from "../../Footer.jsx";

import AccountInfoChangeEnter from "./AccountInfoChangeEnter.jsx";
import AccountInfoChangeMain from "./AccountInfoChangeMain.jsx";
import AccountDelete from "../AccountDelete/AccountDelete.jsx";
import AccountDeleteSuccess from "../AccountDelete/AccountDeleteSuccess.jsx";
import MyPageMenu from "../../../components/myPage/MyPageMenu.jsx";

import AuthContext from "../../../contexts/AuthContext.jsx";

import "./AccountInfoChange.css";
import "./../../../styles/utilities.css";

const AccountInfoChange = () => {
  // 회원 정보 수정 진입
  const [changeShowPermission, setChangeShowPermission] = useState(false);

  // 계정 삭제
  const [isDeleteAccountBtnClicked, setIsDeleteAccountBtnClicked] = useState(false);
  const [isAccountSuccessfullyDeleted, setIsAccountSuccessfullyDeleted] = useState(false);

  const { userNickname } = useContext(AuthContext);

  return (
    <div className="account-info-change">
      <MainNav />
      <div className="account-info-change-wrap">
        <MyPageMenu nickname={userNickname} currentPage="2" />
        <div className="content-side">
          <div className="content-side-inside">
            <h1>회원 정보 수정</h1>
            {!changeShowPermission ? (
              /* 회원 정보 수정 진입 페이지 */
              <AccountInfoChangeEnter setChangeShowPermission={setChangeShowPermission} />
            ) : isAccountSuccessfullyDeleted ? (
              /* 계정 삭제 완료 페이지 */
              <AccountDeleteSuccess />
            ) : isDeleteAccountBtnClicked ? (
              /* 계정 삭제 페이지 */
              <AccountDelete setIsAccountSuccessfullyDeleted={setIsAccountSuccessfullyDeleted} />
            ) : (
              // 회원 정보 수정 페이지
              <AccountInfoChangeMain setIsDeleteAccountBtnClicked={setIsDeleteAccountBtnClicked} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountInfoChange;
