// src/components/PostCardList.tsx
import React from "react";

import PriceTextsHorizontal from "../../../components/price/PriceTextsHorizontal";
import LikeViewCount from "@/components/list/LikeViewCount";

import defaultImg from "../../../assets/image/post/list/defaultProfile.png";

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
}

interface Props {
  posts: PostCard;
  viewType: "grid" | "card";
}

export const OnePostCard = ({ posts, viewType }: Props) => {
  return (
    <div key={posts.id} className="flex flex-col items-center ">
      <img
        src={posts.imagePath === "" ? defaultImg : posts.imagePath}
        alt={posts.title}
        className="border border-[#E2E2E2] w-[197px] h-[197px] shrink-0 rounded-[20px] object-cover mb-[7px]"
      />
      <h2 className="text-black font-['Pretendard'] text-[18px] w-full font-bold leading-[28px] mb-[3px] truncate ">
        {posts.title}
      </h2>
      <h3 className="text-[16px] font-bold leading-[24px] font-['Pretendard'] w-full text-black truncate">
        {posts.writer}
      </h3>
      <div className="w-full mt-[9px]">
        <PriceTextsHorizontal
          scriptPrice={posts.scriptPrice}
          performPrice={posts.performancePrice}
        />
      </div>
      <div className="w-full mt-[10px]">
        <LikeViewCount likes={posts.like} views={posts.view} />
      </div>
    </div>
  );
};
