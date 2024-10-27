import "./MainVer1.css";
import firstImage from "../assets/image/LangPageDownArrow.svg";
import secondImage from "../assets/image/Landing1.png";
import React, { useEffect, useState } from "react";

const MainVer1 = () => {
  const [hasScrolled, setHasScrolled] = useState(false); // 스크롤 상태 관리
  const [lastScrollY, setLastScrollY] = useState(0); // 마지막 스크롤 위치 저장

  const scrollHandler = () => {
    const scrollY = window.scrollY;

    // 아래로 스크롤할 때, 초기 상태에서만 1080까지 자동 스크롤
    if (!hasScrolled && scrollY > lastScrollY && scrollY < 1080) {
      window.scrollTo({
        top: 1080,
        left: 0,
        behavior: "smooth",
      });
      setHasScrolled(true); // 스크롤 완료 후 상태 변경
    }
    // 위로 스크롤 시작 시 확 위로 올라가도록 설정
    else if (hasScrolled && scrollY < lastScrollY) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setHasScrolled(false); // 상태 초기화
    }

    // 마지막 스크롤 위치 업데이트
    setLastScrollY(scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [hasScrolled, lastScrollY]); // `hasScrolled`와 `lastScrollY`가 변경될 때마다 useEffect 실행

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
