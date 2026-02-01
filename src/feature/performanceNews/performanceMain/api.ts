import { api } from "@/api/api";
import type { PerformanceMainResponse } from "./types";

type Params = { isUsed?: boolean };

export const getPerformanceMainOngoing = async (
  params?: Params
): Promise<PerformanceMainResponse> => {
  const res = await api.get("/performance/main/ongoing", { params });
  return res.data;
};

export const getPerformanceMainUpComing = async (
  params?: Params
): Promise<PerformanceMainResponse> => {
  const res = await api.get("/performance/main/upcoming", { params });
  return res.data;
};

export const getPerformanceMainPast = async (params?: Params): Promise<PerformanceMainResponse> => {
  const res = await api.get("/performance/main/past", { params });
  return res.data;
};
