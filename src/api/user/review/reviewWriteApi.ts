import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "@/constants/ServerURL";

const api = axios.create({
  baseURL: SERVER_URL, // Use environment variables
  timeout: 10000,
});

const accessToken = Cookies.get("accessToken");

export interface postReviewProops {
  productId: string;
  rating: number;
  standardType: string;
  content: string;
}

export interface getReviewProfileProops {
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
}: postReviewProops): Promise<boolean> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await api.post<boolean>(
      "/scripts/review",
      {
        productId,
        rating,
        standardType,
        content,
      },
      { headers }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("리뷰 등록 실패:", err.message);
    return false;
  }
};

export const getProfile = async (
  productId: string
): Promise<getReviewProfileProops> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await api.get<getReviewProfileProops>(
      `/scripts/review/${productId}`,

      {
        headers,
      }
    );
    console.log(response.data);
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
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await api.patch<getReviewProfileProops>(
      `/scripts/review/${reviewId}`,
      {
        rating,
        standardType,
        content,
      },
      {
        headers,
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
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await api.delete<boolean>(`/scripts/review/${reviewId}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("리뷰 삭제 실패:", err.message);
    return false;
  }
};
