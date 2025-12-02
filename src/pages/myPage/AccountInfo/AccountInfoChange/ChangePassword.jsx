import { api } from "@/api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthPwInputField } from "@/components/inputField";
import EnterForm from "@/components/EnterForm";
import PartialLoading from "@/components/loading/PartialLoading";
import SmallOnOffBtn from "@/components/button/RoundBtn_135_40";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {
  PW_ALPHABET_REGEX,
  PW_NUMBER_REGEX,
  PW_SPECIAL_REGEX,
  PW_LENGTH_REGEX,
} from "@/constants/regex";

import "./ChangePassword.scss";

const AccountInfoChangePassword = () => {
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

  const [isLoading, setIsLoading] = useState(false);
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  const navigate = useNavigate();

  useEffect(() => {
    const checker = {
      ...pwChecker,
      alphabet: PW_ALPHABET_REGEX.test(pw),
      number: PW_NUMBER_REGEX.test(pw),
      special: PW_SPECIAL_REGEX.test(pw),
      length: PW_LENGTH_REGEX.test(pw),
    };
    setPwChecker(checker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pw]);

  useEffect(() => {
    const checker = {
      ...pwCheckChecker,
      equal: pw === pwCheck,
    };
    setPwCheckChecker(checker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pw, pwCheck]);

  const onChangeDisableCondition = () => {
    // 비밀번호 필드들이 공란일 경우 disabled
    if (!pw && !pwCheck) {
      return true;
    }

    if (pw || pwCheck) {
      if (
        !pwChecker.alphabet ||
        !pwChecker.number ||
        !pwChecker.special ||
        !pwChecker.length ||
        !pwCheckChecker.equal
      ) {
        return true;
      }
    }
    return false;
  };

  const onClickCompleteBtn = async () => {
    // 모든 필드가 공란일 경우
    if (!pw && !pwCheck) {
      window.location.reload();
      return;
    }

    // 비밀번호만 입력된 경우
    if (pw && !pwCheck) {
      alert("비밀번호 확인란을 입력해주세요.");
      return;
    }

    // 비밀번호 확인만 입력된 경우
    if (!pw && pwCheck) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // 비밀번호 입력 시, 유효성 검사
    if (pw || pwCheck) {
      if (
        !pwChecker.alphabet ||
        !pwChecker.number ||
        !pwChecker.special ||
        !pwChecker.length ||
        !pwCheckChecker.equal
      ) {
        alert("비밀번호를 확인해주세요.");
        return;
      }
    }

    try {
      await api.patch("/profile/updatePassword", {
        password: pw || "",
        confirmPassword: pwCheck || "",
      });

      alert("회원 정보 수정이 완료되었습니다.");
      navigate("/mypage/info");
    } catch (error) {
      if (error.response.data.error === "비밀번호 변경 실패") {
        alert("비밀번호 변경 실패");
      } else {
        alert(error.response.data.error);
      }
    }
  };

  if (isLoading) {
    return <PartialLoading />;
  }

  return (
    <EnterForm onSubmit={onClickCompleteBtn}>
      <div className="info-change-main">
        <div className="flex flex-col gap-[10px] sm:gap-[45px] mb-[20px] sm:mb-[36px]">
          <p className="p-medium-bold sm:h4-bold">비밀번호 변경</p>
          <p className="p-medium-medium">새로운 비밀번호를 입력해주세요.</p>
        </div>

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
            {
              checkedFlag: pwChecker.number,
              message: "숫자를 하나 이상 포함해야 해요.",
            },
            {
              checkedFlag: pwChecker.special,
              message: "특수기호(@$!%*#?&)를 하나 이상 포함해야 해요.",
            },
            { checkedFlag: pwChecker.length, message: "5 ~ 11자만 가능해요." },
          ]}
        />

        <div className="h-[20px] sm:h-[30px]"></div>

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

        <div className="j-content-end" id="btn-wrap">
          <SmallOnOffBtn
            onClick={() => {
              window.location.reload();
            }}
            color="white"
          >
            취소
          </SmallOnOffBtn>
          <SmallOnOffBtn
            type="submit"
            disabled={onChangeDisableCondition()}
            onClick={onClickCompleteBtn}
            color="purple"
          >
            수정 완료
          </SmallOnOffBtn>
        </div>
      </div>
    </EnterForm>
  );
};

export default AccountInfoChangePassword;
