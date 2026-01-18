// src/feature/performanceNews/performanceDetail/queries.ts
import { useQuery } from "@tanstack/react-query";
import { getPerformanceDetail } from "./api";

export const performanceDetailQueryKey = (id: string) => ["performanceDetail", id] as const;

export const usePerformanceDetail = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: performanceDetailQueryKey(id),
    queryFn: () => getPerformanceDetail(id),
    enabled: Boolean(id) && enabled, // ✅ 오버레이 열렸을 때만 호출
    staleTime: 1000 * 60 * 5, // ✅ 5분 캐시 (원하면 조절)
  });
};
