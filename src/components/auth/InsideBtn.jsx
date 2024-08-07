import React from "react";
import "./InsideBtn.css";

const BottomBtn = ({ onClick, disabled, children }) => {
  return (
    <div className="InsideBtn">
      <button onClick={onClick} disabled={disabled} className="insideButton">
        {children}
      </button>
    </div>
  );
};

export default BottomBtn;
