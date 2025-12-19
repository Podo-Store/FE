import { api } from "@/api/api";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import clsx from "clsx";
import { Dialog } from "@mui/material";

import SignUpCheckBox from "./signUp/SignUpCheckBox";
import BottomBtn from "./BottomBtn";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import Loading from "../../pages/Loading";

import "./SignInDialog.scss";
import "../auth/signUp/ErrorMessages/AuthErrorMessages.css";
import "../../styles/text.css";
import "../../styles/utilities.css";

interface SignUpSocialDialogProps {
  open: boolean;
  onClose: () => void;
  tempCode: string | null;
}

const SignUpSocialDialog = ({ open, onClose, tempCode }: SignUpSocialDialogProps) => {
  const [checkBoxCondition, setCheckBoxCondition] = useState({
    age: false,
    collectAndUse: false,
    handOver: false,
    policy: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const { isMobile, isSmallMobile } = useWindowDimensions().widthConditions;
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleError = (errorMessage: string | undefined) => {
    if (!errorMessage) {
      alert("회원가입 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
      return;
    }

    if (errorMessage === "약관 동의 필요") {
      alert("모든 약관에 동의해주세요.");
    } else if (errorMessage === "만료되었거나 유효하지 않은 tempCode") {
      alert("인증 코드가 만료되었거나 유효하지 않습니다. 다시 시도해 주세요.");
      onClose();
      navigate("/signin", { replace: true });
    } else {
      alert(errorMessage || "회원가입 처리 중 오류가 발생했습니다.");
    }
  };

  const handleCompleteSignup = async () => {
    if (!tempCode) {
      alert("회원가입 정보를 불러오는데 실패했습니다. 다시 시도해 주세요.");
      onClose();
      navigate("/signin", { replace: true });
      return;
    }

    // 약관 동의 검증
    if (
      !checkBoxCondition.age ||
      !checkBoxCondition.collectAndUse ||
      !checkBoxCondition.handOver ||
      !checkBoxCondition.policy
    ) {
      alert("모든 약관에 동의해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 모든 약관에 동의했는지 확인
      const termsAgreed =
        checkBoxCondition.age &&
        checkBoxCondition.collectAndUse &&
        checkBoxCondition.handOver &&
        checkBoxCondition.policy;

      const response = await api.post(`/auth/social/signin`, {
        tempCode,
        termsAgreed,
      });

      // 성공 응답에 error 필드가 있는 경우 처리
      if (response.data?.error) {
        handleError(response.data.error);
        return;
      }

      const { accessToken, refreshToken, nickname: userNickname } = response.data;

      if (!accessToken || !refreshToken) {
        alert("로그인 정보를 받아오는데 실패했습니다. 다시 시도해 주세요.");
        return;
      }

      // 로그인 처리
      login(accessToken, refreshToken, userNickname || "username");

      const from = localStorage.getItem("auth_from") || "/";
      localStorage.removeItem("auth_from");

      onClose();
      navigate(from, {
        replace: true,
        state: {
          toastMessage: userNickname || "username",
        },
      });
    } catch (error: any) {
      console.error("회원가입 완료 처리 중 오류:", error);
      handleError(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      navigate("/signin", { replace: true });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 0,
            width: isMobile ? "450px" : isSmallMobile ? "280px" : "500px",
            height: isSmallMobile ? "493px" : "626px",
            borderRadius: "30px",
          },
        },
      }}
    >
      <form
        className="signin-dialog flex flex-col justify-between h-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleCompleteSignup();
        }}
      >
        <div>
          <div className="mt-[40px] mb-[82px] h5-medium sm:h2-medium text-center">
            약관 동의 후 <br />
            회원가입이 완료됩니다.
          </div>
          <div className="content-wrap" style={{ width: "100%" }}>
            <SignUpCheckBox type={1} setCheckBoxCondition={setCheckBoxCondition} />
          </div>

          <div className="h-[32px]"></div>
        </div>

        <div className="mb-[43px] w-full">
          <BottomBtn
            type="submit"
            disabled={
              !(
                checkBoxCondition.age &&
                checkBoxCondition.collectAndUse &&
                checkBoxCondition.handOver &&
                checkBoxCondition.policy
              )
            }
            style={{ width: "100%" }}
          >
            회원가입
          </BottomBtn>
        </div>
      </form>
    </Dialog>
  );
};

export default SignUpSocialDialog;
