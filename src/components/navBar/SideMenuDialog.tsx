import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import ImageBtn from "../button/ImageBtn";

import closeBtn from "@/assets/image/button/aiOutlineClose.svg";

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
            width: "100%",
            height: "100%",
            borderRadius: 0,
          },
        },
      }}
    >
      <div className="dialog-content j-content-end">
        <ImageBtn src={closeBtn} alt="X" onClick={onClose} size="32px" />
      </div>
    </Dialog>
  );
};

export default SideMenuDialog;
