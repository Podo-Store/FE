import { useContext, useState } from "react";
import AuthContext from "@/contexts/AuthContext";
import MyPageMenu from "@/components/myPage/MyPageMenu";
import AccountDelete from "./AccountDelete";
import AccountDeleteSuccess from "./AccountDeleteSuccess";

const AccountDeleteWrapper = () => {
  const { userNickname } = useContext(AuthContext);

  const [isAccountSuccessfullyDeleted, setIsAccountSuccessfullyDeleted] = useState(false);
  return (
    <div className="myPage-contents-default account-info-change">
      <div className="myPage-contents-default-wrap account-info-change-wrap">
        <MyPageMenu nickname={userNickname} currentPage="2" />
        <div className="content-side">
          <div className="content-side-inside">
            {!isAccountSuccessfullyDeleted ? (
              /* 계정 삭제 페이지 */
              <AccountDelete setIsAccountSuccessfullyDeleted={setIsAccountSuccessfullyDeleted} />
            ) : (
              /* 계정 삭제 완료 페이지 */
              <AccountDeleteSuccess />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDeleteWrapper;
