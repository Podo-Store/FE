import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Cookies from "js-cookie";

import AuthContext from "@/contexts/AuthContext";

import {
  fetchExploreScripts,
  getLongWorks,
  getShortWorks,
  ScriptItem,
  ExploreScriptsResponse,
} from "@/api/user/postListApi";

import InfiniteBanner from "@/components/banner/InfiniteBanner.js";
import SectionBlock from "@/components/post/SectionBlock";
import { AllPostCard } from "@/components/post/PostList.js";
import PostHeaderControl from "@/components/post/PostHeaderControl";

import { useToggleLike } from "@/hooks/useToggleLike";
import "./postGallery.scss";

import { StageType } from "@/types/stage";
import useWindowDimensions from "@/hooks/useWindowDimensions";

type PostGalleryCache = {
  explore: ExploreScriptsResponse | null;
  longPlays: ScriptItem[];
  shortPlays: ScriptItem[];
  longPlayPage: number;
  shortPlayPage: number;
  hasMoreLongPlays: boolean;
  hasMoreShortPlays: boolean;
  sortType: "POPULAR" | "LIKE_COUNT" | "LATEST";
  activeCategory: string;
};

let postGalleryCache: PostGalleryCache | null = null;

// ---- Scroll Observer ----
type ScrollObserverProps = {
  inViewRef: (node?: Element | null) => void;
  id: string;
};

const ScrollObserver = ({ inViewRef, id }: ScrollObserverProps) => (
  <div ref={inViewRef} key={id} className="h-[1px] mt-[100px]" />
);

const syncLikeEverywhere = (
  postId: string,
  updater: (list: ScriptItem[]) => ScriptItem[],
  explore: ExploreScriptsResponse | null
): ExploreScriptsResponse | null => {
  if (!explore) return explore;

  return {
    ...explore,
    longPlay: updater(explore.longPlay),
    shortPlay: updater(explore.shortPlay),
  };
};

const PostGallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStage = (searchParams.get("stage") as StageType) || "포도밭";
  const activeCategory = searchParams.get("category") || "전체";

  // STATES
  const [explore, setExplore] = useState<ExploreScriptsResponse | null>(null);
  const [longPlays, setLongPlays] = useState<ScriptItem[]>([]);
  const [shortPlays, setShortPlays] = useState<ScriptItem[]>([]);
  const [longPlayPage, setLongPlayPage] = useState(0);
  const [shortPlayPage, setShortPlayPage] = useState(0);

  const [hasMoreLongPlays, setHasMoreLongPlays] = useState(true);
  const [hasMoreShortPlays, setHasMoreShortPlays] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [viewType, setViewType] = useState<"grid" | "card">("grid");
  const [sortType, setSortType] = useState<"POPULAR" | "LIKE_COUNT" | "LATEST">(
    "POPULAR"
  );

  const skipRef = useRef(false);
  const isAuthenticated = useContext(AuthContext);

  const { ref: inViewRef, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  const [colNum, setColNum] = useState(5);
  const [postNum, setPostNum] = useState(10);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 1280) setColNum(5);
    else if (width >= 768) setColNum(3);
    else setColNum(2);
  }, [width]);

  const handleChangeCategory = useCallback(
    (value: string, type: "stage" | "category") => {
      const next = new URLSearchParams(searchParams.toString());
      next.set(type, value);
      if (type === "stage") next.set("category", "전체");
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  // ----------------------------
  // 1) /list 입장 시 최초로 explore / long / short 전부 로드 + 캐싱
  // ----------------------------
  useEffect(() => {
    if (postGalleryCache && activeCategory !== "전체") {
      // 전체 보기에서 바뀐 경우 캐시값 그대로 사용
      setExplore(postGalleryCache.explore);
      setLongPlays(postGalleryCache.longPlays);
      setShortPlays(postGalleryCache.shortPlays);
      setLongPlayPage(postGalleryCache.longPlayPage);
      setShortPlayPage(postGalleryCache.shortPlayPage);
      setHasMoreLongPlays(postGalleryCache.hasMoreLongPlays);
      setHasMoreShortPlays(postGalleryCache.hasMoreShortPlays);

      skipRef.current = true;
      setIsLoading(false);
      return;
    }

    // 최초 로드
    (async () => {
      setIsLoading(true);
      const token = Cookies.get("accessToken");

      const exploreData = await fetchExploreScripts(token, sortType);
      const longData = await getLongWorks(0, token, sortType);
      const shortData = await getShortWorks(0, token, sortType);

      setExplore(exploreData);
      setLongPlays(longData);
      setShortPlays(shortData);

      setLongPlayPage(1);
      setShortPlayPage(1);

      // 캐시 저장
      postGalleryCache = {
        explore: exploreData,
        longPlays: longData,
        shortPlays: shortData,
        longPlayPage: 1,
        shortPlayPage: 1,
        hasMoreLongPlays: true,
        hasMoreShortPlays: true,
        sortType,
        activeCategory,
      };

      setIsLoading(false);
    })();
  }, []);

  // ----------------------------
  // 2) 정렬 바뀌면 해당 API만 다시 호출
  // ----------------------------
  useEffect(() => {
    if (!explore) return;

    (async () => {
      setIsLoading(true);
      const token = Cookies.get("accessToken");

      // explore 갱신
      const exploreData = await fetchExploreScripts(token, sortType);
      setExplore(exploreData);

      // 장편/단편은 현재 페이지 기준으로 다시 가져오게 함
      const longData = await getLongWorks(0, token, sortType);
      const shortData = await getShortWorks(0, token, sortType);

      setLongPlays(longData);
      setShortPlays(shortData);

      setLongPlayPage(1);
      setShortPlayPage(1);

      // 캐시 갱신
      postGalleryCache = {
        explore: exploreData,
        longPlays: longData,
        shortPlays: shortData,
        longPlayPage: 1,
        shortPlayPage: 1,
        hasMoreLongPlays: true,
        hasMoreShortPlays: true,
        activeCategory,
        sortType,
      };

      setIsLoading(false);
    })();
  }, [sortType]);

  // ----------------------------
  // 3) 무한스크롤 페치
  // ----------------------------
  useEffect(() => {
    if (!inView || isLoading) return;
    const token = Cookies.get("accessToken");

    (async () => {
      if (activeCategory === "장편" && hasMoreLongPlays) {
        const data = await getLongWorks(longPlayPage, token, sortType);
        if (data.length === 0) {
          setHasMoreLongPlays(false);
          return;
        }
        setLongPlays((prev) => [...prev, ...data]);
        setLongPlayPage((p) => p + 1);
      }

      if (activeCategory === "단편" && hasMoreShortPlays) {
        const data = await getShortWorks(shortPlayPage, token, sortType);
        if (data.length === 0) {
          setHasMoreShortPlays(false);
          return;
        }
        setShortPlays((prev) => [...prev, ...data]);
        setShortPlayPage((p) => p + 1);
      }
    })();
  }, [inView]);

  // -------------------------------------
  // 4) Toggle Like
  // -------------------------------------
  // 좋아요 toggle 함수 (모든 곳 업데이트용)
  const rawToggleLikeLong = useToggleLike(setLongPlays);
  const rawToggleLikeShort = useToggleLike(setShortPlays);

  const toggleLikeAll = (postId: string) => {
    const updateList = (list: ScriptItem[]) =>
      list.map((p) =>
        p.id === postId
          ? {
              ...p,
              like: !p.like,
              likeCount: p.likeCount + (p.like ? -1 : 1),
            }
          : p
      );

    // ✅ 이제 explore(전체보기용)만 업데이트
    setExplore((prev) => {
      const updatedExplore = syncLikeEverywhere(postId, updateList, prev);

      // 캐시도 맞춰주고 싶으면 여기서만 캐시 수정
      if (postGalleryCache) {
        postGalleryCache.explore = updatedExplore;
        // 필요하면 캐시 안의 longPlays/shortPlays만 업데이트
        if (postGalleryCache.longPlays) {
          postGalleryCache.longPlays = updateList(postGalleryCache.longPlays);
        }
        if (postGalleryCache.shortPlays) {
          postGalleryCache.shortPlays = updateList(postGalleryCache.shortPlays);
        }
      }

      return updatedExplore;
    });
  };

  // like API 토글 후 상태 반영
  const handleLikeLong = (postId: string) => {
    if (!isAuthenticated) return alert("로그인이 필요합니다.");
    rawToggleLikeLong(postId); // 서버 전송
    toggleLikeAll(postId); // UI 즉시 반영
  };

  const handleLikeShort = (postId: string) => {
    if (!isAuthenticated) return alert("로그인이 필요합니다.");
    rawToggleLikeShort(postId);
    toggleLikeAll(postId);
  };

  // -------------------------------------
  // RENDER
  // -------------------------------------
  const showSkeleton = isLoading;

  return (
    <div className="flex flex-col m-auto list-wrap-wrap py-[72px]  ">
      {/*------ 작품 둘러보기 ------*/}
      <p className="sm:h5-bold p-medium-bold mb-[30px] pl-[25px] sm:pl-0">
        작품 둘러보기
      </p>

      {/*------ 배너 ------*/}
      <InfiniteBanner />

      {/*----- 스테이지 메뉴 -----*/}

      <PostHeaderControl
        activeStage={activeStage}
        setActiveStage={(value) => handleChangeCategory(value, "stage")}
        activeStoryLength={activeCategory}
        setActiveStoryLength={(value) =>
          handleChangeCategory(value, "category")
        }
        viewType={viewType}
        setViewType={setViewType}
        isSorted={true}
        sortType={sortType}
        setSortType={setSortType}
        stageBottomBorderWidth={"w-[100vw]"}
        stageBelt={true}
      />

      {/* ----- Skeleton ----- */}
      {showSkeleton && (
        <div
          className="grid gap-6 w-full px-[9.375%] sm:px-0"
          style={{ gridTemplateColumns: `repeat(${colNum}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: postNum }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse rounded-2xl h-[189px] sm:h-[293px] "
            >
              {/* 썸네일 영역 */}
              <div className="h-[120px] sm:h-[197px] w-full rounded-2xl bg-gray-200" />

              {/* 텍스트 영역 */}
              <div className="flex flex-col  mt-3 px-2">
                <div className="h-4 sm:h-[20px] w-full mb-1 rounded bg-gray-200" />
                <div className="h-3 sm:h-[16px] w-full mb-2 rounded bg-gray-200" />
                <div className="h-3 sm:h-[14px] w-full rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----- 전체 보기 ----- */}
      {!isLoading && activeCategory === "전체" && explore && (
        <>
          <div className="px-[9.375%] sm:px-0">
            <SectionBlock
              title="단편"
              posts={explore.shortPlay}
              colNum={colNum}
              postNum={10}
              viewType={viewType}
              onMoreClick={() => handleChangeCategory("단편", "category")}
              onToggleLike={handleLikeShort}
            />
          </div>

          <div className="mt-[78px] px-[9.375%] sm:px-0">
            <SectionBlock
              title="장편"
              posts={explore.longPlay}
              colNum={colNum}
              postNum={10}
              viewType={viewType}
              onMoreClick={() => handleChangeCategory("장편", "category")}
              onToggleLike={handleLikeLong}
            />
          </div>
        </>
      )}

      {/* ----- 장편 탭 ----- */}
      {!isLoading && activeCategory === "장편" && (
        <section className="px-[9.375%] sm:px-0">
          <div className="mb-[24px]">
            <p className="p-small-medium sm:h5-medium">장편극</p>
          </div>

          <div
            className={`transition-opacity duration-300 ${
              isLoading && longPlays.length === 0
                ? "opacity-0 pointer-events-none invisible"
                : "opacity-100 visible"
            }`}
          >
            {longPlays.length > 0 ? (
              <>
                <AllPostCard
                  posts={longPlays}
                  colNum={colNum}
                  viewType={viewType}
                  onToggleLike={handleLikeLong}
                />

                <ScrollObserver
                  inViewRef={inViewRef}
                  id={`long-${sortType}-${longPlayPage}`}
                />
              </>
            ) : (
              <p className="m-auto w-fit p-large-bold mt-[80px]">
                등록된 작품이 없습니다.
              </p>
            )}
          </div>
        </section>
      )}

      {/* ----- 단편 탭 ----- */}
      {!isLoading && activeCategory === "단편" && (
        <section className="px-[9.375%] sm:px-0">
          <div className="mb-[24px]">
            <p className="p-small-medium sm:h5-medium">단편극</p>
          </div>
          <div
            className={`transition-opacity duration-300 ${
              isLoading && shortPlays.length === 0
                ? "opacity-0 pointer-events-none invisible"
                : "opacity-100 visible"
            }`}
          >
            {shortPlays.length > 0 ? (
              <>
                <AllPostCard
                  posts={shortPlays}
                  colNum={colNum}
                  viewType={viewType}
                  onToggleLike={handleLikeShort}
                />

                <ScrollObserver
                  inViewRef={inViewRef}
                  id={`short-${sortType}-${shortPlayPage}`}
                />
              </>
            ) : (
              <p className="m-auto w-fit p-large-bold mt-[80px]">
                등록된 작품이 없습니다.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default PostGallery;
