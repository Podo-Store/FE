import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BottomBtn, InnerBox } from "../../components/auth";
import { AuthPwInputField } from "../../components/inputField";

import {
  PW_ALPHABET_REGEX,
  PW_NUMBER_REGEX,
  PW_SPECIAL_REGEX,
  PW_LENGTH_REGEX,
} from "../../constants/regex";
import { SERVER_URL } from "../../constants/ServerURL";

import "./FindBar.css";

const ResetPW = ({ receivedAccessToken }) => {
  // 결과 화면 요소
  const [pw, setPw] = useState("");
  const [pwChecker, setPwChecker] = useState({
    show: false,
    alphabet: false,
    number: false,
    special: false,
    length: false,
  });
  const [pwCheck, setPwCheck] = useState("");
  const [pwCheckChecker, setPwCheckChecker] = useState({
    show: false,
    equal: false,
  });

  const [resetAllow, setResetAllow] = useState(true);

  // 비밀번호 변경 완료
  const [resetPwCompleted, setResetPwCompleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checker = {
      show: pw.length > 0,
      alphabet: PW_ALPHABET_REGEX.test(pw),
      number: PW_NUMBER_REGEX.test(pw),
      special: PW_SPECIAL_REGEX.test(pw),
      length: PW_LENGTH_REGEX.test(pw),
    };
    setPwChecker(checker);
  }, [pw]);

  useEffect(() => {
    const checker = {
      show: pwCheck.length > 0,
      equal: pw === pwCheck,
    };

    setPwCheckChecker(checker);
  }, [pw, pwCheck]);

  const onClickResetPwBtn = async () => {
    // 비밀번호 재설정 API 호출
    try {
      await axios.post(
        `${SERVER_URL}auth/resetPassword`,
        {
          password: pw,
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
    if (
      pwChecker.alphabet &&
      pwChecker.number &&
      pwChecker.special &&
      pwChecker.length &&
      pwCheckChecker.equal
    ) {
      setResetAllow(true);
    } else {
      setResetAllow(false);
    }
  }, [pwChecker, pwCheckChecker]);

  return !resetPwCompleted ? (
    <div className="section-find">
      <div id="input-field">
        <AuthPwInputField
          placeholder="새로운 비밀번호를 입력해주세요."
          value={pw}
          onClick={() => {
            setPwChecker({ ...pwChecker, show: true });
          }}
          onChange={(event) => {
            setPw(event.target.value);
          }}
          onBlur={() => {
            setPwChecker({ ...pwChecker, show: false });
          }}
          checkerShowFlag={pwChecker.show}
          checkerMessages={[
            {
              checkedFlag: pwChecker.alphabet,
              message: "영어 대, 소문자를 각 하나 이상 포함해야 해요.",
            },
            { checkedFlag: pwChecker.number, message: "숫자를 하나 이상 포함해야 해요." },
            {
              checkedFlag: pwChecker.special,
              message: "특수기호(@$!%*#?&)를 하나 이상 포함해야 해요.",
            },
            { checkedFlag: pwChecker.length, message: "5 ~ 11자만 가능해요." },
          ]}
        />
        <div style={{ height: "30px" }}></div>

        <AuthPwInputField
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          value={pwCheck}
          onChange={(event) => {
            setPwCheck(event.target.value);
            if (pw.length > 0) {
              setPwCheckChecker({ ...pwCheckChecker, show: true });
            }
          }}
          errorFlag={pwCheckChecker.show && !pwCheckChecker.equal}
          errorMessage="비밀번호가 일치하지 않습니다."
        />
        <div style={{ height: "5.556vh" }}></div>
        <BottomBtn onClick={onClickResetPwBtn} disabled={!resetAllow}>
          비밀번호 재설정하기
        </BottomBtn>
      </div>
    </div>
  ) : (
    <div className="section-find">
      <div className="f-dir-column" id="founded">
        <InnerBox>
          <h5 className="h5-regular t-align-center" id="complete">
            비밀번호가 변경되었습니다.
          </h5>
        </InnerBox>
        <BottomBtn onClick={() => navigate("/signin")}>로그인하러 가기</BottomBtn>
      </div>
    </div>
  );
};

export default ResetPW;
