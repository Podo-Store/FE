import "./Page4Button.scss";

interface Page4ButtonProps {
  src: string;
  alt: string;
  onClick: () => void;
  imgClassName?: string;
}

const Page4Button = ({ src, alt, onClick, imgClassName }: Page4ButtonProps) => {
  return (
    <button className="page4-button c-pointer" onClick={onClick}>
      <img src={src} alt={alt} className={imgClassName} />
    </button>
  );
};

export default Page4Button;
