export type UpdatePerformanceNewsPayload = {
  poster?: File; // 선택 업로드
  title?: string;
  place?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  link?: string;
  isUsed?: boolean;
};
