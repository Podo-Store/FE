import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { api } from "@/api/api";

export interface postReviewProps {
  productId: string;
  rating: number;
  standardType: string;
  content: string;
}

export interface getReviewProfileProps {
  imagePath: string;
  id: string;
  title: string;
  writer: string;
  rating: number | null;
  standardType: string | null;
  content: string | null;
}

export const postReview = async ({
  productId,
  rating,
  standardType,
  content,
}: postReviewProps): Promise<boolean> => {
  try {
    const response = await api.post<boolean>("/scripts/review", {
      productId,
      rating,
      standardType,
      content,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("리뷰 등록 실패:", err.message);
    return false;
  }
};

export const getProfile = async (
  productId: string
): Promise<getReviewProfileProps> => {
  try {
    if (!Cookies.get("accessToken")) {
      window.location.reload();
    }
    const response = await api.get<getReviewProfileProps>(
      `/scripts/review/${productId}`
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      "작품 정보 가져오기 실패:",
      err?.response?.data || err.message
    );

    throw new Error(`작품 정보 가져오기 실패: ${(error as Error).message}`);
  }
};

export interface patchReviewProps {
  reviewId: string;
  rating?: number;
  standardType?: string;
  content?: string;
}

export const patchReview = async ({
  reviewId,
  rating,
  standardType,
  content,
}: patchReviewProps) => {
  try {
    const response = await api.patch<getReviewProfileProps>(
      `/scripts/review/${reviewId}`,
      {
        rating,
        standardType,
        content,
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("리뷰 수정 실패:", err?.response?.data || err.message);

    throw new Error(`리뷰 수정 실패: ${(error as Error).message}`);
  }
};

export const deleteReview = async (reviewId: string): Promise<boolean> => {
  try {
    const response = await api.delete<boolean>(`/scripts/review/${reviewId}`);

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("리뷰 삭제 실패:", err.message);
    return false;
  }
};
