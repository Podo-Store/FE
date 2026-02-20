// src/feature/performanceNews/performanceDetail/api.ts
import { publicApi } from "@/api/api";
import type { PerformanceDetailResponse } from "./types";

export const getPerformanceDetail = async (id: string) => {
  const { data } = await publicApi.get<PerformanceDetailResponse>(`/performance/${id}`, {
    withCredentials: true,
  });
  return data;
};
