import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import CloseBtn from "./../../assets/image/button/CloseBtn.svg";
import { Dialog } from "@mui/material";
import { AUTHOR_TERMS_CONTENT } from "@/constants/PopupTexts/PostWorkTexts";
import OnOffBtn from "../button/OnOffBtn";

function DialogPopup({
  onClick,
  setShowPopup,
}: {
  onClick: () => void;
  setShowPopup: (show: boolean) => void;
}) {
  const { isMobile, isSmallMobile } = useWindowDimensions().widthConditions;

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      keepMounted
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 0,
            width: isMobile ? "450px" : isSmallMobile ? "280px" : "500px",
            borderRadius: "30px",
            height: isSmallMobile ? "70vh" : "626px",
            maxHeight: isSmallMobile ? "493px" : "626px",
            overflow: "hidden",
          },
        },
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClick();
        }}
        className="w-full p-[15px] sm:p-[20px] flex flex-col h-full "
      >
        <div className="flex w-full !items-center sm:justify-between mb-[10px]">
          <span
            className="flex justify-center items-center w-full sm:w-[265px] px-[15px] py-[10px] sm:px-[15px] sm:py-[10px] rounded-[30px] bg-[#F5F5F5]
             border border-solid [border-width:0.3px] border-neutral-300/60 p-small-regular sm:p-medium-medium whitespace-nowrap"
          >
            작가 대상 이용약관 (포도알 스테이지)
          </span>
          {!isSmallMobile && (
            <img
              className="c-pointer"
              id="close-btn"
              src={CloseBtn}
              alt="close"
              onClick={handleClose}
            ></img>
          )}
        </div>

        <div
          className="prose prose-neutral max-w-none whitespace-pre-wrap  rounded-[30px] bg-[#F5F5F5] border border-solid [border-width:0.3px] border-neutral-300/60 p-[20px]
                    flex-1 min-h-0 overflow-y-auto"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h3: ({ node, ...props }) => (
                <h3 className="text-[16px] font-semibold" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="p-small-regular leading-6" {...props} />
              ),
              ol: (props) => (
                <ol className="p-small-regular list-decimal pl-5" {...props} />
              ),
              ul: (props) => (
                <ul className="p-small-regular list-disc pl-5" {...props} />
              ),
              li: (props) => (
                <li className="p-small-regular leading-6" {...props} />
              ),
              hr: (props) => (
                <hr className="border-t border-neutral-200" {...props} />
              ),
            }}
          >
            {AUTHOR_TERMS_CONTENT}
          </ReactMarkdown>
        </div>
        <OnOffBtn
          text="동의하고 작품 보내기"
          onClick={onClick}
          disabled={false}
          color="purple"
          style={{ width: "100%", marginTop: "20px" }}
        />
      </form>
    </Dialog>
  );
}

export default DialogPopup;
