import React, { useEffect, useState } from "react";

import CardsContent from "../components/landing/CardsContent";

import firstImage from "../assets/image/LangPageDownArrow.svg";
import secondImage from "../assets/image/Landing1.png";
import page3Cloud from "../assets/image/landing/page3Cloud.svg";
import facebook from "../assets/image/landing/page4/facebook.svg";
import instagram from "../assets/image/landing/page4/instagram.svg";
import youtube from "../assets/image/landing/page4/youtube.svg";

import "./MainVer2.scss";

const MainVer2 = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 3페이지 카드 오픈 여부
  const [isOpened, setIsOpened] = useState({ 0: true, 1: false, 2: false, 3: false, 4: false });

  // 100vh만큼 스크롤 변경
  const targetScroll = window.innerHeight;

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

  // 스크롤 비활성화
  // useEffect(() => {
  //   window.addEventListener("wheel", wheelHandler);

  //   return () => {
  //     window.removeEventListener("wheel", wheelHandler);
  //   };
  // }, [hasScrolled, isAnimating]);

  useEffect(() => {
    // 3페이지 모든 카드가 closed일 경우 첫번째 카드를 open으로 설정
    if (!Object.values(isOpened).includes(true)) {
      setIsOpened((prev) => ({ ...prev, 0: true }));
    }
    // 첫번째 카드 이외의 다른 카드가 open일 경우 첫번째 카드를 closed로 설정
    else if (isOpened[0] && Object.values(isOpened).filter((value) => value).length > 1) {
      setIsOpened((prev) => ({ ...prev, 0: false }));
    }
  }, [isOpened]);

  return (
    <div className="main-ver2">
      <div>
        <div className="background-container">
          <div id="a1"></div>

          <div id="title">
            <div id="purple-rectangle"></div>

            <h1>
              대본과 공연권 거래<br></br>저희가 도와드릴게요!
            </h1>
          </div>

          <img src={firstImage} alt="First" className="arrow" />
        </div>
        <img src={secondImage} alt="Second" className="resized-image" />

        <div className="page3 page-size">
          <h1 className="title_64px">포도상점과 함께하고 있어요</h1>
          <h3 className="title_20px">포도상점은 다양한 공연 단체와 협력하고 있어요.</h3>
          <div className="cards d-flex">
            <CardsContent pageNum={0} isOpened={isOpened[0]} setIsOpened={setIsOpened} />
            <CardsContent pageNum={1} isOpened={isOpened[1]} setIsOpened={setIsOpened} />
            <CardsContent pageNum={2} isOpened={isOpened[2]} setIsOpened={setIsOpened} />
            <CardsContent pageNum={3} isOpened={isOpened[3]} setIsOpened={setIsOpened} />
            <CardsContent pageNum={4} isOpened={isOpened[4]} setIsOpened={setIsOpened} />
          </div>
          <img src={page3Cloud} alt="Third" className="resized-image bottom-position" />
        </div>

        <div className="page4 page-size">
          <div>
            <h1 className="title_64px">포도상점을 더 알고 싶다면?</h1>
            <h3 className="title_20px">포도상점만의 이야기를 들려드릴게요.</h3>
          </div>
          <div className="page4-button-wrap j-content-center">
            <Page4Button
              src={instagram}
              alt="instagram"
              onClick={() => {
                window.open(`https://www.instagram.com/podosangjeom`, "_blank");
              }}
            />
            <Page4Button
              src={facebook}
              alt="facebook"
              onClick={() => {
                window.open(`https://www.facebook.com/profile.php?id=61565446313244`, "_blank");
              }}
            />
            <Page4Button
              src={youtube}
              alt="youtube"
              onClick={() => {
                window.open(`https://www.youtube.com/@포도상점`, "_blank");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainVer2;

const Page4Button = ({ src, alt, onClick }) => {
  return (
    <button className="page4-button c-pointer" onClick={onClick}>
      <img src={src} alt={alt} />
    </button>
  );
};
