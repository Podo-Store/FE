import React from "react";
import "./BottomBtn.css";

// 자신 아래에 component 배치: children 사용
const BottomBtn = ({ onClick, disabled, children }) => {
  return (
    <div className="BottomBtn">
      <button onClick={onClick} disabled={disabled} className="bottomButton">
        {children}
      </button>
    </div>
  );
};

export default BottomBtn;
