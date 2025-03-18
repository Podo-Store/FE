import React from "react";
import "./Box.scss";

const Box = ({ children }) => {
  return (
    <div className="Box">
      <div className="Box-wrap">{children}</div>
    </div>
  );
};

export default Box;
