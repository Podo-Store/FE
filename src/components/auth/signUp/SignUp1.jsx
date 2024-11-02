import axios from "axios";
import { useEffect, useState } from "react";

import { Selector, NextGreyButton, NextPurpleButton } from ".";
import Form from "../Form";
import { AuthInputField } from "../../inputField";

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
  // enter 키 입력 시 중복 체크를 위한 flag: 중복 체크를 했는지 여부
  const [hasIdDuplicateChecked, setHasIdDuplicateChecked] = useState(false);

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
      ...prevIdChecker,
      format: ID_FORMAT_REGEX.test(id),
      length: ID_LENGTH_REGEX.test(id),
    }));
  }, [id]);

  const checkIdDuplicated = async (id) => {
    // initialize
    setHasIdDuplicateChecked(false);

    try {
      const response = await axios.post(`${SERVER_URL}auth/checkUserId`, {
        userId: id,
        check: true,
      });
      if (response.data === true) {
        setIdDuplicated(false);
      }
    } catch (error) {
      setIdDuplicated(true);
    } finally {
      setHasIdDuplicateChecked(true);
    }
  };

  useEffect(() => {
    if (hasIdDuplicateChecked && idChecker.format && idChecker.length && !idDuplicated) {
      setUserInfo({ ...userInfo, id: id });
      onNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasIdDuplicateChecked]); // hasIdDuplicateChecked 상태가 변경될 때 실행

  const onClickNext = async () => {
    await checkIdDuplicated(id); // 중복 체크 실행
  };

  return (
    <Form onSubmit={onClickNext}>
      <Selector index={1} />
      <AuthInputField
        placeholder="아이디를 입력해주세요."
        value={id}
        onClick={() => {
          setIdChecker({ ...idChecker, show: true });
        }}
        onChange={(event) => {
          setIdDuplicated(false);
          setHasIdDuplicateChecked(false);
          setId(event.target.value);
        }}
        onBlur={() => {
          checkIdDuplicated(id);
          setIdChecker({ ...idChecker, show: false });
        }}
        checkerShowFlag={idChecker.show}
        checkerMessages={[
          { checkedFlag: idChecker.format, message: "영어와 숫자를 반드시 포함해야 해요." },
          { checkedFlag: idChecker.length, message: "5 ~ 10자만 가능해요." },
        ]}
        errorFlag={idDuplicated}
        errorMessage="중복된 아이디입니다."
      />

      <div className="j-content-end">
        {idChecker.format && idChecker.length && !idDuplicated ? (
          <NextPurpleButton onNext={onClickNext} />
        ) : (
          <NextGreyButton />
        )}
      </div>
    </Form>
  );
};

export default SignUp1;
