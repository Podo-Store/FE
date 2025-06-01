import { useState, useEffect, useRef, useContext } from "react";
import Cookies from "js-cookie";
import InfiniteBanner from "@/components/banner/InfiniteBanner.js";
import BannerImage1 from "./../../../assets/image/listBanner.jpg";
import BannerImage2 from "./../../../assets/image/postList_banner.png";
import PostHeaderControl from "@/components/post/PostHeaderControl";
import PartialLoading from "@/components/loading/PartialLoading";
import { AllPostCard } from "@/components/post/PostList.js";
import { getLongWorks, ScriptItem } from "@/api/user/postListApi";
import AuthContext from "../../../contexts/AuthContext";
import { useToggleLike } from "@/hooks/useToggleLike";

const bannerImages = [BannerImage1, BannerImage2];
const PostGalleryLong = () => {
  const [activeCategory, setActiveCategory] = useState("포도밭");
  const [activeStoryLength, setActiveStoryLength] = useState("전체");
  const [viewType, setViewType] = useState<"grid" | "card">("grid");
  const [sortType, setSortType] = useState("조회수순");

  const [longPlays, setLongPlays] = useState<ScriptItem[]>([]);
  const [hasMoreLongPlays, setHasMoreLongPlays] = useState(true);
  const [longPlayPage, setLongPlayPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [colNum, setColNum] = useState(5);
  const [postNum, setPostNum] = useState(10);
  const [resetFlag, setResetFlag] = useState(false);

  const isAuthenticated = useContext(AuthContext);
  const rawToggleLikeLong = useToggleLike(setLongPlays);
  const accessToken = Cookies.get("accessToken");

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadLongPlays = async (page: number) => {
    if (isLoading) return; // 중복 방지
    setIsLoading(true);
    console.log(`🔥 호출된 페이지: ${page}`);
    try {
      const data = await getLongWorks(page, accessToken);
      console.log(
        `📦 받아온 데이터:`,
        data.map((d) => d.id)
      );
      if (data.length === 0) {
        setHasMoreLongPlays(false);
        return;
      }

      setLongPlays((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("장편 작품 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleLikeLong = (postId: string) => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    rawToggleLikeLong(postId);
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

  const uniqueLongPlays = Array.from(
    new Map(longPlays.map((post) => [post.id, post])).values()
  );

  const sortedShortPlays = sortPosts(uniqueLongPlays, sortType);

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

  useEffect(() => {
    loadLongPlays(longPlayPage);
  }, [longPlayPage]);

  useEffect(() => {
    if (!resetFlag) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreLongPlays && !isLoading) {
            console.log("🔍 observer 트리거됨");
            setLongPlayPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );

      const currentRef = observerRef.current;
      if (currentRef) observer.observe(currentRef);

      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }
  }, [hasMoreLongPlays, isLoading, resetFlag]);

  return (
    <div className="flex flex-col m-auto list-wrap-wrap py-[72px] ">
      {/*------ 작품 둘러보기 ------*/}
      <h1 className="text-[20px] font-bold leading-[28px] tracking-[-0.4px] text-black font-['Pretendard'] mb-[30px]">
        작품 둘러보기
      </h1>
      {/*------ 배너 ------*/}
      <InfiniteBanner images={bannerImages} />
      <PostHeaderControl
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeStoryLength={activeStoryLength}
        setActiveStoryLength={setActiveStoryLength}
        viewType={viewType}
        setViewType={setViewType}
        page={"/list"}
        isSorted={true}
        setSortType={setSortType}
        sortType={sortType}
      />

      {isLoading ? (
        <div className="m-auto">
          <PartialLoading />
        </div>
      ) : (
        <>
          <div className="mb-[24px]">
            {" "}
            <p className="h5-medium ">장편극</p>
          </div>
          <AllPostCard
            posts={sortedShortPlays}
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

export default PostGalleryLong;
