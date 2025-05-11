// src/components/post/PostHeaderControl.tsx
import React from "react";
import StageTab from "./StageTab";
import ViewToggleButton from "./ViewToggleButton";
import StoryLengthTeb from "@/components/post/StoryLengthTabs";
import SortDropdown from "@/components/post/SortDropdown";

interface PostHeaderControlProps {
  activeCategory: string;
  setActiveCategory: (value: string) => void;
  activeStoryLength: string;
  setActiveStoryLength: (value: string) => void;
  viewType: "grid" | "card";
  setViewType: (value: "grid" | "card") => void;
  page: string;
  isSorted?: boolean;
  sortType?: string;
  setSortType?: (value: string) => void;
}

const PostHeaderControl: React.FC<PostHeaderControlProps> = ({
  activeCategory,
  setActiveCategory,
  activeStoryLength,
  setActiveStoryLength,
  viewType,
  setViewType,
  page,
  isSorted,
  sortType,
  setSortType,
}) => {
  return (
    <>
      <StageTab
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <span className="w-full h-[1px] block bg-[#E2E2E2]" />

      <div className="flex items-center justify-between w-full mb-[35px]">
        <StoryLengthTeb
          activeStoryLength={activeStoryLength}
          setActiveStoryLength={setActiveStoryLength}
          page={page}
        />
        <div className="flex items-center flex-row gap-[10px] h-full   ">
          {isSorted ? (
            <SortDropdown selected={sortType} onChange={setSortType} />
          ) : (
            <></>
          )}

          <ViewToggleButton viewType={viewType} setViewType={setViewType} />
        </div>
      </div>
    </>
  );
};

export default PostHeaderControl;
