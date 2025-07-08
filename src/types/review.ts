export interface ReviewStatistics {
  totalReviewCount: number;
  reviewAverageRating: number;
  fiveStarPercent: number;
  fourStarPercent: number;
  threeStarPercent: number;
  twoStarPercent: number;
  oneStarPercent: number;
  characterPercent: number;
  relationPercent: number;
  storyPercent: number;
}

export interface Review {
  id: string;
  nickname: string;
  date: string;
  myself: boolean;
  rating: number;
  standardType: string;
  content: string;
  isLike: boolean;
  likeCount: number;
}
