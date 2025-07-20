import React from "react";
import { formatNumber } from "@/utils/formatNumber";
import likeIcon from "./../../assets/image/post/list/ic-fill-heart.svg";
import viewIcon from "./../../assets/image/post/list/ic-outline-eye.svg";
import useWindowDimensions from "@/hooks/useWindowDimensions";
interface LikeViewCountProps {
  likes: number;
  views: number;
}

function LikeViewCount({ likes, views }: LikeViewCountProps) {
  const { widthConditions } = useWindowDimensions();
  const { isSmallMobile } = widthConditions;
  return (
    <div className="flex items-center text-base text-black gap-[10px] ">
      <div className="flex items-center gap-[5px]">
        <img
          src={likeIcon}
          alt="Like"
          className={`flex-shrink-0  aspect-square ${
            isSmallMobile ? "w-[3.75vw] min-w-[12px]" : "w-[18px]"
          }`}
        />
        <span
          className={`${isSmallMobile ? "p-xs-regular" : "p-medium-regular"}`}
        >
          {formatNumber(likes)}
        </span>
      </div>
      <div className="flex items-center  gap-[5px] ">
        <img
          src={viewIcon}
          alt="View"
          className={`flex-shrink-0 aspect-square ${
            isSmallMobile ? "w-[3.75vw] min-w-[12px]" : "w-[18px]"
          }`}
        />
        <span
          className={`${isSmallMobile ? "p-xs-regular" : "p-medium-regular"}`}
        >
          {formatNumber(views)}
        </span>
      </div>
    </div>
  );
}

export default LikeViewCount;
