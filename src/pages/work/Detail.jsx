import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../Loading";

import AmountChange from "../../components/detail/AmountChange";
import Preview from "../../components/detail/Preview";
import PartialLoading from "../../components/loading/PartialLoading";
import InfoPopup from "../../components/popup/InfoPopup";
import Select from "../../components/select/Select";
import ThumbnailImg from "../../components/thumbnail/ThumbnailImg";

import { useRequest } from "../../hooks/useRequest";

import { formatPrice } from "../../utils/formatPrice";

import { DETAIL_SCRIPT_TEXT, DETAIL_PERFORM_TEXT } from "../../constants/PopupTexts/DetailTexts";
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

const Detail = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [plot, setPlot] = useState("");

  // 판매자가 설정한 대본, 공연권 판매 여부
  const [sellingScript, setSellingScript] = useState(false);
  const [sellingPerform, setSellingPerform] = useState(false);

  const [scriptPrice, setScriptPrice] = useState(0);
  const [performPrice, setPerformPrice] = useState(0);
  const [lengthType, setLengthType] = useState("");

  const [imagePath, setImagePath] = useState("");
  const [descriptionPath, setDescriptionPath] = useState("");

  // 기존 대본 구매 이력
  const [buyStatus, setBuyStatus] = useState(0);

  const [bottomBarStyle, setBottomBarStyle] = useState({
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

  const [numPages, setNumPages] = useState(null); // 페이지 수를 저장하는 상태 추가

  const { id } = useParams();
  const navigate = useNavigate();

  useRequest(async () => {
    try {
      setIsLoading(true);

      // 로그인 상태에 따른 헤더 설정
      let headers = { "Content-Type": "application/json" };
      if (Cookies.get("accessToken")) {
        headers = { ...headers, Authorization: `Bearer ${Cookies.get("accessToken")}` };
      }

      const response = await axios.get(`${SERVER_URL}scripts/detail`, {
        headers: headers,
        params: {
          script: id,
        },
      });

      setTitle(response.data.title);
      setAuthor(response.data.writer);
      setPlot(response.data.plot);
      // 판매자가 설정한 대본, 공연권 판매 여부
      setSellingScript(response.data.script);
      setSellingPerform(response.data.performance);
      setScriptPrice(response.data.scriptPrice ?? 0); // nullish 병합 연산자 사용
      setPerformPrice(response.data.performancePrice ?? 0); // nullish 병합 연산자 사용
      setLengthType(response.data.playType);
      setImagePath(response.data.imagePath);
      setDescriptionPath(response.data.descriptionPath);
      setBuyStatus(response.data.buyStatus);
    } catch (error) {
      alert("작품 정보를 불러오는데 실패했습니다.");
    }
    setIsLoading(false);
  });

  const onChangeSelectOption = (event) => {
    setSelectedOption(event.target.value);
    setIsOptionSelected(true);
  };

  const onChangeBottomSelectOption = (event) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onChangeSelectOption(event);
  };

  useEffect(() => {
    if (selectedOption === "script") {
      setTotalPrice(formatPrice(scriptPrice));
    } else if (selectedOption === "perform") {
      setTotalPrice(formatPrice(purchasePerformAmount * performPrice));
    } else if (selectedOption === "scriptPerform") {
      setTotalPrice(formatPrice(scriptPrice + purchasePerformAmount * performPrice));
    } else {
      setTotalPrice(" - ");
    }
  }, [selectedOption, scriptPrice, performPrice, purchasePerformAmount]);

  const pdfContainerRef = useRef(null);

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

  useEffect(() => {
    if (!numPages) return; // PDF가 로드되지 않았으면 스크롤 이벤트 중지

    const handleScroll = () => {
      const pdfContainer = pdfContainerRef.current;
      const bottomBar = document.querySelector(".detail-bottom-bar");

      if (pdfContainer && bottomBar) {
        const pdfContainerRect = pdfContainer.getBoundingClientRect();
        const bottomBarHeight = bottomBar.offsetHeight;

        if (pdfContainerRect.bottom <= window.innerHeight - bottomBarHeight) {
          setBottomBarStyle({
            position: "relative",
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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages); // PDF가 로드된 후 총 페이지 수 설정
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="detail">
      <div className="detail-wrap">
        <div className="content">
          <div className="detail-thumbnail-wrap">
            <ThumbnailImg
              style={{ width: "100%", height: "0", paddingBottom: "100%" }}
              imagePath={imagePath}
            />
          </div>
          <div className="detail-title f-dir-column j-content-between">
            <div className="title-wrap">
              <h1 className="h1-bold">{title}</h1>
              <h3 className="h3-bold">{author}</h3>
            </div>
          </div>
          <div className="detail-title f-dir-column j-content-between ">
            <hr id="detail-hr-1"></hr>
            <div className="detail-price-wrap">
              <div className="detail-plot">
                <p className="p-medium-regular">{plot}</p>
              </div>
              <hr id="detail-hr-2"></hr>

              <div className="detail-price">
                <div className="price">
                  <img id="script" src={scriptImg} alt="script"></img>
                  <p style={{ marginLeft: "0.2rem" }}>대본</p>
                </div>
                <p className="p-large-medium">{formatPrice(scriptPrice)} 원</p>
              </div>
              <div className="detail-price">
                <div className="price">
                  <img id="perform" src={performImg} alt="perform"></img>
                  <p>공연권</p>
                </div>
                <p className="p-large-medium">{formatPrice(performPrice)} 원</p>
              </div>

              <div className="option-select">
                <Select value={selectedOption} onChange={onChangeSelectOption}>
                  <option value="" disabled selected>
                    옵션 선택
                  </option>
                  {(buyStatus === 0 || buyStatus === 2) && sellingScript ? (
                    <option value="script">대본</option>
                  ) : null}
                  {(buyStatus === 0 || buyStatus === 2) && sellingScript && sellingPerform ? (
                    <option value="scriptPerform">대본 + 공연권</option>
                  ) : null}
                  {(buyStatus === 1 || buyStatus === 2) && sellingPerform ? (
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
                            selectedOption === "perform" ? DETAIL_PERFORM_TEXT : DETAIL_SCRIPT_TEXT
                          }
                          onClose={() => {
                            setShowPopup(!showPopup);
                          }}
                          style={{
                            padding: "11px",
                            transform: "translate(35px, calc(-100% + 19px))",
                          }}
                          buttonId="info-btn"
                          message2={selectedOption === "scriptPerform" && DETAIL_PERFORM_TEXT}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div id="detail-amount-wrap">
                    {selectedOption === "script" || selectedOption === "scriptPerform" ? (
                      <div className="j-content-between" id="detail-amount">
                        <div className="a-items-center" id="detail-amount-title">
                          <img src={vector23} alt="ㄴ"></img>
                          <img id="script" src={scriptImg} alt="script amount"></img>
                          <p className="p-large-medium">대본</p>
                        </div>
                        <div className="a-items-center" id="detail-amount-price">
                          <p className="p-large-medium">1</p>
                          <div className="a-items-center" style={{ gap: "39px" }}>
                            <p className="p-large-medium" id="price">
                              {formatPrice(scriptPrice)} 원
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

                    {selectedOption === "scriptPerform" ? <hr id="detail-hr-3"></hr> : null}

                    {selectedOption === "perform" || selectedOption === "scriptPerform" ? (
                      <div className="j-content-between" id="detail-amount">
                        <div className="a-items-center" id="detail-amount-title">
                          <img src={vector23} alt="ㄴ"></img>
                          <img id="perform" src={performImg} alt="perform amount"></img>
                          <p className="p-large-medium">공연권</p>
                        </div>

                        <div className="a-items-center t-align-center" id="detail-amount-price">
                          <AmountChange
                            purchasePerformAmount={purchasePerformAmount}
                            setPurchasePerformAmount={setPurchasePerformAmount}
                          />
                          <div className="a-items-center" style={{ gap: "39px" }}>
                            <p className="p-large-medium" id="price">
                              {formatPrice(purchasePerformAmount * performPrice)} 원
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
                <button id="purchase-btn" onClick={onClickPurchase} disabled={!isOptionSelected}>
                  구매하기
                </button>
              </div>
            </div>
            <hr id="detail-hr-1" />
          </div>
        </div>

        <div className="detail-description" ref={pdfContainerRef}>
          <hr></hr>
          <p className="p-large-bold" id="preview-title">
            미리보기
          </p>
          <Preview id={id} lengthType={lengthType} />
          <hr></hr>

          <div className="j-content-center">
            {/* PDF 삽입 */}
            <Document
              file={descriptionPath}
              onLoadSuccess={onDocumentLoadSuccess}
              options={{ cMapUrl: "cmaps/", cMapPacked: true }}
              loading={<PartialLoading />}
              noData=""
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={index} renderMode="canvas" pageNumber={index + 1} width={1000} />
              ))}
            </Document>
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
            <select
              name=""
              id="option"
              value={selectedOption}
              onChange={onChangeBottomSelectOption}
            >
              <option value="" disabled selected>
                옵션 선택
              </option>
              {(buyStatus === 0 || buyStatus === 2) && sellingScript ? (
                <option value="script">대본</option>
              ) : null}
              {(buyStatus === 0 || buyStatus === 2) && sellingScript && sellingPerform ? (
                <option value="scriptPerform">대본 + 공연권</option>
              ) : null}
              {(buyStatus === 1 || buyStatus === 2) && sellingPerform ? (
                <option value="perform">공연권</option>
              ) : null}
            </select>
            {/* <button id="cart-btn">장바구니</button>*/}
            <button id="purchase-btn" onClick={onClickPurchase} disabled={!isOptionSelected}>
              구매하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
