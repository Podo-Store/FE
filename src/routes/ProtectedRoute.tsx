import Cookies from "js-cookie";
import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import AuthContext from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, refreshAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const checkedAuthFlag = useRef<boolean>(false);

  useEffect(() => {
    if (checkedAuthFlag.current) return;

    if (!Cookies.get("accessToken")) {
      (async () => {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          alert("로그인이 필요한 서비스입니다.");
          navigate("/signin", {
            replace: true,
            state: { from: location },
          });
        }

        checkedAuthFlag.current = true;
      })();
    } else {
      checkedAuthFlag.current = true;
    }
  }, [navigate, refreshAccessToken, location]);

  // ✅ 인증된 경우에만 렌더
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
