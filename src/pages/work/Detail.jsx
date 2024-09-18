import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import Loading from "../Loading";
import Preview from "../../components/detail/Preview";
import Select from "../../components/select/Select";

import { useRequest } from "../../hooks/useRequest";

import { formatPrice } from "../../utils/formatPrice";

import { SERVER_URL } from "../../constants/ServerURL";

import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import typeWriterImg from "./../../assets/image/post/vintageTypeWriter.svg";
import samplePDF from "./../../assets/sample.pdf";

import "./Detail.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

// THX TO 'pxFIN' (https://github.com/wojtekmaj/react-pdf/issues/321)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Detail = ({ testFlag = 1 }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [sellingScript, setSellingScript] = useState(false);
  const [sellingPerform, setSellingPerform] = useState(false);

  const [scriptPrice, setScriptPrice] = useState(0);
  const [performPrice, setPerformPrice] = useState(0);
  const [lengthType, setLengthType] = useState("");

  const [imagePath, setImagePath] = useState("");
  const [filePath, setFilePath] = useState("");
  const [descriptionPath, setDescriptionPath] = useState("");

  // 기존 대본 구매 이력
  const [hasBoughtScript, setHasBoughtScript] = useState(false);

  const [bottomBarStyle, setBottomBarStyle] = useState({
    position: "fixed",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [totalPrice, setTotalPrice] = useState(" - ");

  const [isLoading, setIsLoading] = useState(false);

  // 스크롤 시 bottom-bar visibility 변경
  const [isDetailBtnVisible, setIsDetailBtnVisible] = useState(false);
  const detailBtnWrapRef = useRef(null);

  const [numPages, setNumPages] = useState(null); // 페이지 수를 저장하는 상태 추가

  const navigate = useNavigate();
  const { id } = useParams();

  useRequest(async () => {
    try {
      setIsLoading(true);
      let response;
      // 로그아웃 상태
      if (!Cookies.get("accessToken")) {
        response = await axios.get(`${SERVER_URL}scripts/detail`, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            script: id,
          },
        });
      } else {
        // 로그인 상태
        response = await axios.get(`${SERVER_URL}scripts/detail`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          params: {
            script: id,
          },
        });
      }

      setTitle(response.data.title);
      setAuthor(response.data.writer);
      setSellingScript(response.data.script);
      setSellingPerform(response.data.performance);
      setScriptPrice(response.data.scriptPrice ?? 0); // nullish 병합 연산자 사용
      setPerformPrice(response.data.performancePrice ?? 0); // nullish 병합 연산자 사용
      setLengthType(response.data.playType);
      setImagePath(response.data.imagePath);
      setFilePath(response.data.filePath);
      setDescriptionPath(response.data.descriptionPath);
      setHasBoughtScript(response.data.buyScript);
    } catch (error) {
      alert("작품 정보를 불러오는데 실패했습니다.");
    }
    setIsLoading(false);
  });

  const onChangeSelectOption = (event) => {
    setSelectedOption(event.target.value);
    setIsOptionSelected(true);
  };

  useEffect(() => {
    if (selectedOption === "script") {
      setTotalPrice(formatPrice(scriptPrice));
    } else if (selectedOption === "scriptPerform") {
      setTotalPrice(formatPrice(scriptPrice + performPrice));
    }
  }, [selectedOption, scriptPrice, performPrice]);

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
      <MainNav />
      <div className="f-dir-column a-items-center detail-wrap">
        <div className="d-flex">
          <div className="detail-thumbnail-wrap">
            <div
              className="thumbnail-img"
              style={{
                backgroundImage: `url(${imagePath ? imagePath : typeWriterImg})`,
              }}
            ></div>
          </div>
          <div className="detail-title">
            <div>
              <p># {lengthType === 2 ? "단편극" : "장편극"}</p>
              <h1>
                {title}
                <br />
                {author}
              </h1>
            </div>
            <div>
              <div className="detail-price">
                <div className="price">
                  <img id="script" src={scriptImg} alt="script"></img>
                  <p style={{ marginLeft: "0.2rem" }}>대본 {formatPrice(scriptPrice)} 원</p>
                </div>
              </div>
              <div className="detail-price">
                <div className="price">
                  <img id="perform" src={performImg} alt="perform"></img>
                  <p>공연권 {formatPrice(performPrice)} 원</p>
                </div>
              </div>
              <div className="option-select">
                <h4>옵션 선택</h4>
                <Select value={selectedOption} onChange={onChangeSelectOption}>
                  <option value="" disabled selected>
                    옵션 선택
                  </option>
                  {!hasBoughtScript && sellingScript ? <option value="script">대본</option> : null}
                  {!hasBoughtScript && sellingScript && sellingPerform ? (
                    <option value="scriptPerform">대본 & 공연권</option>
                  ) : null}
                  {hasBoughtScript && sellingPerform ? (
                    <option value="perform">공연권 구매</option>
                  ) : null}
                </Select>
              </div>
              <div className="total-price">
                <h5>총 금액</h5>
                <h5> {totalPrice} 원</h5>
              </div>
              <div className="detail-btn-wrap" ref={detailBtnWrapRef}>
                {/*<button id="cart-btn">장바구니</button>*/}
                <button id="purchase-btn" onClick={onClickPurchase} disabled={!isOptionSelected}>
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-description" ref={pdfContainerRef}>
          <hr></hr>
          <p className="p-large-bold" id="preview-title">
            미리보기
          </p>
          <Preview pdf={filePath} lengthType={lengthType} testFlag={testFlag} />

          <div className="j-content-center">
            {/* PDF 삽입 */}
            <Document
              file={descriptionPath || samplePDF}
              onLoadSuccess={onDocumentLoadSuccess}
              options={{ cMapUrl: "cmaps/", cMapPacked: true }}
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
            <h6>총 금액</h6>
            <h3>{totalPrice} 원</h3>
          </div>
          <div className="bottom-bar-right">
            <select name="" id="option" value={selectedOption} onChange={onChangeSelectOption}>
              <option value="" disabled selected>
                옵션 선택
              </option>
              {!hasBoughtScript ? <option value="script">대본</option> : null}
              {!hasBoughtScript ? <option value="scriptPerform">대본 & 공연권</option> : null}
              {hasBoughtScript ? <option value="perform">공연권 구매</option> : null}
            </select>
            {/* <button id="cart-btn">장바구니</button>*/}
            <button id="purchase-btn" onClick={onClickPurchase} disabled={!isOptionSelected}>
              구매하기
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Detail;
