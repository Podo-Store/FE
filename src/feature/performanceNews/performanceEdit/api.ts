import { api } from "@/api/api";
import type { UpdatePerformanceNewsPayload } from "./types";

export const patchPerformanceNews = async (
  id: string,
  payload: UpdatePerformanceNewsPayload
): Promise<boolean> => {
  const formData = new FormData();

  if (payload.poster) formData.append("poster", payload.poster);
  if (payload.title !== undefined) formData.append("title", payload.title);
  if (payload.place !== undefined) formData.append("place", payload.place);
  if (payload.startDate !== undefined) formData.append("startDate", payload.startDate);
  if (payload.endDate !== undefined) formData.append("endDate", payload.endDate);
  if (payload.link !== undefined) formData.append("link", payload.link);
  if (payload.isUsed !== undefined) formData.append("isUsed", String(payload.isUsed));

  // ❗️여기 URL은 너희 실제 엔드포인트로 맞춰야 함
  const { data } = await api.patch(`/performance/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data === true;
};
