import axios from "axios";
import Cookies from "js-cookie";

import SmallOnOffBtn from "../../../components/button/SmallOnOffBtn";

import { SERVER_URL } from "../../../constants/ServerURL";

import "./AccountDelete.css";

const AccountDelete = ({ setIsAccountSuccessfullyDeleted }) => {
  const onClickDeleteAccountConfirm = async () => {
    try {
      await axios.delete(`${SERVER_URL}profile/deleteUser`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      alert("계정이 성공적으로 삭제되었습니다.");
      setIsAccountSuccessfullyDeleted(true);
    } catch (error) {
      alert("회원 탈퇴 실패");
    }
  };

  return (
    <div className="account-delete">
      <p className="p-medium-regular" id="title">
        잠깐! 정말 떠나실 건가요...?
      </p>
      <div className="delete-wrap">
        <p className="p-small-bold" id="check">
          아래 내용을 확인해주세요.
        </p>
        <ul>
          <li>등록한 작품 및 구매한 작품에 대한 기록이 사라져요.</li>
          <li>프로필, 희망 대본 신청 내역이 모두 사라져요.</li>
          <li>구매 작품에 대한 문의사항 및 후기도 삭제돼요.</li>
        </ul>
      </div>
      <div className="j-content-end" id="btn-wrap">
        <SmallOnOffBtn text="계정 삭제하기" onClick={onClickDeleteAccountConfirm} color="grey" />
        <SmallOnOffBtn
          text="취소하기"
          onClick={() => {
            window.location.reload();
          }}
          color="purple"
        />
      </div>
    </div>
  );
};

export default AccountDelete;
