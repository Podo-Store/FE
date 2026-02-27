// src/components/InfiniteBanner.tsx
import React, { useState, useEffect, useRef } from "react";

import leftBtn from "../../assets/image/post/list/leftBtn.svg";
import rightBtn from "../../assets/image/post/list/rightBtn.svg";
import "./infiniteBanner.scss";
import PodoalBanner1280 from "@/assets/image/banner/podoal_banner_1280.png";
import PodoalBannerDefault from "@/assets/image/postList_banner.png";
import PodoalBanner768 from "@/assets/image/banner/podoal_banner_768.png";
import JunhyukBanner1280 from "@/assets/image/banner/banner_jh_1280.png";
import JunhyukBannerDefault from "@/assets/image/banner/banner_jh_default.png";
import JunhyukBanner768 from "@/assets/image/banner/banner_jh_768.png";
import JinsungBanner1280 from "@/assets/image/banner/banner_js_1280.png";
import JinsungBannerDefault from "@/assets/image/banner/banner_js_default.png";
import JinsungBanner768 from "@/assets/image/banner/banner_js_768.png";
import PurchaseBanner768 from "@/assets/image/banner/purchaseOpen/banner_purchase_768.png";
import PurchaseBanner1280 from "@/assets/image/banner/purchaseOpen/banner_purchase_1280.png";
import PurchaseBannerDefault from "@/assets/image/banner/purchaseOpen/banner_purchase_1920.png";

// bannerImages를 props로 받을 수 있게 처리
type ResponsiveSrc = {
  default: string; // 기본(모바일/기본)
  md?: string; // ≥768px
  lg?: string; // ≥1280px
};

interface BannerItem {
  image: string | ResponsiveSrc; // 문자열 하나 또는 반응형 소스
  link: string;
}

interface InfiniteBannerProps {
  banners?: BannerItem[];
}

const InfiniteBanner = ({
  banners = [
    {
      image: {
        default: PodoalBannerDefault, // 모바일 기본
        md: PodoalBanner768, // 태블릿(≥768)
        lg: PodoalBanner1280, // 데스크톱(≥1280)
      },
      link: "https://brunch.co.kr/@651b8cc89832412",
    },
    {
      image: {
        default: JunhyukBannerDefault,
        md: JunhyukBanner768,
        lg: JunhyukBanner1280,
      },
      link: "https://brunch.co.kr/@651b8cc89832412/20",
    },
    {
      image: {
        default: JinsungBannerDefault,
        md: JinsungBanner768,
        lg: JinsungBanner1280,
      },
      link: "https://brunch.co.kr/@651b8cc89832412/16",
    },
    {
      image: {
        default: PurchaseBannerDefault,
        md: PurchaseBanner768,
        lg: PurchaseBanner1280,
      },
      link: "https://www.podo-store.com/post",
    },
  ],
}: InfiniteBannerProps) => {
  const realBannerCount = banners.length;

  const clonedBannerImages = [banners[realBannerCount - 1], ...banners, banners[0]];

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
    <div className="items-center justify-center w-full h-fit relative mb-[0px] bg-img-div">
      <div className="relative flex w-full h-full overflow-hidden shrink-0 rounded-[50px]">
        <div
          className="flex h-full will-change-transform"
          style={{
            transform: `translateX(-${fakeIndex * 100}%)`,
            transition: isTransitioning ? "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
            width: `${clonedBannerImages.length * 100}%`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedBannerImages.map((banner, idx) => {
            const img = banner.image;
            const isResponsive = typeof img !== "string";
            return (
              <div className="flex-none w-full h-full" key={idx}>
                <a href={banner.link} className="block w-full h-full">
                  {isResponsive ? (
                    <picture>
                      {/* 데스크톱(≥1920px) → default */}
                      <source media="(min-width: 1920px)" srcSet={img.default} />
                      {/* 데스크톱(≥1280px) */}
                      {img.lg && <source media="(min-width: 1280px)" srcSet={img.lg} />}
                      {/* 태블릿(≥768px) */}
                      {img.md && <source media="(min-width: 768px)" srcSet={img.md} />}
                      {/* 최종 폴백(모바일) */}
                      <img
                        src={img.default}
                        alt=""
                        className="w-full h-full object-contain rounded-[50px]"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  ) : (
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain rounded-[50px]"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </a>
              </div>
            );
          })}
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
        {banners.map((_, idx) => (
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
