// src/feature/performanceNews/performanceRegister/queries.ts
import { useMutation } from '@tanstack/react-query';
import { postRegisterPerformance } from './api';
import type { RegisterPerformancePayload } from './types';

export const useRegisterPerformance = () => {
  return useMutation({
    mutationFn: (payload: RegisterPerformancePayload) =>
      postRegisterPerformance(payload),
  });
};
