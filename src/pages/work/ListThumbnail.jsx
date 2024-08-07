import "./ListThumbnail.css";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import typeWriterImg from "./../../assets/image/post/vintageTypeWriter.svg";
import { formatPrice } from "../../utils/formatPrice";

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
        <div className="price">
          <img src={scriptImg} alt="script"></img>
          <h6>{formatPrice(scriptPrice)}원</h6>
          <img src={performImg} alt="perform"></img>
          <h6>{formatPrice(performPrice)}원</h6>
        </div>
      </div>
    </div>
  );
};

export default ListThumbnail;
