import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../contexts/AuthContext";

import check from "../../../assets/image/myPage/check.svg";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import "./AccountDeleteSuccess.scss";

const AccountDeleteSuccess = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { isSmallMobile, isMobile } = useWindowDimensions().widthConditions;
  return (
    <div className="delete-complete">
      <p className={`${isSmallMobile ? "p-medium-bold" : "h4-bold"}`}>
        계정 삭제
      </p>
      <div className="delete-complete-wrap">
        <div
          className={`delete-complete-box ${
            isSmallMobile ? "p-12-regular" : "p-small-regular"
          }`}
        >
          <p>계정 삭제가 완료되었습니다.</p>
          <p>그동안 포도상점을 이용해주셔서 진심으로 감사합니다.</p>

          <p>더욱 성장하는 포도상점이 되겠습니다.</p>
        </div>
        <img src={check} alt="check"></img>
      </div>
      <button
        className={`main-page-btn p-large-bold`}
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        메인 페이지
      </button>
    </div>
  );
};

export default AccountDeleteSuccess;
