import { api } from "@/api/api";
import Cookies from "js-cookie";
import { useEffect, useState, useRef, useContext, lazy, Suspense } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import AuthContext from "@/contexts/AuthContext";
import defaultImg from "../../assets/image/post/list/defaultProfile_noneBorder.png";
import heartIcon from "../../assets/image/post/ic_heart.svg";
import redHeartIcon from "../../assets/image/post/ic_red_heart.svg";
import FloatingBtn from "@/components/button/FloatingBtn";
import AmountChange from "../../components/detail/AmountChange";
import PartialLoading from "../../components/loading/PartialLoading";
import InfoPopup from "../../components/popup/InfoPopup";
import Select from "../../components/select/Select";
import InfoItem from "@/components/detail/InfoItem";
import ReviewSummary from "@/components/detail/ReviewSummary";
import LikeViewCount from "@/components/list/LikeViewCount";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useSingleToggleLike } from "@/hooks/useToggleLike";

import { formatPrice } from "../../utils/formatPrice";
import truncateText from "@/utils/truncateText";
import { Review, ReviewStatistics } from "@/types/review";

import { DETAIL_SCRIPT_TEXT, DETAIL_PERFORM_TEXT } from "../../constants/PopupTexts/DetailTexts";
import { LIKE } from "@/constants/alertTexts";

import circleInfoBtn from "./../../assets/image/button/circleInfoBtn.svg";
import closeBtn from "./../../assets/image/button/aiOutlineClose.svg";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import vector23 from "./../../assets/image/post/vector23.svg";
import rightArrow from "./../../assets/image/post/list/ic_right_arrow.svg";
import openImg from "./../../assets/image/button/listOpenBtn.svg";
import closeImg from "./../../assets/image/button/listCloseBtn.svg";

import "./Detail.scss";
import "./../../styles/text.css";
import "./../../styles/utilities.css";
import ReviewList from "@/components/detail/ReviewList";
import clsx from "clsx";
import ReviewPagination from "@/components/detail/ReviewPagination";
import PreviewSingle from "@/components/detail/preview/PreviewSingle";

const Preview = lazy(() => import("../../components/detail/preview/Preview"));

// THX TO 'pxFIN' (https://github.com/wojtekmaj/react-pdf/issues/321)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface PostDetail {
  id: string;
  title: string;
  writer: string;
  plot: string;
  script: boolean;
  scriptPrice: number;
  performance: boolean;
  performancePrice: number;
  playType?: string;
  imagePath?: string;
  descriptionPath?: string;
  buyOptions: string[];
  like: boolean;
  likeCount: number;
  viewCount: number;
  any: number;
  male: number;
  female: number;
  stageComment: string;
  runningTime: number;
  scene: number;
  act: number;
  isMine: boolean;
  isReviewWritten: boolean;
  reviewStatistics: ReviewStatistics;
  reviews: Review[];
  intention: string;
}

const Detail = () => {
  const [script, setScript] = useState<PostDetail>();
  const [description, setDescription] = useState<string>("");
  const [bottomBarStyle, setBottomBarStyle] = useState<React.CSSProperties>({
    position: "fixed",
    display: "none", // bottom bar 비활성화
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [totalPrice, setTotalPrice] = useState(" - ");
  const [purchasePerformAmount, setPurchasePerformAmount] = useState(1);

  const [showPopup, setShowPopup] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // 스크롤 시 bottom-bar visibility 변경
  const [isDetailBtnVisible, setIsDetailBtnVisible] = useState(false);
  const detailBtnWrapRef = useRef(null);
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const toggleLike = useSingleToggleLike();
  const [numPages, setNumPages] = useState<number | null>(null); // 페이지 수를 저장하는 상태 추가

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [sort, setSort] = useState<"LIKE_COUNT" | "LATEST">("LIKE_COUNT");
  const [openSort, setOpenSort] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewPage, setReviewPage] = useState(0);

  const { width, widthConditions } = useWindowDimensions();
  const { isTablet, isMobile, isSmallMobile } = widthConditions;

  pdfjs.GlobalWorkerOptions.cMapUrl = "cmaps/";
  pdfjs.GlobalWorkerOptions.cMapPacked = true;

  const accessToken = Cookies.get("accessToken");

  const inflightRef = useRef<Map<string, boolean>>(new Map());
  // 작품 상세 + 설명 병렬 호출
  useEffect(() => {
    const key = `${id}|${sort}|page0`;
    if (inflightRef.current.get(key)) return; // 이미 같은 호출이 진행 중이면 스킵
    inflightRef.current.set(key, true); // 진행 중 표시

    const getDetail = async () => {
      if (!id) return;
      setIsLoading(true);
      setReviews([]);
      setReviewPage(0);

      try {
        const response = await api.get(`/scripts/detail`, {
          params: {
            script: id,
            sortType: sort,
            page: 0,
          },
        });

        console.log(response);

        setScript({
          id: id || "", // 혹은 response.data.id 가 있다면 사용
          title: response.data.title,
          writer: response.data.writer,
          plot: response.data.plot,
          script: response.data.script,
          scriptPrice: response.data.scriptPrice ?? 0,
          performance: response.data.performance,
          performancePrice: response.data.performancePrice ?? 0,
          playType: response.data.playType,
          imagePath: response.data.imagePath,
          buyOptions: response.data.buyOptions,
          like: response.data.like,
          likeCount: response.data.likeCount,
          viewCount: response.data.viewCount,
          any: response.data.any,
          male: response.data.male,
          female: response.data.female,
          stageComment: response.data.stageComment,
          runningTime: response.data.runningTime,
          scene: response.data.scene,
          act: response.data.act,
          isMine: response.data.isMine,
          isReviewWritten: response.data.isReviewWritten,
          reviewStatistics: response.data.reviewStatistics,
          reviews: response.data.reviews,
          intention: response.data.intention,
        });

        setReviews(response.data.reviews);
      } catch (error: any) {
        const errMsg = error.response?.data?.error;
        if (errMsg?.includes("rollback")) {
          alert("서버 내부 오류로 인해 작품 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
        } else {
          alert("작품 정보를 불러오는데 실패했습니다.");
        }
        console.error("❌ 서버 응답:", errMsg);
      }
      setIsLoading(false);
      inflightRef.current.delete(key);

      const { data: description } = await api.get(`/scripts/description`, {
        params: {
          script: id,
        },
        responseType: "blob",
      });

      setDescription(URL.createObjectURL(description));
    };

    getDetail();
  }, [id, sort]);

  // 리뷰 다음 페이지 Fetch
  useEffect(() => {
    if (reviewPage === 0) return;
    const fetchMore = async () => {
      try {
        const { data } = await api.get(`/scripts/detail`, {
          params: { script: id, sortType: sort, page: reviewPage },
        });

        setReviews(data.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMore();
  }, [reviewPage, sort, id]);

  const onChangeSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    // 이미 대본을 소유하고 있는데 대본을 구매하려는 경우 alert
    // 이미 공연권을 소유하고 있는데 공연권을 구매하려는 경우 alert
    setSelectedOption(event.target.value);
    setIsOptionSelected(true);
  };

  useEffect(() => {
    if (selectedOption === "scriptPerform" || selectedOption === "perform") {
      setShowPopup(true);
    }
  }, [selectedOption]);

  const onChangeBottomSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onChangeSelectOption(event);
  };

  useEffect(() => {
    if (!script) {
      setTotalPrice(" - ");
      return;
    }

    let total = 0;

    if (selectedOption === "script") {
      total = script.scriptPrice;
    } else if (selectedOption === "perform") {
      total = purchasePerformAmount * script.performancePrice;
    } else if (selectedOption === "scriptPerform") {
      total = script.scriptPrice + purchasePerformAmount * script.performancePrice;
    }

    setTotalPrice(formatPrice(total));
  }, [selectedOption, script, purchasePerformAmount]);

  const pdfContainerRef = useRef<HTMLDivElement | null>(null);

  // 구매 버튼이 보이면 bottom bar가 보이지 않도록
  useEffect(() => {
    if (!numPages) return; // PDF가 로드되지 않았으면 IntersectionObserver 설정 중지

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDetailBtnVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (detailBtnWrapRef.current) {
      observer.observe(detailBtnWrapRef.current);
    }

    return () => {
      if (detailBtnWrapRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(detailBtnWrapRef.current);
      }
    };
  }, [numPages]); // numPages가 설정된 후에만 IntersectionObserver 작동

  // footer 위에 도달하면 바닥에 붙도록
  useEffect(() => {
    if (!numPages) return; // PDF가 로드되지 않았으면 스크롤 이벤트 중지

    const handleScroll = () => {
      const pdfContainer = pdfContainerRef.current;
      const bottomBar = document.querySelector(".detail-bottom-bar") as HTMLElement;

      if (pdfContainer && bottomBar) {
        const pdfContainerRect = pdfContainer.getBoundingClientRect();
        const bottomBarHeight = bottomBar.offsetHeight;

        if (pdfContainerRect.bottom <= window.innerHeight - bottomBarHeight) {
          setBottomBarStyle({
            position: "relative",
            width: "100%",
          });
        } else {
          setBottomBarStyle({
            position: "fixed",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [numPages]); // numPages가 설정된 후에만 스크롤 이벤트 적용

  const onClickPurchase = () => {
    // 공연권도 선택되었을 시 true
    let isScriptSelected = false;
    let isPerformSelected = false;
    if (selectedOption === "script") {
      isScriptSelected = true;
    } else if (selectedOption === "perform") {
      isPerformSelected = true;
    } else if (selectedOption === "scriptPerform") {
      isScriptSelected = true;
      isPerformSelected = true;
    }
    navigate(`/purchase/${id}`, {
      state: {
        isScriptSelected,
        isPerformSelected,
        purchasePerformAmount,
      },
    });
  };

  const onClickScriptView = () => {
    if (!accessToken) {
      alert("대본열람은 로그인 후 가능합니다.");
      navigate("/signin");
    } else {
      navigate(`/list/view/${id}`, {
        state: {
          script,
        },
      });
    }
  };

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };
  if (isLoading) {
    return <Loading />;
  }

  const handleLikeClick = (postId: string) => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!postId) {
      console.error("스크립트 ID 없음");
      return;
    }
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      alert(LIKE);

      navigate("/signin");
      return;
    }

    setScript((prev) => ({
      ...prev!,
      like: !prev!.like,
      likeCount: prev!.like ? prev!.likeCount - 1 : prev!.likeCount + 1,
    }));

    toggleLike(postId);
  };

  const parseReviewCount = (count: number) => {
    if (count > 999) {
      return "999+";
    }
    return count;
  };
  console.log(script);

  const renderReviewWriteButton = () => {
    return (
      <button
        className={clsx(
          "review-write-btn flex justify-end items-center gap-[10px] cursor-pointer hover:text-[#6A39C0]",
          !isSmallMobile ? "p-large-medium" : "p-small-medium"
        )}
        onClick={() => {
          if (script?.isMine) {
            alert("본인의 작품은 후기를 작성할 수 없습니다.");
            return;
          }
          if (script?.isReviewWritten) {
            alert("이미 작성된 후기가 있습니다.");
            return;
          }
          if (!isAuthenticated) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/signin");
            return;
          }

          navigate(`/list/review/${id}`);
        }}
      >
        후기 작성하기 <img src={rightArrow} alt=">"></img>
      </button>
    );
  };

  return (
    <div className="detail flex flex-col items-center pb-[100px]">
      <FloatingBtn style={{ bottom: "100px" }} />

      <div className="w-full detail-wrap f-dir-column a-items-center">
        <div className="w-full content">
          <div className="detail-thumbnail-wrap">
            <div className="relative aspect-square w-full rounded-[20px] bg-white border-1 border-[var(--grey3)] overflow-hidden">
              <img
                src={script?.imagePath === "" ? defaultImg : script?.imagePath}
                alt={script?.title}
                className="object-contain w-full h-full thumbnail"
              />
              <div className="absolute right-[7px] bottom-[6px] sm:right-[14px] sm:bottom-[14px] md:right-[20px] md:bottom-[20px] lg:right-[30px] lg:bottom-[30px] transition-all duration-100 hover:scale-[1.2]">
                <button
                  onClick={() => {
                    if (script?.id) {
                      handleLikeClick(script.id);
                    }
                  }}
                >
                  <img
                    className="size-[27px] sm:size-[35px]"
                    src={script?.like ? redHeartIcon : heartIcon}
                    alt="좋아요"
                  ></img>
                </button>
              </div>
            </div>
          </div>

          {/* 제목, 이름 */}
          <div id="title" className="w-full h-full detail-title f-dir-column j-content-between">
            <div className="h-full">
              {!isTablet && !isMobile && !isSmallMobile && (
                <>
                  <h1 className={!isSmallMobile ? "h1-bold" : "p-large-bold"}>
                    {width > 769
                      ? script?.title
                      : truncateText({
                          text: script?.title || "",
                          maxLength: 6,
                        })}
                  </h1>
                  <div className="like-view">
                    <h3 className={!isSmallMobile ? "h3-bold" : "p-small-bold"}>
                      {script?.writer}
                    </h3>
                    <LikeViewCount likes={script?.likeCount ?? 0} views={script?.viewCount ?? 0} />
                  </div>
                </>
              )}
              {(isTablet || isMobile || isSmallMobile) && (
                <section className="flex flex-col justify-between h-full">
                  <div>
                    <h1
                      className={clsx(
                        "line-clamp-1 overflow-ellipsis",
                        !isSmallMobile ? "h1-bold" : "p-large-bold"
                      )}
                    >
                      {script?.title}
                    </h1>
                    <h3 className={!isSmallMobile ? "h3-bold" : "p-small-bold"}>
                      {script?.writer}
                    </h3>
                  </div>
                  <div className="flex">
                    <LikeViewCount likes={script?.likeCount ?? 0} views={script?.viewCount ?? 0} />
                  </div>
                </section>
              )}
            </div>
          </div>

          <div id="content" className="w-full detail-title f-dir-column j-content-between">
            {/* 줄거리 */}
            <div className=" _content-detail">
              <hr id="detail-hr-1"></hr>
              <div className=" detail-price-wrap">
                <div className="detail-plot pr-[46px] ">
                  <p
                    className={clsx(
                      "w-full",
                      !isSmallMobile ? "p-medium-regular" : "p-small-medium"
                    )}
                  >
                    {script?.plot}
                  </p>
                </div>
                <hr id="detail-hr-2"></hr>

                <div className="detail-price">
                  <div className="price">
                    <img id="script" src={scriptImg} alt="script"></img>
                    <p className="whitespace-nowrap" style={{ marginLeft: "0.2rem" }}>
                      대본
                    </p>
                  </div>
                  <p className={!isSmallMobile ? "p-large-medium" : "p-small-medium"}>
                    {formatPrice(script?.scriptPrice) === "0"
                      ? "무료"
                      : `${formatPrice(script?.scriptPrice)}원`}
                  </p>
                </div>
                {script?.performance ? (
                  <div className="detail-price">
                    <div className="price">
                      <img id="perform" src={performImg} alt="perform"></img>
                      <p className="whitespace-nowrap">공연권</p>
                    </div>
                    <p className={!isSmallMobile ? "p-large-medium" : "p-small-medium"}>
                      {formatPrice(script?.performancePrice) === "0"
                        ? "무료"
                        : `${formatPrice(script?.performancePrice)}원`}
                    </p>
                  </div>
                ) : (
                  <></>
                )}

                <div className="option-select ">
                  <Select
                    className="cursor-pointer"
                    value={selectedOption}
                    onChange={onChangeSelectOption}
                  >
                    <option value="">옵션 선택</option>
                    {script?.script && script?.buyOptions.includes("SCRIPT") ? (
                      <option value="script">대본</option>
                    ) : null}

                    {script?.performance && script?.buyOptions.includes("PERFORMANCE") ? (
                      <option value="perform">공연권</option>
                    ) : null}
                  </Select>
                </div>

                <hr id="detail-hr-2"></hr>
                {selectedOption ? (
                  <>
                    <div className="select-amount-wrap a-items-center">
                      <p
                        className={clsx(
                          "c-grey7",
                          !isSmallMobile ? "p-large-bold" : "p-medium-bold"
                        )}
                      >
                        수량 선택
                      </p>
                      <div className="j-content-start" id="info-wrap">
                        <img
                          className="c-pointer"
                          id="info-btn"
                          src={circleInfoBtn}
                          alt="info"
                          onClick={() => {
                            setShowPopup(!showPopup);
                          }}
                        ></img>
                        {showPopup ? (
                          <InfoPopup
                            message={
                              selectedOption === "perform"
                                ? DETAIL_PERFORM_TEXT
                                : DETAIL_SCRIPT_TEXT
                            }
                            onClose={() => {
                              setShowPopup(!showPopup);
                            }}
                            style={{
                              padding: "11px",
                              transform: "translate(35px, calc(-100% + 19px))",
                            }}
                            buttonId="info-btn"
                            message2={
                              selectedOption === "scriptPerform" ? DETAIL_PERFORM_TEXT : undefined
                            }
                          />
                        ) : null}
                      </div>
                    </div>
                    <div id="detail-amount-wrap">
                      {selectedOption === "script" || selectedOption === "scriptPerform" ? (
                        <div
                          className="relative flex items-center justify-between"
                          id="detail-amount"
                        >
                          <div className="a-items-center" id="detail-amount-title">
                            <img src={vector23} alt="ㄴ"></img>
                            <img id="script" src={scriptImg} alt="script amount"></img>
                            <p className={!isSmallMobile ? "p-large-medium" : "p-small-medium"}>
                              대본
                            </p>
                          </div>
                          <p
                            className={clsx(
                              "amount-change absolute translate-x-[35px]",
                              !isSmallMobile ? " p-large-medium" : " p-xs-medium"
                            )}
                          >
                            1
                          </p>

                          <div className="a-items-center" id="detail-amount-price">
                            <div className="flex items-center price-wrapper">
                              <p
                                className="p-xs-medium sm:p-large-medium whitespace-nowrap"
                                id="price"
                              >
                                {formatPrice(script?.scriptPrice)} 원
                              </p>
                              <img
                                className="c-pointer"
                                src={closeBtn}
                                alt="X"
                                onClick={() => {
                                  setTotalPrice(formatPrice(script?.scriptPrice));
                                  setSelectedOption("");
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {selectedOption === "scriptPerform" ? <hr id="detail-hr-3"></hr> : null}

                      {selectedOption === "perform" || selectedOption === "scriptPerform" ? (
                        <div
                          className="relative flex items-center justify-between"
                          id="detail-amount"
                        >
                          <div className="a-items-center" id="detail-amount-title">
                            <img src={vector23} alt="ㄴ"></img>
                            <img id="perform" src={performImg} alt="perform amount"></img>
                            <p className={!isSmallMobile ? "p-large-medium" : "p-small-medium"}>
                              공연권
                            </p>
                          </div>

                          <AmountChange
                            purchasePerformAmount={purchasePerformAmount}
                            setPurchasePerformAmount={setPurchasePerformAmount}
                          />

                          <div
                            className="relative flex items-center text-center"
                            id="detail-amount-price"
                          >
                            <div className="flex items-center price-wrapper">
                              <p
                                className="p-xs-medium sm:p-large-medium whitespace-nowrap"
                                id="price"
                              >
                                {formatPrice(
                                  purchasePerformAmount * (script?.performancePrice ?? 0)
                                )}{" "}
                                원
                              </p>
                              <img
                                className="c-pointer"
                                src={closeBtn}
                                alt="X"
                                onClick={() => {
                                  if (selectedOption === "perform") {
                                    setSelectedOption("");
                                    setIsOptionSelected(false);
                                  } else {
                                    setSelectedOption("script");
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : null}

                {selectedOption ? <hr id="detail-hr-2"></hr> : null}

                <div className=" total-price j-content-between a-items-center">
                  <p className={clsx("c-grey7", !isSmallMobile ? "p-large-bold" : "p-medium-bold")}>
                    총 금액
                  </p>
                  <div className="a-items-end" id="total-price-won">
                    <h4 className={!isSmallMobile ? "h4-bold" : "h5-bold"}>{totalPrice}</h4>
                    <p
                      className={clsx("c-grey7", !isSmallMobile ? "p-large-bold" : "p-medium-bold")}
                    >
                      원
                    </p>
                  </div>
                </div>
                <div className="detail-btn-wrap" ref={detailBtnWrapRef}>
                  {/*<button id="cart-btn">장바구니</button>*/}
                  <button id="purchase-btn" onClick={onClickScriptView}>
                    대본 열람하기
                  </button>
                  <button id="purchase-btn" onClick={onClickPurchase} disabled={!isOptionSelected}>
                    구매하기
                  </button>
                </div>
              </div>
              <hr id="detail-hr-1" />
            </div>
          </div>
        </div>

        <div className="w-full detail-description" ref={pdfContainerRef}>
          <hr></hr>
          <div className="flex flex-col pl-[20px] gap-[19px]">
            <h2 className={!isSmallMobile ? "p-large-bold" : "p-medium-bold"}>개요</h2>
            <div className="flex flex-col gap-[18px]">
              <InfoItem
                label="등장인물"
                value={[
                  (script?.any ?? 0) > 0 ? `성별무관 ${script?.any}명` : null,
                  (script?.male ?? 0) > 0 ? `남자 ${script?.male}명` : null,
                  (script?.female ?? 0) > 0 ? `여자 ${script?.female}명` : null,
                ]
                  .filter(Boolean)
                  .join(" / ")}
              />
              <InfoItem label="무대" value={`${script?.stageComment}`} />
              <InfoItem label="공연 시간" value={`약 ${script?.runningTime}분`} />
              <InfoItem label="막과 장" value={`${script?.act}막 ${script?.scene}장`} />
            </div>
          </div>

          <div className="w-full script-intention">
            <hr></hr>
            <div className="flex flex-col pl-[20px] gap-[19px]">
              <h2 className={!isSmallMobile ? "p-large-bold" : "p-medium-bold"}>작가 의도</h2>
              <p className={!isSmallMobile ? "p-medium-regular" : "p-12-400"}>
                {script?.intention}
              </p>
            </div>
          </div>

          <hr></hr>
          <div className="mb-[40px]  ">
            <p
              className={clsx("w-fit", !isSmallMobile ? "p-large-bold" : "p-medium-bold")}
              id="preview-title"
            >
              미리보기
            </p>

            <Suspense fallback={<PartialLoading />}>
              <Preview id={id!} lengthType={script?.playType ?? ""} />
            </Suspense>
          </div>
          <hr></hr>

          <div className=" j-content-center">
            {/* PDF 삽입 */}
            {description ? (
              <Document
                file={description}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<PartialLoading />}
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <Page
                    key={index}
                    pageNumber={index + 1}
                    width={width > 1280 ? 1000 : width > 768 ? 700 : 400}
                  />
                ))}
              </Document>
            ) : (
              <></>
            )}
          </div>
        </div>
        <section className="w-full">
          <section className="mt-[24px] mb-[16px] w-full">
            <p className="ml-[20px] w-full p-large-bold">
              후기 ({parseReviewCount(script?.reviewStatistics?.totalReviewCount ?? 0)})
            </p>
            <div className="flex justify-end w-full">{renderReviewWriteButton()}</div>
          </section>
          <ReviewSummary stats={script?.reviewStatistics!} />

          <section className="mt-[50px] w-full">
            <div className="flex justify-between w-full mb-[8px] relative">
              <p className={clsx("ml-[20px]", !isSmallMobile ? "p-large-bold" : "p-medium-bold")}>
                전체 후기
              </p>
              <button
                className="flex items-center gap-[4px] p-xs-regular sm:p-medium-regular hover:text-[#6A39C0]"
                onClick={() => setOpenSort(!openSort)}
              >
                {sort === "LIKE_COUNT" ? "좋아요순" : "최신순"}
                <img
                  className="size-[14px] sm:size-[18px]"
                  src={openSort ? closeImg : openImg}
                  alt=""
                ></img>
              </button>

              {openSort && (
                <div className="flex flex-col gap-[10px] absolute top-[40px] right-[0] p-[14px] sm:w-[84px] sm:h-[86px] border-1 border-[#E2E2E2] bg-[#fff] rounded-[5px] z-20 box-border whitespace-nowrap ">
                  <button
                    className={clsx("flex items-center gap-[4px] p-xs-medium sm:p-medium-medium", {
                      "text-[#777] hover:text-[#6A39C0]": sort !== "LIKE_COUNT",
                    })}
                    onClick={() => {
                      setSort("LIKE_COUNT");
                      setOpenSort(false);
                    }}
                  >
                    좋아요순
                  </button>
                  <button
                    className={clsx("flex items-center gap-[4px] p-xs-medium sm:p-medium-medium", {
                      "text-[#777] hover:text-[#6A39C0]": sort !== "LATEST",
                    })}
                    onClick={() => {
                      setSort("LATEST");
                      setOpenSort(false);
                    }}
                  >
                    최신순
                  </button>
                </div>
              )}
            </div>

            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewList key={review.id} scriptId={script?.id!} review={review} />
              ))
            ) : (
              <div className="flex flex-col w-full">
                <hr className="m-[0px] mb-[74px] w-full bg-[#9E9E9E]" />
                <p className="text-center p-large-bold">작품의 후기를 남겨주세요.</p>
                <div className="mt-[25px] flex justify-center w-full">
                  {renderReviewWriteButton()}
                </div>
              </div>
            )}
          </section>
        </section>

        {reviews.length > 0 && (
          <ReviewPagination
            currentPage={reviewPage + 1}
            totalPages={Math.ceil((script?.reviewStatistics?.totalReviewCount ?? 5) / 5) ?? 1}
            onPageChange={(page) => {
              // 0 base로 parsing 필요
              setReviewPage(page - 1);
            }}
          />
        )}
      </div>

      {!isDetailBtnVisible && (
        <div className="hidden"></div>
        // <div className="detail-bottom-bar" style={bottomBarStyle}>
        //   <div className="bottom-bar-left">
        //     <h5 className="h5-regular c-grey">총 금액</h5>
        //     <h4 className="h4-bold" id="bottom-total-price">
        //       {totalPrice} 원
        //     </h4>
        //   </div>
        //   <div className="bottom-bar-right">
        //     {/* disabled */}
        //     <Select
        //       className={`${script?.performance ? "cursor-pointer" : ""}`} // 포도알 스테이지에서만 적용
        //       value={selectedOption}
        //       onChange={onChangeSelectOption}
        //       disabled={!script?.performance} // 포도알 스테이지에서만 적용
        //     >
        //       <option value="">옵션 선택</option>
        //       {/* {(script?.buyStatus === 0 || script?.buyStatus === 2) &&
        //       script.script ? (
        //         <option value="script">대본</option>
        //       ) : null}
        //       {(script?.buyStatus === 0 || script?.buyStatus === 2) &&
        //       script.script &&
        //       script.performance ? (
        //         <option value="scriptPerform">대본 + 공연권</option>
        //       ) : null}
        //       {script?.buyStatus === 0 && script.performance ? (
        //         <option value="perform">공연권</option>
        //       ) : null} */}

        //       {script?.buyStatus === 0 && script.performance ? (
        //         <option value="perform">공연권</option>
        //       ) : null}
        //     </Select>
        //     {/* <button id="cart-btn">장바구니</button>*/}
        //     <button
        //       id="purchase-btn"
        //       onClick={onClickPurchase}
        //       disabled={!isOptionSelected}
        //     >
        //       구매하기
        //     </button>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default Detail;
