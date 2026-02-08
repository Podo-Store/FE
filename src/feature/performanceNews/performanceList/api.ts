// src/feature/performanceList/api.ts

import { api } from "@/api/api";
import type { PerformanceListQuery, PerformanceListResponse } from "./types";

export const getPerformanceList = async (
  query: PerformanceListQuery
): Promise<PerformanceListResponse> => {
  const { status, isUsed, page = 0 } = query;

  console.log(isUsed);
  const res = await api.get("/performance/", {
    params: {
      status,

      ...(typeof isUsed === "boolean" ? { isUsed } : {}),
      page,
    },
  });
  console.log(res.data);

  return res.data;
};
