import React, { useEffect, useRef, useState, useContext } from "react";
import Cookies from "js-cookie";
import { AllPostCard } from "@/components/post/PostList";
import FloatingBtn from "@/components/button/FloatingBtn";
import { getLikedShortWorks } from "@/api/user/profile/likeApi";
import { MyPageMenu } from "@/components/myPage";
import { ScriptItem } from "@/api/user/postListApi";
import useToggleLike from "@/hooks/useToggleLike";
import AuthContext from "@/contexts/AuthContext";
import PostHeaderControl from "@/components/post/PostHeaderControl";

const LikedShort = () => {
  const [shortPlays, setShortPlays] = useState<ScriptItem[]>([]);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shortPlayPage, setShortPlayPage] = useState(0);
  const [hasMoreShortPlays, setHasMoreShortPlays] = useState(true);
  const [activeCategory, setActiveCategory] = useState("포도밭");
  const [activeStoryLength, setActiveStoryLength] = useState("전체");
  const [viewType, setViewType] = useState<"grid" | "card">("grid");
  const observerRef = useRef<HTMLDivElement | null>(null);
  const accessToken = Cookies.get("accessToken");
  const { userNickname } = useContext(AuthContext);
  const isAuthenticated = useContext(AuthContext);
  const [resetFlag, setResetFlag] = useState(false);
  const rawToggleLikeShort = useToggleLike(setShortPlays);

  const loadShortPlays = async (page: number) => {
    if (isLoading) return; // 중복 방지
    setIsLoading(true);
    console.log(`🔥 호출된 페이지: ${page}`);
    try {
      const data = await getLikedShortWorks(page, accessToken);
      console.log(
        `📦 받아온 데이터:`,
        data.map((d) => d.id)
      );
      if (data.length === 0) {
        setHasMoreShortPlays(false);
        return;
      }

      setShortPlays((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("단편 작품 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleToggleLikeShort = (postId: string) => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    rawToggleLikeShort(postId);
  };

  const uniqueShortPlays = Array.from(
    new Map(shortPlays.map((post) => [post.id, post])).values()
  );

  useEffect(() => {
    loadShortPlays(shortPlayPage);
  }, [shortPlayPage]);

  useEffect(() => {
    if (!resetFlag) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreShortPlays && !isLoading) {
            console.log("🔍 observer 트리거됨");
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
    }
  }, [hasMoreShortPlays, isLoading, resetFlag]);

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
            <p className="h5-medium">단편극</p>
          </div>
          <AllPostCard
            posts={uniqueShortPlays}
            viewType={viewType}
            colNum={4}
            onToggleLike={handleToggleLikeShort}
          />
          <div ref={observerRef} className="h-[10px]" />
        </div>
      </div>
    </div>
  );
};

export default LikedShort;
