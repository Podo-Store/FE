import { useState } from "react";

import ScriptContentPopup from "./ScriptContentPopUp.jsx";
import PriceText from "../price/PriceText.jsx";
import PriceTextsVertical from "../price/PriceTextsVertical.jsx";

import circleInfoBtn from "../../assets/image/button/circleInfoBtn.svg";

import "./ScriptContent.css";
import "./../../styles/utilities.css";

/**
 * 구매한 작품 페이지, 작품 관리 페이지의 상품 란,
 * @param {order} order - List.map(order, index)
 * @param {index} index - List.map(order, index)
 * @param {string} currentPage - 구매한 작품: "0", 작품 관리: "1"
 * @param {component} Button - 페이지에 사용할 Button component. e.g. PurchasedScriptBtn.jsx
 * @param {string} currentTogglePage - PurchasedScript의 토글 버튼. 대본: "0", 공연권: "1"
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

  const items = currentPage === "0" ? order.orders || [] : order.products || [];

  const [year, month, day] = order.date.split("-");
  const formattedDate = `${year}. ${month}. ${day}.`;

  return (
    <div key={index} className="script-content">
      <h3 id="date">{formattedDate}</h3>
      <hr></hr>
      {items.map((script) => (
        <div key={script.id}>
          <div className="script">
            <div
              className="script-thumbnail"
              style={{
                backgroundImage: `url(${script.imagePath || "default_image_url_here"})`,
              }}
            ></div>
            <div className="script-detail">
              <div className="script-tag">
                <div className="d-flex a-items-center" id="title">
                  <h3 id="title">{script.title || "제목 없음"}</h3>
                  {script.delete ? (
                    <img
                      id="title-info"
                      src={circleInfoBtn}
                      alt="circleInfoBtn"
                      onClick={() => {
                        setShowPopup(!showPopup);
                      }}
                    />
                  ) : null}
                  {showPopup ? <ScriptContentPopup onClose={() => setShowPopup(false)} /> : null}
                </div>
                <hr></hr>
                <h4>{!script.delete ? script.writer : "삭제된 계정"}</h4>
                {currentPage === "1" && !script.checked ? (
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
                  <PriceTextsVertical
                    scriptPrice={script.scriptPrice || 0}
                    performPrice={script.performancePrice || 0}
                  />
                )}
              </div>
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
                  />
                ) : (
                  // PurchasedPerformBtn.jsx
                  <Button id={script.id} title={script.title} />
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
