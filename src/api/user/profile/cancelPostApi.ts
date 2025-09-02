import { AxiosError } from "axios";
import { api } from "@/api/api";

/**
 * 심사 취소
 * DELETE /profile/work/cancel/{id}
 */
export const cancelReview = async (
  id: string,
  accessToken: string
): Promise<boolean> => {
  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("id", id);

    const { data } = await api.delete(`profile/work/cancel/${id}`, {
      headers,
      data: formData,
    });

    return data === true;
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    throw new Error(err.response?.data?.error ?? "심사 취소에 실패했습니다.");
  }
};
