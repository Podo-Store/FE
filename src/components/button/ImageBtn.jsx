import "./ImageBtn.css";

/**
 *
 * @param {*} props
 * @param {string} props.src - 이미지 src
 * @param {string} props.alt - 이미지 alt
 * @param {function} props.onClick - 버튼 onClick
 * @param {string} props.className - 버튼 className
 * @param {string} props.id - 버튼 id
 * @param {string} props.size - 이미지 width, height
 * @returns
 */
const ImageBtn = ({ src, alt, onClick, className = "", id = "", size }) => {
  return (
    <button id={id} className={`image-btn c-pointer ${className}`} onClick={onClick}>
      <img src={src} alt={alt} style={size && { width: `${size}`, height: `${size}` }} />
    </button>
  );
};

export default ImageBtn;
