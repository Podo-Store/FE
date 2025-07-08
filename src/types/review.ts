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
  stageType: null | "SINGLE_GRAPE" | "GRAPE_CLUSTER" | "WINE";
  date: string;
  isEdited: boolean;
  myself: boolean;
  rating: number;
  standardType: string;
  content: string;
  isLike: boolean;
  likeCount: number;
}
