import { useState, useRef, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Document as PdfDocument, Page, pdfjs } from "react-pdf";
import Cookies from "js-cookie";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import { getPostView } from "@/api/user/postListApi";
import { getLikeStatus } from "@/api/user/profile/likeApi";

import { useSingleToggleLike } from "@/hooks/useToggleLike";

import HeaderWithBack from "@/components/header/HeaderWithBack";

import heartIcon from "@/assets/image/post/ic_heart.svg";
import bookMarkIcon from "@/assets/image/post/ic_book_mark.svg";
import redHeartIcon from "@/assets/image/post/ic_red_heart.svg";
import moreBtn from "@/assets/image/button/ic_postView_more.svg";

const PostView: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isMoreBtn, setIsMoreBtn] = useState(false);
  const barHeight = window.innerHeight * 0.07; // 하단바 높이(px), 필요시 Tailwind 단위로 환산 가능
  const [offset, setOffset] = useState(barHeight);
  const [isControlVisible, setIsControlVisible] = useState(true);
  const [scale, setScale] = useState(1.0);
  const lastScrollY = useRef(0);
  const topControlRef = useRef<HTMLDivElement>(null);
  const footerControlRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const { id } = useParams<string>();
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { script } = location.state;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const accessToken = Cookies.get("accessToken");

  const HEADER_HEIGHT = 179; // 헤더 높이
  const [headerOffset, setHeaderOffset] = useState(0);
  const [isHeaderTouchTop, setIsHeaderTouchTop] = useState(true);

  const navigate = useNavigate();
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const topMarkerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const rawToggleLike = useSingleToggleLike();

  const handlePageChange = (page: number) => {
    const target = document.getElementById(`page-${page}`);
    if (target) {
      isProgrammaticScroll.current = true;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000); // 스크롤이 끝난 후 감지할 시간 확보

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setCurrentPage(page);
    }
  };

  const handleToggleLike = (postId: string) => {
    rawToggleLike(postId);
  };

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!accessToken) {
      alert("좋아요는 로그인 후 이용할 수 있어요.");
      navigate("/signin");
      return;
    }

    setIsLiked((prev) => !prev);
    handleToggleLike(id!); // 부모에게 '나 클릭했어' 알려줌
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!id) return; // id가 없으면 요청하지 않음

      const status = await getLikeStatus(id, accessToken);
      setIsLiked(status);
    };

    fetchLikeStatus();
  }, [id]);

  useEffect(() => {
    let objectUrl: string;

    const fetchPdf = async () => {
      try {
        if (!id) return; // id가 없으면 요청하지 않음
        const blob = await getPostView(id); // <- 여기에 실제 UUID 입력
        objectUrl = URL.createObjectURL(blob);
        setPdfBlobUrl(objectUrl);
        setLoading(false);
      } catch (e) {
        alert((e as Error).message);
        setLoading(false);
      }
    };

    fetchPdf();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [id]);

  useEffect(() => {
    // 페이지 진입 시 하단바를 먼저 보여줌

    setIsControlVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll.current) {
        return; // 프로그래매틱 스크롤이면 아무것도 하지 않음
      }

      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY.current;

      setIsControlVisible(deltaY <= 0);

      setHeaderOffset((prev) => {
        const next = prev + deltaY;
        return Math.min(Math.max(next, 0), HEADER_HEIGHT); // 0 ~ HEADER_HEIGHT 사이 제한
      });

      const footer = document.querySelector(".footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setIsFooterVisible(footerTop < windowHeight);
      }

      setOffset((prev) => {
        const next = prev - deltaY;
        return Math.max(0, Math.min(barHeight, next));
      });

      lastScrollY.current = currentY;
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        (topControlRef.current && topControlRef.current.contains(target)) ||
        (footerControlRef.current && footerControlRef.current.contains(target))
      ) {
        return;
      }

      setOffset((prev) => (prev === 0 ? barHeight : 0));
      setIsControlVisible((prev) => !prev);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderTouchTop(entry.isIntersecting);
      },
      {
        root: null, // ✅ window 스크롤 기준
        threshold: 0.01,
      }
    );
    const waitForRef = () => {
      if (topMarkerRef.current) {
        observer.observe(topMarkerRef.current);
      } else {
        requestAnimationFrame(waitForRef); // 다음 프레임에서 재시도
      }
    };

    waitForRef();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const pageId = visibleEntry.target.id;
          const pageNum = parseInt(pageId.replace("page-", ""));
          if (!isNaN(pageNum)) setCurrentPage(pageNum);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6, // 화면에 60% 이상 보이면 그 페이지로 간주
      }
    );

    const timeoutId = setTimeout(() => {
      const pages = document.querySelectorAll("[id^='page-']");
      pages.forEach((page) => observer.observe(page));
    }, 500); // 렌더링 여유시간

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [numPages, pdfBlobUrl]);

  if (loading) {
    return <div className="mt-10 text-center">PDF를 불러오는 중입니다...</div>;
  }

  const handleZoom = (direction: "in" | "out") => {
    isProgrammaticScroll.current = true;

    setScale((prev) => {
      const next =
        direction === "in"
          ? Math.min(2.0, +(prev + 0.1).toFixed(1))
          : Math.max(0.8, +(prev - 0.1).toFixed(1));
      return next;
    });

    // 일정 시간 후 다시 스크롤 이벤트 허용
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600); // 확대/축소에 따른 layout 변화가 마무리되는 시간
  };

  return (
    <>
      {/* 1280px */}
      <div ref={scrollContainerRef} className=" w-screen mb-[7vh]">
        {/* header */}
        <div
          ref={topMarkerRef}
          style={{
            height: "1px",
          }}
        />
        <div
          className={`fixed top-[71px] left-0 w-full z-50 ransition-transform duration-70 ease-out  bg-[#fff]`}
          style={{
            transform: isHeaderTouchTop
              ? `translateY(-${headerOffset}px)` // 마커에 닿았을 때
              : `translateY(-${headerOffset + 99}px)`, // 그 외
          }}
        >
          <HeaderWithBack
            backUrl={id ? `/list/detail/${id}` : "/list"}
            headerTitle={script.title}
            headerFont="h1-bold"
            subtitle={script.writer}
            subFont="h3-bold"
            className={` mx-auto mb-[2.12vh] mt-[3.4vw] max-w-[1280px]`}
          />
          <span className="absolute z-100 w-[200vw] border border-[var(--purple7)] left-[-50%]" />
        </div>

        <div className="relative w-full pt-[179px] ">
          {pdfBlobUrl ? (
            <div className="mx-auto w-fit">
              <PdfDocument
                file={pdfBlobUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div className="mt-10 text-center">로딩 중...</div>}
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <div
                    className="z-0 "
                    id={`page-${index + 1}`}
                    key={`page-${index + 1}`}
                  >
                    <Page
                      pageNumber={index + 1}
                      width={653}
                      scale={scale}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                ))}
              </PdfDocument>
            </div>
          ) : (
            <div className="mt-10 text-center">PDF를 불러오는 중입니다...</div>
          )}

          {/* 하단 바*/}
          {/* 653px */}
          <div
            ref={footerControlRef}
            className={` w-screen ${
              isFooterVisible
                ? "absolute"
                : "fixed transition-transform duration-100 ease-linear"
            }  top-[100%] bg-[#FFF] h-[7vh]`}
            style={{
              transform: isFooterVisible
                ? "translateY(0px)"
                : `translateY(-${offset}px)`,

              height: `${barHeight}px`,

              // left: `33.9svw`,
            }}
          >
            <span className="absolute w-[100vw] border border-[var(--purple7)] " />
            <div className=" relative m-auto  w-[653px] min-w-[653px] flex flex-row h-full gap-[1.53%] items-center">
              {isMoreBtn ? (
                <div
                  className="absolute left-[30px] z-10 flex bg-[var(--white)] border border-[var(--grey3)] w-fit  rounded-[5px] items-center gap-[10px] px-[7px] py-[7px] transition-transform duration-100 ease-linear"
                  style={{ pointerEvents: isControlVisible ? "auto" : "none" }}
                >
                  <button onClick={() => handleZoom("out")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M13.5938 9.375H6.40625C6.32031 9.375 6.25 9.44531 6.25 9.53125V10.4688C6.25 10.5547 6.32031 10.625 6.40625 10.625H13.5938C13.6797 10.625 13.75 10.5547 13.75 10.4688V9.53125C13.75 9.44531 13.6797 9.375 13.5938 9.375Z"
                        fill={`${scale === 0.8 ? "#BABABA" : "black"}`}
                      />
                      <path
                        d="M10 1.25C5.16797 1.25 1.25 5.16797 1.25 10C1.25 14.832 5.16797 18.75 10 18.75C14.832 18.75 18.75 14.832 18.75 10C18.75 5.16797 14.832 1.25 10 1.25ZM10 17.2656C5.98828 17.2656 2.73438 14.0117 2.73438 10C2.73438 5.98828 5.98828 2.73438 10 2.73438C14.0117 2.73438 17.2656 5.98828 17.2656 10C17.2656 14.0117 14.0117 17.2656 10 17.2656Z"
                        fill={`${scale === 0.8 ? "#BABABA" : "black"}`}
                      />
                    </svg>
                  </button>
                  <span className="p-large-medium ">
                    {Math.round(scale * 100)}%
                  </span>
                  <button onClick={() => handleZoom("in")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M13.5938 9.375H10.625V6.40625C10.625 6.32031 10.5547 6.25 10.4688 6.25H9.53125C9.44531 6.25 9.375 6.32031 9.375 6.40625V9.375H6.40625C6.32031 9.375 6.25 9.44531 6.25 9.53125V10.4688C6.25 10.5547 6.32031 10.625 6.40625 10.625H9.375V13.5938C9.375 13.6797 9.44531 13.75 9.53125 13.75H10.4688C10.5547 13.75 10.625 13.6797 10.625 13.5938V10.625H13.5938C13.6797 10.625 13.75 10.5547 13.75 10.4688V9.53125C13.75 9.44531 13.6797 9.375 13.5938 9.375Z"
                        fill={`${scale === 2.0 ? "#BABABA" : "black"}`}
                      />
                      <path
                        d="M10 1.25C5.16797 1.25 1.25 5.16797 1.25 10C1.25 14.832 5.16797 18.75 10 18.75C14.832 18.75 18.75 14.832 18.75 10C18.75 5.16797 14.832 1.25 10 1.25ZM10 17.2656C5.98828 17.2656 2.73438 14.0117 2.73438 10C2.73438 5.98828 5.98828 2.73438 10 2.73438C14.0117 2.73438 17.2656 5.98828 17.2656 10C17.2656 14.0117 14.0117 17.2656 10 17.2656Z"
                        fill={`${scale === 2.0 ? "#BABABA" : "black"}`}
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                ""
              )}
              <button
                onClick={() => {
                  setIsMoreBtn(!isMoreBtn);
                }}
              >
                <img src={moreBtn} alt="더보기" className="no-drag"></img>
              </button>
              <button onClick={handleLikeClick}>
                <img
                  className="no-drag"
                  src={isLiked ? redHeartIcon : heartIcon}
                  alt="좋아요"
                ></img>
              </button>
              <img
                src={bookMarkIcon}
                alt="북마크"
                className="w-[4.9%] no-drag"
              />

              {/* 페이지네이션 */}
              <div className="flex items-center justify-between w-full">
                <input
                  type="range"
                  min={1}
                  max={numPages ?? 1}
                  value={currentPage}
                  onChange={(e) => handlePageChange(Number(e.target.value))}
                  className="w-full accent-[#6A39C0] h-[3px]"
                />
                <span className="ml-[32px] text-black whitespace-nowrap p-large-medium no-drag">
                  {currentPage} / {numPages}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostView;
