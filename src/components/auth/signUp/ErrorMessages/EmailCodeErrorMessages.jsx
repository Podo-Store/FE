import { CheckerMessage, ErrorMessage } from "..";
import useWindowDimensions from "@/hooks/useWindowDimensions";
const EmailCodeErrorMessages = ({
  emailCodeChecker,
  emailSended,
  onClickEmailSend,
}) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;
  return (
    <div className="f-dir-column" id="error-wrap">
      <div className="j-content-between">
        {emailCodeChecker.show ? (
          emailCodeChecker.match ? (
            <CheckerMessage
              checkedFlag={true}
              message="인증이 완료되었습니다."
              smallMessage={isSmallMobile ? true : false}
            />
          ) : (
            <ErrorMessage
              message="인증번호가 정확하지 않습니다."
              smallMessage={isSmallMobile ? true : false}
            />
          )
        ) : (
          <p></p>
        )}
        {emailSended ? (
          <p
            className="p-xs-under c-grey4 c-pointer"
            onClick={onClickEmailSend}
          >
            메일 다시 보내기
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default EmailCodeErrorMessages;
