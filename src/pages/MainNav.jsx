import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";

import navLogo from "../assets/image/navBar/navLogo.svg";
import navTitle from "../assets/image/navBar/navTitle.svg";
import cart from "../assets/image/navBar/cart.svg";
import person from "../assets/image/navBar/person.svg";

import "./MainNav.css";

function MainNav() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (event, path) => {
    if (location.pathname === path) {
      event.preventDefault(); // 링크 기본 동작을 막고
      window.location.reload(); // 새로고침을 수행
    } else {
      navigate(path);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <Link
          to="/"
          className="navbar_logo"
          onClick={(event) => {
            handleLinkClick(event, "/");
          }}
        >
          <img src={navLogo} alt="logo" />
          <img src={navTitle} alt="포도상점"></img>
        </Link>
        <ul className="navbar_menu">
          <li>
            <Link
              to="/list"
              className="li"
              onClick={(event) => {
                handleLinkClick(event, "/list");
              }}
            >
              작품 둘러보기
            </Link>
          </li>
          {/*}
          <li>
            <Link to="/nowplaying">지금 공연 중</Link>
          </li>
          {*/}
          <li>
            <Link
              to="/post"
              className="li"
              onClick={(event) => {
                handleLinkClick(event, "/post");
              }}
            >
              작품 등록하기
            </Link>
          </li>
          {/*}
          <li>
            <Link to="/applyscript">희망 대본 신청하기</Link>
          </li>
          <li>
            <Link to="/monthauthor">이달의 작가</Link>
          </li>
          {*/}
        </ul>
        {!isAuthenticated ? (
          <div className="navbar_login">
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="signin_btn"
            >
              로그인
            </button>
          </div>
        ) : (
          <div className="navbar_login">
            {/*<img src={cart} alt="cart" />*/}
            <img
              src={person}
              alt="myPage"
              onClick={(event) => {
                handleLinkClick(event, "/mypage/purchased");
              }}
            />
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
          </div>
        )}
      </nav>
    </div>
  );
}

export default MainNav;
