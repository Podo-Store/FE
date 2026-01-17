import { useQuery } from '@tanstack/react-query';
import { getPerformanceMain } from './api';

export const usePerformanceMain = () => {
  return useQuery({
    queryKey: ['performanceMain'],
    queryFn: getPerformanceMain,
    staleTime: 60_000,
  });
};
