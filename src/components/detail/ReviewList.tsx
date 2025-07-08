import { useState } from "react";
import clsx from "clsx";

import { Review } from "@/types/review";

import formatDate3 from "@/utils/formatDate3";

import divisionBar from "../../assets/image/post/ic_division_bar.svg";
import starFilled from "../../assets/image/post/list/ic_star_filled.svg";
import starOutlined from "../../assets/image/post/list/ic_star_outlined.svg";
import openImg from "./../../assets/image/button/listOpenBtn.svg";
import closeImg from "./../../assets/image/button/listCloseBtn.svg";
import blackHeart from "../../assets/image/post/ic_black_heart.svg";
import emptyHeart from "../../assets/image/post/ic_heart2.svg";

const ReviewList = ({ review }: { review: Review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(review.isLike);

  const nameParse = (name: string) => {
    const length = name.length;
    const visibleLength = 2;
    const hiddenLength = length - visibleLength;
    const hiddenPart = "*".repeat(hiddenLength);
    return `${name.slice(0, visibleLength)}${hiddenPart}`;
  };

  const standardTypeParse = (standardType: string) => {
    switch (standardType) {
      case "CHARACTER":
        return "캐릭터가 매력적이에요";
      case "RELATION":
        return "관계성이 훌륭해요";
      case "STORY":
        return "스토리가 좋어요";
      default:
        return "";
    }
  };

  const starIcons = Array.from({ length: 5 }, (_, i) =>
    i < review.rating ? starFilled : starOutlined
  );
  return (
    <div className="w-full border-t-1 border-[#9E9E9E] pl-[20px]">
      <div className="flex pt-[15px] justify-between">
        <div className="flex items-center gap-[10px]">
          <p className="p-small-medium">{nameParse(review.nickname)}</p>
          <img src={divisionBar} alt="|" />
          <p className="p-xs-medium">{formatDate3(review.date)}</p>
          <button className="ml-[5px] text-[#BABABA] text-[14px] font-medium underline">
            수정/삭제
          </button>
        </div>

        <div className="flex items-center gap-[8px]">
          <div className="flex items-center">
            {starIcons.map((icon, index) => (
              <img
                key={index}
                src={icon}
                alt={`Star ${index + 1}`}
                className="w-[16.542px] h-[15.797px]"
              />
            ))}
          </div>
          <img src={divisionBar} alt="|" />
          <p className="p-small-medium">
            {standardTypeParse(review.standardType)}
          </p>
        </div>
      </div>

      <article className="mt-[20px] mb-[25px]">
        <p className={clsx("p-small-medium", { "line-clamp-3": !isExpanded })}>
          {review.content}
        </p>
      </article>

      <div className="flex justify-between mb-[20px]">
        <button
          className="flex items-center gap-[6px] text-[#777] p-small-medium cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "접기" : "펼쳐보기"}
          <img
            className="w-[15px]"
            src={isExpanded ? closeImg : openImg}
            alt=""
          />
        </button>

        <div className="flex items-center gap-[5px]">
          <button
            className="flex items-center"
            onClick={() => {
              setIsLiked(!isLiked);
            }}
          >
            <img
              className="w-[16.873px] h-[15.116px]"
              src={isLiked ? blackHeart : emptyHeart}
              alt=""
            />
          </button>

          <p className="p-small-regular">{review.likeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
