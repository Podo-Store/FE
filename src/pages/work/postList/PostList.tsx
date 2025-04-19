// src/components/PostCardList.tsx
import React from "react";

import PriceTextsHorizontal from "../../../components/price/PriceTextsHorizontal";
import LikeViewCount from "@/components/list/LikeViewCount";

import defaultImg from "../../../assets/image/post/list/defaultProfile.png";
import { PostCard, OnePostCard } from "./OnePostCard";

interface Props {
  posts: PostCard[];
  viewType: "grid" | "card";
}

export const AllPostCard = ({ posts, viewType }: Props) => {
  return (
    <div
      className={`grid grid-cols-5
      gap-[74px] mt-[28px]`}
    >
      {posts.map((post) => (
        <OnePostCard posts={post} viewType={viewType} />
      ))}
    </div>
  );
};

export const PostCardPreview = ({ posts, viewType }: Props) => {
  return (
    <div
      className={`grid grid-cols-5
      gap-[74px] mt-[28px]`}
    >
      {posts.slice(0, 10).map((post) => (
        <OnePostCard posts={post} viewType={viewType} />
      ))}
    </div>
  );
};
