import React, { useEffect } from "react";

import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";

import "./ListPopup.css";
import "./../../styles/text.css";

const ListPopup = ({ onClose, position }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".list-popup") && !event.target.closest(".info-button")) {
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
        <img id="script" src={scriptImg} alt="대본권 가격" />
        <p className="p-xs-regular">대본권 가격</p>
      </div>
      <div>
        <img
          id="perform"
          src={performImg}
          alt="공연권 가격"
          style={{ width: "0.9375rem", height: "0.9375rem" }}
        />
        <p className="p-xs-regular">공연권 가격</p>
      </div>
    </div>
  );
};

export default ListPopup;
