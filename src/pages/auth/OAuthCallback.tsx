import { api } from "@/api/api";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import { SERVER_URL } from "@/constants/ServerURL.js";

export default function OAuthCallback() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(search);
      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");
      const nickname = params.get("nickname") ?? "username";
      const signup = params.get("signup");
      const error = params.get("error");
      const from = localStorage.getItem("auth_from") || "/";

      try {
        // Backend now redirects to FE with explicit query
        if (signup === "true") {
          localStorage.removeItem("auth_from");
          navigate("/signup/success", { replace: true });
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
          // Direct tokens in query
          login(accessToken, refreshToken, nickname);
          localStorage.removeItem("auth_from");
          navigate(from, { replace: true });
          return;
        }

        const code = params.get("code");
        if (code) {
          // Exchange code with backend; forward full query to preserve params
          const { data } = await api.get(`/auth/google/callback${search}`);
          const at = data?.accessToken;
          const rt = data?.refreshToken;
          const nn = data?.nickname ?? nickname;
          if (at && rt) {
            login(at, rt, nn);
            localStorage.removeItem("auth_from");
            navigate(from, { replace: true });
            return;
          }
        }

        // Fallback: no tokens and no code
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

  return null;
}
