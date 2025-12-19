import Cookies from "js-cookie";
import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext.jsx";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, refreshAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const checkedAuthFlag = useRef(false); // 최초 렌더링 시에만 체크
  useEffect(() => {
    if (!Cookies.get("accessToken") && !checkedAuthFlag.current) {
      // refreshAccessToken 함수: Promise 반환, ∴ async/await를 사용
      (async () => {
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
          alert("로그인이 필요한 서비스입니다.");
          navigate("/signin", {
            state: { from: location },
          });
        }
      })();
    }
    checkedAuthFlag.current = true;
  }, [isAuthenticated, navigate, refreshAccessToken, location]);

  // 사용자가 인증된 경우에만 페이지를 렌더링
  return isAuthenticated ? element : null;
};

export default ProtectedRoute;
