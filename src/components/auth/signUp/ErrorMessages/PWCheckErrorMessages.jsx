import { ErrorMessage } from "..";

import "./AuthErrorMessages.css";

const PWCheckErrorMessages = ({ pwCheckChecker }) => {
  return pwCheckChecker.show && !pwCheckChecker.equal ? (
    <div className="auth-error-messages" id="error-wrap">
      <div style={{ height: "0.5rem" }}></div>
      <ErrorMessage message="비밀번호가 일치하지 않습니다." />
    </div>
  ) : null;
};

export default PWCheckErrorMessages;
