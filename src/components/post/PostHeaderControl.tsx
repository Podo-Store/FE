// src/components/post/PostHeaderControl.tsx
import React from "react";
import StageTab from "./StageTab";
import ViewToggleButton from "./ViewToggleButton";
import StoryLengthTeb from "@/components/post/StoryLengthTabs";
import SortDropdown from "@/components/post/SortDropdown";

interface PostHeaderControlProps {
  activeStage: string;
  setActiveStage: (value: string) => void;
  activeStoryLength: string;
  setActiveStoryLength: (value: string) => void;
  viewType: "grid" | "card";
  setViewType: (value: "grid" | "card") => void;
  isSorted?: boolean;
  sortType?: string;
  setSortType?: (value: "POPULAR" | "LIKE_COUNT" | "LATEST") => void;
  stageBottomBorderWidth: string;
  stageIcon?: boolean;
}

const PostHeaderControl: React.FC<PostHeaderControlProps> = ({
  activeStage,
  setActiveStage,
  activeStoryLength,
  setActiveStoryLength,
  viewType,
  setViewType,
  isSorted,
  sortType,
  setSortType,
  stageBottomBorderWidth,
  stageIcon,
}) => {
  return (
    <>
      {/*----- 스테이지 메뉴 -----*/}
      <div className="relative ">
        <StageTab
          activeStage={activeStage}
          setActiveStage={setActiveStage}
          stageIcon={stageIcon}
        />
        <span
          className={`absolute left-1/2 top-[100%] -translate-x-1/2 ${stageBottomBorderWidth} h-[1px] block bg-[#E2E2E2] z-0`}
        ></span>
      </div>
      {/*----- 카테고리 메뉴 -----*/}
      <div className="flex items-center justify-between w-full mb-[35px] ">
        <StoryLengthTeb
          activeStoryLength={activeStoryLength}
          setActiveStoryLength={setActiveStoryLength}
        />
        <div className="flex items-center flex-row gap-[10px] h-full   ">
          {/* 정렬 */}
          {isSorted ? (
            <SortDropdown selected={sortType} onChange={setSortType} />
          ) : (
            <></>
          )}
          {/*----- 보기방식 -----*/}
          <ViewToggleButton viewType={viewType} setViewType={setViewType} />
        </div>
      </div>
    </>
  );
};

export default PostHeaderControl;
