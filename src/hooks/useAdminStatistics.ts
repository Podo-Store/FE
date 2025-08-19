import { useQuery } from "@tanstack/react-query";
import { getStatistics, GetStatisticsResponse } from "@/api/admin/statisticApi";

export const ADMIN_STATISTICS_KEY = ["adminStatistics"] as const;

export function useAdminStatistics(accessToken?: string) {
  return useQuery<GetStatisticsResponse, Error>({
    queryKey: ADMIN_STATISTICS_KEY,
    queryFn: () => getStatistics(accessToken),

    // “페이지 한번 열면 캐싱 + 내가 원할 때만 새로고침” 패턴 
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
