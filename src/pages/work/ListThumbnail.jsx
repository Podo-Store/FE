import "./ListThumbnail.css";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import typeWriterImg from "./../../assets/image/post/vintageTypeWriter.svg";
import { formatPrice } from "../../utils/formatPrice";
import PriceTextsHorizontal from "./PriceTextsHorizontal";

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
