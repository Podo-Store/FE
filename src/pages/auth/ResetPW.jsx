import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BottomBtn } from "../../components/auth";
import AuthPwInputField from "../../components/inputField/AuthInputField/AuthPwInputField";
import AuthInputField from "../../components/inputField/AuthInputField/AuthInputField";
import InnerBox from "./../../components/auth/InnerBox.jsx";

import { SERVER_URL } from "../../constants/ServerURL";

import "./FindBar.css";

const ResetPW = (receivedAccessToken) => {
  // 결과 화면 요소
  const [newPw, setNewPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const [notResetAllow, setNotResetAllow] = useState(true);

  const [showNewPwErrorMsg, setShowNewPwErrorMsg] = useState(false);
  const [showPwCheckErrorMsg, setShowPwCheckErrorMsg] = useState(false);

  // 비밀번호 변경 완료
  const [resetPwCompleted, setResetPwCompleted] = useState(false);

  const navigate = useNavigate();

  // newPw
  useEffect(() => {
    if (newPw.length > 0) {
      setShowNewPwErrorMsg(true);
    } else {
      setShowNewPwErrorMsg(false);
    }

    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,11}$/;
    if (regex.test(newPw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }, [newPw]);

  // PW Check
  useEffect(() => {
    if (pwCheck.length > 0) {
      setShowPwCheckErrorMsg(true);
    } else {
      setShowPwCheckErrorMsg(false);
    }

    if (newPw === pwCheck) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  }, [newPw, pwCheck]);

  const onClickResetPwBtn = async () => {
    // 비밀번호 재설정 API 호출
    try {
      await axios.post(
        `${SERVER_URL}auth/resetPassword`,
        {
          password: newPw,
          confirmPassword: pwCheck,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${receivedAccessToken}`,
          },
        }
      );

      // 비밀번호 변경 완료 페이지
      setResetPwCompleted(true);
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  useEffect(() => {
    if (newPw.length > 0 && pwValid && pwCheck.length > 0 && pwCheckValid) {
      setNotResetAllow(false);
    } else {
      setNotResetAllow(true);
    }
  }, [newPw, pwValid, pwCheck, pwCheckValid]);

  return !resetPwCompleted ? (
    <div className="section-find">
      <AuthPwInputField
        title="비밀번호"
        placeholder="5~11자의 영문, 숫자, 특수문자 포함"
        value={newPw}
        onChange={(event) => {
          setNewPw(event.target.value);
        }}
        errorMessage="5~11자의 영문, 숫자, 특수문자를 포함해야 합니다."
        isValid={pwValid}
        showErrorMsg={showNewPwErrorMsg}
      />
      <AuthInputField
        title="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 한번 입력해주세요."
        value={pwCheck}
        onChange={(event) => {
          setPwCheck(event.target.value);
        }}
        errorMessage="비밀번호가 일치하지 않습니다."
        validMessage="비밀번호가 일치합니다."
        isValid={pwCheckValid}
        showErrorMsg={showPwCheckErrorMsg}
      />
      <div className="reset-pw-margin"></div>
      <BottomBtn onClick={onClickResetPwBtn} disabled={notResetAllow}>
        비밀번호 재설정하기
      </BottomBtn>
    </div>
  ) : (
    <div className="section-find">
      <InnerBox>
        <h2 id="complete">비밀번호가 변경되었습니다.</h2>
      </InnerBox>
      <div className="reset-pw-margin"></div>
      <BottomBtn onClick={() => navigate("/signin")}>로그인 하러 가기</BottomBtn>
    </div>
  );
};

export default ResetPW;
