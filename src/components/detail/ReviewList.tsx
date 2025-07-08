import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import throttle from "lodash/throttle";
import clsx from "clsx";

import { Review } from "@/types/review";
import formatDate3 from "@/utils/formatDate3";

import divisionBar from "../../assets/image/post/ic_division_bar.svg";
import starFilled from "../../assets/image/post/list/ic_star_filled.svg";
import starOutlined from "../../assets/image/post/list/ic_star_outlined.svg";
import openImg from "./../../assets/image/button/listOpenBtn.svg";
import closeImg from "../../assets/image/button/listCloseBtn.svg";
import blackHeart from "../../assets/image/post/ic_black_heart.svg";
import emptyHeart from "../../assets/image/post/ic_heart2.svg";
import axios from "axios";
import Cookies from "js-cookie";
import AuthContext from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "@/constants/ServerURL";

interface Props {
  review: Review;
}

const ReviewList: React.FC<Props> = React.memo(({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(review.isLike);
  const [likeCount, setLikeCount] = useState(review.likeCount);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const loadingRef = useRef(loading);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const parsedName = useMemo(() => {
    const name = review.nickname;
    const visible = name.slice(0, 2);
    return visible + "*".repeat(name.length - 2);
  }, [review.nickname]);

  const standardText = useMemo(() => {
    switch (review.standardType) {
      case "CHARACTER":
        return "캐릭터가 매력적이에요";
      case "RELATION":
        return "관계성이 훌륭해요";
      case "STORY":
        return "스토리가 좋어요";
      default:
        return "";
    }
  }, [review.standardType]);

  const starIcons = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) =>
        i < review.rating ? starFilled : starOutlined
      ),
    [review.rating]
  );

  const handleLike = useMemo(
    () =>
      throttle(
        async () => {
          if (loadingRef.current) {
            return;
          }
          setLoading(true);

          if (!isAuthenticated) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/signin");
            return;
          }

          // Optimistic UI
          setIsLiked((prev) => {
            setLikeCount((cnt) => cnt + (prev ? -1 : 1));
            return !prev;
          });

          try {
            const response = await axios.post(
              `${SERVER_URL}scripts/review/like/${review.id}`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
              }
            );
          } catch (error) {
            console.error(error);
            alert("좋아요 처리 중 오류가 발생했습니다.");
          } finally {
            setLoading(false);
          }
        },
        1000,
        {
          leading: true,
          trailing: false,
        }
      ),
    [review.id]
  );

  return (
    <div className="w-full border-t-1 border-[#9E9E9E] pl-[20px]">
      <div className="flex pt-[15px] justify-between">
        <div className="flex items-center gap-[10px]">
          <p className="p-small-medium">{parsedName}</p>
          <img src={divisionBar} alt="|" />
          <p className="p-xs-medium">{formatDate3(review.date)}</p>
          {review.myself && (
            <button className="ml-[5px] text-[#BABABA] text-[14px] font-medium underline">
              수정/삭제
            </button>
          )}
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
          <p className="p-small-medium">{standardText}</p>
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
            onClick={() => handleLike()}
            disabled={loading}
            className={clsx(
              "flex items-center",
              loading && "opacity-50 cursor-not-allowed"
            )}
          >
            <img
              className="w-[16.873px] h-[15.116px]"
              src={isLiked ? blackHeart : emptyHeart}
              alt=""
            />
          </button>
          <p className="p-small-regular">{likeCount}</p>
        </div>
      </div>
    </div>
  );
});

export default ReviewList;
