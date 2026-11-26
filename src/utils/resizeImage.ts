// 백엔드는 JPEG·PNG만 받으므로 그 외 형식(WebP·HEIC·GIF 등)은 JPEG로 변환한다.
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

/**
 * 업로드용 이미지를 준비한다.
 * - 긴 변이 maxSize(px)를 넘으면 비율을 유지한 채 축소한다.
 * - JPEG·PNG가 아니면 크기와 상관없이 JPEG로 변환한다.
 * - JPEG·PNG이면서 maxSize 이하이면 원본을 그대로 반환한다.
 */
export async function resizeImage(file: File, maxSize = 2000, quality = 0.9): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  const isAllowedType = ALLOWED_TYPES.includes(file.type);

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return file; // 브라우저가 디코딩하지 못하는 형식이면 원본 유지
  }

  const { width, height } = bitmap;
  const needsResize = Math.max(width, height) > maxSize;
  if (!needsResize && isAllowedType) {
    bitmap.close();
    return file;
  }

  const scale = needsResize ? maxSize / Math.max(width, height) : 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }

  const type = file.type === "image/png" ? "image/png" : "image/jpeg";
  if (type === "image/jpeg") {
    // 투명 배경이 검게 나오지 않도록 흰 배경을 깐다.
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  if (!blob) return file;

  const name = file.type === type ? file.name : file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type });
}
