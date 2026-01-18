// src/feature/performanceNews/performanceList/queries.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPerformanceList } from './api';
import type { PerformanceStatus } from './types';

export const performanceListKeys = {
  all: ['performanceList'] as const,
  list: (params: { status: PerformanceStatus; isUsed?: boolean }) =>
    [...performanceListKeys.all, params] as const,
};

export const usePerformanceListInfinite = (params: {
  status: PerformanceStatus;
  isUsed?: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: performanceListKeys.list(params),
    queryFn: ({ pageParam = 0 }) =>
      getPerformanceList({ status: params.status, isUsed: params.isUsed, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 서버가 "더 없음"을 알려주는 값이 없으니
      // ✅ 20개 미만이면 끝으로 판단
      if (!lastPage || lastPage.length < 20) return undefined;
      return allPages.length; // 다음 page = 현재까지 페이지 수
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
