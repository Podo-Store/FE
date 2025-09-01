import { Dialog } from "@mui/material";
import { cancelReview } from "@/api/user/profile/cancelPostApi";
import RoundBtn_135_40 from "../button/RoundBtn_135_40";
import Cookies from "js-cookie";

interface ScriptManageCancelPopupProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

const ScriptManageCancelPopup = ({
  open,
  setOpen,
  id,
}: ScriptManageCancelPopupProps) => {
  const accessToken = Cookies.get("accessToken")!;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <section className="flex flex-col justify-between items-center pt-[42px] pb-[30px] w-[280px] sm:w-[350px] h-[235px]">
        <div className="flex flex-col gap-[10px] text-center">
          <p className="p-medium-bold">심사를 정말 취소할까요?</p>
          <p className="p-medium-bold">
            심사를 취소하게 되면 즉시 심사가 중지됩니다.
          </p>
        </div>
        <div className="flex gap-[15px]">
          <RoundBtn_135_40 color="grey" onClick={() => setOpen(false)}>
            유지하기
          </RoundBtn_135_40>
          <RoundBtn_135_40
            color="purple"
            onClick={async () => {
              try {
                await cancelReview(id, accessToken);

                alert("심사 취소가 완료되었습니다.");
                window.location.reload();
              } catch (error) {
                console.error("심사 취소 중 오류 발생:", error);
                alert("심사 취소 중 오류가 발생했습니다.");
              }
            }}
          >
            심사 취소하기
          </RoundBtn_135_40>
        </div>
      </section>
    </Dialog>
  );
};

export default ScriptManageCancelPopup;
