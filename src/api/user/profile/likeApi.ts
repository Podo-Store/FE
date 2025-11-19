import { api } from "@/api/api";
import { ScriptItem, ExploreScriptsResponse } from "@/api/user/postListApi";

// 좋아한 작품
export const fetchLikedPost = async (): Promise<ExploreScriptsResponse> => {
  try {
    const response = await api.get<ExploreScriptsResponse>("/profile/like", {
      withCredentials: true, // 쿠키 인증 시 필요
    });

    const { longPlay, shortPlay } = response.data;
    return {
      longPlay: Array.isArray(longPlay) ? longPlay : [],
      shortPlay: Array.isArray(shortPlay) ? shortPlay : [],
    };
  } catch (error) {
    console.error("Error fetchLikedPost:", error);
    throw new Error(`좋아한 작품 API 호출 실패: ${(error as Error).message}`);
  }
};

// 좋아한 장편 작품 목록 조회
export const getLikedLongWorks = async (
  page: number = 0
): Promise<ScriptItem[]> => {
  try {
    const response = await api.get<ScriptItem[]>(`/profile/like/long`, {
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching liked long works:", error);
    throw new Error(
      `좋아한 장편 작품 API 호출 실패: ${(error as Error).message}`
    );
  }
};

// 좋아한 장편 작품 목록 조회
export const getLikedShortWorks = async (
  page: number = 0
): Promise<ScriptItem[]> => {
  try {
    const response = await api.get<ScriptItem[]>(`/profile/like/short`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching liked short works:", error);
    throw new Error(
      `좋아한 단편 작품 API 호출 실패: ${(error as Error).message}`
    );
  }
};

export const getLikeStatus = async (id: string): Promise<boolean> => {
  try {
    const response = await api.get<boolean>(`/scripts/likeStatus/${id}`);

    return response.data; // true 또는 false
  } catch (error) {
    console.error("좋아요 상태 가져오기 실패:", error);
    return false; // 에러 발생 시 기본값 false로 처리
  }
};
