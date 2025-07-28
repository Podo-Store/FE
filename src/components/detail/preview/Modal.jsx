import { Dialog, DialogContent, IconButton } from "@mui/material";
import inequalityLeft from "@/assets/image/button/arrow/ic_black_left_arrow.svg";
import inequalityRight from "@/assets/image/button/arrow/ic_black_right_arrow.svg";
import CloseBtn from "@/assets/image/button/CloseBtn.svg";
import PreviewNotice from "./PreviewNotice";

/**
 * deprecated 였던 것
 * 320 화면에서의 미리보기
 */
const Modal = ({
  Page,
  showThreshold,
  selectedPage,
  setSelectedPage,
  numPages,
}) => {
  const isOpen = selectedPage !== null;

  const handleClose = () => setSelectedPage(null);
  const handlePrev = () => {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
  };
  const handleNext = () => {
    if (selectedPage < showThreshold) {
      setSelectedPage(selectedPage + 1);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          margin: 0,
          position: "relative",
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.7)" } }}
    >
      <button
        className="absolute top-[15px] right-[15px] z-20"
        onClick={() => {
          setSelectedPage(null);
        }}
      >
        <img src={CloseBtn} alt="close" />
      </button>
      <IconButton
        disabled={selectedPage === 1}
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          "&.Mui-disabled": { opacity: 0.5 },
          zIndex: 10,
        }}
      >
        <img src={inequalityLeft} alt="prev" />
      </IconButton>

      <DialogContent
        onClick={(e) => e.stopPropagation()}
        sx={{
          p: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          backgroundColor: "transparent",
        }}
      >
        {selectedPage != null && (
          <Page renderMode="canvas" pageNumber={selectedPage} width={320} />
        )}
        {selectedPage === showThreshold && (
          <PreviewNotice
            className="absolute left-[50%] bottom-[15px] transform -translate-x-1/2 z-10"
            totalPage={numPages}
            showThreshold={showThreshold}
          />
        )}
      </DialogContent>

      <IconButton
        disabled={selectedPage === showThreshold}
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          "&.Mui-disabled": { opacity: 0.5 },
          zIndex: 10,
        }}
      >
        <img src={inequalityRight} alt="next" />
      </IconButton>
    </Dialog>
  );
};

export default Modal;
