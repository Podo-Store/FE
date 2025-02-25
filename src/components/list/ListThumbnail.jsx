import PriceTextsHorizontal from "../price/PriceTextsHorizontal";
import ThumbnailImg from "../thumbnail/ThumbnailImg";

import "./ListThumbnail.css";

function TruncatedText({ text, maxLength }) {
  // 분할 한글(NFD) -> 완성형 한글(NFC)
  const normalizedText = text.normalize("NFC");
  // maxLength보다 길면 텍스트를 자르고 "..."을 추가
  return normalizedText.length > maxLength
    ? normalizedText.substring(0, maxLength) + "⋯"
    : normalizedText;
}

const ListThumbnail = ({
  thumbnailImg,
  title,
  author,
  scriptPrice = 0,
  performPrice = 0,
  onClick,
}) => {
  title = TruncatedText({ text: title, maxLength: 11 });
  author = TruncatedText({ text: author, maxLength: 11 });

  return (
    <div className="list-thumbnail f-dir-column" onClick={onClick}>
      <ThumbnailImg imagePath={thumbnailImg} />
      <div className="description">
        <p className="p-large-bold">{title}</p>
        <p className="p-medium-bold">{author}</p>

        <PriceTextsHorizontal scriptPrice={scriptPrice} performPrice={performPrice} />
      </div>
    </div>
  );
};

export default ListThumbnail;
