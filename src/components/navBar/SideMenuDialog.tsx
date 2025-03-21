import React, { useContext } from "react";
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
  const navigate = (event: React.MouseEvent, path: string) => {
    navigateWithRefresh(event, path);
    onClose();
  };

  return (
    <Dialog
      className="side-menu-dialog"
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
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
          },
        },
      }}
    >
      <div className="dialog-content">
        <div className="dialog-title j-content-between">
          <div
            className="navbar_logo a-items-center"
            onClick={(event) => {
              navigate(event, "/");
            }}
          >
            <img className="icon" src={navLogo} alt="logo" style={{ height: "2.786vh" }} />
            <img src={navTitle} alt="포도상점" style={{ height: "2.593vh" }}></img>
          </div>
          <ImageBtn src={closeBtn} alt="X" onClick={onClose} size="32px" />
        </div>

        <hr className="hr-outside" />
        {isAuthenticated && (
          <div>
            <div className="side-menu-greeting f-dir-column">
              <h3 className="h3-bold">{userNickname} 님,</h3>
              <h5 className="h5-regular">오늘도 달콤한 하루 되세요!</h5>
            </div>
            <hr className="hr-outside" />
          </div>
        )}
        <SideDialogBtn
          onClick={(event: React.MouseEvent) => {
            navigate(event, "/list");
          }}
        >
          작품 둘러보기
        </SideDialogBtn>
        <hr className="hr-inside" />
        <SideDialogBtn
          onClick={(event: React.MouseEvent) => {
            navigate(event, "/post");
          }}
        >
          작품 등록하기
        </SideDialogBtn>
        <hr className="hr-outside" />
      </div>

      {isAuthenticated && (
        <>
          <div>
            <div className="authenticated-title">
              <h5 className="h5-regular">마이페이지</h5>
              <hr className="hr-outside" />
            </div>
            <SideDialogBtn
              onClick={(event: React.MouseEvent) => {
                navigate(event, "/mypage/purchased");
              }}
            >
              구매한 작품
            </SideDialogBtn>
            <hr className="hr-inside" />
            <SideDialogBtn
              onClick={(event: React.MouseEvent) => {
                navigate(event, "/mypage/scriptmanage");
              }}
            >
              작품 관리
            </SideDialogBtn>
            <hr className="hr-outside" />
          </div>
        </>
      )}
      <div>
        <div className="authenticated-title">
          <h5 className="h5-regular">내 설정</h5>
          <hr className="hr-outside" />
        </div>
        {isAuthenticated ? (
          <>
            <SideDialogBtn
              onClick={(event: React.MouseEvent) => {
                navigate(event, "/mypage/infochange");
              }}
            >
              회원 정보 수정
            </SideDialogBtn>
            <hr className="hr-inside" />
            <SideDialogBtn
              onClick={(event: React.MouseEvent) => {
                logout();
                navigate(event, "/");
              }}
            >
              로그아웃
            </SideDialogBtn>
            <hr className="hr-outside" />
          </>
        ) : (
          <>
            <SideDialogBtn
              onClick={(event: React.MouseEvent) => {
                navigate(event, "/signin");
              }}
            >
              로그인
            </SideDialogBtn>
            <hr className="hr-inside" />
          </>
        )}
      </div>
    </Dialog>
  );
};

export default SideMenuDialog;
