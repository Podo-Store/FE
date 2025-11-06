import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Cookies from "js-cookie";

import { cancelReview } from "@/api/user/profile/cancelPostApi";
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

  const accessToken = Cookies.get("accessToken");

  // 심사 취소 팝업
  const [open, setOpen] = useState(false);
  const [openChangeFilePopup, setOpenChangeFilePopup] = useState(false);
  return (
    <div className="script-manage-btn">
      {
        {
          [ReviewCompleted.REVIEW_COMPLETED]: (
            <div className="script-manage-flex items-center">
              <div
                className="p-12-under text-grey7"
                onClick={() => setOpenChangeFilePopup(true)}
              >
                파일 변경 신청
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
                ) : (
                  <></>
                )}

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
          ),
          [ReviewCompleted.UNDER_REVIEWING]: (
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
          ),
        }[reviewCompleted]
      }
    </div>
  );
};

export default ScriptManageBtn;
