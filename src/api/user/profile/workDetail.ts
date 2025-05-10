import axios, { AxiosError } from "axios";
import { SERVER_URL } from "@/constants/ServerURL";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: SERVER_URL, // Use environment variables
  timeout: 10000,
});

export interface WorkDetailResponse {
  id: string;
  title: string;
  writer: string;
  imagePath: string;
  script: boolean;
  scriptPrice: number;
  performance: boolean;
  performancePrice: number;
  descriptionPath: string;
  playType: "SHORT" | "LONG" | string;
  checked: "PASS" | "REJECT" | "WAITING" | string;
  plot: string;
  date: string;
  buyStatus: number;
  any: number | null;
  male: number;
  female: number;
  stageComment: string;
  runningTime: number;
  scene: number; // 장
  act: number; // 막
}

export const getWorkDetail = async (
  scriptId: string,
  accessToken: string
): Promise<WorkDetailResponse> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const { data } = await api.get<WorkDetailResponse>("/profile/work/detail", {
      params: { script: scriptId },
      headers,
    });

    console.log(data);
    return data;
  } catch (error: any) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage =
      err.response?.data?.error ?? "작품 정보를 불러오는 데 실패했습니다.";
    throw new Error(errorMessage);
  }
};

export const postWorkDetail = async (formData: FormData): Promise<boolean> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    };

    const response = await api.post("/profile/work/detail", formData, {
      headers,
    });

    return response.data === true;
  } catch (error: any) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage =
      err.response?.data?.error ?? "작품 정보를 수정하는 데 실패했습니다.";
    throw new Error(errorMessage);
  }
};

export const deleteWorkDetail = async (id: string, accessToken: string) => {
  try {
    const response = await api.delete(`/profile/deleteScript/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "작품 삭제 중 오류 발생");
  }
};
