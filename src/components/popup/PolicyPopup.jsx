import CloseBtn from "./../../assets/image/button/CloseBtn.svg";

import "./PolicyPopup.css";

import "./../../styles/text.css";
import "./../../styles/utilities.css";

/**
 * @param {number} page - 0: "회원가입 페이지", 1: "구매 페이지"
 */
const PolicyPopup = ({ title, detail, setShowPopup, page = 0 }) => {
  return (
    <div
      className="popup"
      style={
        page === 0
          ? { width: "28.375rem", height: "45.875rem", transform: "translateY(-50vh)" }
          : page === 1
          ? { width: "28.375rem", height: "45.875rem", transform: "translate(-240px, -15rem)" }
          : { width: "25.8125rem", height: "20.8125rem", transform: "translate(-240px, -15rem)" }
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
          page === 0 || page === 1
            ? { width: "25.375rem", height: "40rem" }
            : { width: "23.0625rem", height: "14rem" }
        }
      >
        <div id="content">
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
