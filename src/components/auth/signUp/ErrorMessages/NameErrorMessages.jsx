import { CheckerMessage, ErrorMessage } from "..";

import "./AuthErrorMessages.css";

/**
 * @deprecated since 24.11.02; AuthInputField에서 checkerMessages를 사용하도록 변경
 */
const NameErrorMessages = ({ nameChecker, nameDuplicated }) => {
  return (
    <div className="f-dir-column auth-error-messages">
      {nameChecker.show ? (
        <div className="f-dir-column" id="error-wrap">
          <CheckerMessage
            checkedFlag={nameChecker.format}
            message="한글, 영어, 숫자만 사용 가능해요."
          />
          <CheckerMessage checkedFlag={nameChecker.length} message="3 ~ 8자만 가능해요." />
        </div>
      ) : null}
      {nameDuplicated ? (
        <div>
          <div style={{ height: "0.5rem" }}></div>
          <ErrorMessage message="중복된 닉네임입니다." />
        </div>
      ) : null}
    </div>
  );
};

export default NameErrorMessages;
