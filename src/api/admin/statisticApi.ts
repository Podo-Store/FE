import axios from "axios";

import { SERVER_URL } from "@/constants/ServerURL";
const api = axios.create({
  baseURL: SERVER_URL, // Use environment variables
  timeout: 30000,
});

export interface GetStatisticsResponse {
  userCnt: number;
  scriptCnt: number;
  viewCnt: number;
  reviewCnt: number;
}

export const getStatistics = async (
  accessToken?: string
): Promise<GetStatisticsResponse> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await api.get<GetStatisticsResponse>("/admin/statistics", {
      headers,
      withCredentials: true, // 쿠키 인증 시 필요
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getStatistics:", error);
    throw new Error(`어드민 통계 api 호출 실패 ${(error as Error).message}`);
  }
};
