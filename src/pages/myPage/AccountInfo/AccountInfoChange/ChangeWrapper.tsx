import { useContext, useState } from "react";
import { MyPageMenu } from "@/components/myPage";
import AuthContext from "@/contexts/AuthContext";
import ChangeNickname from "./ChangeNickname";
import ChangeEnter from "./ChangeEnter";
import ChangePassword from "./ChangePassword";

interface AccountInfoChangeWrapperProps {
  type: "nickname" | "password";
}

const AccountInfoChangeWrapper = ({ type }: AccountInfoChangeWrapperProps) => {
  const { userNickname } = useContext(AuthContext);

  const [changeShowPermission, setChangeShowPermission] = useState<boolean>(false);

  return (
    <div className="myPage-contents-default account-info-change">
      <div className="account-info-change-wrap">
        <MyPageMenu nickname={userNickname} currentPage="2" />
        <div className="content-side">
          <div className="content-side-inside">
            {type === "nickname" ? (
              <ChangeNickname />
            ) : !changeShowPermission ? (
              <ChangeEnter setChangeShowPermission={setChangeShowPermission} />
            ) : (
              <ChangePassword />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoChangeWrapper;
