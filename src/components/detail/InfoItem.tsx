import purpleCheckIcon from "@/assets/image/myPage/ic_pupple_check.svg";
import stickIcon from "@/assets/image/myPage/ic_stick.svg";
import "./InfoItem.scss";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => {
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  return (
    <div className="info-item flex items-center">
      <img src={purpleCheckIcon} alt="보라색 체크" />
      <div className="info-item-content flex items-center">
        <span className={!isSmallMobile ? "p-large-bold" : "p-12-bold"}>
          {label}
        </span>
        <img src={stickIcon} alt="구분선" />
        <span className={!isSmallMobile ? "p-large-regular" : "p-12-400"}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default InfoItem;
