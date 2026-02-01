export type PerformanceMainFilter = "all" | "podo";

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
  startDate: string;
  endDate: string;
  isUsed: boolean;
  isOwner: boolean;
  link: string;
};


export type PerformanceMainResponse = PerformanceMainItem[];
