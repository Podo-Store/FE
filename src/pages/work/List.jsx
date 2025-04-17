import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AllListContent from "../../components/list/AllListContent.jsx";
import ListThumbnail from "./../../components/list/ListThumbnail.jsx";
import ListPopup from "./../../components/list/ListPopup.jsx";
import TruncatedListContent from "../../components/list/TruncatedListContent.jsx";

import { useRequest } from "../../hooks/useRequest.js";

import { SERVER_URL } from "../../constants/ServerURL.js";

import circleInfoBtn from "./../../assets/image/button/circleInfoBtn.svg";
import leftBtn from "./../../assets/image/post/list/leftBtn.svg";
import rightBtn from "./../../assets/image/post/list/rightBtn.svg";
import BannerImage1 from "./../../assets/image/listBanner.jpg";
import "./List.scss";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

const bannerImages = [BannerImage1, BannerImage1, BannerImage1];

const List = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [truncatedLongPlays, setTruncatedLongPlays] = useState([]);
  const [longPlays, setLongPlays] = useState([]);
  const [truncatedShortPlays, setTruncatedShortPlays] = useState([]);
  const [shortPlays, setShortPlays] = useState([]);

  const [showTruncatedLongPlays, setShowTruncatedLongPlays] = useState(true);
  const [showAllLongPlays, setShowAllLongPlays] = useState(false);
  const [showTruncatedShortPlays, setShowTruncatedShortPlays] = useState(true);
  const [showAllShortPlays, setShowAllShortPlays] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  // 무한스크롤 페이지
  const [page, setPage] = useState(0);
  // 이후 페이지가 있는지 여부
  const [hasMorePage, setHasMorePage] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const observerTarget = useRef(null);

  const onClickInfoBtn = (event) => {
    // 팝업이 열려 있을 경우 닫기
    if (showPopup) {
      setShowPopup(false);
      return;
    }

    const rect = event.target.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;
    setPopupPosition({ x, y });
    setShowPopup(true);
  };

  useRequest(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${SERVER_URL}scripts`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: Cookies.get("accessToken")
            ? `Bearer ${Cookies.get("accessToken")}`
            : undefined,
        },
      });

      setTruncatedLongPlays(response.data.longPlay);
      setTruncatedShortPlays(response.data.shortPlay);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (!showAllLongPlays) {
      return;
    }

    fetchPlays("long");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, showAllLongPlays]);

  useEffect(() => {
    if (!showAllShortPlays) {
      return;
    }

    fetchPlays("short");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, showAllShortPlays]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMorePage && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMorePage, isLoading]);

  /**
   * @param {string} playType - "long" or "short"
   */
  const fetchPlays = async (playType) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${SERVER_URL}scripts/${playType}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: Cookies.get("accessToken")
            ? `Bearer ${Cookies.get("accessToken")}`
            : undefined,
        },
        params: {
          page: page,
        },
      });

      if (response.data.length > 0) {
        if (playType === "long") {
          setLongPlays((prevPlays) => [...prevPlays, ...response.data]);
        } else {
          setShortPlays((prevPlays) => [...prevPlays, ...response.data]);
        }
      } else {
        setHasMorePage(false);
      }
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ListThumbnail component 렌더링
   * @param {boolean} sliceFlag - slicing flag, 해당 조건 true시 10개씩 노출
   * @param {Array<object>} plays - longPlays or shortPlays
   * @returns ListThumbnail component []
   */
  const renderListThumbnail = (sliceFlag, plays) => {
    const playsToShow = sliceFlag ? plays.slice(0, 10) : plays;
    return playsToShow.map((play) => (
      <ListThumbnail
        key={play.id}
        thumbnailImg={play.imagePath}
        title={play.title}
        author={play.writer}
        scriptPrice={play.scriptPrice}
        performPrice={play.performancePrice}
        onClick={() => {
          navigate(`/list/detail/${play.id}`);
        }}
      />
    ));
  };

  // 더보기 클릭 시 뒤로가기 매핑: 새로고침
  // TruncatedListContent에서 더보기 클릭 시 stack에 추가
  useEffect(() => {
    const handlePopState = () => {
      if (showAllLongPlays || showAllShortPlays) {
        window.location.reload();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [showAllLongPlays, showAllShortPlays]);

  const handleBannerPrev = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const handleBannerNext = () => {
    setCurrentBannerIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="list j-content-center">
      {showPopup && (
        <ListPopup
          onClose={() => setShowPopup(false)}
          position={popupPosition}
        />
      )}
      <div className="list-wrap-wrap">
        <div className="min-height list-wrap">
          <div className="title">
            <h1>작품 둘러보기</h1>
            <img
              src={circleInfoBtn}
              alt="info btn"
              className="info-button"
              onClick={onClickInfoBtn}
            />
          </div>

          {/* 배너 */}
          <div className="banner-wrap">
            <div className="banner-slider">
              <div
                className="banner-track"
                style={{
                  transform: `translateX(-${currentBannerIndex * 100}%)`,
                }}
              >
                {bannerImages.map((img, idx) => (
                  <div className="banner-slide" key={idx}>
                    <div
                      className="banner-img"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <img
              src={leftBtn}
              alt="banner left btn"
              onClick={handleBannerPrev}
            />
            <img
              src={rightBtn}
              alt="banner right btn"
              onClick={handleBannerNext}
            />

            <div className="banner-indicator">
              {bannerImages.map((_, idx) => (
                <span
                  key={idx}
                  className={idx === currentBannerIndex ? "active" : ""}
                  onClick={() => setCurrentBannerIndex(idx)}
                ></span>
              ))}
            </div>
          </div>

          {showTruncatedLongPlays ? (
            // 장편극 10개
            <TruncatedListContent
              playType="장편극"
              plays={truncatedLongPlays}
              showAllPlays={showAllLongPlays}
              setShowAllPlays={setShowAllLongPlays}
              setShowTruncatedShortPlays={setShowTruncatedShortPlays}
              setShowTruncatedLongPlays={setShowTruncatedLongPlays}
              renderListThumbnail={renderListThumbnail}
              isLoading={isLoading}
            />
          ) : null}

          {showAllLongPlays ? (
            // 장편극 전체
            <AllListContent
              playType="장편극"
              plays={longPlays}
              renderListThumbnail={renderListThumbnail}
              isLoading={isLoading}
              observerTarget={observerTarget}
            />
          ) : null}

          {showTruncatedShortPlays ? (
            // 단편극 10개
            <TruncatedListContent
              playType="단편극"
              plays={truncatedShortPlays}
              showAllPlays={showAllShortPlays}
              setShowAllPlays={setShowAllShortPlays}
              setShowTruncatedShortPlays={setShowTruncatedShortPlays}
              setShowTruncatedLongPlays={setShowTruncatedLongPlays}
              renderListThumbnail={renderListThumbnail}
              isLoading={isLoading}
            />
          ) : null}

          {showAllShortPlays ? (
            // 단편극 전체
            <AllListContent
              playType="단편극"
              plays={shortPlays}
              renderListThumbnail={renderListThumbnail}
              isLoading={isLoading}
              observerTarget={observerTarget}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default List;
