import PartialLoading from "../loading/PartialLoading";

import sparkles from "../../assets/image/post/list/sparkles.svg";
import FloatingBtn from "../button/FloatingBtn";

/**
 * 더보기 클릭 시 무한 스크롤로 노출되는 작품 리스트
 * @param {object} props - props
 * @param {string} props.playType - "단편극" or "장편극"
 * @param {object} props.plays - shortPlays or longPlays
 * @returns
 */
const AllListContent = ({ playType, plays, renderListThumbnail, isLoading, observerTarget }) => {
  return (
    <div className="work-list">
      <FloatingBtn />

      <div className="j-content-between work-list-title">
        <div className="a-items-center" id="title">
          <img src={sparkles} alt="sparkles"></img>
          <h5 className="h5-bold">{playType}</h5>
          <img src={sparkles} alt="sparkles"></img>
        </div>
      </div>
      <div className="work-list-content">
        {renderListThumbnail(false, plays)}
        {isLoading ? <PartialLoading /> : null}
      </div>

      <div ref={observerTarget} style={{ height: "1px" }}></div>
    </div>
  );
};

export default AllListContent;
