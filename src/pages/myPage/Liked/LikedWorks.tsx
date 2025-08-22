import { useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";

import FloatingBtn from "@/components/button/FloatingBtn";
import SectionBlock from "@/components/post/SectionBlock";
import { MyPageMenu } from "@/components/myPage";
import NullScriptContent from "@/components/myPage/NullScriptContent";
import PostHeaderControl from "@/components/post/PostHeaderControl";
import { AllPostCard } from "@/components/post/PostList.js";
import PartialLoading from "@/components/loading/PartialLoading";
import { useInView } from "react-intersection-observer";
import { useToggleLike } from "@/hooks/useToggleLike";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { ScriptItem } from "@/api/user/postListApi";
import {
  fetchLikedPost,
  getLikedShortWorks,
  getLikedLongWorks,
} from "@/api/user/profile/likeApi";

import AuthContext from "@/contexts/AuthContext";
import { StageType } from "@/types/stage";

const ScrollObserver: React.FC<{
  inViewRef: (node?: Element | null) => void;
  id: string;
}> = ({ inViewRef, id }) => {
  return <div ref={inViewRef} key={id} className="h-[1px] mt-[100px]" />;
};

const LikedWorks = () => {
  const { userNickname } = useContext(AuthContext);
  const [longPlays, setLongPlays] = useState<ScriptItem[]>([]);
  const [shortPlays, setShortPlays] = useState<ScriptItem[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeStage = (searchParams.get("stage") as StageType) || "포도밭";
  const activeCategory = searchParams.get("category") || "전체";
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useContext(AuthContext);
  const [viewType, setViewType] = useState<"grid" | "card">("grid");
  const [observerKey, setObserverKey] = useState(0);
  const [hasMoreShortPlays, setHasMoreShortPlays] = useState(true);
  const [shortPlayPage, setShortPlayPage] = useState(0);
  const [hasMoreLongPlays, setHasMoreLongPlays] = useState(true);
  const [longPlayPage, setLongPlayPage] = useState(0);
  const [resetFlag, setResetFlag] = useState(false);
  const [colNum, setColNum] = useState(4);
  const [postNum, setPostNum] = useState(4);
  const rawToggleLikeLong = useToggleLike(setLongPlays);
  const rawToggleLikeShort = useToggleLike(setShortPlays);

  const accessToken = Cookies.get("accessToken");

  const { ref: inViewRef, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
    fallbackInView: true,
    initialInView: false,
  });

  const { widthConditions } = useWindowDimensions();
  const { isSmallMobile, isMobile, isTablet, isLaptop, isDesktop } =
    widthConditions;

  const handleChange = (newStage: string, menu: string) => {
    const updated = new URLSearchParams(searchParams.toString()); //searchParams 복사본
    updated.set(`${menu}`, newStage);

    if (menu === "stage") {
      updated.set("category", "전체");
    }
    setSearchParams(updated);
  };

  useEffect(() => {
    setObserverKey((prev) => prev + 1);
  }, [activeCategory]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColNum(2);
        setPostNum(2);
      } else if (width < 1280) {
        setColNum(3);
        setPostNum(3);
      } else {
        setColNum(4);
        setPostNum(4);
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const loadScripts = async () => {
      try {
        if (activeCategory === "장편") {
          const longData = await getLikedLongWorks(longPlayPage, accessToken);
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
          const shortData = await getLikedShortWorks(
            shortPlayPage,
            accessToken
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
          //전체
          const allData = await fetchLikedPost(accessToken);

          setLongPlays(Array.isArray(allData.longPlay) ? allData.longPlay : []);
          setShortPlays(
            Array.isArray(allData.shortPlay) ? allData.shortPlay : []
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error("작품 목록 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadScripts();
  }, [activeCategory, longPlayPage, shortPlayPage]);

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
  }, [activeCategory]);

  useEffect(() => {
    if (!resetFlag) return;
    setResetFlag(false);
  }, [resetFlag]);

  return (
    <div className=" purchased-script myPage-contents-default">
      <FloatingBtn />
      <div className=" myPage-contents-default-wrap">
        <MyPageMenu nickname={userNickname} currentPage="3" />
        <div className=" content-side">
          <div
            className={`${isSmallMobile ? "mb-[20px]" : "mb-[10px]"} w-full `}
          >
            <h4
              className={`${
                isSmallMobile ? "p-medium-bold" : "h4-bold"
              } whitespace-normal   `}
            >
              좋아한 작품들을 볼 수 있어요!
            </h4>
          </div>

          {isLoading ? (
            <div className="m-auto" style={{ height: "600px" }}>
              <PartialLoading />
            </div>
          ) : activeCategory === "전체" &&
            longPlays.length + shortPlays.length === 0 ? (
            <NullScriptContent currentPage={2} />
          ) : (
            <>
              {/*----- 스테이지 메뉴 -----*/}
              <PostHeaderControl
                activeStage={activeStage}
                setActiveStage={(value) => handleChange(value, "stage")}
                activeStoryLength={activeCategory}
                setActiveStoryLength={(value) =>
                  handleChange(value, "category")
                }
                viewType={viewType}
                setViewType={setViewType}
                isSorted={false}
                stageBottomBorderWidth="w-full"
                stageIcon={false}
              />

              {/*----- post list -----*/}

              {activeCategory === "전체" ? (
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
                      isLikePage={true}
                    />
                  </div>
                </div>
              ) : activeCategory === "장편" ? (
                <>
                  <div className="mb-[24px]">
                    <p
                      className={isSmallMobile ? "p-small-medium" : "h5-medium"}
                    >
                      장편극
                    </p>
                  </div>

                  <div
                    className={`transition-opacity duration-300 ${
                      isLoading
                        ? "opacity-0 pointer-events-none invisible"
                        : "opacity-100 visible"
                    }`}
                  >
                    {!isLoading && longPlays.length !== 0 ? (
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
                          id={`${activeCategory}`}
                        />
                      </>
                    ) : longPlays.length === 0 ? (
                      <div>
                        <p className="m-auto w-fit p-large-bold">
                          좋아한 작품이 없습니다.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-[24px]">
                    <p
                      className={isSmallMobile ? "p-small-medium" : "h5-medium"}
                    >
                      단편극
                    </p>
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
                          id={`${activeCategory}`}
                        />
                      </>
                    ) : !isLoading && shortPlays.length === 0 ? (
                      <div>
                        <p className="m-auto w-fit p-large-bold">
                          좋아한 작품이 없습니다.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedWorks;
