import { useNavigate } from "react-router-dom";

import goBackArrowImg from "../../assets/image/myPage/goBackArrow.svg";

import "./GoBack.css";
import "./../../styles/utilities.css";

/**
 * @param {string} url - routing 주소 (e.g. "/mypage/scriptmanage")
 * @returns
 */
const GoBack = ({ url }) => {
  const navigate = useNavigate();

  return (
    <div
      className="a-items-center c-pointer go-back"
      onClick={() => {
        navigate(url);
      }}
    >
      <img src={goBackArrowImg} alt="go back"></img>
      <h6>뒤로가기</h6>
    </div>
  );
};

export default GoBack;
