import CheckerMessage from "./CheckerMessage";

import "./AuthErrorMessages.css";

const PWErrorMessages = ({ pwChecker }) => {
  return pwChecker.show ? (
    <div className="f-dir-column auth-error-messages" id="error-wrap">
      <div className="f-dir-column" id="error-wrap">
        <CheckerMessage
          checkedFlag={pwChecker.alphabet}
          message="영어 대, 소문자를 각 하나 이상 포함해야 해요."
        />
        <CheckerMessage checkedFlag={pwChecker.number} message="숫자를 하나 이상 포함해야 해요." />
        <CheckerMessage
          checkedFlag={pwChecker.special}
          message="특수기호(@$!%*#?&)를 하나 이상 포함해야 해요."
        />
        <CheckerMessage checkedFlag={pwChecker.length} message="5 ~ 11자만 가능해요." />
      </div>
    </div>
  ) : null;
};

export default PWErrorMessages;
