import { useNavigate } from "react-router-dom";

import OnOffBtn from "../button/OnOffBtn";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import "./NullScriptContent.scss";
import "../../styles/text.css";
import "../../styles/utilities.css";

type PageType = 0 | 1 | 2;

interface NullScriptContentProps {
  currentPage?: PageType;
}

const NullScriptContent = ({ currentPage = 0 }: NullScriptContentProps) => {
  const navigate = useNavigate();
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  const getContent = (page: 0 | 1 | 2) => {
    switch (page) {
      case 0:
        return {
          message: "아직 구매한 작품이 없어요.",
          buttonText: "작품 둘러보기",
          navigatePath: "/list",
        };
      case 1:
        return {
          message: "아직 등록한 작품이 없어요.",
          buttonText: "작품 등록하기",
          navigatePath: "/post",
        };
      case 2:
        return {
          message: "아직 좋아한 작품이 없어요.",
          buttonText: "작품 둘러보기",
          navigatePath: "/list?tab=liked",
        };
      default:
        return {
          message: "내용이 없습니다.",
          buttonText: "홈으로 가기",
          navigatePath: "/",
        };
    }
  };

  const { message, buttonText, navigatePath } = getContent(currentPage);

  return (
    <div
      className={`f-dir-column a-items-center ${
        currentPage === 2 ? "pt-[16.759vh]" : " pt-[7.879vh]"
      }`}
      id="null-script-content"
    >
      <p className={!isSmallMobile ? "p-large-bold" : "p-small-bold"}>
        {message}
      </p>
      <OnOffBtn
        text={buttonText}
        onClick={() => navigate(navigatePath)}
        color="purple"
      />
    </div>
  );
};

export default NullScriptContent;
