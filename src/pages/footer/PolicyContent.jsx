import { useState } from "react";
import { Document, Page } from "react-pdf";

import PartialLoading from "../../components/loading/PartialLoading";

import userInfoPolicy from "./../../assets/pdf/userInfoPolicy.pdf";
import termsOfService from "./../../assets/pdf/termsOfService.pdf";

import "./PolicyBar.css";
import "./../../styles/utilities.css";

/**
 *
 * @param {*} props.page - 0: 개인정보 처리방침, 1: 이용약관
 * @returns
 */
const PolicyContent = ({ page = 0 }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages); // PDF가 로드된 후 총 페이지 수 설정
  };

  return (
    <div className="j-content-center min-height">
      <div className="j-content-center" id="policy-box">
        <Document
          file={page === 0 ? userInfoPolicy : termsOfService}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{ cMapUrl: "cmaps/", cMapPacked: true }}
          loading={<PartialLoading />}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index} renderMode="canvas" pageNumber={index + 1} width={686} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PolicyContent;
