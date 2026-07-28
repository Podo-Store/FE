// src/components/PostCardList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceTextsHorizontal from "../price/PriceTextsHorizontal";
import LikeViewCount from "@/components/list/LikeViewCount";

import defaultImg_noneBorder from "../../assets/image/post/list/defaultProfile_noneBorder.png";
import heartIcon from "../../assets/image/post/ic_heart.svg";
import redHeartIcon from "../../assets/image/post/ic_red_heart.svg";
import { ScriptItem } from "@/api/user/postListApi";

import useWindowDimensions from "@/hooks/useWindowDimensions";

interface Props {
  posts: ScriptItem;
  viewType: "grid" | "card";
  onToggleLike: (postId: string) => void;
  priority?: boolean;
}

export const OnePostCard = ({
  posts,
  viewType,
  onToggleLike,
  priority = false,
}: Props) => {
  const navigate = useNavigate();
  const { widthConditions } = useWindowDimensions();
  const { isSmallMobile } = widthConditions;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [posts.imagePath]);

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 좋아요 클릭 시 navigate 막기
    onToggleLike(posts.id); // 부모에게 '나 클릭했어' 알려줌
  };

  const handleCardClick = () => {
    navigate(`/detail/${posts.id}`);
  };

  return (
    <div
      key={posts.id}
      className="flex w-full max-w-[197px] max-[479px]:w-[120px] flex-col items-center cursor-pointer"
      onClick={handleCardClick}
    >
      {/* 이미지 */}
      <div
        className="flex relative overflow-hidden rounded-[20px] bg-white mb-[7px] w-full border border-[var(--grey3)] transition-transform duration-200 ease-out motion-reduce:transition-none hover:scale-[1.04]"
      >
        {!isImageLoaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-pulse bg-[#f0f0f0] motion-reduce:animate-none"
          />
        )}
        <img
          src={posts.imagePath === "" ? defaultImg_noneBorder : posts.imagePath}
          alt={posts.title}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={`object-contain w-full h-auto shrink-0 rounded-[20px] aspect-square transition-opacity duration-200 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={(event) => {
            event.currentTarget.src = defaultImg_noneBorder;
          }}
        />
        <div className="absolute bottom-[8px] right-[10px] aspect-square w-[35px] max-[479px]:bottom-[6px] max-[479px]:right-[7px] max-[479px]:w-[27px]">
          <button onClick={handleLikeClick}>
            <img
              className=" transition-all duration-100 hover:scale-[1.2] w-full "
              src={posts.like ? redHeartIcon : heartIcon}
              alt="좋아요"
            ></img>
          </button>
        </div>
      </div>

      <div className="w-full pl-[2px]">
        {/* 내용 */}
        <h2
          className={` text-black w-full mb-[3px] truncate ${
            isSmallMobile ? "p-small-bold" : "p-large-bold"
          }`}
        >
          {posts.title}
        </h2>
        <h3
          className={`w-full text-black truncate  ${
            isSmallMobile ? "p-12-bold " : "p-medium-bold"
          }`}
        >
          {posts.writer}
        </h3>
        <div className="w-full mt-[8px] sm:mt-[10px]">
          {viewType === "card" ? (
            <div className="w-full mb-[5px] sm:mb-[10px]">
              <PriceTextsHorizontal
                scriptPrice={posts.scriptPrice}
                performPrice={posts.performancePrice}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="w-full ">
            <LikeViewCount likes={posts.likeCount} views={posts.viewCount} />
          </div>
        </div>
      </div>
    </div>
  );
};
