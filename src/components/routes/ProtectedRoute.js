import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext.jsx";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const checkedAuthFlag = useRef(false); // 최초 렌더링 시에만 체크
  useEffect(() => {
    if (!isAuthenticated && !checkedAuthFlag.current) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/signin");
    }
    checkedAuthFlag.current = true;
  }, [isAuthenticated, navigate]);

  // 사용자가 인증된 경우에만 페이지를 렌더링
  return isAuthenticated ? element : null;
};

export default ProtectedRoute;
