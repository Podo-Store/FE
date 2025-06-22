import React from "react";
import { PostCardPreview } from "@/components/post/PostList";
import { ScriptItem } from "@/api/user/postListApi";

interface Props {
  posts: ScriptItem[];
  viewType: "grid" | "card";
  postNum: number;
  colNum: number;
  title: string;
  onMoreClick: (category: string) => void;
  onToggleLike: (postId: string) => void;
  isLikePage?: boolean;
}

const SectionBlock = ({
  posts,
  viewType,
  postNum,
  colNum,
  title,
  onMoreClick,
  onToggleLike,
  isLikePage = false,
}: Props) => {
  return (
    <section>
      <div className="flex justify-between mb-[24px]">
        {" "}
        <h2 className="h5-medium">{title}극</h2>
        <button
          className="flex px-[25px] py-[3px] justify-center items-center rounded-[30px] border-[2.5px] border-[#6A39C0] bg-[#FFF]"
          onClick={() => onMoreClick(title)}
        >
          <p className="text-center p-small-bold text-[#6A39C0] ">더보기</p>
        </button>
      </div>

      {posts.length !== 0 ? (
        <PostCardPreview
          posts={posts}
          viewType={viewType}
          postNum={postNum}
          colNum={colNum}
          onToggleLike={onToggleLike}
        />
      ) : posts.length === 0 ? (
        <div>
          <p className="m-auto w-fit p-large-bold">
            {isLikePage ? "좋아한 작품이 없습니다." : "등록된 작품이 없습니다."}
          </p>
        </div>
      ) : null}
    </section>
  );
};

export default SectionBlock;
