import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ImageBtn from "@/components/button/ImageBtn";
import RoundBtnV2 from "@/components/button/round_btn/RoundBtnV2";
import SideMenuDialog from "@/components/navBar/SideMenuDialog";

import AuthContext from "../contexts/AuthContext";

import { useNavigateWithRefresh } from "@/hooks/useNavigateWithRefresh";

import hamburgerBtn from "../assets/image/navBar/hamburgerBtn.svg";
import navLogo from "../assets/image/navBar/navLogo.svg";
import navTitle from "../assets/image/navBar/navTitle.svg";
// import cart from "../assets/image/navBar/cart.svg";
import person from "../assets/image/navBar/person.svg";

import "./MainNav.scss";

function MainNav() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateWithRefresh = useNavigateWithRefresh();
  const location = useLocation();

  const [openDialog, setOpenDialog] = useState(false);

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
            navigateWithRefresh(event, "/");
          }}
        >
          <img className="icon h-[30.086px]" src={navLogo} alt="logo" />
          <img src={navTitle} alt="포도상점" className="h-[28px]"></img>
        </Link>
        <ul className="navbar_menu">
          <li>
            <Link
              to="/list"
              className="h5-regular"
              onClick={(event) => {
                navigateWithRefresh(event, "/list");
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
              className="h5-regular"
              onClick={(event) => {
                navigateWithRefresh(event, "/post");
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
            <RoundBtnV2
              onClick={() => {
                navigate("/signin", { state: { from: location } });
              }}
              className="signin_btn p-large-regular w-[150px] h-[44px] rounded-[30px]"
              color="white"
            >
              로그인
            </RoundBtnV2>
          </div>
        ) : (
          <div className="navbar_login">
            {/*<img src={cart} alt="cart" />*/}
            <button
              onClick={(event) => {
                navigateWithRefresh(event, "/mypage/purchased");
              }}
            >
              <img src={person} alt="myPage" className="my-page-button" />
            </button>
            <RoundBtnV2
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="signin_btn p-large-regular w-[150px] h-[44px] rounded-[30px]"
              color="white"
            >
              로그아웃
            </RoundBtnV2>
          </div>
        )}
      </nav>
    </>
  );
}

export default MainNav;
