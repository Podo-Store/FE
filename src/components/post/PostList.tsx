// src/components/PostCardList.tsx
import React from "react";

import PriceTextsHorizontal from "../price/PriceTextsHorizontal";
import LikeViewCount from "@/components/list/LikeViewCount";

import defaultImg from "../../../assets/image/post/list/defaultProfile.png";
import { OnePostCard } from "./OnePostCard";
import clsx from "clsx";
import { pxToDesignUnit } from "@/utils/unitCalc";
import { ScriptItem } from "@/api/user/postListApi";
interface Props {
  posts: ScriptItem[];
  viewType: "grid" | "card";
  postNum?: number; // <- optional
  colNum: number;
  gapX?: number;
  gapY?: number;
  onToggleLike: (postId: string) => void;
}

export const AllPostCard = ({
  posts,
  viewType,
  colNum,
  gapX,
  gapY,
  onToggleLike,
}: Props) => {
  return (
    <div
      className={clsx(
        "grid",
        colNum === 2 && "grid-cols-2",
        colNum === 3 && "grid-cols-3",
        colNum === 4 && "grid-cols-4",
        colNum === 5 && "grid-cols-5",
        colNum === 6 && "grid-cols-6"
      )}
      style={{
        rowGap: `${pxToDesignUnit(gapY ?? 59, { type: "vw" })}vw`,
      }}
    >
      {posts.map((post, index) => (
        <div key={`${post.id}-${index}`} className="flex justify-center">
          <OnePostCard
            posts={post}
            viewType={viewType}
            onToggleLike={onToggleLike}
          />
        </div>
      ))}
    </div>
  );
};

export const PostCardPreview = ({
  posts,
  viewType,
  postNum,
  colNum,
  gapX,
  gapY,
  onToggleLike,
}: Props) => {
  return (
    <div
      className={clsx(
        "grid",
        colNum === 2 && "grid-cols-2",
        colNum === 3 && "grid-cols-3",
        colNum === 4 && "grid-cols-4",
        colNum === 5 && "grid-cols-5",
        colNum === 6 && "grid-cols-6"
      )}
      style={{
        rowGap: `${pxToDesignUnit(gapY ?? 59, { type: "vw" })}vw`,
      }}
    >
      {posts.slice(0, postNum).map((post, index) => (
        <div key={`${post.id}-${index}`} className="flex justify-center">
          <OnePostCard
            posts={post}
            viewType={viewType}
            onToggleLike={onToggleLike}
          />
        </div>
      ))}
    </div>
  );
};
