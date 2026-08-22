import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import AuthContext from "@/contexts/AuthContext";

import {
  getExploreScripts,
  getContestScripts,
  ScriptItem,
  PlayType,
  SortType,
} from "@/api/user/postListApi";

import InfiniteBanner from "@/components/banner/InfiniteBanner.js";
import { AllPostCard } from "@/components/post/PostList.js";
import PostHeaderControl from "@/components/post/PostHeaderControl";

import { useToggleLike } from "@/hooks/useToggleLike";
import "./postGallery.scss";

import { StageType } from "@/types/stage";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const isSortType = (value: string | null): value is SortType =>
  value === "POPULAR" || value === "LIKE_COUNT" || value === "LATEST";

const RECENT_SEARCHES_KEY = "podo-recent-searches";
const MAX_RECENT_SEARCHES = 10;

const getRecentSearches = (): string[] => {
  try {
    const stored = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) ?? "[]");
    return Array.isArray(stored)
      ? stored.filter((keyword): keyword is string => typeof keyword === "string")
      : [];
  } catch {
    return [];
  }
};

// ---- Scroll Observer ----
type ScrollObserverProps = {
  inViewRef: (node?: Element | null) => void;
  id: string;
};

const ScrollObserver = ({ inViewRef, id }: ScrollObserverProps) => (
  <div ref={inViewRef} key={id} className="h-[1px] mt-[100px]" />
);

const PostGallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStage = (searchParams.get("stage") as StageType) || "포도밭";
  const activeCategory = searchParams.get("category") || "전체";
  const selectedSortType = searchParams.get("sortType");

  // STATES
  const [explore, setExplore] = useState<ScriptItem[]>([]);
  const [longPlays, setLongPlays] = useState<ScriptItem[]>([]);
  const [shortPlays, setShortPlays] = useState<ScriptItem[]>([]);
  const [contestWorks, setContestWorks] = useState<ScriptItem[]>([]);
  const [explorePage, setExplorePage] = useState(0);
  const [longPlayPage, setLongPlayPage] = useState(0);
  const [shortPlayPage, setShortPlayPage] = useState(0);
  const [contestPage, setContestPage] = useState(0);

  const [hasMoreExplore, setHasMoreExplore] = useState(true);
  const [hasMoreLongPlays, setHasMoreLongPlays] = useState(true);
  const [hasMoreShortPlays, setHasMoreShortPlays] = useState(true);
  const [hasMoreContest, setHasMoreContest] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [viewType, setViewType] = useState<"grid" | "card">("grid");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(getRecentSearches);
  const [sortType, setSortType] = useState<SortType>(() =>
    isSortType(selectedSortType) ? selectedSortType : "POPULAR"
  );

  const isLoadingMoreRef = useRef(false);
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

  const handleChangeSortType = useCallback(
    (value: SortType) => {
      setSortType(value);

      const next = new URLSearchParams(searchParams.toString());
      next.set("sortType", value);
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const saveRecentSearch = (keyword: string) => {
    const next = [keyword, ...recentSearches.filter((item) => item !== keyword)].slice(
      0,
      MAX_RECENT_SEARCHES
    );
    setRecentSearches(next);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyword = searchKeyword.trim();
    if (!keyword) return;

    saveRecentSearch(keyword);
    setSubmittedSearch(keyword);
    setIsSearchFocused(false);
  };

  const handleRecentSearchClick = (keyword: string) => {
    setSearchKeyword(keyword);
    setSubmittedSearch(keyword);
    setIsSearchFocused(false);
  };

  const removeRecentSearch = (keyword: string) => {
    const next = recentSearches.filter((item) => item !== keyword);
    setRecentSearches(next);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const getPlayType = (): PlayType | undefined => {
    if (activeCategory === "장편") return "LONG";
    if (activeCategory === "단편") return "SHORT";
    return undefined;
  };

  // 선택한 탭과 검색어에 해당하는 첫 페이지를 불러옵니다.
  useEffect(() => {
    let isCurrent = true;

    (async () => {
      setIsLoading(true);
      try {
        if (activeCategory === "공모") {
          const data = await getContestScripts(0, sortType);
          if (!isCurrent) return;
          setContestWorks(data);
          setContestPage(1);
          setHasMoreContest(data.length > 0);
          return;
        }

        const data = await getExploreScripts({
          page: 0,
          size: 40,
          sortType,
          playType: getPlayType(),
          search: submittedSearch,
        });
        if (!isCurrent) return;

        if (activeCategory === "장편") {
          setLongPlays(data.content);
          setLongPlayPage(1);
          setHasMoreLongPlays(!data.last);
        } else if (activeCategory === "단편") {
          setShortPlays(data.content);
          setShortPlayPage(1);
          setHasMoreShortPlays(!data.last);
        } else {
          setExplore(data.content);
          setExplorePage(1);
          setHasMoreExplore(!data.last);
        }
      } catch (error) {
        console.error("작품 목록을 불러오지 못했습니다.", error);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    })();
    return () => {
      isCurrent = false;
    };
  }, [activeCategory, sortType, submittedSearch]);

  // ----------------------------
  // 3) 무한스크롤 페치
  // ----------------------------
  useEffect(() => {
    if (!inView || isLoading || isLoadingMoreRef.current) return;

    (async () => {
      isLoadingMoreRef.current = true;
      try {
        if (activeCategory === "공모" && hasMoreContest) {
          const data = await getContestScripts(contestPage, sortType);
          setContestWorks((prev) => [...prev, ...data]);
          setContestPage((page) => page + 1);
          setHasMoreContest(data.length > 0);
          return;
        }

        const page =
          activeCategory === "장편"
            ? longPlayPage
            : activeCategory === "단편"
              ? shortPlayPage
              : explorePage;
        const hasMore =
          activeCategory === "장편"
            ? hasMoreLongPlays
            : activeCategory === "단편"
              ? hasMoreShortPlays
              : hasMoreExplore;
        if (!hasMore) return;

        const data = await getExploreScripts({
          page,
          size: 40,
          sortType,
          playType: getPlayType(),
          search: submittedSearch,
        });

        if (activeCategory === "장편") {
          setLongPlays((prev) => [...prev, ...data.content]);
          setLongPlayPage((currentPage) => currentPage + 1);
          setHasMoreLongPlays(!data.last);
        } else if (activeCategory === "단편") {
          setShortPlays((prev) => [...prev, ...data.content]);
          setShortPlayPage((currentPage) => currentPage + 1);
          setHasMoreShortPlays(!data.last);
        } else {
          setExplore((prev) => [...prev, ...data.content]);
          setExplorePage((currentPage) => currentPage + 1);
          setHasMoreExplore(!data.last);
        }
      } catch (error) {
        console.error("추가 작품을 불러오지 못했습니다.", error);
      } finally {
        isLoadingMoreRef.current = false;
      }
    })();
  }, [
    activeCategory,
    contestPage,
    explorePage,
    hasMoreContest,
    hasMoreExplore,
    hasMoreLongPlays,
    hasMoreShortPlays,
    inView,
    isLoading,
    longPlayPage,
    shortPlayPage,
    sortType,
    submittedSearch,
  ]);

  // -------------------------------------
  // 4) Toggle Like
  // -------------------------------------
  // 좋아요 toggle 함수 (모든 곳 업데이트용)
  const rawToggleLikeLong = useToggleLike(setLongPlays);
  const rawToggleLikeShort = useToggleLike(setShortPlays);
  const rawToggleLikeContest = useToggleLike(setContestWorks);

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

    setExplore((prev) => {
      return updateList(prev);
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

  const handleLikeContest = (postId: string) => {
    if (!isAuthenticated) return alert("로그인이 필요합니다.");
    rawToggleLikeContest(postId);
    toggleLikeAll(postId);
  };

  // -------------------------------------
  // RENDER
  // -------------------------------------
  const showSkeleton = isLoading;

  return (
    <div className="flex flex-col m-auto list-wrap-wrap py-[72px]  ">
      {/*------ 작품 둘러보기 ------*/}
      <div className="mb-5 flex w-full flex-col items-center gap-4 md:mb-[30px] md:flex-row md:items-start md:justify-between md:gap-0">
        <p className="m-0 self-start pl-[25px] p-medium-bold md:pt-[10px] md:pl-0 sm:h5-bold">
          작품 둘러보기
        </p>

        <div className="relative z-50 w-[calc(100%_-_50px)] max-w-[440px] md:w-[500px] md:max-w-none">
          <form
            className="flex h-10 w-full items-center overflow-hidden rounded-[30px] border border-[#BABABA] bg-[#FBFBFB] max-[479px]:h-9 md:h-12"
            onSubmit={handleSearchSubmit}
          >
            <input
              aria-label="작품 검색"
              className="h-full min-w-0 flex-1 border-0 bg-transparent py-0 pl-5 pr-2 text-sm text-[#222] outline-none placeholder:text-[#858585] max-[479px]:text-[13px]"
              placeholder="작가명, 작품명으로 검색해보세요!"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button
              className="grid h-full w-11 flex-[0_0_44px] place-items-center border-0 bg-transparent text-[#111] cursor-pointer max-[479px]:w-10 max-[479px]:basis-10"
              type="submit"
              aria-label="검색"
            >
              <SearchRoundedIcon className="h-[21px] w-[21px]" />
            </button>
          </form>

          {isSearchFocused && (
            <div
              className="absolute top-[calc(100%_+_8px)] right-0 box-border min-h-[112px] max-h-[270px] w-full rounded-[24px] border border-[#BABABA] bg-white p-4 px-5"
              aria-live="polite"
            >
              <div className="flex items-center justify-between">
                <p className="m-0 text-sm font-semibold text-[#222]">최근 검색어</p>
                {recentSearches.length > 0 && (
                  <button
                    className="cursor-pointer border-0 bg-transparent p-0 text-xs text-[#858585]"
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={clearRecentSearches}
                  >
                    전체 삭제
                  </button>
                )}
              </div>
              {recentSearches.length > 0 ? (
                <ul className="mt-[10px] flex max-h-[205px] list-none flex-col overflow-y-auto p-0">
                  {recentSearches.map((keyword) => (
                    <li key={keyword} className="flex min-h-7 items-center justify-between gap-3">
                      <button
                        type="button"
                        className="flex-1 overflow-hidden border-0 bg-transparent p-0 text-left text-[13px] text-[#4D4D4D] text-ellipsis whitespace-nowrap cursor-pointer"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => handleRecentSearchClick(keyword)}
                      >
                        {keyword}
                      </button>
                      <button
                        type="button"
                        className="grid h-5 w-5 flex-[0_0_20px] place-items-center border-0 bg-transparent p-0 text-[#858585] cursor-pointer"
                        aria-label={`${keyword} 삭제`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => removeRecentSearch(keyword)}
                      >
                        <CloseRoundedIcon className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex h-[62px] flex-col items-center justify-center gap-[5px] text-[10px] text-[#858585]">
                  <ErrorOutlineRoundedIcon className="h-5 w-5" />
                  <span>최근 검색어가 없습니다.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/*------ 배너 ------*/}
      <InfiniteBanner />

      {/*----- 스테이지 메뉴 -----*/}

      <PostHeaderControl
        activeStage={activeStage}
        setActiveStage={(value) => handleChangeCategory(value, "stage")}
        activeStoryLength={activeCategory}
        setActiveStoryLength={(value) => handleChangeCategory(value, "category")}
        viewType={viewType}
        setViewType={setViewType}
        isSorted={true}
        sortType={sortType}
        setSortType={handleChangeSortType}
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
            <div key={idx} className="animate-pulse rounded-2xl h-[189px] sm:h-[293px] ">
              {/* 썸네일 영역 */}
              <div className="h-[120px] sm:h-[197px] w-full rounded-2xl bg-gray-200" />

              {/* 텍스트 영역 */}
              <div className="flex flex-col px-2 mt-3">
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
        <section className="px-[9.375%] sm:px-0">
          <div
            className={`transition-opacity duration-300 ${
              isLoading && explore.length === 0
                ? "opacity-0 pointer-events-none invisible"
                : "opacity-100 visible"
            }`}
          >
            {explore.length > 0 ? (
              <>
                <AllPostCard
                  posts={explore}
                  colNum={colNum}
                  viewType={viewType}
                  onToggleLike={handleLikeLong}
                />

                <ScrollObserver inViewRef={inViewRef} id={`explore-${sortType}-${explorePage}`} />
              </>
            ) : (
              <p className="m-auto w-fit p-large-bold mt-[80px]">등록된 작품이 없습니다.</p>
            )}
          </div>
        </section>
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

                <ScrollObserver inViewRef={inViewRef} id={`long-${sortType}-${longPlayPage}`} />
              </>
            ) : (
              <p className="m-auto w-fit p-large-bold mt-[80px]">등록된 작품이 없습니다.</p>
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

                <ScrollObserver inViewRef={inViewRef} id={`short-${sortType}-${shortPlayPage}`} />
              </>
            ) : (
              <p className="m-auto w-fit p-large-bold mt-[80px]">등록된 작품이 없습니다.</p>
            )}
          </div>
        </section>
      )}

      {/* ----- 공모 탭 ----- */}
      {!isLoading && activeCategory === "공모" && (
        <section className="px-[9.375%] sm:px-0">
          <div className="mb-[24px]">
            <p className="p-small-medium sm:h5-medium">공모전 작품</p>
          </div>
          <div
            className={`transition-opacity duration-300 ${
              isLoading && contestWorks.length === 0
                ? "opacity-0 pointer-events-none invisible"
                : "opacity-100 visible"
            }`}
          >
            {contestWorks.length > 0 ? (
              <>
                <AllPostCard
                  posts={contestWorks}
                  colNum={colNum}
                  viewType={viewType}
                  onToggleLike={handleLikeContest}
                />

                <ScrollObserver inViewRef={inViewRef} id={`contest-${sortType}-${contestPage}`} />
              </>
            ) : (
              <p className="m-auto w-fit p-large-bold mt-[80px]">등록된 작품이 없습니다.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default PostGallery;
