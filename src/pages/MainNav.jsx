import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ImageBtn from "@/components/button/ImageBtn";
import SideMenuDialog from "@/components/navBar/SideMenuDialog";

import AuthContext from "../contexts/AuthContext";

import hamburgerBtn from "../assets/image/navBar/hamburgerBtn.svg";
import navLogo from "../assets/image/navBar/navLogo.svg";
import navTitle from "../assets/image/navBar/navTitle.svg";
// import cart from "../assets/image/navBar/cart.svg";
import person from "../assets/image/navBar/person.svg";

import "./MainNav.scss";

function MainNav() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);

  // 현재 페이지와 같은 페이지 클릭 시 새로고침
  const handleLinkClick = (event, path) => {
    if (location.pathname === path) {
      event.preventDefault();
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {openDialog && <SideMenuDialog open={openDialog} onClose={onCloseDialog} />}
      <nav className="navbar">
        <ImageBtn
          className="hamburger-btn"
          src={hamburgerBtn}
          alt="≡"
          onClick={() => {
            setOpenDialog(true);
          }}
        />
        <Link
          to="/"
          className="navbar_logo"
          onClick={(event) => {
            handleLinkClick(event, "/");
          }}
        >
          <img className="icon" src={navLogo} alt="logo" style={{ height: "2.786vh" }} />
          <img src={navTitle} alt="포도상점" style={{ height: "2.593vh" }}></img>
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
                navigate("/signin", { state: { from: location } });
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
    </>
  );
}

export default MainNav;
