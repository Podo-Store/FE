// src/feature/performanceNews/performanceMain/queries.ts
import { useQuery } from '@tanstack/react-query';
import { getPerformanceMain } from './api';

export const performanceMainKeys = {
  all: ['performanceMain'] as const,
};

export const usePerformanceMain = () => {
  return useQuery({
    queryKey: performanceMainKeys.all,
    queryFn: getPerformanceMain,
    staleTime: Infinity,            // 탭 이동/리렌더로 재요청 X
    gcTime: 1000 * 60 * 60,         // 1시간 동안 캐시 유지(원하면 더 늘려도 됨)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
