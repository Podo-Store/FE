// src/features/performanceMain/api.ts
import { api } from '@/api/api';
import type { PerformanceMainResponse } from './types';

export const getPerformanceMain = async (): Promise<PerformanceMainResponse> => {
  const res = await api.get('/performance/main');
  return res.data;
};