import { authApi } from "@/api/api";
import { ScriptDownloadParams } from "./types";

export const requestScriptDownload = ({ id }: ScriptDownloadParams) => {
  return authApi.get("/profile/download", {
    params: { id },
    responseType: "blob",
  });
};
