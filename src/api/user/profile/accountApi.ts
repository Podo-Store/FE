import { api } from "@/api/api";

export type SocialLoginType = "GOOGLE" | "KAKAO" | "NAVER";
export type StageType = "DEFAULT" | "SINGLE_GRAPE" | "GRAPE_CLUSTER" | "WINE";

export interface ProfileAccountResponse {
  id: string;
  userId: string;
  email: string;
  socialLoginType: SocialLoginType | null;
  nickname: string;
  stageType: StageType | null;
  accountNumber: string | null;
}

/**
 * 회원 정보(아이디, 닉네임, 계좌번호 등) 조회
 * GET /profile/account
 */
export const fetchProfileAccount = async (): Promise<ProfileAccountResponse> => {
  const { data } = await api.get<ProfileAccountResponse>("/profile/account");
  return data;
};
