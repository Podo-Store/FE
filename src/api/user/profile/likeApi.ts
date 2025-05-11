import axios from "axios";
import Cookies from "js-cookie";

import { SERVER_URL } from "@/constants/ServerURL";
import { ScriptItem, ExploreScriptsResponse } from "@/api/user/postListApi";
const api = axios.create({
  baseURL: SERVER_URL, // Use environment variables
  timeout: 10000,
});

// 좋아한 작품
export const fetchLikedPost = async (
  accessToken?: string
): Promise<ExploreScriptsResponse> => {
  try {
    const headers: Record<string, string> = {};

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await api.get<ExploreScriptsResponse>("/profile/like", {
      headers,
      withCredentials: true, // 쿠키 인증 시 필요
    });

    const { longPlay, shortPlay } = response.data;
    console.log(longPlay);
    console.log(shortPlay);
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
  page: number = 0,
  accessToken?: string
): Promise<ScriptItem[]> => {
  try {
    const headers: Record<string, string> = {};

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await api.get<ScriptItem[]>(`/profile/like/long`, {
      params: { page },
      headers,
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
  page: number = 0,
  accessToken?: string
): Promise<ScriptItem[]> => {
  try {
    const headers: Record<string, string> = {};

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await api.get<ScriptItem[]>(`/profile/like/short`, {
      params: { page },
      headers,
    });
    console.log(response);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching liked short works:", error);
    throw new Error(
      `좋아한 단편 작품 API 호출 실패: ${(error as Error).message}`
    );
  }
};
