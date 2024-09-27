import PriceTextsHorizontal from "../price/PriceTextsHorizontal";
import ThumbnailImg from "../thumbnail/ThumbnailImg";

import "./ListThumbnail.css";

function TruncatedText({ text, maxLength }) {
  // maxLength보다 길면 텍스트를 자르고 "..."을 추가
  return text.length > maxLength ? text.substring(0, maxLength) + "⋯" : text;
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
    <div className="list-thumbnail" onClick={onClick}>
      <ThumbnailImg imagePath={thumbnailImg} />
      <div className="description">
        <h5>{title}</h5>
        <h5 id="author">{author}</h5>
        <div className="price">
          <PriceTextsHorizontal scriptPrice={scriptPrice} performPrice={performPrice} />
        </div>
      </div>
    </div>
  );
};

export default ListThumbnail;
