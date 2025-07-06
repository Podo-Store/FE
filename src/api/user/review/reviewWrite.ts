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
