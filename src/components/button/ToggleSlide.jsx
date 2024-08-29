import React from "react";

import "./ToggleSlide.css";

const ToggleSlide = ({ toggle, onChangeToggle }) => {
  return (
    <div className="toggle-slide" onClick={onChangeToggle}>
      <div className={`toggle-btn ${!toggle ? "script" : ""}`}>{toggle ? "공연권" : "대본"}</div>
      <div className="toggle-labels">
        <span>{toggle ? "대본" : null}</span>
        <span>{toggle ? null : "공연권"}</span>
      </div>
    </div>
  );
};

export default ToggleSlide;
