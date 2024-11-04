import firstImage from "../assets/image/LangPageDownArrow.svg";
import secondImage from "../assets/image/Landing1.png";

import "./MainVer1.css";

import React, { useEffect, useState } from "react";

const MainVer1 = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const targetScroll = 1080;

  const smoothScrollTo = (target) => {
    setIsAnimating(true); // 애니메이션 시작
    const startY = window.scrollY;
    const distance = target - startY;
    const duration = 600;
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easing = progress * (2 - progress); // 가속 및 감속 효과

      window.scrollTo(0, startY + distance * easing);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsAnimating(false); // 애니메이션이 끝난 후 다시 스크롤 가능
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const wheelHandler = (event) => {
    if (isAnimating) return; // 애니메이션 중에는 이벤트 무시

    const scrollY = window.scrollY;

    // 아래로 스크롤: deltaY가 양수일 때
    if (!hasScrolled && event.deltaY > 0 && scrollY < targetScroll) {
      smoothScrollTo(targetScroll);
      setHasScrolled(true);
    }
    // 위로 스크롤: deltaY가 음수일 때
    else if (hasScrolled && event.deltaY < 0 && scrollY > 0) {
      smoothScrollTo(0);
      setHasScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", wheelHandler);

    return () => {
      window.removeEventListener("wheel", wheelHandler);
    };
  }, [hasScrolled, isAnimating]);

  return (
    <div>
      <div>
        <div className="background-container">
          <div id="a1"></div>

          <div id="title">
            <div id="purple-rectangle"></div>

            <h1>
              대본과 공연권 거래<br></br>저희가 도와드릴게요!
            </h1>
          </div>

          <img src={firstImage} alt="First" className="arrow-animation" />
        </div>
        <img src={secondImage} alt="Second" className="resized-image" />
      </div>
    </div>
  );
};

export default MainVer1;
