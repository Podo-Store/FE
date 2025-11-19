import { api } from "@/api/api";

import SmallOnOffBtn from "../../../components/button/RoundBtn_135_40";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import "./AccountDelete.scss";

const AccountDelete = ({ setIsAccountSuccessfullyDeleted }) => {
  const { isSmallMobile, isMobile } = useWindowDimensions().widthConditions;
  const onClickDeleteAccountConfirm = async () => {
    try {
      await api.delete("/profile/deleteUser");
      alert("계정이 성공적으로 삭제되었습니다.");
      setIsAccountSuccessfullyDeleted(true);
    } catch (error) {
      alert("회원 탈퇴 실패");
    }
  };

  return (
    <div className="account-delete">
      <p className={`${isSmallMobile ? "p-medium-bold" : "h4-bold"}`}>
        계정 삭제
      </p>
      <p
        className={`${isSmallMobile ? "p-xs-regular" : "p-medium-regular"}`}
        id="title"
      >
        잠깐! 정말 떠나실 건가요...?
      </p>
      <div className="delete-wrap">
        <p className="p-small-bold" id="check">
          아래 내용을 확인해주세요.
        </p>
        <ul className={`${isSmallMobile ? "p-12-regular" : "p-small-regular"}`}>
          <li>• 등록한 작품 및 구매한 작품 기록이 모두 사라져요.</li>
          <li>• 작성한 후기와 활동 내역이 사라져요</li>
          <li>• 구매한 작품은 계정 삭제 후 이용 및 환불이 불가해요.</li>
        </ul>
      </div>
      <div className=" j-content-end" id="btn-wrap">
        <SmallOnOffBtn onClick={onClickDeleteAccountConfirm} color="grey">
          계정 삭제하기
        </SmallOnOffBtn>
        <SmallOnOffBtn
          onClick={() => {
            window.location.reload();
          }}
          color="purple"
        >
          취소하기
        </SmallOnOffBtn>
      </div>
    </div>
  );
};

export default AccountDelete;
