// src/components/PostCardList.tsx
import React from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

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
  gapY?: number;
  onToggleLike: (postId: string) => void;
}

export const AllPostCard = ({
  posts,
  viewType,
  colNum,
  gapY,
  onToggleLike,
}: Props) => {
  const rowCount = Math.ceil(posts.length / Math.max(colNum, 1));
  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 400,
    overscan: 3,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  const rowGapVw = `${pxToDesignUnit(gapY ?? 59, { type: "vw" })}vw`;

  return (
    <div style={{ position: "relative", height: totalHeight }}>
      {virtualRows.map((vRow) => {
        const start = vRow.index * colNum;
        const rowItems = posts.slice(start, start + colNum);
        return (
          <div
            key={vRow.key}
            data-index={vRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${vRow.start}px)`,
              paddingBottom: rowGapVw,
            }}
          >
            <div
              className={clsx(
                "grid",
                colNum === 2 && "grid-cols-2",
                colNum === 3 && "grid-cols-3",
                colNum === 4 && "grid-cols-4",
                colNum === 5 && "grid-cols-5",
                colNum === 6 && "grid-cols-6"
              )}
              style={{}}
            >
              {rowItems.map((post, index) => (
                <div key={`${post.id}-${start + index}`} className="flex justify-center">
                  <OnePostCard
                    posts={post}
                    viewType={viewType}
                    onToggleLike={onToggleLike}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const PostCardPreview = ({
  posts,
  viewType,
  postNum,
  colNum,
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
        <div key={`${post.id}-${index}`} className="flex justify-center ">
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
