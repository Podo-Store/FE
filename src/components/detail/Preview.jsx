import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import Modal from "./Modal";
import PreviewDiv from "./PreviewDiv";
import PartialLoading from "../loading/PartialLoading";

import samplePDF from "./../../assets/sample.pdf";

import "./Preview.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

// THX TO 'pxFIN' (https://github.com/wojtekmaj/react-pdf/issues/321)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/**
 * @param {object} props
 * @param {string} props.pdf - PDF 파일 경로
 * @param {number} props.lengthType - 1: 장편극, 2: 단편극
 */
const Preview = ({ pdf, lengthType, testFlag }) => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [numPages, setNumPages] = useState(null);

  // 단편극: 1장까지만, 장편극: 3장까지만
  const showThreshold = lengthType === 2 ? 1 : 3;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onClickPage = (pageNumber) => {
    setSelectedPage(pageNumber);
  };

  return (
    <div className="preview">
      {pdf ? (
        <Document
          file={pdf || samplePDF}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{ cMapUrl: "cmaps/", cMapPacked: true }}
          loading={<PartialLoading />}
        >
          {/* 썸네일로 상위 5개 페이지 표시 */}
          {numPages && (
            <div className="j-content-between">
              {Array.from(new Array(Math.min(numPages, 5)), (_, index) => (
                <div
                  key={index + 1}
                  className={
                    `c-pointer no-drag` + (index + 1 > showThreshold ? " content-disabled" : "")
                  }
                  id="thumbnail-content"
                  onClick={() => {
                    if (index + 1 <= showThreshold) {
                      onClickPage(index + 1);
                    }
                  }}
                >
                  {index + 1 > showThreshold ? <div id="shadow-box"></div> : null}
                  <div id={index + 1 > showThreshold ? "blur" : null}>
                    <Page renderMode="canvas" pageNumber={index + 1} width={200} />
                  </div>
                  <p className="p-small-regular t-align-center" id="page-number">
                    {index + 1}
                  </p>
                  {index + 1 === 5 && numPages > 5 ? (
                    <p className="p-large-regular c-white" id="last-number">
                      {numPages - 5} +
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          {selectedPage &&
            (testFlag === 0 ? (
              // modal로 선택한 페이지 보여주기
              <Modal
                Page={Page}
                showThreshold={showThreshold}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            ) : (
              // modal 대신 div로 선택한 페이지 보여주기
              <PreviewDiv
                Page={Page}
                showThreshold={showThreshold}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            ))}
        </Document>
      ) : (
        <p>PDF 파일을 로드할 수 없습니다.</p>
      )}
      <hr id="selected-page-hr" />
    </div>
  );
};

export default Preview;
