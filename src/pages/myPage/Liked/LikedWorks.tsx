import React, { useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import FloatingBtn from "@/components/button/FloatingBtn";
import StageTab from "@/components/post/StageTab";
import StoryLengthTeb from "@/components/post/StoryLengthTabs";
import ViewToggleButton from "@/components/post/ViewToggleButton";
import SectionBlock from "@/components/post/SectionBlock";
import { MyPageMenu } from "@/components/myPage";
import { AllPostCard } from "@/components/post/PostList";
import useToggleLike from "@/hooks/useToggleLike";
import { ScriptItem } from "@/api/user/postListApi";
import {
  fetchLikedPost,
  getLikedLongWorks,
  getLikedShortWorks,
} from "@/api/user/profile/likeApi";

import AuthContext from "../../../contexts/AuthContext";

const LikedWorks = () => {
  const navigate = useNavigate();
  const { userNickname } = useContext(AuthContext);

  const [previewLongPlays, setPreviewLongPlays] = useState<ScriptItem[]>([]);

  const [previewShortPlays, setPreviewShortPlays] = useState<ScriptItem[]>([]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const isAuthenticated = useContext(AuthContext);
  const [activeCategory, setActiveCategory] = useState("포도밭");
  const [activeStoryLength, setActiveStoryLength] = useState("전체");
  const [viewType, setViewType] = useState<"grid" | "card">("grid");
  const rawToggleLikeLong = useToggleLike(setPreviewLongPlays);
  const rawToggleLikeShort = useToggleLike(setPreviewShortPlays);

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    setIsLoading(true);
    const loadScripts = async () => {
      try {
        const data = await fetchLikedPost(accessToken);

        setPreviewLongPlays(Array.isArray(data.longPlay) ? data.longPlay : []);
        setPreviewShortPlays(
          Array.isArray(data.shortPlay) ? data.shortPlay : []
        );
      } catch (error) {
        console.error("작품 목록 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadScripts();
  }, []);

  const handleToggleLikeLong = (postId: string) => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    rawToggleLikeLong(postId);
  };

  const handleToggleLikeShort = (postId: string) => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    rawToggleLikeShort(postId);
  };

  return (
    <div className="purchased-script myPage-contents-default">
      <FloatingBtn />

      <div className="myPage-contents-default-wrap">
        <MyPageMenu
          nickname={userNickname}
          currentPage="3"
          isFooterVisible={isFooterVisible}
        />
        <div className="content-side">
          <div className="content-side-grid">
            <h4 className="h4-bold">좋아한 작품들을 볼 수 있어요!</h4>
          </div>

          {/*----- 스테이지 메뉴 -----*/}
          <StageTab
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <span className=" w-full h-[1px] block bg-[#E2E2E2] z-0 "></span>

          {/*----- 카테고리 메뉴 -----*/}
          <div className="flex items-center justify-between w-full mb-[35px]">
            <StoryLengthTeb
              activeStoryLength={activeStoryLength}
              setActiveStoryLength={setActiveStoryLength}
              page={"/mypage/liked"}
            />

            {/*----- 보기방식 -----*/}

            <ViewToggleButton viewType={viewType} setViewType={setViewType} />
          </div>

          <div>
            <SectionBlock
              setActiveStoryLength={setActiveCategory}
              posts={previewShortPlays}
              viewType={viewType}
              postNum={4}
              colNum={4}
              title="단편"
              onMoreClick={() => navigate("/myPage/liked/short")}
              onToggleLike={handleToggleLikeShort}
            />
          </div>
          <div className="mt-[78px]">
            <SectionBlock
              setActiveStoryLength={setActiveCategory}
              posts={previewLongPlays}
              viewType={viewType}
              postNum={4}
              colNum={4}
              title="장편"
              onMoreClick={() => navigate("/myPage/liked/long")}
              onToggleLike={handleToggleLikeLong}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedWorks;
