import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import RoundBtnV2 from "@/components/button/round_btn/RoundBtnV2";
import SideMenuDialog from "@/components/navBar/SideMenuDialog";
import ImageBtn from "@/components/button/ImageBtn";

import AuthContext from "../contexts/AuthContext";
import { useNavigateWithRefresh } from "@/hooks/useNavigateWithRefresh";

import hamburgerBtn from "../assets/image/navBar/hamburgerBtn.svg";
import navLogo from "../assets/image/navBar/navLogo.svg";
import navTitle from "../assets/image/navBar/navTitle.svg";
import person from "../assets/image/navBar/person.svg";

import "./MainNav.scss";

function AuthorNav() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateWithRefresh = useNavigateWithRefresh();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      {openDialog && <SideMenuDialog open={openDialog} onClose={() => setOpenDialog(false)} />}
      <nav className="navbar">
        <ImageBtn
          className="hamburger-btn"
          src={hamburgerBtn}
          alt="≡"
          onClick={() => setOpenDialog(true)}
        />
        <Link
          to="/author"
          className="navbar_logo"
          onClick={(event) => navigateWithRefresh(event, "/author")}
        >
          <img className="icon h-[30.086px]" src={navLogo} alt="logo" />
          <img src={navTitle} alt="포도상점" className="h-[28px]" />
          <span
            className="p-large-bold text-[var(--purple1)] ml-[calc(10px_-_1.5rem)]"
            style={{ lineHeight: 1 }}
          >
            작가 공간
          </span>
        </Link>
        <ul className="navbar_menu">
          <li>
            <Link
              to="/author/post"
              className="h5-regular hover:text-[#6A39C0]"
              onClick={(event) => navigateWithRefresh(event, "/author/post")}
            >
              작품 등록하기
            </Link>
          </li>
          <li>
            <Link
              to="/author/mypage/scriptmanage"
              className="h5-regular hover:text-[#6A39C0]"
              onClick={(event) => navigateWithRefresh(event, "/author/mypage/scriptmanage")}
            >
              작품 관리하기
            </Link>
          </li>
        </ul>
        <div className="navbar_login">
          {!isAuthenticated ? (
            <button
              className="signin_btn"
              onClick={() => {
                navigate("/author/signin", {
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
              color="white"
            >
              로그인
            </button>
          ) : (
            <>
              <button
                onClick={(event) => navigateWithRefresh(event, "/author/mypage/scriptmanage")}
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
            onClick={() => navigate("/")}
            className="rounded-[9px] w-[100px] ml-5 md:ml-10"
            color="purple"
          >
            상점 가기
          </RoundBtnV2>
        </div>
      </nav>
    </>
  );
}

export default AuthorNav;
