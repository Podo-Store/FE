// src/feature/performanceNews/performanceDetail/api.ts
import { api } from "@/api/api";
import type { PerformanceDetailResponse } from "./types";

export const getPerformanceDetail = async (id: string) => {
  const { data } = await api.get<PerformanceDetailResponse>(`/performance/${id}`, {
    withCredentials: true,
  });
  return data;
};
