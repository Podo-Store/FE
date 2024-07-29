import React, { useState, useRef, useEffect } from "react";
import popUpClose from "../assets/image/post/postPopupClose.svg";
import "./PostWorkPopup.css";

const PostWorkPopup = ({ onClose, initialPosition }) => {
  const popupHeight = 368;
  const [position, setPosition] = useState({
    x: initialPosition.x,
    y: initialPosition.y - popupHeight,
  });
  const [isDragging, setIsDragging] = useState(false);
  const popupRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    // 파란색 드래그 바가 생기지 않도록 방지
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={popupRef}
      className="popup"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        height: `${popupHeight}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <img src={popUpClose} alt="" className="close-button" onClick={onClose}></img>
      <div className="popup-content">
        <p>
          작품 등록 신청 가능 파일 형식은
          <br />
          다음과 같습니다.
          <br />
          {"->"} PDF
          <br />
          <br />
          신청 후 심사가 완료되면 등록되어 있는
          <br />
          이메일로 결과가 발송됩니다. <br />
          <br />
          심사에 통과되시면 마이 페이지의
          <br /> '등록한 작품들을 관리할 수 있어요!'
          <br />
          페이지에서 만나보실 수 있습니다. <br />
          <br />
          심사는 표절, 중복 등 다양한 방면에서 <br />
          진행되며 포도상점은 건강한 공연 생태계 <br />
          조성을 위해 항상 노력하고 있습니다. <br />
          <br />
          감사합니다.
        </p>
      </div>
    </div>
  );
};

export default PostWorkPopup;
