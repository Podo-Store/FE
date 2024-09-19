import axios from "axios";
import { useEffect, useState } from "react";

import { AuthInputField } from "../../inputField";
import { Selector, CheckerMessage, ErrorMessage, NextGreyButton, NextPurpleButton } from ".";
import Form from "../Form";

import { ID_FORMAT_REGEX, ID_LENGTH_REGEX } from "../../../constants/regex";
import { SERVER_URL } from "../../../constants/ServerURL";

const SignUp1 = ({ onNext, userInfo, setUserInfo }) => {
  const [id, setId] = useState(userInfo.id);
  const [idChecker, setIdChecker] = useState({
    show: false,
    format: false,
    length: false,
  });
  const [idDuplicated, setIdDuplicated] = useState(false);

  useEffect(() => {
    /*
        // legacy code: id에 값이 있을 때만 오류 메시지 표시
      const newIdChecker = {
        show: id.length > 0,
        format: ID_FORMAT_REGEX.test(id),
        length: ID_LENGTH_REGEX.test(id),
      };
      setIdChecker(newIdChecker);
      */

    setIdChecker((prevIdChecker) => ({
      // 기존 show가 true면 그대로 유지
      show: prevIdChecker.show || id.length > 0,
      format: ID_FORMAT_REGEX.test(id),
      length: ID_LENGTH_REGEX.test(id),
    }));

    // 에러 메시지 초기화
    setIdDuplicated(false);
  }, [id]);

  const checkIdDuplicated = async (id) => {
    // 아이디 중복 체크 API 연결, 조건문 사용
    try {
      const response = await axios.post(`${SERVER_URL}auth/checkUserId`, {
        userId: id,
        check: true,
      });
      if (response.data === true) {
        setIdDuplicated(false);
      }
    } catch (error) {
      if (error.response.data.error === "이미 존재하는 아이디") {
        setIdDuplicated(true);
      }
    }
  };

  return (
    <Form
      onSubmit={() => {
        if (idChecker.format && idChecker.length && !idDuplicated) {
          setUserInfo({ ...userInfo, id: id });
          onNext();
        }
      }}
    >
      <Selector index={1} />
      <AuthInputField
        placeholder="아이디를 입력해주세요."
        value={id}
        onClick={() => {
          setIdChecker({ ...idChecker, show: true });
        }}
        onChange={(event) => {
          setId(event.target.value);
        }}
        errorMessageCustomFlag="true"
        onBlur={() => {
          checkIdDuplicated(id);
        }}
      />

      <div className="f-dir-column" id="error-wrap">
        {idChecker.show ? (
          <div className="f-dir-column" id="error-wrap">
            <CheckerMessage
              checkedFlag={idChecker.format}
              message="영어와 숫자를 반드시 포함해야 해요."
            />
            <CheckerMessage checkedFlag={idChecker.length} message="5 ~ 10자만 가능해요." />
          </div>
        ) : null}
        {idDuplicated ? <ErrorMessage message="중복된 아이디입니다." /> : null}
      </div>
      <div className="j-content-end">
        {idChecker.format && idChecker.length && !idDuplicated ? (
          <NextPurpleButton
            onNext={() => {
              setUserInfo({ ...userInfo, id: id });
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

export default SignUp1;
