import axios from "axios";
import { useEffect, useState } from "react";

import { Selector, PreviousButton, NextPurpleButton, NextGreyButton } from ".";
import Form from "../Form";
import { AuthInputField } from "../../inputField";

import { NAME_FORMAT_REGEX, NAME_LENGTH_REGEX } from "../../../constants/regex";
import { SERVER_URL } from "../../../constants/ServerURL";

const SignUp3 = ({
  onPrevious,
  onNext,
  userInfo,
  setUserInfo,
  duplicatedStatus,
  setDuplicatedStatus,
}) => {
  const [name, setName] = useState(userInfo.name);
  const [nameChecker, setNameChecker] = useState({
    show: false,
    format: false,
    length: false,
  });
  const [nameDuplicated, setNameDuplicated] = useState(duplicatedStatus.name);

  // 중복 체크 저장 불가 버그 해결을 위한 flag
  const [hasClickedInputFlag, setHasClickedInputFlag] = useState(false);

  // enter 키 입력 시 중복 체크를 위한 flag: 중복 체크를 했는지 여부
  const [hasNameDuplicateChecked, setHasNameDuplicateChecked] = useState(false);

  useEffect(() => {
    /*
    const checker = {
      show: name.length > 0,
      format: NAME_FORMAT_REGEX.test(name),
      length: NAME_LENGTH_REGEX.test(name),
    };
    setNameChecker(checker);
    */
    setNameChecker((prevNameChecker) => ({
      ...prevNameChecker,
      format: NAME_FORMAT_REGEX.test(name),
      length: NAME_LENGTH_REGEX.test(name),
    }));
    // 길이가 0일 경우 format 체크를 해제
    if (name.length === 0) {
      setNameChecker({ ...nameChecker, format: false });
    }

    // name이 바뀔 때, 만약 '입력을 위해' 클릭이 된 상황일 경우 중복 체크를 해제
    if (hasClickedInputFlag) {
      setNameDuplicated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, hasClickedInputFlag]);

  const checkNameDuplicated = async (name) => {
    if (!nameChecker.format || !nameChecker.length) {
      return;
    }

    // initialize
    setHasNameDuplicateChecked(false);

    // 닉네임 중복 체크 API
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
    } finally {
      setHasNameDuplicateChecked(true);
    }
  };

  const saveNameStatus = () => {
    setDuplicatedStatus({ ...duplicatedStatus, name: nameDuplicated });
    setUserInfo({ ...userInfo, name: name });
  };

  const onClickNext = async () => {
    await checkNameDuplicated(name); // 중복 체크 실행

    if (hasNameDuplicateChecked && nameChecker.format && nameChecker.length && !nameDuplicated) {
      saveNameStatus();
      onNext();
    }
  };

  return (
    <Form onSubmit={onClickNext}>
      <Selector index={3} />

      <AuthInputField
        placeholder="닉네임을 입력해주세요."
        value={name}
        onClick={() => {
          setNameChecker({ ...nameChecker, show: true });
          setHasClickedInputFlag(true);
        }}
        onChange={(event) => {
          setHasNameDuplicateChecked(false);
          setName(event.target.value);
        }}
        onBlur={() => {
          setNameChecker({ ...nameChecker, show: false });
          setHasClickedInputFlag(false);
          checkNameDuplicated(name);
        }}
        checkerShowFlag={nameChecker.show}
        checkerMessages={[
          { checkedFlag: nameChecker.format, message: "한글, 영어, 숫자만 사용 가능해요." },
          { checkedFlag: nameChecker.length, message: "3 ~ 8자만 가능해요." },
        ]}
        errorFlag={nameDuplicated}
        errorMessage="중복된 닉네임입니다."
      />

      <div className="j-content-between">
        <PreviousButton
          onPrevious={() => {
            saveNameStatus();
            onPrevious();
          }}
        />
        {nameChecker.format && nameChecker.length && !nameDuplicated ? (
          <NextPurpleButton onNext={onClickNext} />
        ) : (
          <NextGreyButton />
        )}
      </div>
    </Form>
  );
};

export default SignUp3;
