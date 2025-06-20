import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import AuthContext from "@/contexts/AuthContext";

import {
  fetchExploreScripts,
  getLongWorks,
  getShortWorks,
  ScriptItem,
} from "@/api/user/postListApi";

import PartialLoading from "@/components/loading/PartialLoading";
import SortDropdown from "@/components/post/SortDropdown";
import InfiniteBanner from "@/components/banner/InfiniteBanner.js";
import StageTab from "@/components/post/StageTab";
import StoryLengthTeb from "@/components/post/StoryLengthTabs";
import ViewToggleButton from "@/components/post/ViewToggleButton";
import SectionBlock from "@/components/post/SectionBlock";
import { AllPostCard } from "@/components/post/PostList.js";
import PostHeaderControl from "@/components/post/PostHeaderControl";
import BannerImage1 from "@/assets/image/listBanner.jpg";
import BannerImage2 from "@/assets/image/postList_banner.png";

import { useToggleLike } from "@/hooks/useToggleLike";
import "./postGallery.scss";

const bannerImages = [BannerImage1, BannerImage2];

const PostGallery = () => {
  const [longPlays, setLongPlays] = useState<ScriptItem[]>([]); // 전체 longPlays
  const [hasMoreLongPlays, setHasMoreLongPlays] = useState(true);
  const [longPlayPage, setLongPlayPage] = useState(0);

  const [shortPlays, setShortPlays] = useState<ScriptItem[]>([]); // 전체 shorPlays
  const [hasMoreShortPlays, setHasMoreShortPlays] = useState(true);
  const [shortPlayPage, setShortPlayPage] = useState(0);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeStage = searchParams.get("stage") || "포도밭";
  const activeCategory = searchParams.get("category") || "전체";

  const [isLoading, setIsLoading] = useState(true);

  const [viewType, setViewType] = useState<"grid" | "card">("grid");
  const [sortType, setSortType] = useState("조회수순");

  const [colNum, setColNum] = useState(5);
  const [postNum, setPostNum] = useState(10);
  const [resetFlag, setResetFlag] = useState(false);
  const isAuthenticated = useContext(AuthContext);
  const rawToggleLikeLong = useToggleLike(setLongPlays);
  const rawToggleLikeShort = useToggleLike(setShortPlays);

  const handleChange = (newStage: string, menu: string) => {
    const updated = new URLSearchParams(searchParams.toString()); //searchParams 복사본
    updated.set(`${menu}`, newStage);
    setSearchParams(updated);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        if (activeCategory === "장편") {
          const longData = await getLongWorks(longPlayPage, accessToken);
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
          const shortData = await getShortWorks(shortPlayPage, accessToken);
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
          const allData = await fetchExploreScripts(accessToken);

          setLongPlays(Array.isArray(allData.longPlay) ? allData.longPlay : []);
          setShortPlays(
            Array.isArray(allData.shortPlay) ? allData.shortPlay : []
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error("작품 목록 불러오기 실패:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeCategory, longPlayPage, shortPlayPage]);

  useEffect(() => {
    setLongPlays([]);
    setShortPlays([]);
    setLongPlayPage(0);
    setShortPlayPage(0);
    setHasMoreLongPlays(true);
    setHasMoreShortPlays(true);
  }, [activeCategory]);

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

  const sortPosts = (posts: ScriptItem[] = [], sortType: string) => {
    const sorted = [...posts]; // 원본 배열 복사
    switch (sortType) {
      case "조회수순":
        return sorted.sort((a, b) => b.viewCount - a.viewCount);
      case "좋아요순":
        return sorted.sort((a, b) => b.likeCount - a.likeCount);
      case "최신순":
        return sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      default:
        return posts;
    }
  };

  const sortedLongPlays = sortPosts(longPlays, sortType);
  const sortedShortPlays = sortPosts(shortPlays, sortType);
  useEffect(() => {
    // 빈 useEffect로 스크롤 복원 차단 (라우팅된 후에도 위치 유지)
  }, []);

  useEffect(() => {
    if (resetFlag) return;

    // 🔐 데이터가 없거나 로딩 중이면 등록하지 않음
    const isReady =
      !isLoading &&
      ((activeCategory === "장편" && longPlays.length >= postNum) ||
        (activeCategory === "단편" && shortPlays.length >= postNum));

    if (!isReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || isLoading) return;

        if (activeCategory === "장편" && hasMoreLongPlays) {
          console.log("🔍 장편 observer 트리거");
          setLongPlayPage((prevPage) => prevPage + 1);
        } else if (activeCategory === "단편" && hasMoreShortPlays) {
          console.log("🔍 단편 observer 트리거");
          setShortPlayPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [
    activeCategory,
    hasMoreLongPlays,
    hasMoreShortPlays,
    isLoading,
    resetFlag,
    longPlays.length,
    shortPlays.length,
  ]);

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
              posts={sortedShortPlays}
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
              posts={sortedLongPlays}
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
              <AllPostCard
                posts={longPlays}
                viewType={viewType}
                colNum={colNum}
                onToggleLike={handleToggleLikeShort}
              />
            ) : longPlays.length === 0 ? (
              <div>
                <p className="m-auto w-fit p-large-bold">
                  등록된 작품이 없습니다.
                </p>
              </div>
            ) : null}
          </div>
          <div ref={observerRef} className="h-[1px] mt-[100px]" />
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
            {shortPlays.length !== 0 ? (
              <AllPostCard
                posts={shortPlays}
                viewType={viewType}
                colNum={colNum}
                onToggleLike={handleToggleLikeShort}
              />
            ) : shortPlays.length === 0 ? (
              <div>
                <p className="m-auto w-fit p-large-bold">
                  등록된 작품이 없습니다.
                </p>
              </div>
            ) : null}
          </div>
          <div ref={observerRef} className="h-[1px] mt-[100px] " />
        </>
      )}
    </div>
  );
};

export default PostGallery;
