export type ShowCard = {
  id: string;
  image: string; // 이미지 URL 또는 public 경로
  title: string; // 제목
  author: string; // 작가
  troupe: string; // 공연단체
  period: string; // 공연 기간 (예: 2024.03.09~03.12)
  link?: string; // 링크
};
