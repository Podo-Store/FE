// @ts-check
import React, { useEffect, useState } from "react";

import ImageBtn from "./button/ImageBtn";

import closeBtn from "./../assets/image/button/aiOutlineCloseWhite.svg";

import "./BrowserWarning.css";

const BrowserWarning: React.FC = () => {
  const [isChrome, setIsChrome] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isChromium = userAgent.includes("Chrome") || userAgent.includes("Chromium");
    const isEdge = userAgent.includes("Edg"); // Chromium 기반 Edge
    const isOpera = userAgent.includes("OPR"); // Opera
    const isBrave = userAgent.includes("Brave"); // Brave

    // 실제 Chrome인지 확인
    if (isChromium && !isEdge && !isOpera && !isBrave) {
      setIsChrome(true);
    } else {
      setIsChrome(false);
    }
  }, []);

  if (isChrome) {
    return null;
  }

  return (
    <div className="browser-warning j-content-between a-items-center">
      <div></div>
      <p className="h5-bold c-white t-center">
        이 사이트는 Chrome 브라우저에 최적화되어 있어, 현재 브라우저에서는 정상 작동하지 않을 수
        있습니다.
      </p>
      <ImageBtn
        className="close-btn"
        src={closeBtn}
        alt="X"
        size="3.241vh"
        onClick={() => setIsChrome(false)}
      />
    </div>
  );
};

export default BrowserWarning;
