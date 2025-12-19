import React from "react";
import { Dialog } from "@mui/material";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import CloseBtn from "../../../assets/image/button/CloseBtn.svg";
import "../../popup/PolicyPopup.css";
import "../../../styles/text.css";
import "../../../styles/utilities.css";

interface PolicyDialogProps {
  open: boolean;
  title: string;
  detail: string;
  onClose: () => void;
}

const PolicyDialog: React.FC<PolicyDialogProps> = ({ open, title, detail, onClose }) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            flexDirection: "column",
            margin: 0,
            width: isSmallMobile ? "280px" : "500px",
            height: isSmallMobile ? "591px" : "735px",
            borderRadius: "30px",
            padding: 0,
            overflow: "hidden",
          },
        },
      }}
    >
      <div className="popup static! z-auto cursor-default!">
        <div className="flex justify-between">
          <div className="flex justify-center items-center" id="title">
            <p className="p-small-medium text-black">{title}</p>
          </div>
          <img
            className="cursor-pointer"
            id="close-btn"
            src={CloseBtn}
            alt="close"
            onClick={onClose}
          />
        </div>
        <div id="content-wrap">
          <div id="content">
            {detail.split("\n").map((line, index) => (
              <p key={index} className="p-small-medium text-black">
                {line}
                <br />
              </p>
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PolicyDialog;
