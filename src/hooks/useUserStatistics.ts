import { useQuery } from "@tanstack/react-query";
import {
  getStatistics,
  GetStatisticsResponse,
} from "@/api/user/company/statisticApi";

export const USER_STATISTICS_KEY = ["userStatistics"] as const;

export function useUserStatistics() {
  return useQuery<GetStatisticsResponse, Error>({
    queryKey: USER_STATISTICS_KEY,
    queryFn: () => getStatistics(),

    // “페이지 한번 열면 캐싱 + 내가 원할 때만 새로고침” 패턴
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
