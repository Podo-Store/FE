import { ErrorMessage } from "..";

import "./AuthErrorMessages.css";

/**
 * @deprecated since 24.11.02; AuthInputField에서 checkerMessages를 사용하도록 변경
 */
const PWCheckErrorMessages = ({ pwCheckChecker }) => {
  return pwCheckChecker.show && !pwCheckChecker.equal ? (
    <div className="auth-error-messages" id="error-wrap">
      <ErrorMessage message="비밀번호가 일치하지 않습니다." />
    </div>
  ) : null;
};

export default PWCheckErrorMessages;
