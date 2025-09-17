import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import ImageBtn from "@/components/button/ImageBtn";
import SideDialogBtn from "@/components/navBar/SideDialogBtn";

import AuthContext from "@/contexts/AuthContext";

import { useNavigateWithRefresh } from "@/hooks/useNavigateWithRefresh";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import closeBtn from "@/assets/image/button/aiOutlineCloseBlack.svg";
import navLogo from "@/assets/image/navBar/navLogo.svg";
import navTitle from "@/assets/image/navBar/navTitle.svg";

import "./SideMenuDialog.css";

// 왼쪽에서 슬라이드하는 애니메이션
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

interface SideMenuDialogProps {
  open: boolean;
  onClose: () => void;
}

const SideMenuDialog: React.FC<SideMenuDialogProps> = ({ open, onClose }) => {
  const { isAuthenticated, userNickname, logout } = useContext(AuthContext);
  const navigateWithRefresh = useNavigateWithRefresh();
  const { width } = useWindowDimensions();

  /** navigateWithRefresh 이후 창 닫기 */
  const navigateWithRefreshAndClose = (
    event: React.MouseEvent,
    path: string
  ) => {
    navigateWithRefresh(event, path);
    onClose();
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Dialog
      className="side-menu-dialog"
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      sx={{
        "& .MuiDialog-container": {
          alignItems: "stretch",
          padding: 0,
        },
      }}
      slotProps={{
        paper: {
          style: {
            margin: 0,
            position: "absolute",
            left: 0,
            top: 0,
            width: `${width < 768 ? "350px" : "540px"} `,
            height: "100%",
            borderRadius: 0,
            maxWidth: "none",
            maxHeight: "none",
          },
        },
      }}
    >
      <div className="dialog-content">
        <div className="dialog-title j-content-between">
          <div
            className="navbar_logo a-items-center"
            onClick={(event) => {
              navigateWithRefreshAndClose(event, "/");
            }}
          >
            <img className="icon w-[23px]" src={navLogo} alt="logo" />
            <img
              className="w-[108px] h-[28px]"
              src={navTitle}
              alt="포도상점"
            ></img>
          </div>
          <ImageBtn src={closeBtn} alt="X" onClick={onClose} size="32px" />
        </div>

        <div className="div-outside" />
        {isAuthenticated && (
          <div>
            <div className="side-menu-greeting f-dir-column">
              <h3 className="h3-bold">{userNickname} 님,</h3>
              <h5 className="h5-regular">오늘도 달콤한 하루 되세요!</h5>
            </div>
            <div className="div-outside" />
          </div>
        )}
        <SideDialogBtn
          onClick={(event: React.MouseEvent) => {
            navigateWithRefreshAndClose(event, "/list");
          }}
        >
          작품 둘러보기
        </SideDialogBtn>
        <div className="div-inside" />
        <SideDialogBtn
          onClick={(event: React.MouseEvent) => {
            navigateWithRefreshAndClose(event, "/post");
          }}
        >
          작품 등록하기
        </SideDialogBtn>
        <div className="div-outside" />
        <SideDialogBtn
          onClick={(event: React.MouseEvent) => {
            navigateWithRefreshAndClose(event, "/performedWork");
          }}
        >
          공연된 작품
        </SideDialogBtn>
        <div className="div-outside" />
      </div>

      {isAuthenticated && (
        <>
          <div>
            <div className="authenticated-title">
              <h5 className="h5-regular">마이페이지</h5>
              <div className="div-outside" />
            </div>
            <SideDialogBtn
              onClick={(event: React.MouseEvent) => {
                navigateWithRefreshAndClose(event, "/mypage/liked");
              }}
            >
              좋아한 작품
            </SideDialogBtn>
            <div className="div-inside" />
            <SideDialogBtn
              onClick={(event: React.MouseEvent) => {
                navigateWithRefreshAndClose(event, "/mypage/purchased");
              }}
            >
              구매한 작품
            </SideDialogBtn>
            <div className="div-inside" />
            <SideDialogBtn
              onClick={(event: React.MouseEvent) => {
                navigateWithRefreshAndClose(event, "/mypage/scriptmanage");
              }}
            >
              작품 관리
            </SideDialogBtn>
            <div className="div-outside" />
          </div>
        </>
      )}
      <div>
        <div className="authenticated-title">
          {isAuthenticated ? (
            <h5 className="h5-regular">내 설정</h5>
          ) : (
            <h5 className="h5-regular">&nbsp;</h5>
          )}
          <div className="div-outside" />
        </div>
        {isAuthenticated ? (
          <>
            <SideDialogBtn
              onClick={(event: React.MouseEvent) => {
                navigateWithRefreshAndClose(event, "/mypage/infochange");
              }}
            >
              회원 정보 수정
            </SideDialogBtn>
            <div className="div-inside" />
            <SideDialogBtn
              onClick={(event: React.MouseEvent) => {
                logout();
                navigateWithRefreshAndClose(event, "/");
              }}
            >
              로그아웃
            </SideDialogBtn>
            <div className="div-outside" />
          </>
        ) : (
          <>
            <SideDialogBtn
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
                onClose();
              }}
            >
              로그인
            </SideDialogBtn>
            <div className="div-inside" />
          </>
        )}
      </div>
    </Dialog>
  );
};

export default SideMenuDialog;
