import defaultThumbnail from "./../../assets/image/defaultThumbnail.svg";

import "./ThumbnailImg.css";

/**
 * @param {*} props
 * @param {*} props.style - e.g. style={{ width: "24.271vw", height: "0", paddingBottom: "24.271vw" }}
 * @param {*} props.imagePath - 이미지 경로
 * @returns
 */
const ThumbnailImg = ({ children, className, id, style, imagePath }) => {
  return (
    <div
      className={`__thumbnail-img ${className}`}
      id={id}
      style={{ ...style, backgroundImage: `url(${imagePath || defaultThumbnail})` }}
    >
      {children}
    </div>
  );
};

export default ThumbnailImg;
