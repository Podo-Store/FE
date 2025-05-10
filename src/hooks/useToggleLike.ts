import { useCallback } from "react";
import Cookies from "js-cookie";
import { toggleLikeScript } from "@/api/user/postListApi";
import { ScriptItem } from "@/api/user/postListApi";

/**
 * 좋아요 토글 훅
 * @returns handleToggleLike 함수 반환
 */

const useToggleLike = (
  setState: React.Dispatch<React.SetStateAction<ScriptItem[]>>
) => {
  const handleToggleLike = useCallback(
    async (postId: string) => {
      try {
        const accessToken = Cookies.get("accessToken");
        await toggleLikeScript(postId, accessToken);

        setState((prev) =>
          prev.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  like: !post.like,
                  likeCount: post.like
                    ? post.likeCount - 1 // 이미 좋아요였다면 감소
                    : post.likeCount + 1, // 좋아요가 아니었다면 증가
                }
              : post
          )
        );
      } catch (error) {
        console.error("좋아요 처리 실패:", error);
        alert("좋아요는 로그인 후 이용할 수 있어요.");
      }
    },
    [setState]
  );

  return handleToggleLike;
};

export default useToggleLike;
