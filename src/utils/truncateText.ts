const truncateText = ({ text, maxLength }: { text: string; maxLength: number }) => {
  // 분할 한글(NFD) -> 완성형 한글(NFC)
  const normalizedText = text.normalize("NFC");
  // maxLength보다 길면 텍스트를 자르고 "..."을 추가
  return normalizedText.length > maxLength
    ? normalizedText.substring(0, maxLength) + "..."
    : normalizedText;
};

export default truncateText;
