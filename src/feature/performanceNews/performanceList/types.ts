// src/feature/performanceList/types.ts

export type PerformanceStatus = "ONGOING" | "UPCOMING" | "PAST";

export type PerformanceListQuery = {
  status: PerformanceStatus;
  isUsed?: boolean; // true면 포도상점만, false/undefined면 전체
  page?: number; // default 0
};

export type PerformanceListItem = {
  id: string;
  posterPath: string;
  title: string;
  place: string;
  startDate: string; // 'YYYY-MM-DD'
  endDate: string; // 'YYYY-MM-DD'
  isUsed: boolean;
  isOwner: boolean;
  link: string;
};

export type PerformanceListResponse = PerformanceListItem[];
