import Draggable from "react-draggable";

import CloseBtn from "./../../assets/image/button/CloseBtn.svg";

import "./PolicyPopup.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

/**
 * @param {object} props
 * @param {number} props.page - 0: "회원가입 페이지", 1: "구매 페이지 中 구매 조건", 2: "구매 페이지 中 환불 유의사항"
 * @param {string} props.isPerformSelected - 구매 페이지에서 공연권 선택 여부
 */
const PolicyPopup = ({ title, detail, setShowPopup, page = 0, isPerformSelected = true }) => {
  return (
    <Draggable handle=".popup">
      <div
        className="popup"
        style={
          !isPerformSelected && (page === 1 || page === 2)
            ? {
                width: "413px",
                height: "273px",
                top: "0",
                left: "0",
              }
            : page === 0
            ? {
                width: "500px",
                height: "671px",
                top: "0",
                left: "calc(50% - 250px)",
              }
            : page === 1
            ? {
                width: "413px",
                height: "465px",
                top: "0",
                left: "0",
              }
            : {
                width: "413px",
                height: "333px",
                top: "132px",
                left: "0",
              }
        }
      >
        <div className="j-content-between">
          <div className="j-content-center a-items-center" id="title">
            <p className="p-small-medium c-black">{title}</p>
          </div>
          <img
            className="c-pointer"
            id="close-btn"
            src={CloseBtn}
            alt="close"
            onClick={() => {
              setShowPopup(false);
            }}
          ></img>
        </div>
        <div
          id="content-wrap"
          style={
            !isPerformSelected && (page === 1 || page === 2)
              ? { width: "369px", height: "179px" }
              : page === 0
              ? { width: "447.137px", height: "585.068px" }
              : page === 1
              ? { width: "369px", height: "375px" }
              : { width: "369px", height: "239px" }
          }
        >
          <div
            id="content"
            style={
              !isPerformSelected && (page === 1 || page === 2)
                ? { maxHeight: "159px" }
                : page === 0
                ? { maxHeight: "550.33px" }
                : page === 1
                ? { maxHeight: "350px" }
                : null
            }
          >
            {
              // \n으로 구분된 문자열을 줄바꿈으로 나누어 출력
              detail.split("\n").map((line, index) => (
                <p key={index} className="p-small-medium c-black">
                  {line}
                  <br />
                </p>
              ))
            }
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default PolicyPopup;
