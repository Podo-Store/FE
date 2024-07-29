import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./MainNav.css";
import AuthContext from "../contexts/AuthContext";

function MainNav() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar_logo">
          <Link to="/">포도상점</Link>
        </div>
        <ul className="navbar_menu">
          <li>
            <Link to="/storemain">작품 둘러보기</Link>
          </li>
          <li>
            <Link to="/nowplaying">지금 공연 중</Link>
          </li>
          <li>
            <Link to="/post">작품 등록하기</Link>
          </li>
          <li>
            <Link to="/applyscript">희망 대본 신청하기</Link>
          </li>
          <li>
            <Link to="/monthauthor">이달의 작가</Link>
          </li>
        </ul>
        <div className="navbar_login">
          {!isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="signin_btn"
            >
              로그인
            </button>
          ) : (
            <button
              onClick={() => {
                // context 호출
                logout();
                navigate("/");
              }}
              className="signin_btn"
            >
              로그아웃
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default MainNav;
