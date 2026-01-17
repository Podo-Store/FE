import { useNavigate } from "react-router-dom";
import defaultThumbnail from "./../../assets/image/defaultThumbnail.svg";
import { ReactNode } from "react";
import "./ThumbnailImg.scss";

type DefaultThumbnailProps = {
  className?: string;
  imagePath?: string;
  isRoute?: boolean;
  id?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
};

const DefaultThumbnail = ({
  className = "",
  imagePath = "",
  isRoute = false,
  id,
  style,
  onClick,
  children,
}: DefaultThumbnailProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!isRoute || !id) return;
    navigate(`/detail/${id}`);
  };

  return (
    <div className={`relative ${className}`}>
      <img
        className={`w-full h-full object-cover rounded-[26px] ${
          !imagePath && `border-[0.5px] border-[var(--grey3)]`
        }`}
        src={`${imagePath || defaultThumbnail}`}
        onClick={isRoute ? handleClick : onClick}
      />
      <div className="absolute bottom-[7.14%] right-[10.48%] whitespace-nowrap ">
        {" "}
        {children}
      </div>
    </div>
  );
};

export default DefaultThumbnail;
