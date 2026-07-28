import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultThumbnail from "./../../assets/image/defaultThumbnail.svg";

/**
 * @param {*} props
 * @param {*} props.style - e.g. style={{ width: "24.271vw", height: "0", paddingBottom: "24.271vw" }}
 * @param {*} props.imagePath - 이미지 경로
 * @param {boolean} [props.isRoute] - 클릭 시 detail 페이지 이동 활성화 여부, 값 넣을 시 썸네일과 제목에 추가 및 cursor-pointer 적용
 * @param {string} [props.id] - 클릭 시 detail 페이지 이동 시 사용할 id
 * @returns
 */
const ThumbnailImg = ({
  className,
  style,
  imagePath,
  isRoute = false,
  id,
  loading = "lazy",
  fetchPriority = "auto",
  alt = "작품 썸네일",
  children,
  ...props
}) => {
  const navigate = useNavigate();
  const [hasLoadError, setHasLoadError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHasLoadError(false);
    setIsLoaded(false);
  }, [imagePath]);

  const imageSource = hasLoadError ? defaultThumbnail : imagePath || defaultThumbnail;

  return (
    <div className="relative">
      <div
        className={`relative size-[197px] max-[479px]:size-[120px] shrink-0 box-border overflow-hidden rounded-[20px] border border-[var(--grey-grey-3,#e2e2e2)] bg-white transition-transform duration-200 ease-out hover:scale-[1.04] motion-reduce:transition-none ${className}`}
        style={{
          ...style,
        }}
        {...props}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-[#f0f0f0] transition-opacity duration-200 motion-reduce:animate-none ${
            isLoaded ? "opacity-0" : "animate-pulse opacity-100"
          }`}
        />
        <img
          key={imageSource}
          src={imageSource}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className={`pointer-events-none absolute inset-0 size-full object-contain transition-opacity duration-[180ms] ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasLoadError(true);
            setIsLoaded(false);
          }}
        />
        {children && <div className="relative z-10">{children}</div>}
      </div>
      {isRoute && (
        <button
          className="absolute top-0 size-full cursor-pointer"
          style={{ top: 0 }} // 그러니까 왜 tailwind 안먹음..?
          onClick={() => {
            navigate(`/detail/${id}`);
          }}
        ></button>
      )}
    </div>
  );
};

export default ThumbnailImg;
