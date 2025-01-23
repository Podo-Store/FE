import "./Page4Button.scss";

interface Page4ButtonProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const Page4Button: React.FC<Page4ButtonProps> = ({ src, alt, onClick }) => {
  return (
    <button className="page4-button c-pointer" onClick={onClick}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default Page4Button;
