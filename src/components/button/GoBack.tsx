import { useNavigate } from "react-router-dom";

import goBackArrowImg from "../../assets/image/myPage/goBackArrow.svg";

import "./GoBack.css";
import "./../../styles/utilities.css";

/**
 * @param {string} url - routing 주소 (e.g. "/mypage/scriptmanage")
 * @returns
 */

interface GoBackProps {
  url: string;
}

const GoBack = ({ url }: GoBackProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="a-items-center c-pointer go-back no-drag "
      onClick={() => {
        if (url === "-1") {
          navigate(-1); // 숫자형으로 이전 페이지로 이동
        } else {
          navigate(url); // 지정된 경로로 이동
        }
      }}
    >
      <img src={goBackArrowImg} alt="go back"></img>
      <h6 className="hover:text-[#777] ">뒤로가기</h6>
    </div>
  );
};

export default GoBack;
