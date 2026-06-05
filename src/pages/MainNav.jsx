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
      {openDialog && (
        <SideMenuDialog open={openDialog} onClose={onCloseDialog} />
      )}
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
              to="/"
              className="h5-regular hover:text-[#6A39C0]"
              onClick={(event) => {
                navigateWithRefresh(event, "/");
              }}
            >
              작품 둘러보기
            </Link>
          </li>
          <li>
            <Link
              to="/performanceNews"
              className="h5-regular hover:text-[#6A39C0]"
              onClick={(event) => {
                navigateWithRefresh(event, "/performanceNews");
              }}
            >
              공연 소식
            </Link>
          </li>
          <li>
            <Link
              to="/company"
              className="h5-regular hover:text-[#6A39C0]"
              onClick={(event) => {
                navigateWithRefresh(event, "/company");
              }}
            >
              회사 소개
            </Link>
          </li>
        </ul>
        <div className="navbar_login">
          {!isAuthenticated ? (
            <button
              className="signin_btn"
              onClick={() => {
                navigate("/signin", {
                  state: {
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
            >
              로그인
            </button>
          ) : (
            <>
              <button
                onClick={(event) => navigateWithRefresh(event, "/mypage/liked")}
              >
                <img src={person} alt="myPage" className="my-page-button" />
              </button>
              <button
                className="signin_btn"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                로그아웃
              </button>
            </>
          )}
          <RoundBtnV2
            onClick={() => navigate("/author")}
            className="rounded-[9px] w-[100px] ml-5 md:ml-10"
            color="purple"
          >
            작가 공간
          </RoundBtnV2>
        </div>
      </nav>
    </>
  );
}

export default MainNav;
