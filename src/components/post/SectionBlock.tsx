import React from "react";
import { PostCardPreview } from "@/components/post/PostList";
import { PostCard } from "@/components/post/OnePostCard";

interface Props {
  setActiveStoryLength: (value: string) => void;
  posts: PostCard[];
  viewType: "grid" | "card";
  postNum: number;
  colNum: number;
  title: string;
  onMoreClick: () => void;
  onToggleLike: (postId: string) => void;
}

const SectionBlock = ({
  setActiveStoryLength,
  posts,
  viewType,
  postNum,
  colNum,
  title,
  onMoreClick,
  onToggleLike,
}: Props) => {
  return (
    <section>
      <div className="flex justify-between mb-[24px]">
        {" "}
        <h2 className=" h5-medium">{title}극</h2>
        <button
          className="flex px-[25px] py-[3px] justify-center items-center rounded-[30px] border-[2.5px] border-[#6A39C0] bg-[#FFF]"
          onClick={onMoreClick}
        >
          <p className="text-center p-small-bold text-[#6A39C0] ">더보기</p>
        </button>
      </div>

      <PostCardPreview
        posts={posts}
        viewType={viewType}
        postNum={postNum}
        colNum={colNum}
        onToggleLike={onToggleLike}
      />
    </section>
  );
};

export default SectionBlock;
