import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import MyPageMenu from "@/components/myPage/MyPageMenu";
import AccountDelete from "./AccountDelete";
import MainVer2 from "@/pages/MainVer2";

const AccountDeleteWrapper = () => {
  const { userNickname, logout } = useContext(AuthContext);
  const [isAccountSuccessfullyDeleted, setIsAccountSuccessfullyDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAccountSuccessfullyDeleted) {
      if (logout) {
        logout();
      }

      navigate("/", { replace: true });
      window.location.href = "/";
    }
  }, [isAccountSuccessfullyDeleted, logout, navigate]);
  return (
    <div className="myPage-contents-default account-info-change">
      <div className="myPage-contents-default-wrap account-info-change-wrap">
        <MyPageMenu nickname={userNickname} currentPage="2" />
        <div className="content-side">
          <div className="content-side-inside">
            {!isAccountSuccessfullyDeleted && (
              <AccountDelete setIsAccountSuccessfullyDeleted={setIsAccountSuccessfullyDeleted} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDeleteWrapper;
