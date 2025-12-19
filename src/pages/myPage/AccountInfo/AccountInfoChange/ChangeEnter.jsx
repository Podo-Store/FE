import { api } from "@/api/api";
import React, { useState } from "react";

import { AuthPwInputField } from "@/components/inputField";
import EnterForm from "@/components/EnterForm";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import "./ChangeEnter.scss";
import "@/styles/text.css";

/**
 * 비밀번호 변경 페이지 진입 페이지
 * @param {Dispatch<SetStateAction<boolean>>} setChangeShowPermission - 비밀번호 변경 페이지 진입 페이지 설정 함수
 */
const AccountInfoChangeEnter = ({ setChangeShowPermission }) => {
  const [typedPassword, setTypedPassword] = useState("");
  const [pwValid, setPwValid] = useState(false);
  const [showPwValid, setShowPwValid] = useState(false);

  const {
    widthConditions: { isMobile, isSmallMobile },
  } = useWindowDimensions();

  const onClickInputBtn = async () => {
    try {
      const response = await api.post(`/profile/confirm`, {
        password: typedPassword,
      });
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
        <h4 className={`${isSmallMobile ? "p-medium-bold" : "h4-bold"}`}>비밀번호 변경</h4>
        <h6 className={`${isSmallMobile ? "p-xs-medium" : "p-medium-medium"}`}>
          비밀번호 변경을 위해서 현재 비밀번호를 다시 한 번 입력해주세요.
        </h6>
        <div className={` a-items-start ${isSmallMobile ? "w-[280px]" : ""}`} id="enter-input">
          <AuthPwInputField
            placeholder="비밀번호를 입력해주세요."
            value={typedPassword}
            onChange={(event) => {
              setShowPwValid(false);
              setTypedPassword(event.target.value);
            }}
            errorFlag={showPwValid && !pwValid}
            errorMessage="비밀번호가 일치하지 않습니다."
            style={
              isMobile
                ? { width: "332px" }
                : isSmallMobile
                ? { width: "224px", height: "48px" }
                : { width: "414px" }
            }
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
