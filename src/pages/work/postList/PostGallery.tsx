import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Cookies from "js-cookie";

import AuthContext from "@/contexts/AuthContext";

import {
  fetchExploreScripts,
  getLongWorks,
  getShortWorks,
  ScriptItem,
} from "@/api/user/postListApi";

import PartialLoading from "@/components/loading/PartialLoading";
import InfiniteBanner from "@/components/banner/InfiniteBanner.js";
import SectionBlock from "@/components/post/SectionBlock";
import { AllPostCard } from "@/components/post/PostList.js";
import PostHeaderControl from "@/components/post/PostHeaderControl";

import BannerImage1 from "@/assets/image/listBanner.jpg";
import BannerImage2 from "@/assets/image/postList_banner.png";

import { useToggleLike } from "@/hooks/useToggleLike";
import "./postGallery.scss";

const bannerImages = [BannerImage1, BannerImage2];

const ScrollObserver: React.FC<{
  inViewRef: (node?: Element | null) => void;
  id: string;
}> = ({ inViewRef, id }) => {
  return <div ref={inViewRef} key={id} className="h-[1px] mt-[100px]" />;
};

const PostGallery = () => {
  const [longPlays, setLongPlays] = useState<ScriptItem[]>([]); // 전체 longPlays
  const [hasMoreLongPlays, setHasMoreLongPlays] = useState(true);
  const [longPlayPage, setLongPlayPage] = useState(0);

  const [shortPlays, setShortPlays] = useState<ScriptItem[]>([]); // 전체 shorPlays
  const [hasMoreShortPlays, setHasMoreShortPlays] = useState(true);
  const [shortPlayPage, setShortPlayPage] = useState(0);
  const [observerKey, setObserverKey] = useState(0);
  // const observerRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeStage = searchParams.get("stage") || "포도밭";
  const activeCategory = searchParams.get("category") || "전체";

  const [isLoading, setIsLoading] = useState(true);

  const [viewType, setViewType] = useState<"grid" | "card">("grid");
  const [sortType, setSortType] = useState<"POPULAR" | "LIKE_COUNT" | "LATEST">(
    "POPULAR"
  );

  const [colNum, setColNum] = useState(5);
  const [postNum, setPostNum] = useState(10);
  const [resetFlag, setResetFlag] = useState(false);
  const isAuthenticated = useContext(AuthContext);
  const rawToggleLikeLong = useToggleLike(setLongPlays);
  const rawToggleLikeShort = useToggleLike(setShortPlays);

  const { ref: inViewRef, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
    fallbackInView: true,
    initialInView: false,
  });

  const handleChange = (newStage: string, menu: string) => {
    const updated = new URLSearchParams(searchParams.toString()); //searchParams 복사본
    updated.set(`${menu}`, newStage);
    setSearchParams(updated);
  };

  useEffect(() => {
    setObserverKey((prev) => prev + 1);
  }, [sortType, activeCategory]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        if (activeCategory === "장편") {
          const longData = await getLongWorks(
            longPlayPage,
            accessToken,
            sortType
          );
          if (longData.length === 0) {
            setHasMoreLongPlays(false);
            return;
          }

          setTimeout(() => {
            setLongPlays((prev) =>
              Array.from(
                new Map(
                  [...prev, ...longData].map((post) => [post.id, post])
                ).values()
              )
            );
            requestAnimationFrame(() => {
              setIsLoading(false);
            });
          }, 150);
        } else if (activeCategory === "단편") {
          const shortData = await getShortWorks(
            shortPlayPage,
            accessToken,
            sortType
          );
          if (shortData.length === 0) {
            setHasMoreShortPlays(false);
            return;
          }

          setTimeout(() => {
            setShortPlays((prev) =>
              Array.from(
                new Map(
                  [...prev, ...shortData].map((post) => [post.id, post])
                ).values()
              )
            );
            requestAnimationFrame(() => {
              setIsLoading(false);
            });
          }, 150);
        } else {
          const allData = await fetchExploreScripts(accessToken, sortType);

          setLongPlays(Array.isArray(allData.longPlay) ? allData.longPlay : []);
          setShortPlays(
            Array.isArray(allData.shortPlay) ? allData.shortPlay : []
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error("좋아요 목록 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeCategory, longPlayPage, shortPlayPage, sortType]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColNum(2);
        setPostNum(4);
      } else if (width < 1280) {
        setColNum(3);
        setPostNum(6);
      } else {
        setColNum(5);
        setPostNum(10);
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const makeToggleHandler = (rawToggleFn: (postId: string) => void) => {
    return (postId: string) => {
      if (!isAuthenticated) {
        alert("로그인이 필요합니다.");
        return;
      }
      rawToggleFn(postId);
    };
  };

  const handleToggleLikeLong = makeToggleHandler(rawToggleLikeLong);
  const handleToggleLikeShort = makeToggleHandler(rawToggleLikeShort);

  useEffect(() => {
    // 빈 useEffect로 스크롤 복원 차단 (라우팅된 후에도 위치 유지)
  }, []);

  useEffect(() => {
    if (!inView || isLoading) return;

    if (activeCategory === "장편" && hasMoreLongPlays) {
      setLongPlayPage((prev) => prev + 1);
    } else if (activeCategory === "단편" && hasMoreShortPlays) {
      setShortPlayPage((prev) => prev + 1);
    }
  }, [inView, isLoading, activeCategory, hasMoreLongPlays, hasMoreShortPlays]);

  useEffect(() => {
    setResetFlag(true);
    setLongPlays([]);
    setShortPlays([]);
    setLongPlayPage(0);
    setShortPlayPage(0);
    setHasMoreLongPlays(true);
    setHasMoreShortPlays(true);
  }, [activeCategory, sortType]);

  useEffect(() => {
    if (!resetFlag) return;
    setResetFlag(false);
  }, [resetFlag]);

  return (
    <div className="flex flex-col m-auto list-wrap-wrap py-[72px] ">
      {/*------ 작품 둘러보기 ------*/}
      <h1 className="text-[20px] font-bold leading-[28px] tracking-[-0.4px] text-black font-['Pretendard'] mb-[30px]">
        작품 둘러보기
      </h1>

      {/*------ 배너 ------*/}
      <InfiniteBanner images={bannerImages} />

      {/*----- 스테이지 메뉴 -----*/}

      <PostHeaderControl
        activeStage={activeStage}
        setActiveStage={(value) => handleChange(value, "stage")}
        activeStoryLength={activeCategory}
        setActiveStoryLength={(value) => handleChange(value, "category")}
        viewType={viewType}
        setViewType={setViewType}
        isSorted={true}
        sortType={sortType}
        setSortType={setSortType}
        stageBottomBorderWidth={"w-[140vw]"}
      />

      {/*----- post list -----*/}
      {isLoading ? (
        <div className="m-auto" style={{ height: "600px" }}>
          <PartialLoading />
        </div>
      ) : activeCategory === "전체" ? (
        <div className="mb-[]">
          <div className="">
            <SectionBlock
              posts={shortPlays}
              viewType={viewType}
              postNum={postNum}
              colNum={colNum}
              title="단편"
              onMoreClick={(value) => handleChange(value, "category")}
              onToggleLike={handleToggleLikeShort}
            />
          </div>
          <div className="mt-[78px]">
            <SectionBlock
              posts={longPlays}
              viewType={viewType}
              postNum={postNum}
              colNum={colNum}
              title="장편"
              onMoreClick={(value) => handleChange(value, "category")}
              onToggleLike={handleToggleLikeLong}
            />
          </div>
        </div>
      ) : activeCategory === "장편" ? (
        <>
          <div className="mb-[24px]">
            <p className="h5-medium ">장편극</p>
          </div>

          <div
            className={`transition-opacity duration-300 ${
              isLoading
                ? "opacity-0 pointer-events-none invisible"
                : "opacity-100 visible"
            }`}
          >
            {longPlays.length !== 0 ? (
              <>
                {" "}
                <AllPostCard
                  posts={longPlays}
                  viewType={viewType}
                  colNum={colNum}
                  onToggleLike={handleToggleLikeLong}
                />{" "}
                <ScrollObserver
                  inViewRef={inViewRef}
                  id={`${activeCategory}-${sortType}`}
                />
              </>
            ) : longPlays.length === 0 ? (
              <div>
                <p className="m-auto w-fit p-large-bold">
                  등록된 작품이 없습니다.
                </p>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className="mb-[24px]">
            <p className="h5-medium ">단편극</p>
          </div>
          <div
            className={`transition-opacity duration-300 ${
              isLoading
                ? "opacity-0 pointer-events-none invisible"
                : "opacity-100 visible"
            }`}
          >
            {!isLoading && shortPlays.length !== 0 ? (
              <>
                <AllPostCard
                  posts={shortPlays}
                  viewType={viewType}
                  colNum={colNum}
                  onToggleLike={handleToggleLikeShort}
                />
                <ScrollObserver
                  key={`scroll-${observerKey}`}
                  inViewRef={inViewRef}
                  id={`${activeCategory}-${sortType}`}
                />
              </>
            ) : !isLoading && shortPlays.length === 0 ? (
              <div>
                <p className="m-auto w-fit p-large-bold">
                  등록된 작품이 없습니다.
                </p>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default PostGallery;
