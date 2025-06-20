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
            setIsLoading(false); // 👉 여기에서 같이 끝내는 게 자연스럽다
          }, 150);
        } else if (activeCategory === "단편") {
          const shortData = await getShortWorks(shortPlayPage, accessToken);
          if (shortData.length === 0) {
            setHasMoreShortPlays(false);
            return;
          }
          setShortPlays((prev) =>
            Array.from(
              new Map(
                [...prev, ...shortData].map((post) => [post.id, post])
              ).values()
            )
          );
          setIsLoading(false);
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

  const handleToggleLikeLong = (postId: string) => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    rawToggleLikeLong(postId);
  };

  const handleToggleLikeShort = (postId: string) => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    rawToggleLikeShort(postId);
  };

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
      ((activeCategory === "장편" && longPlays.length > 0) ||
        (activeCategory === "단편" && shortPlays.length > 0));

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
      <div className="relative">
        <StageTab
          activeStage={activeStage}
          setActiveStage={(value) => handleChange(value, "stage")}
        />
        <span className="absolute left-1/2 top-0 -translate-x-1/2 w-[140vw] h-[1px] block bg-[#E2E2E2] z-0 "></span>
      </div>
      {/*----- 카테고리 메뉴 -----*/}
      <div className="flex items-center justify-between w-full h-[48px] mb-[35px] ">
        <StoryLengthTeb
          activeStoryLength={activeCategory}
          setActiveStoryLength={(value) => handleChange(value, "category")}
        />
        <div className="flex items-center flex-row gap-[10px] h-full   ">
          {/* 정렬 */}
          <SortDropdown selected={sortType} onChange={setSortType} />
          {/*----- 보기방식 -----*/}

          <ViewToggleButton viewType={viewType} setViewType={setViewType} />
        </div>
      </div>

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
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            <AllPostCard
              posts={longPlays}
              viewType={viewType}
              colNum={colNum}
              onToggleLike={handleToggleLikeLong}
            />
          </div>
          <div ref={observerRef} className="h-[1px]" />
        </>
      ) : (
        <>
          <div className="mb-[24px]">
            <p className="h5-medium ">단편극</p>
          </div>
          <AllPostCard
            posts={shortPlays}
            viewType={viewType}
            colNum={colNum}
            onToggleLike={handleToggleLikeLong}
          />
          <div ref={observerRef} className="h-[1px]" />
        </>
      )}
    </div>
  );
};

export default PostGallery;
