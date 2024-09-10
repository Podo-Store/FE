import axios from "axios";
import { useEffect, useState } from "react";

import { AuthInputField } from "../../inputField";
import {
  Selector,
  CheckerMessage,
  ErrorMessage,
  PreviousButton,
  NextPurpleButton,
  NextGreyButton,
} from ".";

import { NAME_FORMAT_REGEX, NAME_LENGTH_REGEX } from "../../../constants/regex";
import { SERVER_URL } from "../../../constants/ServerURL";
import Form from "../Form";

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
      // 기존 show가 true면 그대로 유지
      show: prevNameChecker.show || name.length > 0,
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
  }, [name, nameChecker, hasClickedInputFlag]);

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

  const saveNameStatus = () => {
    setDuplicatedStatus({ ...duplicatedStatus, name: nameDuplicated });
    setUserInfo({ ...userInfo, name: name });
  };

  return (
    <Form
      onSubmit={() => {
        if (nameChecker.format && nameChecker.length && !nameDuplicated) {
          saveNameStatus();
          onNext();
        }
      }}
    >
      <Selector index={3} />

      <AuthInputField
        placeholder="닉네임을 입력해주세요."
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        errorMessageCustomFlag="true"
        onClick={() => {
          setNameChecker({ ...nameChecker, show: true });
          setHasClickedInputFlag(true);
        }}
        onBlur={() => {
          setHasClickedInputFlag(false);
          checkNameDuplicated(name);
        }}
      />
      <div className="f-dir-column" id="error-wrap">
        {nameChecker.show ? (
          <div className="f-dir-column" id="error-wrap">
            <CheckerMessage
              checkedFlag={nameChecker.format}
              message="한글, 영어, 숫자만 사용 가능해요."
            />
            <CheckerMessage checkedFlag={nameChecker.length} message="3 ~ 8자만 가능해요." />
          </div>
        ) : null}
        {nameDuplicated ? <ErrorMessage message="중복된 닉네임입니다." /> : null}
      </div>

      <div className="j-content-between">
        <PreviousButton
          onPrevious={() => {
            saveNameStatus();
            onPrevious();
          }}
        />
        {nameChecker.format && nameChecker.length && !nameDuplicated ? (
          <NextPurpleButton
            onNext={() => {
              saveNameStatus();
              onNext();
            }}
          />
        ) : (
          <NextGreyButton />
        )}
      </div>
    </Form>
  );
};

export default SignUp3;
