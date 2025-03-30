import { useEffect, useState } from "react";

import CardsContent from "./CardsContent";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import rightArrow from "../../assets/image/landing/Vector 22 Right.svg";

import "./Page3Cards.scss";

interface Page3CardsProps {
  pageStartNum: number;
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
  setLeftArrowDisappear?: boolean;
  setRightArrowDisappear?: boolean;
}

/**
 * @param props
 * @param {number} props.pageStartNum - 카드의 시작 번호: 0, 5, ...
 * @param {function} props.onPrevSlide - 이전 슬라이드로 이동하는 함수
 * @param {function} props.onNextSlide - 다음 슬라이드로 이동하는 함수
 * @param {boolean} [props.setLeftArrowDisappear] - 왼쪽 화살표 숨기기 여부
 * @param {boolean} [props.setRightArrowDisappear] - 오른쪽 화살표 숨기기 여부
 */
const Page3Cards: React.FC<Page3CardsProps> = ({
  pageStartNum = 0,
  onPrevSlide,
  onNextSlide,
  setLeftArrowDisappear = false,
  setRightArrowDisappear = false,
}) => {
  // for responsive design
  const { widthConditions } = useWindowDimensions();
  const isTablet = widthConditions.isTablet || widthConditions.isMobile;
  const slidesPerPage = !isTablet ? 5 : 3;

  // 5개 카드의 오픈 여부 상태
  const [isOpened, setIsOpened] = useState<{ [key: number]: boolean }>(
    () => {
      const initialState: { [key: number]: boolean } = {};
      for (let i = pageStartNum; i < pageStartNum + slidesPerPage; ++i) {
        initialState[i] = i === pageStartNum ? true : false;
      }
      return initialState;
    }
    // {
    // [pageStartNum]: true,
    // [pageStartNum + 1]: false,
    // [pageStartNum + 2]: false,
    // [pageStartNum + 3]: false,
    // [pageStartNum + 4]: false,
    // }
  );

  useEffect(() => {
    // 모든 카드가 closed면 첫 번째 카드 open
    if (!Object.values(isOpened).includes(true)) {
      setIsOpened((prev) => ({ ...prev, [pageStartNum]: true }));
    }
    // 첫 번째 카드 외 다른 카드가 open이면 첫 번째 카드를 closed
    else if (
      isOpened[pageStartNum] &&
      Object.values(isOpened).filter((value) => value).length > 1
    ) {
      setIsOpened((prev) => ({ ...prev, [pageStartNum]: false }));
    }
  }, [isOpened, pageStartNum]);

  const renderCardsContents = () => {
    const cards = [];
    for (let i = pageStartNum; i < pageStartNum + slidesPerPage; ++i) {
      cards.push(
        <CardsContent key={i} pageNum={i} isOpened={isOpened[i]} setIsOpened={setIsOpened} />
      );
    }
    return cards;
  };

  return (
    <div className="cards j-content-center">
      <div className="cards-arrow-wrap a-items-center">
        {!setLeftArrowDisappear && (
          <img
            id="left"
            className="cards-arrow c-pointer"
            src={rightArrow}
            alt="<"
            onClick={onPrevSlide}
          />
        )}
      </div>

      <div className="cards-content-wrap">{renderCardsContents()}</div>
      <div className="cards-arrow-wrap a-items-center">
        {!setRightArrowDisappear && (
          <img className="cards-arrow c-pointer" src={rightArrow} alt=">" onClick={onNextSlide} />
        )}
      </div>
    </div>
  );
};

export default Page3Cards;
