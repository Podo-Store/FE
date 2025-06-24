import React from "react";
import { formatNumber } from "@/utils/formatNumber";
import liekIcon from "./../../assets/image/post/list/ic-fill-heart.svg";
import viewIcon from "./../../assets/image/post/list/ic-outline-eye.svg";

interface LikeViewCountProps {
  likes: number;
  views: number;
}

function LikeViewCount({ likes, views }: LikeViewCountProps) {
  return (
    <div className="flex items-center text-basetext-black gap-[10px] ">
      <div className="flex items-center gap-[5px]">
        <img
          src={liekIcon}
          alt="Like"
          className="flex-shrink-0 w-[18px] aspect-square"
        />
        <span className="p-medium-regular">{formatNumber(likes)}</span>
      </div>
      <div className="flex items-center  gap-[5px] ">
        <img
          src={viewIcon}
          alt="View"
          className="flex-shrink-0 w-[18px] aspect-square"
        />
        <span className="p-medium-regular">{formatNumber(views)}</span>
      </div>
    </div>
  );
}

export default LikeViewCount;
