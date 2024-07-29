import "./ListThumbnail.css";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";

const ListThumbnail = ({
  title = "Archive",
  author = "서준",
  scriptPrice = "20,000",
  performPrice = "20,000",
}) => {
  return (
    <div className="list-thumbnail">
      <div className="thumbnail-img"></div>
      <div className="description">
        <h5>
          {title} / {author}
        </h5>
        <div className="price">
          <img src={scriptImg} alt="script"></img>
          <h6>{scriptPrice}원</h6>
          <img src={performImg} alt="perform"></img>
          <h6>{performPrice}원</h6>
        </div>
      </div>
    </div>
  );
};

export default ListThumbnail;
