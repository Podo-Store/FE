import axios from "axios";
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
  accessToken?: string
): Promise<ExploreScriptsResponse> => {
  try {
    const headers: Record<string, string> = {};

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await api.get<ExploreScriptsResponse>("/scripts", {
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
    console.error("Error fetchExploreScripts:", error);
    throw new Error(`작품 둘러보기 API 호출 실패: ${(error as Error).message}`);
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
