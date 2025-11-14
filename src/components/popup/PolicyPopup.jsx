import Draggable from "react-draggable";

import useWindowDimensions from "./../../hooks/useWindowDimensions";
import { useEffect } from "react";
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
  const { isTablet, isMobile, isSmallMobile } =
    useWindowDimensions().widthConditions;

  useEffect(() => {
    // ✅ 모바일 + 회원가입 약관 페이지(page 0)일 때만 body 스크롤 막기
    if (!(page === 0 && isSmallMobile)) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [page, isSmallMobile]);

  /*
   * 팝업 크기 수정 가이드
   * - 추후 크기 관련 수정이 필요할 경우, page === 1 || page === 2일 때를 참고하여 refactor하는 것을 권장.
   * - 만약 표시되는 위치를 바꾸기 위해 translate 요소를 조정할 경우, return 문의 <Draggable> 요소의 props를 수정할 것.
   */
  const getPopupSize = (page, isPerformSelected) => {
    const width = window.innerWidth;

    if (page === 0) {
      if (isSmallMobile) {
        return {
          width: "100vw",
          height: "100vh",
          top: "0",
          left: "0",
        };
      } else {
        return {
          width: "500px",
          height: "735px",
          top: "80px",
          left: "calc(50% - 250px)",
        };
      }
    }

    if (page === 1) {
      let size;
      // 공연권 선택 X (= 구매자 정보 입력 란 X)일 경우
      if (!isPerformSelected) {
        if (!(isTablet || isMobile || isSmallMobile)) {
          size = { width: "414px", height: "369px" };
        } else if (isTablet) {
          size = { width: "100%", height: "214px" };
        } else if (isMobile) {
          size = { width: "100%", height: "392px" };
        } else {
          size = { width: "100%", height: "540px" };
        }
      } else {
        if (!(isTablet || isMobile || isSmallMobile)) {
          size = { width: "414px", height: "468px" };
        } else if (isTablet) {
          size = { width: "100%", height: "319px" };
        } else if (isMobile) {
          size = { width: "100%", height: "468px" };
        } else {
          size = { width: "100%", height: "540px" };
        }
      }
      return { ...size, top: "0", left: "0" };
    }

    if (page === 2) {
      let size;
      if (!(isTablet || isMobile || isSmallMobile)) {
        size = { width: "414px", height: "288px" };
      } else if (isTablet) {
        size = { width: "100%", height: "229px" };
      } else if (isMobile) {
        size = { width: "100%", height: "288px" };
      } else {
        size = { width: "100%", height: "384px" };
      }
      return { ...size, top: "0", left: "0" };
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

    if (page === 0) {
      if (isSmallMobile) {
        return { width: "100%", height: "calc(100% - 49px)" };
      }
      return { width: "447.137px", height: "642px" };
    }

    if (page === 1 || page === 2) {
      return { width: "100%", height: "calc(100% - 49px)" };
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

    if (page === 0) {
      if (isSmallMobile) {
        return { maxHeight: "100%" };
      }
      return { maxHeight: "620px" };
    }

    if (page === 1 || page === 2) {
      return { maxHeight: "100%" };
    }

    if (page === 3) {
      return { maxHeight: "419px" };
    }

    return null;
  };

  const isFullScreenMobile = page === 0 && isSmallMobile;

  return (
    <div className="popup-overlay">
      <Draggable
        handle=".popup"
        disabled={isFullScreenMobile}
        // translate 값
        positionOffset={
          page === 1 || page === 2
            ? { x: 0, y: "calc(-100% - 10px)" }
            : { x: 0, y: 0 }
        }
      >
        <div
          className={`popup ${isFullScreenMobile ? "popup-fullscreen" : ""}`}
          style={getPopupSize(page, isPerformSelected)}
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
    </div>
  );
};

export default PolicyPopup;
