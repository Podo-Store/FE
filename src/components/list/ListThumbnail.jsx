import PriceTextsHorizontal from "../price/PriceTextsHorizontal";
import ThumbnailImg from "../thumbnail/ThumbnailImg";

import truncateText from "@/utils/truncateText";

import "./ListThumbnail.css";

const ListThumbnail = ({
  thumbnailImg,
  title,
  author,
  scriptPrice = 0,
  performPrice = 0,
  onClick,
}) => {
  title = truncateText({ text: title, maxLength: 11 });
  author = truncateText({ text: author, maxLength: 11 });

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
