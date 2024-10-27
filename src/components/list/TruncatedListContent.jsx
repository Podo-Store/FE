import MoreBtn from "../button/list/MoreBtn";
import PartialLoading from "../loading/PartialLoading";

import sparkles from "../../assets/image/post/list/sparkles.svg";

/**
 * 기본 상태에서 10개씩 노출되는 작품 리스트
 * @param {object} props - props
 * @param {string} props.playType - "단편극" or "장편극"
 * @param {object} props.plays - shortPlays or longPlays
 * @param {boolean} props.showAllPlays - showAllShortPlays or showAllLongPlays
 * @param {function} props.setShowAllPlays - setShowAllShortPlays or setShowAllLongPlays
 * @returns
 */
const TruncatedListContent = ({
  playType,
  plays,
  showAllPlays,
  setShowAllPlays,
  setShowTruncatedShortPlays,
  setShowTruncatedLongPlays,
  renderListThumbnail,
  isLoading,
}) => {
  return (
    <div className="work-list">
      <div className="j-content-between work-list-title">
        <div className="a-items-center" id="title">
          <img src={sparkles} alt="sparkles"></img>
          <h5 className="h5-bold">{playType}</h5>
          <img src={sparkles} alt="sparkles"></img>
        </div>
        <MoreBtn
          onClick={() => {
            window.scrollTo(0, 0);
            setShowTruncatedShortPlays(false);
            setShowTruncatedLongPlays(false);
            setShowAllPlays(true);

            // 더보기 버튼 클릭 시 stack에 추가
            window.history.pushState(null, document.title, window.location.href);
          }}
        />
      </div>
      <div className="work-list-content">
        {isLoading ? (
          <PartialLoading />
        ) : (
          // 기본 상태: 10개씩, 더보기 버튼 클릭 시 전체 노출
          renderListThumbnail(showAllPlays, plays)
        )}
      </div>
    </div>
  );
};

export default TruncatedListContent;
