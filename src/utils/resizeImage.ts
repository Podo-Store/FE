const SKIP_TYPES = ["image/gif", "image/svg+xml"];
const KEEP_TYPES = ["image/png", "image/webp"];
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

/**
 * 이미지의 긴 변이 maxSize(px)를 넘으면 비율을 유지한 채 축소한다.
 * maxSize 이하이거나 축소할 수 없는 형식이면 원본 파일을 그대로 반환한다.
 */
export async function resizeImage(file: File, maxSize = 2000, quality = 0.9): Promise<File> {
  if (!file.type.startsWith("image/") || SKIP_TYPES.includes(file.type)) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return file; // 브라우저가 디코딩하지 못하는 형식이면 원본 유지
  }

  const { width, height } = bitmap;
  if (Math.max(width, height) <= maxSize) {
    bitmap.close();
    return file;
  }

  const scale = maxSize / Math.max(width, height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // PNG·WebP는 형식을 유지하고, 그 외(HEIC 등)는 JPEG로 변환한다.
  const type = KEEP_TYPES.includes(file.type) ? file.type : "image/jpeg";
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  if (!blob) return file;

  // WebP 인코딩을 지원하지 않는 브라우저는 PNG로 돌려주므로 실제 blob 형식 기준으로 확장자를 맞춘다.
  const outType = blob.type || type;
  const ext = EXTENSIONS[outType];
  const name = file.type === outType || !ext ? file.name : file.name.replace(/\.[^.]+$/, "") + ext;
  return new File([blob], name, { type: outType });
}
