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

const Detail = ({
  title = "Archive",
  author = "서준",
  scriptPrice = 30000,
  performPrice = 30000,
}) => {
  let scriptPriceStr = scriptPrice.toLocaleString();
  let performPriceStr = performPrice.toLocaleString();

  const [bottomBarStyle, setBottomBarStyle] = useState({
    position: "fixed",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [totalPrice, setTotalPrice] = useState(" - ");

  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (selectedOption === "script") {
      setTotalPrice(scriptPriceStr);
    } else if (selectedOption === "scriptPerform") {
      setTotalPrice((scriptPrice + performPrice).toLocaleString());
    }
  }, [selectedOption]);

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

  return (
    <div className="detail">
      <MainNav />
      <div className="detail-wrap">
        <div className="detail-title-wrap">
          <div className="detail-thumbnail-wrap">
            <div
              className="thumbnail-img"
              style={{
                backgroundImage: `url(${typeWriterImg})`,
              }}
            ></div>
          </div>
          <div className="detail-title">
            <h1>
              {title}
              <br />
              {author}
            </h1>
            <div className="detail-price">
              <img src={scriptImg} alt="script image"></img>
              <p>대본 {scriptPriceStr} 원</p>
            </div>
            <div className="detail-price">
              <img src={performImg} alt="perform image"></img>
              <p>공연권 {performPriceStr} 원</p>
            </div>
            <h4>옵션 선택</h4>
            <select name="" id="option" value={selectedOption} onChange={handleSelectOption}>
              <option value="" disabled selected>
                옵션 선택
              </option>
              <option value="script">대본</option>
              <option value="scriptPerform">대본 & 공연권</option>
            </select>
            <div className="detail-btn-wrap">
              <button id="cart-btn">장바구니</button>
              <button id="purchase-btn">구매하기</button>
            </div>
          </div>
        </div>

        <div className="detail-description" ref={pdfContainerRef}>
          <hr></hr>

          {/* PDF 삽입 */}
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer fileUrl={samplePDF} />
          </Worker>
        </div>
      </div>
      <div className="detail-bottom-bar" style={bottomBarStyle}>
        <h6>총 금액</h6>
        <h3> {totalPrice} 원</h3>
        <select name="" id="option" value={selectedOption} onChange={handleSelectOption}>
          <option value="" disabled selected>
            옵션 선택
          </option>
          <option value="script">대본</option>
          <option value="scriptPerform">대본 & 공연권</option>
        </select>
        <button id="cart-btn">장바구니</button>
        <button id="purchase-btn">구매하기</button>
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default Detail;
