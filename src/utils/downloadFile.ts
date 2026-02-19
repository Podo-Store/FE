export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

export const getFileNameFromDisposition = (disposition?: string) => {
  if (!disposition) return "script.pdf";

  // 예: attachment; filename="abc.pdf"
  const match = disposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i);
  if (!match?.[1]) return "script.pdf";

  return decodeURIComponent(match[1]);
};
