import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // 1분 동안 fresh
      gcTime: 5 * 60_000, // 5분 캐시 보관
      refetchOnWindowFocus: false, // 포커스시 자동 리패치 X
      retry(failureCount, err: any) {
        const status = err?.response?.status;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 1;
      },
    },
  },
});
