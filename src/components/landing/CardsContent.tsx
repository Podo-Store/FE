import React, { Fragment, useState, useEffect } from "react";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import { organizationsExport } from "../../constants/organizations";

import "./CardsContent.scss";
import clsx from "clsx";

/**
 *
 * @param {*} props - Component properties
 * @param {number} props.pageNum - 페이지 번호
 * @param {Object} props.isOpened - 카드 오픈 여부
 * @param {function} props.setIsOpened - 카드 오픈 여부 설정 함수
 * @returns
 */

interface CardsContentProps {
  pageNum: number;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}

const CardsContent: React.FC<CardsContentProps> = ({
  pageNum,
  isOpened,
  setIsOpened,
}) => {
  // MOU 키워드 보이지 않게 처리
  const [isKeywordVisible, setIsKeywordVisible] = useState(false);
  // MOU 키워드 등장 애니메이션
  const [isKeywordAnimating, setIsKeywordAnimating] = useState(false);
  // 배경 단체 사진
  const [showPhoto, setShowPhoto] = useState(false);

  // for responsive design
  const { widthConditions } = useWindowDimensions();
  const isTablet =
    widthConditions.isTablet ||
    widthConditions.isMobile ||
    widthConditions.isSmallMobile;

  useEffect(() => {
    setShowPhoto(false);
    let timers: NodeJS.Timeout[] = new Array(3);

    if (isOpened) {
      setIsKeywordVisible(false);
      timers[0] = setTimeout(() => {
        setIsKeywordVisible(true);
        setIsKeywordAnimating(true);
        timers[1] = setTimeout(() => {
          setShowPhoto(true);
          timers[2] = setTimeout(() => {
            setIsKeywordAnimating(false);
          }, 1000);
        }, 500);
      }, 300);
    }
    return () => {
      clearTimeout(timers[0]);
      clearTimeout(timers[1]);
      clearTimeout(timers[2]);
    };
  }, [isOpened]);

  const onMouseEnter = () => {
    if (!organizationsExport[pageNum]) {
      return;
    }

    // setIsOpened((prev) => ({ ...prev, [pageNum]: true }));
    // 선택된 카드만 열기, 나머진 닫기
    if (!isTablet) {
      // 기본: mouse hover 시 카드 열기
      setIsOpened((prev) => ({ [pageNum]: true }));
    }
  };
  const onClick = () => {
    if (!organizationsExport[pageNum]) {
      return;
    }

    // 선택된 카드만 열기, 나머진 닫기
    if (isTablet) {
      // responsive: 클릭 시 카드 열기
      setIsOpened((prev) => ({ [pageNum]: true }));
    }
  };

  const onMouseLeave = () => {
    // setIsOpened((prev) => ({ ...prev, [pageNum]: false }));
  };

  return isOpened ? (
    <div
      className="cards-wrap flex justify-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div id="opened" className="cards-content f-dir-column j-content-between">
        {/* 배경 이미지용 div */}
        <div
          className={`background-image   ${showPhoto ? "visible" : ""}`}
          style={{
            backgroundImage: `url(${organizationsExport[pageNum]?.photo?.src})`,
            ...organizationsExport[pageNum]?.photo?.style,
          }}
        ></div>

        {isKeywordVisible ? (
          <div
            className={`cards-top ${
              isKeywordAnimating ? "fade-in" : ""
            } a-items-center`}
          >
            {organizationsExport[pageNum]?.keywords?.map((keyword, index) => (
              <Fragment key={index}>
                <div
                  className={clsx(
                    "label c-white",
                    !widthConditions.isMobile && !widthConditions.isSmallMobile
                      ? "p-medium-regular"
                      : !widthConditions.isSmallMobile
                      ? "p-xs-medium"
                      : "font-[500] text-[8px]"
                  )}
                >
                  {keyword}
                </div>
                {
                  // label 사이의 원 제어
                  // 1. 마지막 label일 때 제거
                  index !==
                    organizationsExport[pageNum]?.keywords?.length - 1 &&
                    // 2. small-mobile이 아닐 때, 사용자 정의된 추가 삭제 원이 있을 때 제거
                    !widthConditions.isSmallMobile &&
                    !organizationsExport[
                      pageNum
                    ]?.additionalDeleteCircle?.includes(index) && (
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
          <h1
            className={`fade-in c-white ${
              !widthConditions.isMobile && !widthConditions.isSmallMobile
                ? "h1-regular"
                : !widthConditions.isSmallMobile
                ? "h4-regular"
                : "p-medium-medium"
            }`}
          >
            {organizationsExport[pageNum]?.name || ""}
          </h1>
          <div className="mou-logo f-center">
            <img
              src={organizationsExport[pageNum]?.logo?.src}
              alt=""
              style={organizationsExport[pageNum]?.logo?.style}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="cards-wrap flex justify-center"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div id="closed" className="cards-content f-dir-column f-center">
        <p
          className={clsx(
            "fade-in c-white t-center",
            !widthConditions.isSmallMobile
              ? "p-large-medium"
              : "p-medium-medium"
          )}
        >
          {organizationsExport[pageNum]?.name || "포도상점과 MOU를 맺어주세요!"}
        </p>
        <div className="mou-logo f-center">
          {organizationsExport[pageNum]?.logo?.src ? (
            <img
              src={organizationsExport[pageNum]?.logo?.src}
              alt=""
              style={organizationsExport[pageNum]?.logo?.style}
            />
          ) : (
            <>?</>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardsContent;
