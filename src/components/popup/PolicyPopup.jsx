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
    <div
      className="popup"
      style={
        !isPerformSelected && page === 1
          ? {
              width: "28.375rem",
              height: "273px",
              transform: "translate(-50%, calc(-100% + 10px + 0.87rem + 20px)",
            }
          : !isPerformSelected && page === 2
          ? {
              width: "28.375rem",
              height: "273px",
              transform: "translate(-50%, calc(-100% + 10px)",
            }
          : page === 0
          ? { width: "28.375rem", height: "45.875rem", transform: "translateY(-50vh)" }
          : page === 1
          ? { width: "28.375rem", height: "465px", transform: "translate(-50%, calc(-100% - 10px)" }
          : {
              width: "25.8125rem",
              height: "20.8125rem",
              transform: "translate(-50%, calc(-100% - 10px - 0.87rem - 20px)",
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
          !isPerformSelected
            ? { width: "25.375rem", height: "170px" }
            : page === 0
            ? { width: "25.375rem", height: "40rem" }
            : page === 1
            ? { width: "25.375rem", height: "360px" }
            : { width: "23.0625rem", height: "14rem" }
        }
      >
        <div
          id="content"
          style={
            !isPerformSelected ? { maxHeight: "159px" } : page === 1 ? { maxHeight: "357px" } : null
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
  );
};

export default PolicyPopup;
