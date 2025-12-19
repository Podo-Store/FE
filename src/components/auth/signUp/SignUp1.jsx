import { api } from "@/api/api";
import { useEffect, useState } from "react";

import { Selector, NextGreyButton, NextPurpleButton } from ".";
import Form from "../Form";
import { AuthInputField } from "../../inputField";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

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

  const { isSmallMobile } = useWindowDimensions().widthConditions;

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

    setIdChecker({
      format: ID_FORMAT_REGEX.test(id),
      length: ID_LENGTH_REGEX.test(id),
    });
  }, [id]);

  const checkIdDuplicated = async (id) => {
    if (!idChecker.format || !idChecker.length) {
      return false;
    }

    // initialize
    setHasIdDuplicateChecked(false);

    try {
      const response = await api.post(`/auth/checkUserId`, {
        userId: id,
        check: true,
      });

      const isAvailable = response.data === true;
      setIdDuplicated(!isAvailable);
      return isAvailable;
    } catch (error) {
      setIdDuplicated(true);
    } finally {
      setHasIdDuplicateChecked(true);
    }
  };

  const onClickNext = async () => {
    const isAvailable = await checkIdDuplicated(id);

    if (idChecker.format && idChecker.length && isAvailable) {
      setUserInfo({ ...userInfo, id: id });
      onNext();
    }
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
        fontMode={!isSmallMobile ? "default" : "12"}
        style={isSmallMobile ? { height: "48px" } : {}}
        checkerShowFlag={id.length > 0}
        checkerMessages={[
          {
            checkedFlag: idChecker.format,
            message: "영어와 숫자를 반드시 포함해야 해요.",
          },
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
