import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import {
  AuthInputField,
  AuthPwInputField,
} from "../../../components/inputField";
import EnterForm from "../../../components/EnterForm";
import PartialLoading from "../../../components/loading/PartialLoading";
import SmallOnOffBtn from "../../../components/button/RoundBtn_135_40";

import { useRequest } from "../../../hooks/useRequest";

import { SERVER_URL } from "../../../constants/ServerURL";
import {
  PW_ALPHABET_REGEX,
  PW_NUMBER_REGEX,
  PW_SPECIAL_REGEX,
  PW_LENGTH_REGEX,
  NAME_FORMAT_REGEX,
  NAME_LENGTH_REGEX,
} from "../../../constants/regex";

import "./ChangeMain.css";

const AccountInfoChangeMain = ({ setIsDeleteAccountBtnClicked }) => {
  // 회원 정보 수정
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

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

  // prevName: 수정 전 닉네임(placeholder)
  const [prevName, setPrevName] = useState("");
  const [name, setName] = useState("");
  const [nameChecker, setNameChecker] = useState({
    show: false,
    format: false,
    length: false,
  });
  const [nameDuplicated, setNameDuplicated] = useState(false);
  const [hasClickedNameInputFlag, setHasClickedNameInputFlag] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const checker = {
      ...nameChecker,
      format: NAME_FORMAT_REGEX.test(name),
      length: NAME_LENGTH_REGEX.test(name),
    };
    setNameChecker(checker);

    // 길이가 0일 경우 format 체크를 해제
    if (name.length === 0) {
      setNameChecker({ ...nameChecker, format: false });
    }

    // name이 바뀔 때, 만약 '입력을 위해' 클릭이 된 상황일 경우 중복 체크를 해제
    if (hasClickedNameInputFlag) {
      setNameDuplicated(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, hasClickedNameInputFlag]);

  useRequest(() => {
    const fetchAccountInfo = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${SERVER_URL}profile/account`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });
        setId(response.data.userId);
        setEmail(response.data.email);
        setPrevName(response.data.nickname);
      } catch (error) {
        alert("회원 정보 조회 실패");
      }
      setIsLoading(false);
    };

    fetchAccountInfo();
  });

  const checkNameDuplicated = async (name) => {
    // 닉네임 중복 체크 API 연결
    try {
      const response = await axios.post(`${SERVER_URL}auth/checkNickname`, {
        nickname: name,
      });
      if (response.data === true) {
        setNameDuplicated(false);
      }
    } catch (error) {
      if (error.response.data.error === "닉네임 중복") {
        setNameDuplicated(true);
      } else {
        alert("오류가 발생했습니다.");
      }
    }
  };

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

    if (name) {
      if (!nameChecker.format || !nameChecker.length) {
        return true;
      }
    }

    return false;
  };

  const onClickCompleteBtn = async () => {
    // 모든 필드가 공란일 경우
    if (!pw && !pwCheck && !name) {
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

    // 닉네임 입력 시, 유효성 검사
    if (name) {
      if (!nameChecker.format || !nameChecker.length) {
        alert("닉네임을 확인해주세요.");
        return;
      }
    }

    try {
      await axios.post(
        `${SERVER_URL}profile/update`,
        {
          password: pw || "",
          confirmPassword: pwCheck || "",
          nickname: name || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      alert("회원 정보 수정이 완료되었습니다.");
      // 닉네임 변경 사항 세션 반영
      localStorage.removeItem("userNickname");
      localStorage.setItem("userNickname", name || prevName);

      window.location.reload();
    } catch (error) {
      // 중복 닉네임 처리
      if (error.response.data.error === "이미 존재하는 닉네임") {
        setNameDuplicated(true);
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
        <h1>회원 정보 수정</h1>
        <p id="limit">아이디와 이메일은 수정이 불가합니다.</p>
        <p id="limit">문의가 있으시면 포도상점 메일로 문의해주세요.</p>
        <div style={{ marginBottom: "4.722vh" }}></div>

        {/* 수정 페이지 */}
        <AuthInputField
          type="text"
          className="input"
          placeholder={id}
          errorMessageCustomFlag={true}
          disabledMode={true}
        />

        <div id="margin"></div>

        <AuthInputField
          type="text"
          placeholder={email}
          readOnly={true}
          errorMessageCustomFlag={true}
          disabledMode={true}
        />

        <div id="margin"></div>

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

        <div id="margin"></div>

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

        <div id="margin"></div>

        <AuthInputField
          placeholder={prevName}
          value={name}
          onClick={() => {
            setNameChecker({ ...nameChecker, show: true });
            setHasClickedNameInputFlag(true);
          }}
          onChange={(event) => {
            setName(event.target.value);
          }}
          onBlur={() => {
            setNameChecker({ ...nameChecker, show: false });
            setHasClickedNameInputFlag(false);
            checkNameDuplicated(name);
          }}
          checkerShowFlag={nameChecker.show}
          checkerMessages={[
            {
              checkedFlag: nameChecker.format,
              message: "한글, 영어, 숫자만 사용 가능해요.",
            },
            { checkedFlag: nameChecker.length, message: "3 ~ 8자만 가능해요." },
          ]}
          errorFlag={nameDuplicated}
          errorMessage="중복된 닉네임입니다."
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

        <div className="j-content-end">
          <p
            className="p-small-under c-pointer"
            id="delete-account"
            onClick={() => {
              setIsDeleteAccountBtnClicked(true);
            }}
          >
            계정 삭제
          </p>
        </div>
      </div>
    </EnterForm>
  );
};

export default AccountInfoChangeMain;
