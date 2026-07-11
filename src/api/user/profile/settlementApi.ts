import { AxiosError } from "axios";
import { api } from "@/api/api";
import type { Bank } from "@/constants/banks";

export interface UpdateSettlementAccountParams {
  bankName: Bank;
  accountNumber: string;
  accountHolderName: string;
}

/**
 * 정산 계좌 등록/수정
 * PUT /profile/settlement
 */
export const updateSettlementAccount = async ({
  bankName,
  accountNumber,
  accountHolderName,
}: UpdateSettlementAccountParams): Promise<boolean> => {
  try {
    const { data } = await api.put<boolean>("/profile/settlement", {
      bankName,
      accountNumber,
      accountHolderName,
    });

    return data === true;
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    throw new Error(err.response?.data?.error ?? "정산 계좌 등록에 실패했습니다.");
  }
};
