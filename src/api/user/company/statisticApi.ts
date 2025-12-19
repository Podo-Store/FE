import { api } from "@/api/api";

export interface GetStatisticsResponse {
  userCnt: number;
  scriptCnt: number;
  viewCnt: number;
  reviewCnt: number;
}

export const getStatistics = async (): Promise<GetStatisticsResponse> => {
  try {
    const response = await api.get<GetStatisticsResponse>("/introduce/statistics");

    return response.data;
  } catch (error) {
    console.error("Error getStatistics:", error);
    throw new Error(`어드민 통계 api 호출 실패 ${(error as Error).message}`);
  }
};
