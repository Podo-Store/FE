import { useEffect, useRef } from "react";

import "./InfoPopup.css";
import "./../../styles/text.css";

/**
 *
 * @param {Object} props - Component properties
 * @param {function} props.onClose: 팝업을 닫을 때 호출할 함수
 * @param props.style - padding, transform 사용 권장
 * @param {string} props.buttonId: 팝업을 띄우는 버튼의 id (e.g. "popup-btn2")
 * @returns
 */
const InfoPopup = ({ message, onClose, style, buttonId }) => {
  const popupRef = useRef(null); // InfoPopup 컴포넌트의 DOM 요소를 참조

  useEffect(() => {
    // 팝업이나 버튼이 아닌 곳을 클릭했을 때만 onClose() 호출
    const handleClickOutside = (event) => {
      const buttonElement = document.getElementById(buttonId); // 동적으로 받은 id로 버튼 선택
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonElement &&
        !buttonElement.contains(event.target)
      ) {
        onClose();
      }
    };
    // 컴포넌트가 마운트될 때 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonId]);

  return (
    <div className="info-popup" style={{ ...style }} ref={popupRef}>
      {
        // \n으로 구분된 문자열을 줄바꿈으로 나누어 출력
        message.split("\n").map((line, index) => (
          <p key={index} className="p-xs-regular c-black">
            {/* PerformanceInfo 한정 사용 요소 */}
            {line.includes("변경이 어려우니") ? (
              <span>
                {line.split("변경이 어려우니")[0]}
                <span style={{ textDecoration: "underline" }}>변경이 어려우니</span>
                {line.split("변경이 어려우니")[1]}
              </span>
            ) : (
              line
            )}
            <br />
          </p>
        ))
      }
    </div>
  );
};

export default InfoPopup;
