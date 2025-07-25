import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

import { SERVER_URL } from "@/constants/ServerURL";

const api = axios.create({
  baseURL: SERVER_URL, // Use environment variables

  timeout: 10000,
});

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

export interface ExploreScriptsResponse {
  longPlay: ScriptItem[];
  shortPlay: ScriptItem[];
}

export const fetchExploreScripts = async (
  accessToken?: string,
  sortType: "POPULAR" | "LIKE_COUNT" | "LATEST" = "POPULAR"
): Promise<ExploreScriptsResponse> => {
  try {
    const headers: Record<string, string> = {};

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await api.get<ExploreScriptsResponse>("/scripts", {
      headers,
      withCredentials: true, // 쿠키 인증 시 필요
      params: {
        sortType,
      },
    });

    const { longPlay, shortPlay } = response.data;
    return {
      longPlay: Array.isArray(longPlay) ? longPlay : [],
      shortPlay: Array.isArray(shortPlay) ? shortPlay : [],
    };
  } catch (error) {
    console.error("Error fetchExploreScripts:", error);
    throw new Error(`작품 둘러보기 API 호출 실패: ${(error as Error).message}`);
  }
};

// 좋아한 장편 작품 목록 조회
export const getLongWorks = async (
  page: number = 0,
  accessToken?: string,
  sortType: "POPULAR" | "LIKE_COUNT" | "LATEST" = "POPULAR"
): Promise<ScriptItem[]> => {
  try {
    const headers: Record<string, string> = {};

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await api.get<ScriptItem[]>(`/scripts/long`, {
      params: { page, sortType },
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching long works:", error);
    throw new Error(` 장편 작품 API 호출 실패: ${(error as Error).message}`);
  }
};

// 좋아한 장편 작품 목록 조회
export const getShortWorks = async (
  page: number = 0,
  accessToken?: string,
  sortType: "POPULAR" | "LIKE_COUNT" | "LATEST" = "POPULAR"
): Promise<ScriptItem[]> => {
  try {
    const headers: Record<string, string> = {};

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await api.get<ScriptItem[]>(`/scripts/short`, {
      params: { page, sortType },
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetchin short works:", error);
    throw new Error(`단편 작품 API 호출 실패: ${(error as Error).message}`);
  }
};

export const toggleLikeScript = async (
  id: string,
  accessToken?: string
): Promise<"like" | "cancel like"> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await api.post<{ message: "like" | "cancel like" }>(
      `/scripts/like/${id}`,
      null,
      { headers, withCredentials: true }
    );

    return response.data.message;
  } catch (error) {
    console.error("Error toggleLikeScript:", error);
    throw new Error(`좋아요 토글 실패: ${(error as Error).message}`);
  }
};

export const getPostView = async (scriptId: string): Promise<Blob> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const { data } = await api.get<Blob>("/scripts/view", {
      params: { script: scriptId },
      headers,
      responseType: "blob",
    });

    return data;
  } catch (error: any) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage =
      err.response?.data?.error ?? "대본을 불러오는데 실패했습니다.";
    throw new Error(errorMessage);
  }
};
