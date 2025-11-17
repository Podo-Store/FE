import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { api } from "@/api/api";

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
      // 인터셉터가 기본적으로 헤더를 붙이지만, 중복 방지/명시를 위해 액세스 토큰이 있으면 추가
      ...(Cookies.get("accessToken")
        ? { Authorization: `Bearer ${Cookies.get("accessToken")}` }
        : {}),
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
      ...(Cookies.get("accessToken")
        ? { Authorization: `Bearer ${Cookies.get("accessToken")}` }
        : {}),
    };

    if (!Cookies.get("accessToken")) {
      window.location.reload()
    }
    const response = await api.get<getReviewProfileProops>(
      `/scripts/review/${productId}`,

      {
        headers,
      }
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
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(Cookies.get("accessToken")
        ? { Authorization: `Bearer ${Cookies.get("accessToken")}` }
        : {}),
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
      ...(Cookies.get("accessToken")
        ? { Authorization: `Bearer ${Cookies.get("accessToken")}` }
        : {}),
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
