import { api } from "@/api/api";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import SignUpSocialDialog from "@/components/auth/SignUpSocialDialog";

interface SignUpData {
  accessToken: string | null;
  refreshToken: string | null;
  nickname: string | null;
}

export default function OAuthCallback() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    accessToken: null,
    refreshToken: null,
    nickname: null,
  });

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(search);
      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");
      const nickname = params.get("nickname") ?? "username";
      const isNewUser = params.get("isNewUser");
      const error = params.get("error");
      const from = localStorage.getItem("auth_from") || "/";

      try {
        if (isNewUser === "true") {
          setSignUpData({
            accessToken,
            refreshToken,
            nickname,
          });
          setShowSignUpDialog(true);
          return;
        }

        if (error) {
          const parsedError = decodeURIComponent(error);
          if (parsedError === "이미 존재하는 email") {
            alert("해당 이메일로 가입된 계정이 존재합니다.");
          } else {
            alert(parsedError || "소셜 로그인에 실패했습니다.");
          }
          localStorage.removeItem("auth_from");
          navigate("/signin", { replace: true });
          return;
        }

        if (accessToken && refreshToken) {
          login(accessToken, refreshToken, nickname);
          localStorage.removeItem("auth_from");
          navigate(from, { replace: true });
          return;
        }

        alert("소셜 로그인 처리에 실패했습니다. 다시 시도해 주세요.");
        localStorage.removeItem("auth_from");
        navigate("/signin", { replace: true });
      } catch (e) {
        alert("로그인 완료 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
        localStorage.removeItem("auth_from");
        navigate("/signin", { replace: true });
      }
    };

    run();
  }, [search, login, navigate]);

  return (
    <>
      <SignUpSocialDialog
        open={showSignUpDialog}
        onClose={() => {
          setShowSignUpDialog(false);
          navigate("/signin", { replace: true });
        }}
        accessToken={signUpData.accessToken}
        refreshToken={signUpData.refreshToken}
        nickname={signUpData.nickname}
      />
    </>
  );
}
