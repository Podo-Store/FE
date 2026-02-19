// src/feature/performanceNews/performanceRegister/api.ts
import { authApi } from "@/api/api";
import type { RegisterPerformancePayload, RegisterPerformanceResponse } from "./types";

export const postRegisterPerformance = async (
  payload: RegisterPerformancePayload
): Promise<RegisterPerformanceResponse> => {
  const formData = new FormData();
  formData.append("poster", payload.poster);
  formData.append("title", payload.title);
  formData.append("place", payload.place);
  formData.append("startDate", payload.startDate);
  formData.append("endDate", payload.endDate);
  formData.append("link", payload.link);
  formData.append("isUsed", String(payload.isUsed ?? false));

  const res = await authApi.post<RegisterPerformanceResponse>("/performance/register", formData);

  return res.data;
};
