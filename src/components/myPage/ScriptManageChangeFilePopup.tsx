import { Dialog } from "@mui/material";
import Cookies from "js-cookie";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import FileInputBox from "../file/FileInputBox";
import RoundBtnV2 from "../button/round_btn/RoundBtnV2";

import CloseBtn from "../../assets/image/button/CloseBtn.svg";
import { PostChangeScript } from "@/api/user/profile/work/changeScriptApi";
import { useState } from "react";
import { toastAlert } from "@/utils/ToastAlert";


interface ScriptManageChangeFilePopupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

const ScriptManageChangeFilePopup = ({
  open,
  setOpen,
  id,
}: ScriptManageChangeFilePopupProps) => {
  const [scriptFile, setScriptFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const accessToken = Cookies.get("accessToken")!;
  const {
    widthConditions: { isSmallMobile },
  } = useWindowDimensions();

  const handleClose = () => {
    setOpen(false);
    setScriptFile(null);
  };

  const handleChangeScript = async () => {
    if (!scriptFile || loading) return;
    setLoading(true);

    try {
      const response = await PostChangeScript(
        id,
        scriptFile as File,
        accessToken
      );
      if (response) {
        toastAlert("파일 변경 신청이 완료되었습니다.", "success");
        handleClose();
      }
    } catch (error) {
      toastAlert("오류가 발생했습니다.", "error");
      handleClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={false} // MUI 기본 maxWidth(sm)를 끄고 직접 width 제어
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "30px",
          boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.25)",
          maxWidth: 500, // 최대로 525px까지만
          width: "100%",
        },
      }}
    >
      <section className=" relative flex flex-col items-center  pt-[20px] pb-[15px] sm:py-[40px] px-[4.68vw] sm:px-[30px] w-full h-[405px] sm:h-[465px] ">
        <div
          className="absolute top-[16px] sm:top-[20px] right-[16px] sm:right-[20px] cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <img src={CloseBtn} alt="close" />
        </div>

        <div className="flex flex-col text-center gap-[30px] mb-[17px]">
          <h2 className="h5-medium sm:h2-medium">파일 변경 신청</h2>
          <p className="p-12-medium sm:p-small-medium">
            변경 요청하신 파일은 {isSmallMobile && <br />}검토를 거쳐 작품에
            반영됩니다. <br /> 결과는 검토 완료 후 이메일로 안내드릴게요.
          </p>
        </div>
        <div className="w-full flex flex-col gap-[15px] sm:gap-[26px]">
          <FileInputBox
            onFileUpload={(file) => {
              setScriptFile(file);
              console.log("업로드된 파일:", file);
            }}
            style={{ width: "100%", height: "179px" }}
            titleStyle={{
              fontSize: "1rem",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "1.5rem",
            }}
          />
          <RoundBtnV2
            color="purple"
            className="w-full rounded-[30px] h-[48px]"
            onClick={() => {
              if (scriptFile) {
                handleChangeScript();
              }
            }}
            disabled={!scriptFile || loading}
          >
            {loading ? "처리 중" : "작품 보내기"}
          </RoundBtnV2>
        </div>
      </section>
    </Dialog>
  );
};

export default ScriptManageChangeFilePopup;
