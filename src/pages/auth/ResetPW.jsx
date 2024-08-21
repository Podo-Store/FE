import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BottomBtn, InputField } from "../../components/auth";

import { SERVER_URL } from "../../constants/ServerURL";

import "./FindBar.css";

const ResetPW = (receivedAccessToken) => {
  // 결과 화면 요소
  const [newPw, setNewPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const [notResetAllow, setNotResetAllow] = useState(true);

  const navigate = useNavigate();

  // newPw
  useEffect(() => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,11}$/;
    if (regex.test(newPw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }, [newPw]);

  const handleNewPassword = (e) => {
    setNewPw(e.target.value);
  };

  // PW Check
  useEffect(() => {
    if (newPw === pwCheck) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  }, [newPw, pwCheck]);

  const handlePasswordCheck = (e) => {
    setPwCheck(e.target.value);
  };

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
      alert("비밀번호가 재설정되었습니다.");
      navigate("/signin");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (newPw.length > 0 && pwValid && pwCheck.length > 0 && pwCheckValid) {
      setNotResetAllow(false);
    } else {
      setNotResetAllow(true);
    }
  }, [newPw, pwValid, pwCheck, pwCheckValid]);

  return (
    <div className="section-find" id="input">
      <InputField
        title="새로운 비밀번호"
        type="password"
        placeholder="5~11자의 영문, 숫자, 특수문자 포함"
        value={newPw}
        onChange={handleNewPassword}
        errorMessage="5~11자의 영문, 숫자, 특수문자를 포함해야 합니다."
        isValid={pwValid}
        // TODO: showErrorMsg 반영
        showErrorMsg={true}
      />
      <InputField
        title="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 한번 입력해주세요."
        value={pwCheck}
        onChange={handlePasswordCheck}
        errorMessage="비밀번호가 일치하지 않습니다."
        validMessage="비밀번호가 일치합니다."
        isValid={pwCheckValid}
        // TODO: showErrorMsg 반영
        showErrorMsg={true}
      />
      <BottomBtn onClick={onClickResetPwBtn} disabled={notResetAllow}>
        비밀번호 재설정하기
      </BottomBtn>
    </div>
  );
};

export default ResetPW;
