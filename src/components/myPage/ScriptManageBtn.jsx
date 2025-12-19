import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Cookies from "js-cookie";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import ScriptManageChangeFilePopup from "./ScriptManageChangeFilePopup";
import ScriptManageCancelPopup from "./ScriptManageCancelPopup";
import Button from "../button/RoundBtn_149_48";
import "./ScriptManageBtn.scss";

const ReviewCompleted = {
  REVIEW_COMPLETED: "PASS",
  UNDER_REVIEWING: "WAIT",
};

const ScriptManageBtn = ({ reviewCompleted, id, performSale, style }) => {
  const navigate = useNavigate();
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  const [open, setOpen] = useState(false);
  const [openChangeFilePopup, setOpenChangeFilePopup] = useState(false);

  const isPass =
    reviewCompleted === "PASS" ||
    reviewCompleted === "RE_WAIT" ||
    reviewCompleted === "RE_PASS";
  const isReviewing = reviewCompleted === "WAIT";

  return (
    <div className="script-manage-btn">
      {/* PASS + RE_WAIT + RE_PASS  */}
      {isPass && (
        <div className="script-manage-flex items-center">
          <div
            className={clsx(
              "p-12-under",
              reviewCompleted === "RE_WAIT"
                ? "text-grey4 cursor-default"
                : "text-grey7 cursor-pointer"
            )}
            onClick={() => {
              if (reviewCompleted === "RE_WAIT") return;
              setOpenChangeFilePopup(true);
            }}
            disabled={reviewCompleted === "RE_WAIT" ? true : false}
          >
            {reviewCompleted === "RE_WAIT" ? "재심사 진행중" : "파일 변경 신청"}
          </div>

          <div
            className={clsx(
              "flex",
              !isSmallMobile ? "gap-[19px]" : "gap-[10px]"
            )}
          >
            {performSale ? (
              <Button
                color="white"
                onClick={() => {
                  navigate(`/mypage/scriptmanage/askedperform/${id}`);
                }}
                style={style}
              >
                신청된 공연
              </Button>
            ) : null}

            <Button
              onClick={() => {
                navigate(`/mypage/scriptmanage/detail/${id}`);
              }}
              style={style}
            >
              작품 관리
            </Button>
          </div>

          <ScriptManageChangeFilePopup
            open={openChangeFilePopup}
            setOpen={setOpenChangeFilePopup}
            id={id}
          />
        </div>
      )}

      {/* WAIT → 심사 취소 UI */}
      {isReviewing && (
        <div className="script-manage-flex">
          <div> </div>
          <Button
            style={style}
            onClick={() => {
              setOpen(true);
            }}
          >
            심사 취소
          </Button>
          <ScriptManageCancelPopup open={open} setOpen={setOpen} id={id} />
        </div>
      )}
    </div>
  );
};

export default ScriptManageBtn;
