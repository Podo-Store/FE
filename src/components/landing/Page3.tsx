import { useEffect, useState } from "react";

import CardsContent from "./CardsContent";

import rightArrow from "../../assets/image/landing/Vector 22 Right.svg";

import "./Page3.css";

const Page3 = () => {
  // 3페이지 카드 오픈 여부
  const [isOpened, setIsOpened] = useState({ 0: true, 1: false, 2: false, 3: false, 4: false });

  useEffect(() => {
    // 3페이지 모든 카드가 closed일 경우 첫번째 카드를 open으로 설정
    if (!Object.values(isOpened).includes(true)) {
      setIsOpened((prev) => ({ ...prev, 0: true }));
    }
    // 첫번째 카드 이외의 다른 카드가 open일 경우 첫번째 카드를 closed로 설정
    else if (isOpened[0] && Object.values(isOpened).filter((value) => value).length > 1) {
      setIsOpened((prev) => ({ ...prev, 0: false }));
    }
  }, [isOpened]);

  return (
    <div className="page3 page-size">
      <h1 className="title_64px">포도상점과 함께하고 있어요</h1>
      <h3 className="title_20px">포도상점은 다양한 공연 단체와 협력하고 있어요.</h3>
      <div className="cards j-content-center">
        <div className="a-items-center">
          <img id="left" className="cards-arrow" src={rightArrow} alt="<" />
        </div>
        <div className="j-content-center">
          <CardsContent pageNum={0} isOpened={isOpened[0]} setIsOpened={setIsOpened} />
          <CardsContent pageNum={1} isOpened={isOpened[1]} setIsOpened={setIsOpened} />
          <CardsContent pageNum={2} isOpened={isOpened[2]} setIsOpened={setIsOpened} />
          <CardsContent pageNum={3} isOpened={isOpened[3]} setIsOpened={setIsOpened} />
          <CardsContent
            pageNum={4}
            isOpened={isOpened[4]}
            setIsOpened={setIsOpened}
            rightMargin={false}
          />
        </div>
        <div className="a-items-center">
          <img className="cards-arrow" src={rightArrow} alt=">" />
        </div>
      </div>
    </div>
  );
};

export default Page3;
