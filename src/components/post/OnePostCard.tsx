// src/components/PostCardList.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceTextsHorizontal from "../price/PriceTextsHorizontal";
import LikeViewCount from "@/components/list/LikeViewCount";

import defaultImg from "../../assets/image/post/list/defaultProfile.png";
import heartIcon from "../../assets/image/post/ic_heart.svg";
import redHeartIcon from "../../assets/image/post/ic_red_heart.svg";
import { ScriptItem } from "@/api/user/postListApi";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import "./OnePostCard.scss";

interface Props {
  posts: ScriptItem;
  viewType: "grid" | "card";
  onToggleLike: (postId: string) => void;
}

export const OnePostCard = ({ posts, viewType, onToggleLike }: Props) => {
  const navigate = useNavigate();
  const { widthConditions } = useWindowDimensions();
  const { isSmallMobile } = widthConditions;

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // 좋아요 클릭 시 navigate 막기
    onToggleLike(posts.id); // 부모에게 '나 클릭했어' 알려줌
  };

  const handleCardClick = () => {
    navigate(`/list/detail/${posts.id}`);
  };

  return (
    <div
      key={posts.id}
      className="flex flex-col items-center cursor-pointer one-post-card"
      onClick={handleCardClick}
    >
      {/* 이미지 */}
      <div
        className={`flex relative rounded-[20px] bg-white mb-[7px]  w-full  ${
          posts.imagePath !== "" ? "border border-[var(--grey3)]" : ""
        }`}
      >
        <img
          src={posts.imagePath === "" ? defaultImg : posts.imagePath}
          alt={posts.title}
          className="object-contain w-full h-auto shrink-0 rounded-[20px]  aspect-square "
        />
        <div className="absolute heart aspect-square">
          <button onClick={handleLikeClick}>
            <img
              className=" transition-all duration-100 hover:scale-[1.2] w-full "
              src={posts.like ? redHeartIcon : heartIcon}
              alt="좋아요"
            ></img>
          </button>
        </div>
      </div>

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
      {viewType === "card" ? (
        <div className="w-full mt-[9px]">
          <PriceTextsHorizontal
            scriptPrice={posts.scriptPrice}
            performPrice={posts.performancePrice}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="w-full mt-[10px] ">
        <LikeViewCount likes={posts.likeCount} views={posts.viewCount} />
      </div>
    </div>
  );
};
