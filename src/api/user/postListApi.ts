import { AxiosError } from "axios";
import { api, authApi } from "@/api/api";

export interface ScriptItem {
  id: string;
  title: string;
  writer: string;
  imagePath: string;
  script: boolean;
  scriptPrice: number;
  performance: boolean;
  performancePrice: number;
  checked: string;
  date: string; // ISO 8601 string
  like: boolean;
  likeCount: number;
  viewCount: number;
}

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: PageSort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  number: number;
  size: number;
  sort: PageSort;
  numberOfElements: number;
  empty: boolean;
}

interface PageSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export type SortType = "POPULAR" | "LIKE_COUNT" | "LATEST";
export type PlayType = "LONG" | "SHORT";

export interface ExploreScriptsParams {
  sortType?: SortType;
  page?: number;
  size?: number;
  playType?: PlayType;
  search?: string;
}

export const getExploreScripts = async (
  {
    page = 0,
    size = 40,
    sortType = "POPULAR",
    playType,
    search = "",
  }: ExploreScriptsParams = {}
): Promise<PageResponse<ScriptItem>> => {
  try {
    const response = await authApi.get<PageResponse<ScriptItem>>("/scripts/v2", {
      params: { page, size, sortType, playType, search },
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching explore scripts:", error);
    throw new Error(` 작품 전체 API 호출 실패: ${(error as Error).message}`);
  }
};

export const getContestScripts = async (
  page: number = 0,
  sortType: "POPULAR" | "LIKE_COUNT" | "LATEST" = "POPULAR"
): Promise<ScriptItem[]> => {
  try {
    const response = await api.get<PageResponse<ScriptItem>>(`/scripts/contest`, {
      params: { page, sortType },
    });

    return response.data.content;
  } catch (error) {
    console.error("Error fetching contest scripts:", error);
    throw new Error(`공모전 작품 API 호출 실패: ${(error as Error).message}`);
  }
};

export const toggleLikeScript = async (id: string): Promise<"like" | "cancel like"> => {
  try {
    const response = await api.post<{ message: "like" | "cancel like" }>(
      `/scripts/like/${id}`,
      null,
      { withCredentials: true }
    );

    return response.data.message;
  } catch (error) {
    console.error("Error toggleLikeScript:", error);
    throw new Error(`좋아요 토글 실패: ${(error as Error).message}`);
  }
};

export const getPostView = async (scriptId: string): Promise<Blob> => {
  try {
    const { data } = await api.get<Blob>("/scripts/view", {
      params: { script: scriptId },
      responseType: "blob",
    });

    return data;
  } catch (error: any) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage = err.response?.data?.error ?? "대본을 불러오는데 실패했습니다.";
    throw new Error(errorMessage);
  }
};
