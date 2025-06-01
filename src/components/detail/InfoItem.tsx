import puppleCheckIcon from "@/assets/image/myPage/ic_pupple_check.svg";
import stickIcon from "@/assets/image/myPage/ic_stick.svg";

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex  gap-[6px] items-center">
    <img src={puppleCheckIcon} alt="보라색 체크" />
    <div className="flex gap-[15px]">
      <span className="p-large-bold">{label}</span>
      <img src={stickIcon} alt="구분선" />
      <span className="p-large-regular">{value}</span>
    </div>
  </div>
);

export default InfoItem;
