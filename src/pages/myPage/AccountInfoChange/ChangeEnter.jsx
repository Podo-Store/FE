import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

import { AuthPwInputField } from "../../../components/inputField";
import EnterForm from "../../../components/EnterForm";

import { SERVER_URL } from "../../../constants/ServerURL";

import "./ChangeEnter.css";
import "./../../../styles/text.css";

const AccountInfoChangeEnter = ({ setChangeShowPermission }) => {
  const [typedPassword, setTypedPassword] = useState("");
  const [pwValid, setPwValid] = useState(false);
  const [showPwValid, setShowPwValid] = useState(false);

  const onClickInputBtn = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}profile/confirm`,
        {
          password: typedPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      if (response.data === true) {
        setPwValid(true);
        setChangeShowPermission(true);
      }
    } catch (error) {
      if (error.response.data.error === "비밀번호 불일치") {
        setShowPwValid(true);
        setPwValid(false);
      } else {
        alert("오류가 발생했습니다.");
      }
    }
  };

  return (
    <EnterForm onSubmit={onClickInputBtn}>
      <div className="info-change-enter">
        {/* 진입 페이지 */}
        <h1>회원 정보 수정</h1>
        <h6>회원 정보 수정을 위해서 비밀번호를 다시 한 번 입력해주세요.</h6>
        <div className="a-items-center" id="enter-input">
          <AuthPwInputField
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={typedPassword}
            onChange={(event) => {
              setShowPwValid(false);
              setTypedPassword(event.target.value);
            }}
            errorFlag={showPwValid && !pwValid}
            errorMessage="비밀번호가 일치하지 않습니다."
          ></AuthPwInputField>
          <button
            className="p-small-bold c-white t-align-center c-pointer"
            onClick={onClickInputBtn}
          >
            입력
          </button>
        </div>
      </div>
    </EnterForm>
  );
};

export default AccountInfoChangeEnter;
