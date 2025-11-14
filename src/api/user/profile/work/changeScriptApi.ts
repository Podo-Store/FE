import axios from "axios";
import { SERVER_URL } from "@/constants/ServerURL";

const api = axios.create({
  baseURL: SERVER_URL, // Use environment variables
  timeout: 30000,
});

/**
 * 대본 파일 변경 API
 *
 * POST /profile/work/changeScript/{id}
 *
 * @param {string} id - 작품 ID (UUID)
 * @param {File} scriptFile - 업로드할 대본 PDF 파일
 * @param {string} [accessToken] - Authorization Bearer 토큰
 *
 * @returns {Promise<boolean>} 서버 응답 (성공 시 true)
 *
 * @throws {Error} 재심사 대기 중 재신청, 작가 아님, 작품 없음 등의 모든 오류들을 처리하여 throw
 *
 * @description
 * FormData에 `script` 필드로 PDF 파일을 담아 전송하는 API.
 * 반드시 `multipart/form-data`로 요청됨.
 *
 * 사용 예시:
 * ```ts
 * const file = inputRef.current.files?.[0];
 * const result = await postChangeScript(workId, file, accessToken);
 * if (result) console.log("업데이트 성공");
 * ```
 */

export const PostChangeScript = async (
  id: string,
  scriptFile: File, // or Blob
  accessToken?: string
) => {
  try {
    const formData = new FormData();
    formData.append("script", scriptFile);

    const headers: Record<string, string> = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await api.post<boolean>(
      `/profile/work/changeScript/${id}`,
      formData,
      {
        headers,
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error PostChangeScript:", error);
    throw new Error(`대본 변경 API 호출 실패: ${(error as Error).message}`);
  }
};
