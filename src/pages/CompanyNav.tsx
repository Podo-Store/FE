import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import RoundBtnV2 from "@/components/button/round_btn/RoundBtnV2";
import SideMenuDialog from "@/components/navBar/SideMenuDialog";

import AuthContext from "../contexts/AuthContext";

import { useNavigateWithRefresh } from "@/hooks/useNavigateWithRefresh";

import HamburgerBtn from "../assets/image/navBar/hamburgerBtn.svg?react";
import navLogo from "../assets/image/navBar/navLogo.svg";
import navTitleWhite from "../assets/image/navBar/ic_nav_title_white.svg";

import PersonIcon from "../assets/image/navBar/person.svg?react";

import "./CompanyNav.scss";

function CompanyNav() {
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
      <div className="company">
        <nav className="navbar navbar--transparent">
          <HamburgerBtn
            className="hamburger-btn w-[20px] h-[16px] sm:w-[27px] sm:h-[28px] md:w-[30px] md:h-[24px] text-white"
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

            <img src={navTitleWhite} alt="company" className="h-[28px]" />
          </Link>

          <ul className="navbar_menu ">
            <li>
              <Link
                to="/"
                className="h5-regular !text-[#F2F2F2] hover:!text-[#a6a8cb]"
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
                className="h5-regular !text-[#F2F2F2] hover:!text-[#a6a8cb]"
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
                className="h5-regular !text-[#F2F2F2] hover:!text-[#a6a8cb]"
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
                  onClick={(event) => {
                    navigateWithRefresh(event, "/mypage/liked");
                  }}
                >
                  <PersonIcon
                    className={clsx(
                      "my-page-button w-[20px] h-[22px] sm:w-[26px] sm:h-[28px]",
                      isCompanyPage ? "text-white" : "text-black"
                    )}
                  />
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
              className="rounded-[9px] w-[110px] ml-5 md:ml-10"
              color="dark_mode"
            >
              작가 공간
            </RoundBtnV2>
          </div>
        </nav>
      </div>
    </>
  );
}

export default CompanyNav;
