import React, { useState } from "react";

import { SERVER_URL } from "../../../constants/ServerURL.js";

import { AllPostCard, PostCardPreview } from "./PostList.js";

import BannerImage1 from "./../../../assets/image/listBanner.jpg";
import leftBtn from "./../../../assets/image/post/list/leftBtn.svg";
import rightBtn from "./../../../assets/image/post/list/rightBtn.svg";
import cardView from "./../../../assets/image/post/list/ic_card_view.svg";
import gridView from "./../../../assets/image/post/list/ic_grid_view.svg";

import { mockData } from "./mockData.js";

const bannerImages = [BannerImage1, BannerImage1, BannerImage1];
const stages = ["포도밭", "포도알", "포도송이", "와인"];
const storyLength = ["전체", "장편", "단편"];
const inactiveStages = ["포도송이", "와인"];

const PostList = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("포도밭");
  const [activeStoryLength, setActiveStoryLength] = useState("전체");
  const [viewType, setViewType] = useState<"grid" | "card">("grid");

  const handleBannerPrev = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const handleBannerNext = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleViewType = () => {
    setViewType((prev) => (prev === "grid" ? "card" : "grid"));
  };

  return (
    <div className=" flex flex-col pt-[72px] px-[320px] ">
      {/*------ 작품 둘러보기 ------*/}
      <h1 className="text-[20px] font-bold leading-[28px] tracking-[-0.4px] text-black font-['Pretendard'] mb-[30px]">
        작품 둘러보기
      </h1>

      {/*------ 배너 ------*/}
      <div className="flex items-center justify-center w-full h-[300px] relative  mb-[0px]">
        <div className="relative flex w-full h-full overflow-hidden shrink-0 rounded-[50px]">
          {/* 배너 이미지 */}
          <div
            className="flex h-full transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            style={{
              transform: `translateX(-${currentBannerIndex * 100}%)`,
              width: `${bannerImages.length * 100}%`,
            }}
          >
            {bannerImages.map((img, idx) => (
              <div className="flex-none w-full h-full" key={idx}>
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover "
                  style={{ backgroundImage: `url(${img})` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 배너 이동 버튼 */}

        <img
          className="absolute top-1/2 left-[-25px] w-[50px] h-[42px] translate-y-[-50%] z-10"
          src={leftBtn}
          alt="banner left btn"
          onClick={handleBannerPrev}
        />
        <img
          className="absolute top-1/2 right-[-25px] w-[50px] h-[42px] translate-y-[-50%]"
          src={rightBtn}
          alt="banner right btn"
          onClick={handleBannerNext}
        />

        {/* 배너 페이지 표시 */}
        <div className="flex absolute bottom-[10px] left-[50%] translate-x-[-50%] gap-[8px]">
          {bannerImages.map((_, idx) => (
            <span
              key={idx}
              className={`w-[10px] h-[10px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out ${
                idx === currentBannerIndex ? "bg-[#333]" : "bg-[#ccc]"
              }`}
              onClick={() => setCurrentBannerIndex(idx)}
            ></span>
          ))}
        </div>
      </div>

      {/*------ 스테이지 메뉴 ------*/}

      <ul
        className="flex relative list-none mt-[21px] mb-[-4px]"
        style={{ padding: 0 }}
      >
        {stages.map((stage) => {
          const isActive = activeCategory === stage;
          const isInactive = inactiveStages.includes(stage);

          return (
            <li
              key={stage}
              className={`z-10 px-[15px] py-[10px] text-[20px] leading-[28px] font-medium tracking-[-0.4px] font-['Pretendard']
                ${isInactive ? "text-[#777]" : "text-black"}
                  ${
                    isActive
                      ? "border-b-4 border-[#6A39C0] rounded-[1px] "
                      : "text-black"
                  }
                
              `}
            >
              {stage}
            </li>
          );
        })}
      </ul>
      <span className=" -mx-[320px] w-screen h-[1px] block bg-[#E2E2E2] z-0 "></span>

      {/*------  하단 메뉴 ------ */}
      <div className="flex items-center justify-between w-full">
        {/*------ 장/단편 메뉴 ------ */}
        <ul className="flex list-none " style={{ padding: 0, margin: 0 }}>
          {storyLength.map((length) => {
            const isActive = activeStoryLength === length;
            return (
              <li
                key={length}
                className={`z-10 px-[15px] py-[10px] text-[20px] leading-[28px] font-medium tracking-[-0.4px] font-['Pretendard']  ${
                  isActive
                    ? "border-b-2 border-[#6A39C0] rounded-[1px] "
                    : "text-black"
                }`}
              >
                {length}
              </li>
            );
          })}
        </ul>
        {/*------ 정렬 방식 + 보기 방식 ------*/}
        <div className="flex ml-auto gap-[10px]">
          {/* 정렬 방식 */}
          <div>
            <select>
              <option>조회수순</option>
              <option>좋아요순</option>
              <option>최신순</option>
            </select>
          </div>
          <img></img>
        </div>

        {/* 보기 방식 */}
        <div>
          <img
            src={viewType === "grid" ? gridView : cardView}
            alt={
              viewType === "grid" ? "그리드 보기로 전환" : "카드 보기로 전환"
            }
            onClick={toggleViewType}
          />
        </div>
      </div>

      {activeStoryLength === "전체" ? (
        <div className=" mt-[44px]  mb-[44px]">
          <section>
            <div className="flex justify-between">
              {" "}
              <h2 className="text-black text-[20px] font-medium leading-[28px] tracking-[-0.4px] font-['Pretendard']">
                단편극
              </h2>
              <button className="flex px-[25px] py-[3px] justify-center items-center rounded-[30px] border-[2.5px] border-[#6A39C0] bg-[#FFF]">
                <p className="text-center text-[14px] font-bold leading-[20px] text-[#6A39C0] font-['Pretendard']">
                  더보기
                </p>
              </button>
            </div>

            <PostCardPreview posts={mockData} viewType={viewType} />
          </section>
          <section>
            <div className="flex justify-between mt-[74px]">
              <h2 className="text-black text-[20px] font-medium leading-[28px] tracking-[-0.4px] font-['Pretendard']">
                장편극
              </h2>
              <button className="flex px-[25px] py-[3px] justify-center items-center rounded-[30px] border-[2.5px] border-[#6A39C0] bg-[#FFF]">
                <p className="text-center text-[14px] font-bold leading-[20px] text-[#6A39C0] font-['Pretendard']">
                  더보기
                </p>
              </button>
            </div>
            <PostCardPreview posts={mockData} viewType={viewType} />
          </section>
        </div>
      ) : (
        <AllPostCard posts={mockData} viewType={viewType} />
      )}
    </div>
  );
};

export default PostList;
