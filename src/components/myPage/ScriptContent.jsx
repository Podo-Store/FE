import { useState } from "react";

import ScriptContentPopup from "./ScriptContentPopUp.jsx";
import ScriptManageTopBtn from "./ScriptManageTopBtn.jsx";
import PriceText from "../price/PriceText.jsx";
import PriceTextsVertical from "../price/PriceTextsVertical.jsx";
import ThumbnailImg from "../thumbnail/ThumbnailImg.jsx";

import circleInfoBtn from "../../assets/image/button/circleInfoBtn.svg";

import "./ScriptContent.scss";
import "./../../styles/utilities.css";

/**
 * 구매한 작품 페이지, 작품 관리 페이지의 상품 란,
 * @param {Object} props - Component properties
 * @param {order} props.order - List.map(order, index)
 * @param {index} props.index - List.map(order, index)
 * @param {string} props.currentPage - 구매한 작품: "0", 작품 관리: "1"
 * @param {component} props.Button - 페이지에 사용할 Button component. e.g. PurchasedScriptBtn.jsx
 * @param {string} props.currentTogglePage - PurchasedScript의 토글 버튼. 대본: "0", 공연권: "1"
 */
const ScriptContent = ({
  order,
  index,
  currentPage = "0",
  Button,
  // currentTogglePage: PurchasedScript에서 대본, 공연권 토글 여부
  currentTogglePage = "0",
}) => {
  // 삭제된 작가 info 팝업
  const [showPopup, setShowPopup] = useState(false);

  const items = currentPage === "0" ? order.orders || [] : order.works || [];

  const [year, month, day] = order.date.split("-");
  const formattedDate = `${year}. ${month}. ${day}.`;

  return (
    <div key={index} className="script-content">
      <p className="date p-large-bold c-grey-8f8f8f">{formattedDate}</p>
      <hr></hr>
      {items.map((script) => (
        <div key={script.id}>
          <div className="script">
            <div className="thumbnail-img-wrap">
              <ThumbnailImg imagePath={script.imagePath}></ThumbnailImg>
            </div>
            <div className="script-tag">
              <div
                className={`a-items-center ${
                  currentPage === "1" && script.checked === "PASS" ? "j-content-between" : ""
                }`}
                id="title"
              >
                <p className="p-large-bold" id="title">
                  {script.title || "제목 없음"}
                </p>
                {script.delete && (
                  <img
                    id="title-info"
                    src={circleInfoBtn}
                    alt="circleInfoBtn"
                    onClick={() => {
                      setShowPopup(!showPopup);
                    }}
                  />
                )}
                {showPopup ? <ScriptContentPopup onClose={() => setShowPopup(false)} /> : null}
                {/* 작품 관리 페이지 상단 버튼: 심사 끝났을 경우 표시 */}
                {currentPage === "1" && script.checked === "PASS" ? (
                  <ScriptManageTopBtn script={script} />
                ) : null}
              </div>
              <hr></hr>
              <p className="p-large-medium" id="author">
                {currentPage === "1" ? "" : !script.delete ? script.writer : "삭제된 계정"}
              </p>
              {currentPage === "1" && script.checked === "WAIT" ? (
                // 작품 관리 페이지에서 심사 중인 작품일 경우
                <div className="margin-43_4px"></div>
              ) : currentPage === "0" ? (
                // 구매한 작품 페이지
                currentTogglePage === "0" ? (
                  // 구매한 작품 페이지에서 토글 선택이 '대본'일 경우
                  <PriceText type="script" value={script.scriptPrice || 0} />
                ) : currentTogglePage === "1" ? (
                  // 구매한 작품 페이지에서 토글 선택이 '공연권'일 경우
                  <PriceText type="perform" value={script.performancePrice || 0} />
                ) : null
              ) : (
                // 작품 관리 페이지
                <PriceTextsVertical
                  scriptPrice={script.scriptPrice || 0}
                  performPrice={script.performancePrice || 0}
                />
              )}
              {/* (모바일 화면) 작품 관리 페이지 상단 버튼: 심사 끝났을 경우 표시 */}
              {currentPage === "1" && script.checked === "PASS" ? (
                <ScriptManageTopBtn className="mobile" script={script} />
              ) : null}
            </div>
            <div className="__script-content-btn">
              {/* Button: props */}
              {currentPage === "0" && !script.delete ? (
                // 구매한 작품 페이지 (PurchasedScript.jsx)
                currentTogglePage === "0" ? (
                  // PurchasedScriptBtn.jsx
                  <Button
                    purchaseStatus={[script.script, script.performance]}
                    id={script.id}
                    title={script.title}
                    productId={script.productId}
                    buyPerformance={script.buyPerformance}
                    orderStatus={script.orderStatus}
                  />
                ) : (
                  // PurchasedPerformBtn.jsx
                  <Button
                    id={script.id}
                    possibleCount={script.possibleCount}
                    orderStatus={script.orderStatus}
                  />
                )
              ) : currentPage === "1" && !script.delete ? (
                // 작품 관리 페이지 ScriptManageBtn.jsx
                // checked - false: 심사 중, true: 심사 완료
                <Button
                  reviewCompleted={script.checked}
                  scriptSale={script.script}
                  performSale={script.performance}
                  id={script.id}
                />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScriptContent;
