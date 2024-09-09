import { useNavigate } from "react-router-dom";

import OnOffBtn from "../button/OnOffBtn";

import "./NullScriptContent.css";
import "../../styles/text.css";
import "../../styles/utilities.css";

/**
 * @param {string} currentPage - 구매한 작품: "0", 작품 관리: "1"
 */
const NullScriptContent = ({ currentPage = 0 }) => {
  const navigate = useNavigate();

  const message = currentPage === 0 ? "아직 구매한 작품이 없어요." : "아직 등록한 작품이 없어요.";
  const buttonText = currentPage === 0 ? "작품 둘러보러 가기" : "작품 등록하러 가기";
  const navigatePath = currentPage === 0 ? "/list" : "/post";

  return (
    <div className="f-dir-column a-items-center" id="null-script-content">
      <p className="p-large-bold">{message}</p>
      <OnOffBtn text={buttonText} onClick={() => navigate(navigatePath)} />
    </div>
  );
};

export default NullScriptContent;
