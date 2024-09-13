import { CheckerMessage, ErrorMessage } from "..";

import "./AuthErrorMessages.css";

const NameErrorMessages = ({ nameChecker, nameDuplicated }) => {
  return (
    <div className="f-dir-column auth-error-messages" id="error-wrap">
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
  );
};

export default NameErrorMessages;
