import "./ImageBtn.css";

const ImageBtn = ({ src, alt, onClick, className = "", id = "" }) => {
  return (
    <button id={id} className={`${className} image-btn c-pointer`} onClick={onClick}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default ImageBtn;
