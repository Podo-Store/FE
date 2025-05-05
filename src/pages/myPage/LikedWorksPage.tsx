import React, { useContext, useEffect, useRef, useState } from "react";

import FloatingBtn from "@/components/button/FloatingBtn";
import StageTab from "@/components/post/StageTab";
import StoryLengthTeb from "@/components/post/StoryLengthTabs";
import ViewToggleButton from "@/components/post/ViewToggleButton";
import SectionBlock from "@/components/post/SectionBlock";
import { MyPageMenu } from "@/components/myPage";
import { AllPostCard } from "@/components/post/PostList";

import { mockData } from "./../work/postList/mockData";
import AuthContext from "../../contexts/AuthContext";

const LikedWorks = () => {
  const { userNickname } = useContext(AuthContext);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const [activeCategory, setActiveCategory] = useState("포도밭");
  const [activeStoryLength, setActiveStoryLength] = useState("전체");
  const [viewType, setViewType] = useState<"grid" | "card">("grid");

  const [posts, setPosts] = useState(mockData); // 상태로 관리

  const handleToggleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isLike: !post.isLike } : post
      )
    );
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
            />

            {/*----- 보기방식 -----*/}

            <ViewToggleButton viewType={viewType} setViewType={setViewType} />
          </div>

          {/*----- post list -----*/}
          {activeStoryLength === "전체" ? (
            // 카테고리 = 전체
            <>
              {/* <div>
                <SectionBlock
                  setActiveStoryLength={setActiveCategory}
                  posts={posts}
                  viewType={viewType}
                  postNum={4}
                  colNum={4}
                  title="단편"
                  onMoreClick={() => setActiveStoryLength("단편")}
                  onToggleLike={handleToggleLike}
                />
              </div>
              <div className="mt-[78px]">
                <SectionBlock
                  setActiveStoryLength={setActiveCategory}
                  posts={posts}
                  viewType={viewType}
                  postNum={4}
                  colNum={4}
                  title="장편"
                  onMoreClick={() => setActiveStoryLength("장편")}
                  onToggleLike={handleToggleLike}
                />
              </div> */}
            </>
          ) : (
            <>
              {/* 카테고리 = 장편 | 단편 */}
              {/* <div className=" mb-[24px]">
                {activeStoryLength === "장편" ? (
                  <p className="h5-medium ">장편극</p>
                ) : (
                  <p className="h5-medium">단편극</p>
                )}
              </div>
              <AllPostCard
                posts={posts}
                viewType={viewType}
                colNum={4}
                onToggleLike={handleToggleLike}
              /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedWorks;
