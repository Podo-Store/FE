// src/feature/performanceList/api.ts

import { authApi } from "@/api/api";
import type { PerformanceListQuery, PerformanceListResponse } from "./types";

export const getPerformanceList = async (
  query: PerformanceListQuery
): Promise<PerformanceListResponse> => {
  const { status, isUsed, page = 0 } = query;

  const res = await authApi.get("/performance/", {
    params: {
      status,

      ...(typeof isUsed === "boolean" ? { isUsed } : {}),
      page,
    },
  });
  console.log(res.data);

  return res.data;
};
