import { useNavigate } from "react-router-dom";
import defaultThumbnail from "./../../assets/image/defaultThumbnail.svg";

import "./ThumbnailImg.css";

/**
 * @param {*} props
 * @param {*} props.style - e.g. style={{ width: "24.271vw", height: "0", paddingBottom: "24.271vw" }}
 * @param {*} props.imagePath - 이미지 경로
 * @param {boolean} [props.isRoute] - 클릭 시 detail 페이지 이동 활성화 여부, 값 넣을 시 썸네일과 제목에 추가 및 cursor-pointer 적용
 * @param {string} [props.id] - 클릭 시 detail 페이지 이동 시 사용할 id
 * @returns
 */
const ThumbnailImg = ({ className, style, imagePath, isRoute = false, id, ...props }) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div
        className={`__thumbnail-img ${className}`}
        style={{ ...style, backgroundImage: `url(${imagePath || defaultThumbnail})` }}
        {...props}
      ></div>
      {isRoute && (
        <button
          className="absolute top-0 size-full cursor-pointer"
          style={{ top: 0 }} // 그러니까 왜 tailwind 안먹음..?
          onClick={() => {
            navigate(`/list/detail/${id}`);
          }}
        ></button>
      )}
    </div>
  );
};

export default ThumbnailImg;
