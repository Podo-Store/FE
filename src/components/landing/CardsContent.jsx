import "./CardsContent.css";

/**
 *
 * @param {*} props - Component properties
 * @param {number} props.pageNum - 페이지 번호
 * @param {Object} props.isOpened - 카드 오픈 여부
 * @param {function} props.setIsOpened - 카드 오픈 여부 설정 함수
 * @param {boolean} [props.rightMargin=true] - 오른쪽 여백 여부
 * @returns
 */
const CardsContent = ({ pageNum, isOpened, setIsOpened, rightMargin = true }) => {
  const onMouseEnter = () => {
    setIsOpened((prev) => ({ ...prev, [pageNum]: true }));
  };

  const onMouseLeave = () => {
    setIsOpened((prev) => ({ ...prev, [pageNum]: false }));
  };

  return isOpened ? (
    <div className="cards-wrap d-flex" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div id="opened" className="cards-content f-dir-column j-content-between">
        <div className="cards-top fade-in a-items-center">
          <div className="label p-medium-regular c-white">키워드 이모저모</div>
          <div className="label-circle"></div>
          <div className="label p-medium-regular c-white">집에가자</div>
        </div>
        <div className="cards-bottom j-content-between">
          <h1 className="fade-in h1-regular c-white">MOU 단체명</h1>
          <div className="mou-logo"></div>
        </div>
      </div>
      {rightMargin && <div className="margin"></div>}
    </div>
  ) : (
    <div className="cards-wrap d-flex" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div id="closed" className="cards-content f-dir-column f-center">
        <p className="fade-in p-large-medium c-white t-center">MOU 단체명</p>
        <div className="mou-logo"></div>
      </div>
      {rightMargin && <div className="margin"></div>}
    </div>
  );
};

export default CardsContent;
