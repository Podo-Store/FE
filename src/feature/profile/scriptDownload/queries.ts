import { useMutation } from "@tanstack/react-query";
import { requestScriptDownload } from "./api";
import { downloadBlob, getFileNameFromDisposition } from "../../../utils/downloadFile";

const readBlobAsText = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(blob);
  });

export const useScriptDownloadMutation = () => {
  return useMutation({
    mutationFn: (id: string) => requestScriptDownload({ id }),

    onSuccess: (res) => {
      const disposition = res.headers["content-disposition"];
      const fileName = getFileNameFromDisposition(disposition);

      downloadBlob(res.data, fileName);
    },

    onError: async (error: any) => {
      // 서버가 실패를 JSON으로 주는데 responseType:blob 때문에 blob 안에 들어있음
      const blob: Blob | undefined = error?.response?.data;

      if (blob instanceof Blob) {
        try {
          const text = await readBlobAsText(blob);
          const parsed = JSON.parse(text);
          alert(parsed?.error ?? "다운로드에 실패했어요.");
          return;
        } catch {
          // fallthrough
        }
      }

      alert("다운로드에 실패했어요.");
    },
  });
};
