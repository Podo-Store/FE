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
const PolicyPopup = ({
  title,
  detail,
  setShowPopup,
  page = 0,
  isPerformSelected = true,
}) => {
  const getPopupSize = (page, isPerformSelected) => {
    const width = window.innerWidth;

    // 공연권 미선택 && 구매 관련 페이지
    if (!isPerformSelected && (page === 1 || page === 2)) {
      return { width: "413px", height: "273px", top: "0", left: "0" };
    }

    if (page === 0) {
      return {
        width: "500px",
        height: "735px",
        top: "0",
        left: "calc(50% - 250px)",
      };
    }

    if (page === 1) {
      return { width: "413px", height: "465px", top: "0", left: "0" };
    }

    if (page === 3) {
      if (width >= 1280) {
        return {
          width: "100%",
          height: "540px",
          bottom: "130%",
          left: "0",
        };
      } else if (width >= 768) {
        return {
          width: "100%",
          height: "540px",
          bottom: "130%",
          left: "0",
        };
      } else if (width >= 480) {
        return {
          width: "100%",
          height: "540px",
          bottom: "130%",
          left: "0",
        };
      } else {
        return {
          width: "320px",
          height: "540px",
          bottom: "130%",
          left: "0",
        };
      }
    }
    return { width: "413px", height: "333px", top: "132px", left: "0" };
  };

  const getPopupContentsSize = (page, isPerformSelected) => {
    const width = window.innerWidth;

    // 공연권 미선택 && 구매 관련 페이지
    if (!isPerformSelected && (page === 1 || page === 2)) {
      return { width: "369px", height: "179px" };
    }

    if (page === 0) {
      return { width: "447.137px", height: "642px" };
    }

    if (page === 1) {
      return { width: "369px", height: "375px" };
    }

    if (page === 3) {
      if (width >= 1280) {
        return {
          width: "476px",
          height: "447px",
        };
      } else if (width >= 768) {
        return {
          width: "92.5%",
          height: "447px",
        };
      } else if (width >= 480) {
        return {
          width: "88.42%",
          height: "447px",
        };
      } else {
        return {
          width: "320px",
          height: "540px",
        };
      }
    }
    return { width: "369px", height: "239px" };
  };

  const getPopupContentsMaxSize = (page, isPerformSelected) => {
    const width = window.innerWidth;

    // 공연권 미선택 && 구매 관련 페이지
    if (!isPerformSelected && (page === 1 || page === 2)) {
      return { maxHeight: "159px" };
    }

    if (page === 0) {
      return { maxHeight: "620px" };
    }

    if (page === 1) {
      return { maxHeight: "350px" };
    }

    if (page === 3) {
      return { maxHeight: "419px" };
    }

    return null;
  };

  return (
    <Draggable handle=".popup">
      <div className="popup" style={getPopupSize(page, isPerformSelected)}>
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
          style={getPopupContentsSize(page, isPerformSelected)}
        >
          <div
            id="content"
            style={getPopupContentsMaxSize(page, isPerformSelected)}
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
