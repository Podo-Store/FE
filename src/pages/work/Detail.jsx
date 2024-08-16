import { useEffect, useState, useRef } from "react";
import Footer from "../Footer";
import MainNav from "../MainNav";
import typeWriterImg from "./../../assets/image/post/vintageTypeWriter.svg";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import "./Detail.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import samplePDF from "./../../assets/sample.pdf";
import { SERVER_URL } from "../../constants/ServerURL";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { useRequest } from "../../hooks/useRequest";

const Detail = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [sellingScript, setSellingScript] = useState(false);
  const [sellingPerform, setSellingPerform] = useState(false);

  const [scriptPrice, setScriptPrice] = useState(0);
  const [performPrice, setPerformPrice] = useState(0);
  const [lengthType, setLengthType] = useState("");

  const [imagePath, setImagePath] = useState("");
  const [descriptionPath, setDescriptionPath] = useState("");

  // 기존 대본 구매 이력
  const [hasBoughtScript, setHasBoughtScript] = useState(false);

  const [bottomBarStyle, setBottomBarStyle] = useState({
    position: "fixed",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [totalPrice, setTotalPrice] = useState(" - ");

  const navigate = useNavigate();
  const { id } = useParams();

  useRequest(async () => {
    try {
      let response;
      // 로그아웃 상태
      if (!Cookies.get("accessToken")) {
        response = await axios.get(`${SERVER_URL}scripts/detail`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            script: id,
          },
        });
      } else {
        // 로그인 상태
        response = await axios.get(`${SERVER_URL}scripts/detail`, {
          headers: {
            "Content-Type": "multipart/form-data",
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
      setLengthType(response.data.playType === 1 ? "장편극" : "단편극");
      setImagePath(response.data.imagePath);
      setDescriptionPath(response.data.descriptionPath);
      setHasBoughtScript(response.data.buyScript);
    } catch (error) {
      alert("작품 정보를 불러오는데 실패했습니다.");
    }
  });

  const handleSelectOption = (event) => {
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
    const handleScroll = () => {
      const pdfContainer = pdfContainerRef.current;
      const bottomBar = document.querySelector(".detail-bottom-bar");

      if (pdfContainer && bottomBar) {
        const pdfContainerRect = pdfContainer.getBoundingClientRect();
        const bottomBarHeight = bottomBar.offsetHeight;

        // PDF의 끝이 화면에 나타나면 bottom-bar 위치 변경
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
  }, []);

  const handlePurchaseBtnClick = () => {
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

  return (
    <div className="detail">
      <MainNav />
      <div className="detail-wrap">
        <div className="detail-title-wrap">
          <div className="detail-thumbnail-wrap">
            <div
              className="thumbnail-img"
              style={{
                backgroundImage: `url(${imagePath ? imagePath : typeWriterImg})`,
              }}
            ></div>
          </div>
          <div className="detail-title">
            <p># {lengthType}</p>
            <h1>
              {title}
              <br />
              {author}
            </h1>
            <div className="detail-price">
              <img src={scriptImg} alt="script"></img>
              <p>대본 {formatPrice(scriptPrice)} 원</p>
            </div>
            <div className="detail-price">
              <img src={performImg} alt="perform"></img>
              <p>공연권 {formatPrice(performPrice)} 원</p>
            </div>
            <div className="option-select">
              <h4>옵션 선택</h4>
              <select name="" id="option" value={selectedOption} onChange={handleSelectOption}>
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
              </select>
            </div>
            <div className="total-price">
              <h5>총 금액</h5>
              <h5> {totalPrice} 원</h5>
            </div>
            <div className="detail-btn-wrap">
              {/*<button id="cart-btn">장바구니</button>*/}
              <button
                id="purchase-btn"
                onClick={handlePurchaseBtnClick}
                disabled={!isOptionSelected}
              >
                구매하기
              </button>
            </div>
          </div>
        </div>

        <div className="detail-description" ref={pdfContainerRef}>
          <hr></hr>

          {/* PDF 삽입 */}
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            {descriptionPath ? (
              <Viewer fileUrl={descriptionPath} />
            ) : (
              <div>
                <p>설명 로딩중... (하단은 샘플 PDF입니다)</p> <Viewer fileUrl={samplePDF} />
              </div>
            )}
          </Worker>
        </div>
      </div>
      <div className="detail-bottom-bar" style={bottomBarStyle}>
        <h6>총 금액</h6>
        <h3>{totalPrice} 원</h3>
        <select name="" id="option" value={selectedOption} onChange={handleSelectOption}>
          <option value="" disabled selected>
            옵션 선택
          </option>
          {!hasBoughtScript ? <option value="script">대본</option> : null}
          {!hasBoughtScript ? <option value="scriptPerform">대본 & 공연권</option> : null}
          {hasBoughtScript ? <option value="perform">공연권 구매</option> : null}
        </select>
        {/* <button id="cart-btn">장바구니</button>*/}
        <button id="purchase-btn" onClick={handlePurchaseBtnClick} disabled={!isOptionSelected}>
          구매하기
        </button>
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default Detail;
