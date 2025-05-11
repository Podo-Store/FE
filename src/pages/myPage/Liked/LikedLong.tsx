import React, { useEffect, useRef, useState, useContext } from "react";
import Cookies from "js-cookie";
import { AllPostCard } from "@/components/post/PostList";
import FloatingBtn from "@/components/button/FloatingBtn";
import { getLikedLongWorks } from "@/api/user/profile/likeApi";
import { MyPageMenu } from "@/components/myPage";
import { ScriptItem } from "@/api/user/postListApi";
import useToggleLike from "@/hooks/useToggleLike";
import AuthContext from "@/contexts/AuthContext";
import PostHeaderControl from "@/components/post/PostHeaderControl";

const LikedLong = () => {
  const [longPlays, setLongPlays] = useState<ScriptItem[]>([]);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [longPlayPage, setLongPlayPage] = useState(0);
  const [hasMoreLongPlays, setHasMoreLongPlays] = useState(true);
  const [activeCategory, setActiveCategory] = useState("포도밭");
  const [activeStoryLength, setActiveStoryLength] = useState("전체");
  const [viewType, setViewType] = useState<"grid" | "card">("grid");
  const observerRef = useRef<HTMLDivElement | null>(null);
  const accessToken = Cookies.get("accessToken");
  const { userNickname } = useContext(AuthContext);
  const isAuthenticated = useContext(AuthContext);
  const [resetFlag, setResetFlag] = useState(false);
  const rawToggleLikeLong = useToggleLike(setLongPlays);

  const loadLongPlays = async (page: number) => {
    if (isLoading) return; // 중복 방지
    setIsLoading(true);
    console.log(`🔥 호출된 페이지: ${page}`);
    try {
      const data = await getLikedLongWorks(page, accessToken);
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

  const uniqueLongPlays = Array.from(
    new Map(longPlays.map((post) => [post.id, post])).values()
  );

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
    <div className="purchased-script myPage-contents-default">
      <FloatingBtn />
      <div className="myPage-contents-default-wrap">
        <MyPageMenu
          nickname={userNickname}
          currentPage="3"
          isFooterVisible={isFooterVisible}
        />
        <div className="content-side">
          <div className="content-side-grid">
            <h4 className="h4-bold">좋아한 작품들을 볼 수 있어요!</h4>
          </div>
          <PostHeaderControl
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeStoryLength={activeStoryLength}
            setActiveStoryLength={setActiveStoryLength}
            viewType={viewType}
            setViewType={setViewType}
            page={"/mypage/liked"}
          />
          <div className="mb-[24px]">
            <p className="h5-medium">장편극</p>
          </div>
          <AllPostCard
            posts={uniqueLongPlays}
            viewType={viewType}
            colNum={4}
            onToggleLike={handleToggleLikeLong}
          />
          <div ref={observerRef} className="h-[10px]" />
        </div>
      </div>
    </div>
  );
};

export default LikedLong;
