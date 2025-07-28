// components/PreviewSingle.tsx
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PartialLoading from "../../loading/PartialLoading";
import leftArrow from "@/assets/image/button/arrow/ic_black_left_arrow.svg";
import rightArrow from "@/assets/image/button/arrow/ic_black_right_arrow.svg";
import Modal from "./Modal";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PreviewSingleProps {
  fileBlobUrl: string;
  width: number;
  totalPages: number;
  showThreshold: number;
  selectedPage: number | null;
  setSelectedPage: React.Dispatch<React.SetStateAction<number | null>>;
}

const PreviewSingle: React.FC<PreviewSingleProps> = ({
  fileBlobUrl,
  width,
  totalPages,
  showThreshold,
  selectedPage,
  setSelectedPage,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => {
    if (numPages !== null) {
      setCurrentPage((p) => Math.min(p + 1, numPages + 1));
    }
  };

  // Overlay 상태: 실제 페이지 수 + 1일 때
  const isOverlay = numPages !== null && currentPage === numPages + 1;
  // Overlay에 보여줄 실제 마지막 페이지 번호
  const overlayPageNum = numPages || 1;
  // Overlay 텍스트: 남은 페이지 수
  const remainingCount = numPages !== null ? totalPages - showThreshold : 0;

  return (
    <div className="single-page-preview">
      {fileBlobUrl ? (
        <Document
          file={fileBlobUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<PartialLoading />}
        >
          {numPages && (
            <div className="pagination-container flex items-center gap-[10px]">
              <button
                onClick={goPrev}
                disabled={currentPage <= 1}
                className="arrow-btn disabled:opacity-0"
              >
                <img src={leftArrow} alt="Previous page" />
              </button>

              <div
                className="page-wrapper relative c-pointer"
                onClick={() => {
                  if (!isOverlay) {
                    setSelectedPage(currentPage);
                  }
                }}
              >
                {!isOverlay ? (
                  <Page
                    pageNumber={currentPage}
                    width={width}
                    loading={<PartialLoading />}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ) : (
                  <>
                    <Page
                      pageNumber={overlayPageNum}
                      width={width}
                      loading={<PartialLoading />}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                    <div
                      id="shadow-box"
                      className="absolute top-[0] size-full bg-[#000] opacity-30 z-10"
                    />
                    <p
                      id="last-number"
                      className="absolute inset-0 flex items-center justify-center p-large-regular text-[#fff] z-20"
                    >
                      {remainingCount} +
                    </p>
                  </>
                )}
              </div>

              {/* NEXT → 버튼 */}
              <button
                onClick={goNext}
                disabled={numPages !== null && currentPage >= numPages + 1}
                className="arrow-btn disabled:opacity-0"
              >
                <img src={rightArrow} alt="Next page" />
              </button>
            </div>
          )}

          {selectedPage && (
            <Modal
              Page={Page}
              showThreshold={showThreshold}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          )}
        </Document>
      ) : (
        <p>PDF 파일을 로드할 수 없습니다.</p>
      )}
    </div>
  );
};

export default PreviewSingle;
