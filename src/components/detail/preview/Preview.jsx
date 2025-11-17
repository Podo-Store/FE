import { api } from "@/api/api";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import Modal from "./Modal";
import PreviewDiv from "./PreviewDiv";
import PartialLoading from "../../loading/PartialLoading";

import { useRequest } from "@/hooks/useRequest";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { SERVER_URL } from "@/constants/ServerURL";

import previewGlass from "@/assets/image/glass.svg";

import "./Preview.css";
import "@/styles/text.css";
import "@/styles/utilities.css";
import PreviewSingle from "./PreviewSingle";

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
  const [numPages, setNumPages] = useState(null); // fetch된 전체 페이지 (2장, 4장)
  const [totalPages, setTotalPages] = useState(null); // 실제 전체 페이지

  const [isLoading, setIsLoading] = useState(false);

  const previousPdfDataRef = useRef(null);
  const { width } = useWindowDimensions();
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  // 단편극: 2장까지만, 장편극: 4장까지만
  const showThreshold = lengthType === "SHORT" ? 2 : 4;

  // for Responsive design
  const totalRevealedPages =
    width >= 1280 ? 5 : width >= 768 ? 3 : !isSmallMobile ? 2 : 1;

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
      const response = await api.get(`/scripts/preview`, {
        headers: headers,
        params: {
          script: id,
        },
        responseType: "blob",
      });

      // 총 페이지 매수
      setTotalPages(response.headers["x-total-pages"]);

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
    <div className="m-auto f-dir-column preview w-fit">
      {pdfData ? (
        isSmallMobile ? (
          // 모바일: 한 페이지씩
          <PreviewSingle
            fileBlobUrl={pdfData}
            width={210}
            totalPages={totalPages}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            showThreshold={showThreshold}
          />
        ) : (
          <Document
            file={pdfData}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{ cMapUrl: "cmaps/", cMapPacked: true }}
            loading={<PartialLoading />}
          >
            {/* 썸네일로 상위 5개 페이지 표시 */}
            {/* showThreshold까지만 pdf를 가져옴, 이후 페이지는 마지막 페이지를 복사하도록*/}
            {numPages && (
              <div
                className="flex flex-row gap-[20px] j-content-start"
                id="wrap"
              >
                {Array.from(
                  new Array(Math.min(totalPages, totalRevealedPages)),
                  (_, index) => {
                    const isShort = lengthType === "SHORT";

                    let isPageAvailable = true;
                    if (lengthType === "SHORT") {
                      // showThreshold까지의 모든 페이지 활성화
                      isPageAvailable = index + 1 <= showThreshold;
                    } else {
                      // lengthType === "LONG"
                      if (width >= 1280) {
                        isPageAvailable = index + 1 <= showThreshold;
                      } else if (!isSmallMobile) {
                        isPageAvailable = index + 1 < totalRevealedPages;
                      } else {
                        isPageAvailable = 1;
                      }
                    }

                    return (
                      <div
                        key={index + 1}
                        className={` c-pointer no-drag ${
                          !isPageAvailable ? "content-disabled" : ""
                        }`}
                        id="thumbnail-content"
                        onClick={() => {
                          if (isPageAvailable) {
                            onClickPage(
                              isShort
                                ? Math.min(index + 1, showThreshold)
                                : index + 1
                            );
                          }
                        }}
                      >
                        {!isPageAvailable && <div id="shadow-box"></div>}
                        <div id={!isPageAvailable ? "blur" : undefined}>
                          <Page
                            renderMode="canvas"
                            pageNumber={
                              isPageAvailable ? index + 1 : showThreshold
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
                          <p
                            className="p-large-regular c-white"
                            id="last-number"
                          >
                            {totalPages - totalRevealedPages} +
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
                totalPages={totalPages}
                lengthType={lengthType}
              />
            )}
          </Document>
        )
      ) : (
        <p>PDF 파일을 로드할 수 없습니다.</p>
      )}
    </div>
  );
};

export default Preview;
