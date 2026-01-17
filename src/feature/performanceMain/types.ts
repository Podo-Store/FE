export type PerformanceMainFilter = 'all' | 'podo';

export type PerformanceMainQuery = {
  ongoingUsed: boolean;
  upcomingUsed: boolean;
  pastUsed: boolean;
};

export type PerformanceMainItem = {
  id: string;
  posterPath: string;
  title: string;
  place: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  isUsed: boolean; // 포도상점 여부(전체 호출 시 true/false 섞임)
  link?:string;
};

export type PerformanceMainResponse = {
  ongoing: PerformanceMainItem[];
  upcoming: PerformanceMainItem[];
  past: PerformanceMainItem[];
};
