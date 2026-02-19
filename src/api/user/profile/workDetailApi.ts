import { AxiosError } from "axios";
import { api } from "@/api/api";

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
  buyStatus: number; //0: 아무것도 구매 안함, 1: 대본 or 대본 + 공연권, 2: 공연권만
  any: number | null;
  male: number;
  female: number;
  stageComment: string;
  runningTime: number;
  scene: number; // 장
  act: number; // 막
  intention: string;
}

export const getWorkDetail = async (
  scriptId: string
): Promise<WorkDetailResponse> => {
  try {
    const { data } = await api.get<WorkDetailResponse>("/profile/work/detail", {
      params: { script: scriptId },
    });

    return data;
  } catch (error: any) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage =
      err.response?.data?.error ?? "작품 정보를 불러오는 데 실패했습니다.";
    throw new Error(errorMessage);
  }
};

type ErrorResponse = {
  error: string;
};

export const postWorkDetail = async (formData: FormData): Promise<boolean> => {
  try {
    const response = await api.post("/profile/work/detail", formData);

    return response.data === true;
  } catch (error: any) {
    const err = error as AxiosError<ErrorResponse>;
    console.error("💥 서버 응답 데이터:", err.response?.data);
    throw new Error(
      err.response?.data?.error ?? "작품 정보를 수정하는 데 실패했습니다."
    );
  }
};

export const deleteWorkDetail = async (id: string) => {
  try {
    const response = await api.delete(`/profile/work/deleteScript/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "작품 삭제 중 오류 발생");
  }
};
