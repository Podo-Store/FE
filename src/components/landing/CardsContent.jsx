import React, { Fragment, useState, useEffect } from "react";
import { organizations } from "../../constants/organizations.ts";
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
  // MOU 키워드 보이지 않게 처리
  const [isKeywordVisible, setIsKeywordVisible] = useState(false);
  // MOU 키워드 등장 애니메이션
  const [isKeywordAnimating, setIsKeywordAnimating] = useState(false);
  // 배경 단체 사진
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    setShowPhoto(false);
    let timer1;
    let timer2;
    if (isOpened) {
      setIsKeywordVisible(false);
      timer1 = setTimeout(() => {
        setIsKeywordVisible(true);
        setIsKeywordAnimating(true);
        timer2 = setTimeout(() => {
          setIsKeywordAnimating(false);
          setShowPhoto(true);
        }, 500);
      }, 300);
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpened]);

  const onMouseEnter = () => {
    setIsOpened((prev) => ({ ...prev, [pageNum]: true }));
  };

  const onMouseLeave = () => {
    setIsOpened((prev) => ({ ...prev, [pageNum]: false }));
  };

  return isOpened ? (
    <div className="cards-wrap d-flex" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div id="opened" className="cards-content f-dir-column j-content-between">
        {/* 배경 이미지용 div */}
        <div
          className={`background-image ${showPhoto ? "visible" : ""}`}
          style={{
            backgroundImage: `url(${organizations?.[pageNum]?.photo?.src})`,
            ...organizations?.[pageNum]?.photo?.style,
          }}
        ></div>

        {isKeywordVisible ? (
          <div className={`cards-top ${isKeywordAnimating ? "fade-in" : ""} a-items-center`}>
            {organizations?.[pageNum]?.keywords?.map((keyword, index) => (
              <Fragment key={index}>
                <div className="label p-medium-regular c-white">{keyword}</div>
                {
                  // label 사이의 원 제어
                  // 1. 마지막 label일 때 제거
                  index !== organizations?.[pageNum]?.keywords?.length - 1 &&
                    // 2. 사용자 정의된 추가 삭제 원이 있을 때 제거
                    !organizations?.[pageNum]?.additionalDeleteCircle?.includes(index) && (
                      <div className="label-circle"></div>
                    )
                }
              </Fragment>
            ))}
          </div>
        ) : (
          <div></div>
        )}
        <div className="cards-bottom j-content-between">
          <h1 className="fade-in h1-regular c-white">
            {organizations?.[pageNum]?.name || "MOU 단체명"}
          </h1>
          <div className="mou-logo f-center">
            <img
              src={organizations?.[pageNum]?.logo?.src}
              alt=""
              style={organizations?.[pageNum]?.logo?.style}
            />
          </div>
        </div>
      </div>
      {rightMargin && <div className="margin"></div>}
    </div>
  ) : (
    <div className="cards-wrap d-flex" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div id="closed" className="cards-content f-dir-column f-center">
        <p className="fade-in p-large-medium c-white t-center">
          {organizations?.[pageNum]?.name || "MOU 단체명"}
        </p>
        <div className="mou-logo f-center">
          <img
            src={organizations?.[pageNum]?.logo?.src}
            alt=""
            style={organizations?.[pageNum]?.logo?.style}
          />
        </div>
      </div>
      {rightMargin && <div className="margin"></div>}
    </div>
  );
};

export default CardsContent;
