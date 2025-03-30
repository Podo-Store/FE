import { useRef, useState } from "react";

import Page3Cards from "./Page3Cards";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import { organizationsLength } from "@/constants/organizations";

import "./Page3.scss";

// THX to Skillthrive: https://youtu.be/McPdzhLRzCg?si=swwfYJhFEB-4bOsl
const Page3 = () => {
  // 슬라이드 총 개수
  const [currentSlide, setCurrentSlide] = useState(0);

  // for responsive design
  const { widthConditions } = useWindowDimensions();
  const isTablet = widthConditions.isTablet || widthConditions.isMobile;
  // const isMobile = widthConditions.isMobile;

  const slidesPerPage = !isTablet ? 5 : 3;
  const totalSlides = Math.ceil(organizationsLength / slidesPerPage);

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSlide = (direction: "prev" | "next") => {
    let newSlide;
    if (direction === "prev") {
      newSlide = currentSlide !== 0 ? currentSlide - 1 : currentSlide;
      setCurrentSlide(newSlide);
    } else {
      newSlide = currentSlide !== totalSlides - 1 ? currentSlide + 1 : currentSlide;
      setCurrentSlide(newSlide);
    }

    if (sliderRef.current) {
      if (!isTablet) {
        // 기본: 좌우 슬라이드
        sliderRef.current.scrollTo({
          left: sliderRef.current.offsetWidth * newSlide,
          behavior: "smooth",
        });
      } else {
        // responsive: 상하 슬라이드
        sliderRef.current.scrollTo({
          top: sliderRef.current.offsetHeight * newSlide,
          behavior: "smooth",
        });
      }
    }
  };

  const renderPage3Cards = () => {
    const cards = [];
    for (let i = 0; i < totalSlides; i++) {
      cards.push(
        <div className="slide" key={i}>
          <Page3Cards
            pageStartNum={i * slidesPerPage}
            onPrevSlide={() => handleSlide("prev")}
            onNextSlide={() => handleSlide("next")}
            setLeftArrowDisappear={currentSlide === 0}
            setRightArrowDisappear={currentSlide === totalSlides - 1}
          />
        </div>
      );
    }
    return cards;
  };

  return (
    <div className="page3 page-size">
      <h1 className="title_64px">포도상점과 함께하고 있어요</h1>
      <h3 className="title_20px">포도상점은 다양한 공연 단체와 협력하고 있어요.</h3>

      <div className="j-content-center">
        <div className="slider-wrapper">
          <div className="slider" ref={sliderRef}>
            {renderPage3Cards()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;
