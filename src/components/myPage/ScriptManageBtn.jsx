import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import Button from "../button/RoundBtn_149_48";

import "./ScriptManageBtn.scss";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const ReviewCompleted = {
  REVIEW_COMPLETED: "PASS",
  UNDER_REVIEWING: "WAIT",
};

const ScriptManageBtn = ({ reviewCompleted, id, performSale, style }) => {
  const navigate = useNavigate();
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  return (
    <div className="script-manage-btn">
      {
        {
          [ReviewCompleted.REVIEW_COMPLETED]: (
            <div className="script-manage-flex">
              <div> </div>

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
            </div>
          ),
          [ReviewCompleted.UNDER_REVIEWING]: (
            <div className="script-manage-flex">
              <div> </div>
              <Button disabled={true} style={style}>
                심사 중
              </Button>
            </div>
          ),
        }[reviewCompleted]
      }
    </div>
  );
};

export default ScriptManageBtn;
