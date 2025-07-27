import React from "react";
import "./BottomBtn.scss";

// 자신 아래에 component 배치: children 사용
const BottomBtn = ({ ...props }) => {
  return (
    <div className="BottomBtn">
      <button className="bottomButton" {...props}></button>
    </div>
  );
};

export default BottomBtn;
