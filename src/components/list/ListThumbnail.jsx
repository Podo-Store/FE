import "./ListThumbnail.css";
import typeWriterImg from "./../../assets/image/post/vintageTypeWriter.svg";
import PriceTextsHorizontal from "../price/PriceTextsHorizontal";

const ListThumbnail = ({
  thumbnailImg,
  title,
  author,
  scriptPrice = 0,
  performPrice = 0,
  onClick,
}) => {
  return (
    <div className="list-thumbnail" onClick={onClick}>
      <div
        className="thumbnail-img"
        style={{
          backgroundImage: `url(${thumbnailImg ? thumbnailImg : typeWriterImg})`,
        }}
      ></div>
      <div className="description">
        <h5>
          {title} / {author}
        </h5>

        <PriceTextsHorizontal scriptPrice={scriptPrice} performPrice={performPrice} />
      </div>
    </div>
  );
};

export default ListThumbnail;
