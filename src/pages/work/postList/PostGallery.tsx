import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import AuthContext from "../../../contexts/AuthContext";
import PartialLoading from "@/components/loading/PartialLoading";
import { useNavigate } from "react-router-dom";
import SortDropdown from "@/components/post/SortDropdown";
import { AllPostCard } from "@/components/post/PostList.js";
import InfiniteBanner from "@/components/banner/InfiniteBanner.js";
import StageTab from "@/components/post/StageTab";
import StoryLengthTeb from "@/components/post/StoryLengthTabs";
import ViewToggleButton from "@/components/post/ViewToggleButton";
import SectionBlock from "@/components/post/SectionBlock";
import BannerImage1 from "./../../../assets/image/listBanner.jpg";
import BannerImage2 from "./../../../assets/image/postList_banner.png";
import {useToggleLike} from "@/hooks/useToggleLike";
import { fetchExploreScripts, ScriptItem } from "@/api/user/postListApi";
import "./postGallery.scss";

const bannerImages = [BannerImage1, BannerImage2];

const PostGallery = () => {
  const [longPlays, setLongPlays] = useState<ScriptItem[]>([]);
  const [shortPlays, setShortPlays] = useState<ScriptItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("포도밭");
  const [activeStoryLength, setActiveStoryLength] = useState("전체");
  const [viewType, setViewType] = useState<"grid" | "card">("grid");
  const [sortType, setSortType] = useState("조회수순");
  const [colNum, setColNum] = useState(5);
  const [postNum, setPostNum] = useState(10);
  const isAuthenticated = useContext(AuthContext);
  const rawToggleLikeLong = useToggleLike(setLongPlays);
  const rawToggleLikeShort = useToggleLike(setShortPlays);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const loadScripts = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const data = await fetchExploreScripts(accessToken);

        setLongPlays(Array.isArray(data.longPlay) ? data.longPlay : []);
        setShortPlays(Array.isArray(data.shortPlay) ? data.shortPlay : []);
      } catch (error) {
        console.error("작품 목록 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadScripts();
  }, []);

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
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <span className="absolute left-1/2 top-0 -translate-x-1/2 w-[140vw] h-[1px] block bg-[#E2E2E2] z-0 "></span>
      </div>
      {/*----- 카테고리 메뉴 -----*/}
      <div className="flex items-center justify-between w-full h-[48px] mb-[35px] ">
        <StoryLengthTeb
          activeStoryLength={activeStoryLength}
          setActiveStoryLength={setActiveStoryLength}
          page={"/list"}
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
        <div className="m-auto">
          <PartialLoading />
        </div>
      ) : (
        <div className="mb-[]">
          <div className="">
            <SectionBlock
              setActiveStoryLength={setActiveCategory}
              posts={sortedShortPlays}
              viewType={viewType}
              postNum={postNum}
              colNum={colNum}
              title="단편"
              onMoreClick={() => navigate("/list/short")}
              onToggleLike={handleToggleLikeShort}
            />
          </div>
          <div className="mt-[78px]">
            <SectionBlock
              setActiveStoryLength={setActiveCategory}
              posts={sortedLongPlays}
              viewType={viewType}
              postNum={postNum}
              colNum={colNum}
              title="장편"
              onMoreClick={() => navigate("/list/long")}
              onToggleLike={handleToggleLikeLong}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostGallery;
