import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPerformanceNews } from "./api";
import type { UpdatePerformanceNewsPayload } from "./types";

export const useUpdatePerformanceNews = (id: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePerformanceNewsPayload) => patchPerformanceNews(id, payload),
    onSuccess: () => {
      // ✅ 너희 queryKey에 맞춰 조정
      qc.invalidateQueries({ queryKey: ["performanceMain"] });
      qc.invalidateQueries({ queryKey: ["performanceDetail", id] });
      qc.invalidateQueries({ queryKey: ["performanceListInfinite"] });
    },
  });
};
