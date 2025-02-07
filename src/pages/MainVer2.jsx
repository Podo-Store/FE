import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ImageBtn from "../components/button/ImageBtn";
import Page4Button from "../components/button/landing/Page4Button";
import CardsContent from "../components/landing/CardsContent";

import arrow from "../assets/image/landing/Vector 22.svg";
import circleIcon from "../assets/image/landing/page1.png";
import { good, page2ButtonImg, page2CardTitle, stage, typing } from "../assets/image/landing/page2";
import rightArrow from "../assets/image/landing/Vector 22 Right.svg";
import facebook from "../assets/image/landing/page4/facebook.svg";
import instagram from "../assets/image/landing/page4/instagram.svg";
import youtube from "../assets/image/landing/page4/youtube.svg";

import "./MainVer2.scss";
import "./MainVer2Page2.scss";

const MainVer2 = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 3페이지 카드 오픈 여부
  const [isOpened, setIsOpened] = useState({ 0: true, 1: false, 2: false, 3: false, 4: false });

  const navigate = useNavigate();

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
        <div className="page1 f-dir-column j-content-between">
          <div className="title-wrap f-dir-column p-relative">
            <h1 className="title">
              대본과 공연권 거래
              <br />
              포도상점에서
            </h1>

            <h5 className="sub-title">
              대본과 공연권 모두 간단하고 편리하게 거래해요!
              <br />
              여러분들이 원하던 플랫폼,
              <br />
              포도상점을 시작하세요!
            </h5>

            <img src={circleIcon} alt="circle" className="circle-icon" />
          </div>
          <div className="j-content-center">
            <img src={arrow} alt="First" className="arrow" />
          </div>
        </div>

        <div className={`page2 ${window.innerWidth >= 1600 && "page-size"}`}>
          <h1 className="page2-title title_64px">포도상점에서는 이런 것들이 가능해요</h1>
          <div className="page2-content-wrap j-content-center">
            <div className="page2-content" onClick={() => navigate("/list")}>
              <img src={page2CardTitle} alt="" className="page2-content-title" />
              <h1 className="h1-medium">작품 둘러보기</h1>

              <h4 className="h4-regular c-white">
                다양한 작품을 마음껏 둘러보고 <br />
                원하는 걸 골라보세요!
              </h4>
              <div className="page2-img-wrap j-content-center">
                <img src={stage} alt="" />
              </div>

              <ImageBtn src={page2ButtonImg} alt="->" className="page2-button" />
            </div>

            <div
              className="page2-content f-dir-column j-content-between"
              onClick={() => navigate("/post")}
            >
              <img src={page2CardTitle} alt="" className="page2-content-title" />
              <div className="page2-img-wrap j-content-end">
                <img src={typing} alt="" />
              </div>
              <div>
                <h4 className="h4-regular c-white">
                  여러분의 톡톡 튀는 아이디어, <br />
                  포도상점에 올려주세요!
                </h4>

                <h1 className="h1-medium">작품 등록하기</h1>

                <ImageBtn src={page2ButtonImg} alt="->" className="page2-button" />
              </div>
            </div>

            <div className="page2-content" onClick={() => navigate("/mypage/purchased")}>
              <img src={page2CardTitle} alt="" className="page2-content-title" />
              <h1 className="h1-medium t-right">공연권 신청하기</h1>

              <h4 className="h4-regular c-white t-right">
                구매한 작품의 <br />
                공연권을 바로 신청해보세요!
              </h4>

              <div className="page2-img-wrap j-content-center">
                <img src={good} alt="" />
              </div>

              <ImageBtn src={page2ButtonImg} alt="->" className="page2-button" />
            </div>
          </div>
        </div>

        <div className="page3 page-size">
          <h1 className="title_64px">포도상점과 함께하고 있어요</h1>
          <h3 className="title_20px">포도상점은 다양한 공연 단체와 협력하고 있어요.</h3>
          <div className="cards j-content-center">
            <div className="a-items-center">
              <img id="left" className="cards-arrow" src={rightArrow} alt="<" />
            </div>
            <div className="j-content-center">
              <CardsContent pageNum={0} isOpened={isOpened[0]} setIsOpened={setIsOpened} />
              <CardsContent pageNum={1} isOpened={isOpened[1]} setIsOpened={setIsOpened} />
              <CardsContent pageNum={2} isOpened={isOpened[2]} setIsOpened={setIsOpened} />
              <CardsContent pageNum={3} isOpened={isOpened[3]} setIsOpened={setIsOpened} />
              <CardsContent
                pageNum={4}
                isOpened={isOpened[4]}
                setIsOpened={setIsOpened}
                rightMargin={false}
              />
            </div>
            <div className="a-items-center">
              <img className="cards-arrow" src={rightArrow} alt=">" />
            </div>
          </div>
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
