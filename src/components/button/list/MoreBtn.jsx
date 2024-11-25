import SmallOnOffBtn from "../RoundBtn_135_40";

/**
 * 더보기 버튼
 */
const MoreBtn = ({ onClick }) => {
  return (
    <SmallOnOffBtn
      color="white"
      style={{ width: "121px", height: "auto", padding: "3px 0" }}
      onClick={onClick}
    >
      더보기
    </SmallOnOffBtn>
  );
};

export default MoreBtn;
