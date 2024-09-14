import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { AuthInputField, AuthPwInputField } from "../../../components/inputField";
import EnterForm from "../../../components/EnterForm";
import PartialLoading from "../../../components/loading/PartialLoading";
import {
  PWErrorMessages,
  PWCheckErrorMessages,
  NameErrorMessages,
} from "../../../components/auth/signUp";
import SmallOnOffBtn from "../../../components/button/SmallOnOffBtn";

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

import "./AccountInfoChangeMain.css";

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

  useEffect(() => {
    const checker = {
      show: name.length > 0,
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

    // warning 메시지 무시할 것.
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
        <p id="limit">아이디와 이메일은 수정이 불가합니다.</p>
        <p id="limit">문의가 있으시면 포도상점 메일로 문의해주세요.</p>
        <div style={{ marginBottom: "4.722vh" }}></div>

        {/* 수정 페이지 */}
        <AuthInputField
          type="text"
          className="input"
          placeholder={id}
          errorMessageCustomFlag={true}
          readOnly={true}
        />

        <div id="margin"></div>

        <AuthInputField
          type="text"
          placeholder={email}
          readOnly={true}
          errorMessageCustomFlag={true}
        />

        <div id="margin"></div>

        <AuthPwInputField
          placeholder="비밀번호"
          value={pw}
          onClick={() => {
            setPwChecker({ ...pwChecker, show: true });
          }}
          onChange={(event) => {
            setPw(event.target.value);
          }}
          errorMessageCustomFlag={true}
        />

        <PWErrorMessages pwChecker={pwChecker} />

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
          errorMessageCustomFlag="true"
        />

        <PWCheckErrorMessages pwCheckChecker={pwCheckChecker} />

        <div id="margin"></div>

        <AuthInputField
          placeholder={prevName}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          errorMessageCustomFlag="true"
          onClick={() => {
            setNameChecker({ ...nameChecker, show: true });
            setHasClickedNameInputFlag(true);
          }}
          onBlur={() => {
            setHasClickedNameInputFlag(false);
            checkNameDuplicated(name);
          }}
        />

        <NameErrorMessages nameChecker={nameChecker} nameDuplicated={nameDuplicated} />

        <div className="j-content-end" id="btn-wrap">
          <SmallOnOffBtn
            text="취소"
            onClick={() => {
              window.location.reload();
            }}
            color="white"
          />
          <SmallOnOffBtn
            text="수정 완료"
            type="submit"
            onClick={onClickCompleteBtn}
            color="purple"
          />
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
