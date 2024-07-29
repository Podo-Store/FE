import React, { useEffect } from "react";
import "./ListPopup.css";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";

const ListPopup = ({ onClose, position }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".list-popup")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="list-popup"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div>
        <img src={scriptImg} alt="대본권 가격" />
        <p>대본권 가격</p>
      </div>
      <div>
        <img src={performImg} alt="공연권 가격" />
        <p>공연권 가격</p>
      </div>
    </div>
  );
};

export default ListPopup;
