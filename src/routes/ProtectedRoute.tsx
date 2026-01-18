import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import AuthContext from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, refreshAccessToken } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      const hasToken = Boolean(Cookies.get("accessToken"));

      // 이미 인증 상태면 통과
      if (isAuthenticated || hasToken) {
        if (mounted) setChecked(true);
        return;
      }

      // 토큰 없으면 refresh 시도
      const newToken = await refreshAccessToken();

      if (!newToken) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/signin", { replace: true, state: { from: location } });
        return;
      }

      // refresh 성공이면 통과(컨텍스트 갱신 타이밍과 무관하게)
      if (mounted) setChecked(true);
    };

    run();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, refreshAccessToken, navigate, location]);

  if (!checked) return null; // 또는 로딩 컴포넌트

  return <>{children}</>;
};

export default ProtectedRoute;
