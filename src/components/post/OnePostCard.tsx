// src/components/PostCardList.tsx
import React, { useState } from "react";

import PriceTextsHorizontal from "../price/PriceTextsHorizontal";
import LikeViewCount from "@/components/list/LikeViewCount";

import defaultImg from "../../assets/image/post/list/defaultProfile.png";
import heartIcon from "../../assets/image/post/ic_heart.svg";
import redHeartIcon from "../../assets/image/post/ic_red_heart.svg";

export interface PostCard {
  id: string;
  title: string;
  writer: string;
  imagePath: string;
  script: boolean;
  scriptPrice: number;
  performance: boolean;
  performancePrice: number;
  playType: number;
  checked: boolean;
  date: string;
  like: number;
  view: number;
  isLike: boolean;
}

interface Props {
  posts: PostCard;
  viewType: "grid" | "card";
  onToggleLike: (postId: string) => void;
}

export const OnePostCard = ({ posts, viewType, onToggleLike }: Props) => {
  const handleLikeClick = () => {
    onToggleLike(posts.id); // 부모에게 '나 클릭했어' 알려줌
  };

  return (
    <div key={posts.id} className="flex flex-col items-center  max-w-[197px]  ">
      {/* 이미지 */}
      <div className="flex relative border rounded-[20px] mb-[7px] ">
        <img
          src={posts.imagePath === "" ? defaultImg : posts.imagePath}
          alt={posts.title}
          className="object-cover w-full shrink-0"
        />
        <div className="absolute top-[80%] right-[5%]">
          <button onClick={handleLikeClick}>
            <img
              className=""
              src={posts.isLike ? redHeartIcon : heartIcon}
              alt="좋아요"
            ></img>
          </button>
        </div>
      </div>

      {/* 내용 */}
      <h2 className="p-large-bold text-black w-full mb-[3px] truncate ">
        {posts.title}
      </h2>
      <h3 className="w-full text-black truncate p-medium-bold">
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

      <div className="w-full mt-[10px]">
        <LikeViewCount likes={posts.like} views={posts.view} />
      </div>
    </div>
  );
};
