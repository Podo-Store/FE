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
