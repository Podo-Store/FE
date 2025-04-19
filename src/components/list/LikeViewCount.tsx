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
    <div className="flex items-center text-basetext-black gap-[10px]">
      <div className="flex items-center gap-[5px]">
        <img
          src={liekIcon}
          alt="Like"
          className="flex-shrink-0 w-4 h-4 aspect-square"
        />
        <span className="text-black text-[14px] font-normal leading-[20px] font-['Pretendard']">
          {formatNumber(likes)}
        </span>
      </div>
      <div className="flex items-center  gap-[5px] ">
        <img
          src={viewIcon}
          alt="View"
          className="flex-shrink-0 w-4 h-4 aspect-square"
        />
        <span className="text-black text-[14px] font-normal leading-[20px] font-['Pretendard']">
          {formatNumber(views)}
        </span>
      </div>
    </div>
  );
}

export default LikeViewCount;
