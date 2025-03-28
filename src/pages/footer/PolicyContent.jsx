import { useState } from "react";
import { Document, Page } from "react-pdf";

import FloatingBtn from "@/components/button/FloatingBtn";
import PartialLoading from "../../components/loading/PartialLoading";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import userInfoPolicy from "./../../assets/pdf/userInfoPolicy.pdf";
import termsOfService from "./../../assets/pdf/termsOfService.pdf";

import "./PolicyBar.scss";
import "./../../styles/utilities.css";

/**
 *
 * @param {*} props.page - 0: 개인정보 처리방침, 1: 이용약관
 * @returns
 */
const PolicyContent = ({ page = 0 }) => {
  const [numPages, setNumPages] = useState(null);
  const { width: windowWidth } = useWindowDimensions();

  // 창 크기가 768px 이상일 때 값
  let calculatedWidth = 686;

  if (windowWidth <= 767) {
    const vwWidth = windowWidth * 0.35833;
    calculatedWidth = Math.min(Math.max(vwWidth, 440), 688);
  } else if (windowWidth <= 480) {
    calculatedWidth = 440;
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="j-content-center min-height">
      <FloatingBtn />
      <div className="j-content-center" id="policy-box">
        <Document
          file={page === 0 ? userInfoPolicy : termsOfService}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{ cMapUrl: "cmaps/", cMapPacked: true }}
          loading={<PartialLoading />}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index} renderMode="canvas" pageNumber={index + 1} width={calculatedWidth} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PolicyContent;
