import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../Loading";

import FloatingBtn from "@/components/button/FloatingBtn";
import AmountChange from "../../components/detail/AmountChange";
import Preview from "../../components/detail/Preview";
import PartialLoading from "../../components/loading/PartialLoading";
import InfoPopup from "../../components/popup/InfoPopup";
import Select from "../../components/select/Select";
import ThumbnailImg from "../../components/thumbnail/ThumbnailImg";
import InfoItem from "@/components/detail/InfoItem";
import { useRequest } from "../../hooks/useRequest";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { formatPrice } from "../../utils/formatPrice";
import truncateText from "@/utils/truncateText";
import {
  DETAIL_SCRIPT_TEXT,
  DETAIL_PERFORM_TEXT,
} from "../../constants/PopupTexts/DetailTexts";
import { SERVER_URL } from "../../constants/ServerURL";

import circleInfoBtn from "./../../assets/image/button/circleInfoBtn.svg";
import closeBtn from "./../../assets/image/button/aiOutlineClose.svg";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import vector23 from "./../../assets/image/post/vector23.svg";

import "./Detail.scss";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

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
  buyStatus: number;
  like: boolean;
  likeCount: number;
  viewCount: number;
}

const Detail = () => {
  const [script, setScript] = useState<PostDetail>();
  const [bottomBarStyle, setBottomBarStyle] = useState<React.CSSProperties>({
    position: "fixed",
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

  const [numPages, setNumPages] = useState<number | null>(null); // 페이지 수를 저장하는 상태 추가

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  pdfjs.GlobalWorkerOptions.cMapUrl = "cmaps/";
  pdfjs.GlobalWorkerOptions.cMapPacked = true;

  useRequest(async () => {
    try {
      setIsLoading(true);

      let headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      // 로그인 상태에 따른 헤더 설정
      if (Cookies.get("accessToken")) {
        headers["Authorization"] = `Bearer ${Cookies.get("accessToken")}`;
      }

      const response = await axios.get(`${SERVER_URL}scripts/detail`, {
        headers: headers,
        params: {
          script: id,
        },
      });

      console.log(response.data);
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
        descriptionPath: response.data.descriptionPath,
        buyStatus: response.data.buyStatus,
        like: response.data.like,
        likeCount: response.data.likeCount,
        viewCount: response.data.ViewCount, // 여긴 ViewCount 주의!
      });
    } catch (error) {
      alert("작품 정보를 불러오는데 실패했습니다.");
    }
    setIsLoading(false);
  });

  const onChangeSelectOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
    setIsOptionSelected(true);
  };

  const onChangeBottomSelectOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onChangeSelectOption(event);
  };

  useEffect(() => {
    if (!script) return setTotalPrice(" - ");
    if (selectedOption === "script") {
      setTotalPrice(formatPrice(script?.scriptPrice));
    } else if (selectedOption === "perform") {
      setTotalPrice(
        formatPrice(purchasePerformAmount * script?.performancePrice)
      );
    } else if (selectedOption === "scriptPerform") {
      setTotalPrice(
        formatPrice(
          script?.scriptPrice + purchasePerformAmount * script?.performancePrice
        )
      );
    }
  }, [
    selectedOption,
    script?.scriptPrice,
    script?.performancePrice,
    purchasePerformAmount,
  ]);

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
      const bottomBar = document.querySelector(
        ".detail-bottom-bar"
      ) as HTMLElement;

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
    navigate(`/list/view/${id}`, {
      state: {
        script,
      },
    });
  };

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="detail f-dir-column a-items-center">
      <FloatingBtn style={{ bottom: "100px" }} />

      <div className="detail-wrap f-dir-column a-items-center max-w-[1220px]">
        <div className="content">
          <div className="detail-thumbnail-wrap">
            <ThumbnailImg
              style={{ width: "100%", height: "0", paddingBottom: "100%" }}
              imagePath={script?.imagePath}
            />
          </div>

          {/* 제목, 이름 */}
          <div
            id="title"
            className=" detail-title f-dir-column j-content-between"
          >
            <div className="title-wrap">
              <h1 className="h1-bold">
                {width > 769
                  ? script?.title
                  : truncateText({ text: script?.title || "", maxLength: 6 })}
              </h1>
              <h3 className="h3-bold">{script?.writer}</h3>
            </div>
          </div>

          <div
            id="content"
            className="detail-title f-dir-column j-content-between"
          >
            {/* 줄거리 */}
            <div className="_content-detail">
              <hr id="detail-hr-1"></hr>
              <div className="detail-price-wrap">
                <div className="detail-plot pr-[46px]">
                  <p className="p-medium-regular ">{script?.plot}</p>
                </div>
                <hr id="detail-hr-2"></hr>

                <div className="detail-price">
                  <div className="price">
                    <img id="script" src={scriptImg} alt="script"></img>
                    <p
                      className="whitespace-nowrap"
                      style={{ marginLeft: "0.2rem" }}
                    >
                      대본
                    </p>
                  </div>
                  <p className="p-large-medium">
                    {formatPrice(script?.scriptPrice)} 원
                  </p>
                </div>
                <div className="detail-price">
                  <div className="price">
                    <img id="perform" src={performImg} alt="perform"></img>
                    <p className="whitespace-nowrap">공연권</p>
                  </div>
                  <p className="p-large-medium">
                    {formatPrice(script?.performancePrice)} 원
                  </p>
                </div>

                <div className="option-select">
                  <Select
                    value={selectedOption}
                    onChange={onChangeSelectOption}
                  >
                    <option value="">옵션 선택</option>
                    {(script?.buyStatus === 0 || script?.buyStatus === 2) &&
                    script.script ? (
                      <option value="script">대본</option>
                    ) : null}
                    {(script?.buyStatus === 0 || script?.buyStatus === 2) &&
                    script.script &&
                    script.performance ? (
                      <option value="scriptPerform">대본 + 공연권</option>
                    ) : null}
                    {script?.buyStatus === 0 && script.performance ? (
                      <option value="perform">공연권</option>
                    ) : null}
                  </Select>
                </div>

                <hr id="detail-hr-2"></hr>
                {selectedOption ? (
                  <>
                    <div className="select-amount-wrap a-items-center">
                      <p className="p-large-bold c-grey7">수량 선택</p>
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
                              selectedOption === "scriptPerform"
                                ? DETAIL_PERFORM_TEXT
                                : undefined
                            }
                          />
                        ) : null}
                      </div>
                    </div>
                    <div id="detail-amount-wrap">
                      {selectedOption === "script" ||
                      selectedOption === "scriptPerform" ? (
                        <div
                          className="relative j-content-between"
                          id="detail-amount"
                        >
                          <div
                            className="a-items-center"
                            id="detail-amount-title"
                          >
                            <img src={vector23} alt="ㄴ"></img>
                            <img
                              id="script"
                              src={scriptImg}
                              alt="script amount"
                            ></img>
                            <p className="p-large-medium">대본</p>
                          </div>
                          <p className="amount-change p-large-medium absolute translate-x-[35px]">
                            1
                          </p>

                          <div
                            className="a-items-center"
                            id="detail-amount-price"
                          >
                            <div className="flex items-center price-wrapper">
                              <p className="p-large-medium" id="price">
                                {formatPrice(script?.scriptPrice)} 원
                              </p>
                              <img
                                className="c-pointer"
                                src={closeBtn}
                                alt="X"
                                onClick={() => {
                                  setSelectedOption("");
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {selectedOption === "scriptPerform" ? (
                        <hr id="detail-hr-3"></hr>
                      ) : null}

                      {selectedOption === "perform" ||
                      selectedOption === "scriptPerform" ? (
                        <div
                          className="relative flex justify-between"
                          id="detail-amount"
                        >
                          <div
                            className="a-items-center"
                            id="detail-amount-title"
                          >
                            <img src={vector23} alt="ㄴ"></img>
                            <img
                              id="perform"
                              src={performImg}
                              alt="perform amount"
                            ></img>
                            <p className="p-large-medium">공연권</p>
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
                              <p className="p-large-medium" id="price">
                                {formatPrice(
                                  purchasePerformAmount *
                                    (script?.performancePrice ?? 0)
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
                                    // selectedOption === "scriptPerform"
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

                <div className="total-price j-content-between a-items-center">
                  <p className="p-large-bold c-grey7">총 금액</p>
                  <div className="a-items-end" id="total-price-won">
                    <h4 className="h4-bold">{totalPrice}</h4>
                    <p className="p-large-bold c-grey7">원</p>
                  </div>
                </div>
                <div className="detail-btn-wrap" ref={detailBtnWrapRef}>
                  {/*<button id="cart-btn">장바구니</button>*/}
                  <button id="purchase-btn" onClick={onClickScriptView}>
                    대본열람하기
                  </button>
                  <button
                    id="purchase-btn"
                    onClick={onClickPurchase}
                    disabled={!isOptionSelected}
                  >
                    구매하기
                  </button>
                </div>
              </div>
              <hr id="detail-hr-1" />
            </div>
          </div>
        </div>

        <div className="detail-description" ref={pdfContainerRef}>
          <hr></hr>
          <div className="flex  flex-col pl-[20px] gap-[19px]">
            <h2 className="p-large-bold">개요</h2>
            <div className="flex flex-col  gap-[18px]">
              <InfoItem label="등장인물" value="남 9명/ 여 9명" />
              <InfoItem label="무대" value="대한민국 가정집, 법정" />
              <InfoItem label="공연 시간" value="약 120분" />
              <InfoItem label="장과 막" value="3막 10장" />
            </div>
          </div>

          <hr></hr>
          <p className="p-large-bold" id="preview-title">
            미리보기
          </p>
          <Preview id={id!} lengthType={script?.playType ?? ""} />
          <hr></hr>

          <div className="j-content-center">
            {/* PDF 삽입 */}
            {script?.descriptionPath ? (
              <Document
                file={script.descriptionPath}
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
              <p>미리보기 파일이 존재하지 않습니다.</p> // ✅ file이 없을 때 보여줄 내용
            )}
          </div>
        </div>
      </div>
      {!isDetailBtnVisible && (
        <div className="detail-bottom-bar" style={bottomBarStyle}>
          <div className="bottom-bar-left">
            <h5 className="h5-regular c-grey">총 금액</h5>
            <h4 className="h4-bold" id="bottom-total-price">
              {totalPrice} 원
            </h4>
          </div>
          <div className="bottom-bar-right">
            {/* disabled */}
            <Select
              value={selectedOption}
              onChange={onChangeBottomSelectOption}
              disabled
            >
              <option value="" disabled>
                옵션 선택
              </option>
              {(script?.buyStatus === 0 || script?.buyStatus === 2) &&
              script.script ? (
                <option value="script">대본</option>
              ) : null}
              {(script?.buyStatus === 0 || script?.buyStatus === 2) &&
              script.script &&
              script.performance ? (
                <option value="scriptPerform">대본 + 공연권</option>
              ) : null}
              {(script?.buyStatus === 1 || script?.buyStatus === 2) &&
              script.performance ? (
                <option value="perform">공연권</option>
              ) : null}
            </Select>
            {/* <button id="cart-btn">장바구니</button>*/}
            <button
              id="purchase-btn"
              onClick={onClickPurchase}
              disabled={!isOptionSelected}
            >
              구매하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
