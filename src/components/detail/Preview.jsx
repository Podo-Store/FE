import axios from "axios";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

//import Modal from "./Modal";
import PreviewDiv from "./PreviewDiv";
import PartialLoading from "../loading/PartialLoading";

import { useRequest } from "../../hooks/useRequest";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { SERVER_URL } from "../../constants/ServerURL";

import samplePDF from "./../../assets/sample.pdf";
import previewGlass from "./../../assets/image/glass.svg";

import "./Preview.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

// THX TO 'pxFIN' (https://github.com/wojtekmaj/react-pdf/issues/321)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/**
 * @param {object} props
 * @param {string} props.id - 대본 id
 * @param {string} props.lengthType - LONG: 장편극, SHORT: 단편극
 */
const Preview = ({ id, lengthType }) => {
  const [pdfData, setPdfData] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [totalPage, setTotalPage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const previousPdfDataRef = useRef(null);
  const { width } = useWindowDimensions();

  // 단편극: 1장까지만, 장편극: 3장까지만
  const showThreshold = lengthType === "SHORT" ? 1 : 3;

  // for Responsive design
  const totalRevealedPages = width > 1280 ? 5 : width > 768 ? 3 : 2;

  useRequest(async () => {
    try {
      setIsLoading(true);

      // 로그인 상태에 따른 헤더 설정
      let headers = { "Content-Type": "application/json" };
      if (Cookies.get("accessToken")) {
        headers = {
          ...headers,
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        };
      }
      const response = await axios.get(`${SERVER_URL}scripts/preview`, {
        headers: headers,
        params: {
          script: id,
        },
        responseType: "blob",
      });

      // 총 페이지 매수
      setTotalPage(response.headers["x-total-pages"]);

      // 이전 Blob URL 해제
      if (previousPdfDataRef.current) {
        URL.revokeObjectURL(previousPdfDataRef.current);
      }

      // Blob URL 생성
      const blob = new Blob([response.data], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);
      setPdfData(blobUrl);
      previousPdfDataRef.current = blobUrl;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }

    // 컴포넌트 언마운트 시 Blob URL 해제
    return () => {
      if (previousPdfDataRef.current) {
        URL.revokeObjectURL(previousPdfDataRef.current);
      }
    };
  });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onClickPage = (pageNumber) => {
    setSelectedPage(pageNumber);
  };

  if (isLoading) {
    return <PartialLoading />;
  }

  return (
    <div className="preview flex flex-col items-center">
      {pdfData ? (
        <Document
          file={pdfData || samplePDF}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{ cMapUrl: "cmaps/", cMapPacked: true }}
          loading={<PartialLoading />}
        >
          {/* 썸네일로 상위 5개 페이지 표시 */}
          {/* showThreshold까지만 pdf를 가져옴, 이후 페이지는 마지막 페이지를 복사하도록*/}
          {numPages && (
            <div className="j-content-start" id="wrap">
              {Array.from(
                new Array(Math.min(totalPage, totalRevealedPages)),
                (_, index) => {
                  const isShort = lengthType === "SHORT";

                  let isPageAvailable = true;
                  if (lengthType === "SHORT") {
                    // 첫 페이지만 렌더링
                    isPageAvailable = index + 1 === showThreshold;
                  } else {
                    if (width > 1280) {
                      isPageAvailable = index + 1 <= showThreshold;
                    } else {
                      isPageAvailable = index + 1 < totalRevealedPages;
                    }
                  }

                  return (
                    <div
                      key={index + 1}
                      className={`c-pointer no-drag ${
                        !isPageAvailable ? "content-disabled" : ""
                      }`}
                      id="thumbnail-content"
                      onClick={() => {
                        if (isPageAvailable) {
                          onClickPage(isShort ? showThreshold : index + 1);
                        }
                      }}
                    >
                      {!isPageAvailable && <div id="shadow-box"></div>}
                      <div id={!isPageAvailable ? "blur" : undefined}>
                        <Page
                          renderMode="canvas"
                          pageNumber={
                            isShort
                              ? showThreshold
                              : isPageAvailable
                              ? index + 1
                              : showThreshold
                          }
                          width={210}
                        />
                      </div>
                      <p
                        className="p-small-regular t-align-center"
                        id="page-number"
                      >
                        {index + 1}
                      </p>
                      {index + 1 === totalRevealedPages && (
                        <p className="p-large-regular c-white" id="last-number">
                          {totalPage - totalRevealedPages} +
                        </p>
                      )}
                      {isPageAvailable && (
                        <img
                          src={previewGlass}
                          alt="Preview Glass"
                          id="preview-glass"
                        />
                      )}
                    </div>
                  );
                }
              )}
            </div>
          )}

          {selectedPage && (
            <PreviewDiv
              Page={Page}
              showThreshold={showThreshold}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              numPages={numPages}
              lengthType={lengthType}
            />
          )}
        </Document>
      ) : (
        <p>PDF 파일을 로드할 수 없습니다.</p>
      )}
    </div>
  );
};

export default Preview;
