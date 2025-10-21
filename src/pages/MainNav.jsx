import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import ImageBtn from "@/components/button/ImageBtn";
import RoundBtnV2 from "@/components/button/round_btn/RoundBtnV2";
import SideMenuDialog from "@/components/navBar/SideMenuDialog";

import AuthContext from "../contexts/AuthContext";

import { useNavigateWithRefresh } from "@/hooks/useNavigateWithRefresh";

import HamburgerBtn from "../assets/image/navBar/hamburgerBtn.svg?react";
import navLogo from "../assets/image/navBar/navLogo.svg";
import navTitle from "../assets/image/navBar/navTitle.svg";
import navTitleWhite from "../assets/image/navBar/ic_nav_title_white.svg";
// import cart from "../assets/image/navBar/cart.svg";

import PersonIcon from "../assets/image/navBar/person.svg?react";

import "./MainNav.scss";

function MainNav() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateWithRefresh = useNavigateWithRefresh();
  const location = useLocation();
  const isCompanyPage = location.pathname === "/company";
  const [openDialog, setOpenDialog] = useState(false);

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {openDialog && (
        <SideMenuDialog open={openDialog} onClose={onCloseDialog} />
      )}
      <nav className={`navbar ${isCompanyPage ? "navbar--transparent" : ""}`}>
        {/* <ImageBtn
          className="hamburger-btn"
          src={hamburgerBtn}
          alt="≡"
          onClick={() => {
            setOpenDialog(true);
          }}
        /> */}

        <HamburgerBtn
          className={clsx(
            "hamburger-btn w-[20px] h-[16px] sm:w-[27px] sm:h-[28px] md:w-[30px] md:h-[24px]",
            isCompanyPage ? "text-white" : "text-black"
          )}
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

          {isCompanyPage ? (
            <img src={navTitleWhite} alt="company" className="h-[28px]" />
          ) : (
            <img src={navTitle} alt="포도상점" className="h-[28px]"></img>
          )}
        </Link>

        <ul className="navbar_menu ">
          {/*}
          <li>
            <Link to="/nowplaying">지금 공연 중</Link>
          </li>
          {*/}
          <li>
            <Link
              to="/list"
              className={clsx(
                "h5-regular ",
                isCompanyPage
                  ? "!text-[#F2F2F2] hover:!text-[#a6a8cb]"
                  : "hover:text-[#6A39C0]"
              )}
              onClick={(event) => {
                navigateWithRefresh(event, "/list");
              }}
            >
              작품 둘러보기
            </Link>
          </li>
          <li>
            <Link
              to="/post"
              className={clsx(
                "h5-regular ",
                isCompanyPage
                  ? "!text-[#F2F2F2] hover:!text-[#a6a8cb]"
                  : "hover:text-[#6A39C0]"
              )}
              onClick={(event) => {
                navigateWithRefresh(event, "/post");
              }}
            >
              작품 등록하기
            </Link>
          </li>
          <li>
            <Link
              to="/performedWork"
              className={clsx(
                "h5-regular ",
                isCompanyPage
                  ? "!text-[#F2F2F2] hover:!text-[#a6a8cb]"
                  : "hover:text-[#6A39C0]"
              )}
              onClick={(event) => {
                navigateWithRefresh(event, "/performedWork");
              }}
            >
              공연 소식
            </Link>
          </li>
          <li>
            <Link
              to="/company"
              className={clsx(
                "h5-regular ",
                isCompanyPage
                  ? "!text-[#F2F2F2] hover:!text-[#a6a8cb]"
                  : "hover:text-[#6A39C0]"
              )}
              onClick={(event) => {
                navigateWithRefresh(event, "/company");
              }}
            >
              회사 소개
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
                navigate("/signin", {
                  state: {
                    // Avoid passing full location.state to prevent DataCloneError
                    background: {
                      pathname: location.pathname,
                      search: location.search,
                      hash: location.hash,
                      key: location.key,
                    },
                    from: location.pathname,
                  },
                });
              }}
              className="signin_btn p-large-regular w-[150px] h-[44px] rounded-[30px]"
              color={isCompanyPage ? "dark_mode" : "white"}
            >
              로그인
            </RoundBtnV2>
          </div>
        ) : (
          <div className="navbar_login">
            {/*<img src={cart} alt="cart" />*/}
            <button
              onClick={(event) => {
                navigateWithRefresh(event, "/mypage/liked");
              }}
            >
              <PersonIcon
                className={clsx(
                  " my-page-button w-[20px] h-[22px] sm:w-[26px] sm:h-[28px]",
                  isCompanyPage ? "text-white" : "text-black"
                )}
              />
            </button>
            <RoundBtnV2
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="signin_btn p-large-regular w-[150px] h-[44px] rounded-[30px]"
              color={isCompanyPage ? "dark_mode" : "white"}
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
