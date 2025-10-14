// src/components/post/PostHeaderControl.tsx
import React from "react";
import StageTab from "./StageTab";
import ViewToggleButton from "./ViewToggleButton";
import StoryLengthTeb from "@/components/post/StoryLengthTabs";
import SortDropdown from "@/components/post/SortDropdown";
import { StageType } from "@/types/stage";

interface PostHeaderControlProps {
  activeStage: StageType;
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
  stageBelt?: boolean;
}

const STAGE_BELT: Record<StageType, string> = {
  포도밭: "모든 작가의 작품을 볼 수 있어요.",
  포도알: "포도상점에 첫 발을 내딛은 작가들의 작품을 볼 수 있어요.",
  포도송이: "창작 활동을 활발히 이어가는 작가들의 작품을 볼 수 있어요.",
  와인: "오랜 경험으로 완성도를 높인 작가들의 작품을 감상할 수 있어요.",
};

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
  stageBelt = false,
}) => {
  return (
    <div className="mb-[35px]">
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
      <div className="flex items-center justify-between w-full ">
        <StoryLengthTeb
          activeStoryLength={activeStoryLength}
          setActiveStoryLength={setActiveStoryLength}
        />
        <div className="flex items-center flex-row gap-[10px] h-full mr-[20px] mt-1 ">
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
      {stageBelt && (
        <div className="relative h-[44px] ">
          <div
            className={`flex absolute left-1/2 -translate-x-1/2 ${stageBottomBorderWidth} bg-[var(--grey1)] shadow-custom-inset h-[30px] sm:h-[33px] md:h-[44px] p-xs-medium sm:p-small-medium md:p-large-medium  items-center justify-center`}
          >
            <span className="text-[var(--purple4)]">{activeStage}</span>
            {`에서는 ${
              STAGE_BELT[activeStage as keyof typeof STAGE_BELT] ?? ""
            }`}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostHeaderControl;
