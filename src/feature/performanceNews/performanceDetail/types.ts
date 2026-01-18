export type PerformanceDetailResponse = {
  isOwner: boolean; // 작성자 여부
  posterPath: string;
  title: string;
  place: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  link: string;
  isUsed: boolean;
};
