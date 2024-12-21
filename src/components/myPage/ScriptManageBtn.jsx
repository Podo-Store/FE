import { useNavigate } from "react-router-dom";

import Button from "../button/RoundBtn_149_48";

import "./ScriptManageBtn.css";

const ReviewCompleted = {
  REVIEW_COMPLETED: true,
  UNDER_REVIEWING: false,
};

const ScriptManageBtn = ({ reviewCompleted, id }) => {
  const navigate = useNavigate();

  return (
    <div className="script-manage-btn">
      {
        {
          [ReviewCompleted.REVIEW_COMPLETED]: (
            <div className="script-manage-flex">
              <div> </div>

              <div className="d-flex" style={{ gap: "19px" }}>
                {/* <Button
                  color="white"
                  onClick={() => {
                    navigate(`/mypage/scriptmanage/askedperform/${id}`);
                  }}
                >
                  신청된 공연
                </Button> */}
                <Button
                  onClick={() => {
                    navigate(`/mypage/scriptmanage/detail/${id}`);
                  }}
                >
                  작품 관리
                </Button>
              </div>
            </div>
          ),
          [ReviewCompleted.UNDER_REVIEWING]: (
            <div className="script-manage-flex">
              <div> </div>
              <Button disabled={true}>심사 중</Button>
            </div>
          ),
        }[reviewCompleted]
      }
    </div>
  );
};

export default ScriptManageBtn;
