import { useCallback } from "react";
import { toggleLikeScript } from "@/api/user/postListApi";
import { ScriptItem } from "@/api/user/postListApi";
import { useNavigate } from "react-router-dom";
import { LIKE } from "@/constants/alertTexts";

/**
 * 좋아요 토글 훅
 * @returns handleToggleLike 함수 반환
 */

export const useToggleLike = (
  setState: React.Dispatch<React.SetStateAction<ScriptItem[]>>
) => {
  const navigate = useNavigate();
  const handleToggleLike = useCallback(
    async (postId: string) => {
      try {
        await toggleLikeScript(postId);

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
        alert(LIKE);
        navigate("/signin");
      }
    },
    [setState]
  );

  return handleToggleLike;
};

export const useSingleToggleLike = (
  onSuccess?: () => void,
  onFail?: () => void
) => {
  const navigate = useNavigate();
  const handleToggleLike = useCallback(
    async (postId: string) => {
      try {
        await toggleLikeScript(postId);
      } catch (error) {
        console.error("좋아요 처리 실패:", error);
        alert(LIKE);
        navigate("/signin");
      }
    },
    [onSuccess, onFail]
  );

  return handleToggleLike;
};
