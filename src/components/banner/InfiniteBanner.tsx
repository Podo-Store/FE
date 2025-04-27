// src/components/InfiniteBanner.tsx
import React, { useState, useEffect, useRef } from "react";

import leftBtn from "../../assets/image/post/list/leftBtn.svg";
import rightBtn from "../../assets/image/post/list/rightBtn.svg";

// bannerImages를 props로 받을 수 있게 처리
interface InfiniteBannerProps {
  images: string[];
}

const InfiniteBanner = ({ images }: InfiniteBannerProps) => {
  const realBannerCount = images.length;

  const clonedBannerImages = [
    images[realBannerCount - 1],
    ...images,
    images[0],
  ];

  const [fakeIndex, setFakeIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const moveToIndex = (index: number) => {
    if (index < 0 || index >= clonedBannerImages.length) return;
    setIsTransitioning(true);
    setFakeIndex(index);
  };

  const startAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      moveToIndex(fakeIndex + 1); // 다음 배너로 이동
    }, 5000);
  };

  const handleTransitionEnd = () => {
    if (fakeIndex === 0) {
      requestAnimationFrame(() => {
        setFakeIndex(realBannerCount);
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      });
    } else if (fakeIndex === clonedBannerImages.length - 1) {
      requestAnimationFrame(() => {
        setFakeIndex(1);
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      });
    } else {
      setIsTransitioning(false);
    }
  };

  const handlePrev = () => {
    if (fakeIndex <= 0) return;

    moveToIndex(fakeIndex - 1);
    startAutoSlide();
  };

  const handleNext = () => {
    if (fakeIndex >= clonedBannerImages.length - 1) return;
    moveToIndex(fakeIndex + 1);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fakeIndex]);

  return (
    <div className="flex items-center justify-center w-full h-[300px] relative mb-[0px]">
      <div className="relative flex w-full h-full overflow-hidden shrink-0 rounded-[50px]">
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translateX(-${fakeIndex * 100}%)`,
            transition: isTransitioning
              ? "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)"
              : "none",
            width: `${clonedBannerImages.length * 100}%`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedBannerImages.map((img, idx) => (
            <div className="flex-none w-full h-full" key={idx}>
              <div
                className="w-full h-full bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 좌우 이동 버튼 */}
      <img
        className="absolute top-1/2 left-[-25px] w-[50px] h-[42px] translate-y-[-50%] z-10 cursor-pointer"
        src={leftBtn}
        alt="이전 배너"
        onClick={handlePrev}
      />
      <img
        className="absolute top-1/2 right-[-25px] w-[50px] h-[42px] translate-y-[-50%] cursor-pointer"
        src={rightBtn}
        alt="다음 배너"
        onClick={handleNext}
      />

      {/* 인디케이터 */}
      <div className="flex absolute bottom-[10px] left-[50%] translate-x-[-50%] gap-[8px]">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-[10px] h-[10px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
              idx + 1 === fakeIndex ? "bg-[#333]" : "bg-[#ccc]"
            }`}
            onClick={() => {
              moveToIndex(idx + 1);
              startAutoSlide();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteBanner;
