export const formatNumber = (value?: number): string => {
  if (typeof value !== "number") return "0"; // 또는 '' 등 원하는 기본값
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}만`;
  }

  return value.toLocaleString(); // 10,000 미만은 콤마 표시
};
