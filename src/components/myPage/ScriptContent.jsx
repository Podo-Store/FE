import { useState } from "react";

import PurchasedPerformPossibleInfo from "./PurchasedPerformPossibleInfo.jsx";
import ScriptContentPopup from "./ScriptContentPopUp.jsx";
import ScriptManageTopBtn from "./ScriptManageTopBtn.jsx";
import PriceText from "../price/PriceText.jsx";
import PriceTextsVertical from "../price/PriceTextsVertical.jsx";
import ThumbnailImg from "../thumbnail/ThumbnailImg.jsx";

import useWindowDimensions from "@/hooks/useWindowDimensions.ts";

import circleInfoBtn from "../../assets/image/button/circleInfoBtn.svg";

import "./ScriptContent.scss";
import "./../../styles/utilities.css";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import ScriptManageEachTopBtn from "./ScriptManageEachTopBtn.js";

/**
 * 구매한 작품 페이지, 작품 관리 페이지의 상품 란,
 * @param {Object} props - Component properties
 * @param {order} props.order - List.map(order, index)
 * @param {index} props.index - List.map(order, index)
 * @param {string} props.currentPage - 구매한 작품: "0", 작품 관리: "1"
 * @param {component} props.Button - 페이지에 사용할 Button component. e.g. PurchasedScriptBtn.jsx
 * @param {string} props.currentTogglePage - PurchasedScript의 토글 버튼. 대본: "0", 공연권: "1"
 * @param {boolean} [props.isRoute] - 클릭 시 detail 페이지 이동 활성화 여부, 값 넣을 시 썸네일과 제목에 추가 및 cursor-pointer 적용
 */
const ScriptContent = ({
  order,
  index,
  currentPage = "0",
  Button,
  // currentTogglePage: PurchasedScript에서 대본, 공연권 토글 여부
  currentTogglePage = "0",
  isRoute = false,
}) => {
  // 삭제된 작가 info 팝업
  const [showPopup, setShowPopup] = useState(false);

  const items = currentPage === "0" ? order.orders || [] : order.works || [];

  const [year, month, day] = order.date.split("-");
  const formattedDate = `${year}. ${month}. ${day}.`;

  const { widthConditions } = useWindowDimensions();
  const { isMobile, isSmallMobile } = useWindowDimensions().widthConditions;

  const navigate = useNavigate();

  return (
    <div key={index} className="script-content ">
      <p className={clsx("date c-grey-8f8f8f", !isSmallMobile ? "p-large-bold" : "p-small-bold")}>
        {formattedDate}
      </p>
      <hr className="border-[#caabff]"></hr>
      {items.map((script, idx) => {
        // case: 유저 존재, 작품 삭제 / 유저 삭제, 작품 삭제
        const isDeletedScriptOnly = script.delete && script.writer;
        const isDeletedScriptAndAccount = script.delete && !script.writer;

        return (
          <div key={script.id}>
            <div className="script">
              <div className="thumbnail-img-wrap relative aspect-square">
                <ThumbnailImg
                  imagePath={script.imagePath}
                  isRoute={isRoute}
                  id={script.id}
                ></ThumbnailImg>
                {script.delete && (
                  <div
                    className="flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-[20px] z-10"
                    style={{ background: "rgba(226, 226, 226, 0.70)" }}
                  >
                    <p className="p-small-medium sm:p-large-medium">삭제된 작품</p>
                  </div>
                )}
                {script.delete && (
                  <div className="sm:hidden absolute top-[8px] left-0">
                    <img
                      id="title-info"
                      src={circleInfoBtn}
                      alt="circleInfoBtn"
                      onClick={() => {
                        setShowPopup(!showPopup);
                      }}
                    />
                    {showPopup && isSmallMobile ? (
                      <ScriptContentPopup
                        className="top-[-8px] left-[8px] translate-y-[-100%]"
                        onClose={() => setShowPopup(false)}
                        type={isDeletedScriptOnly ? "script" : "account"}
                      />
                    ) : null}
                  </div>
                )}
              </div>
              <div className=" script-tag">
                <div
                  className={`a-items-center ${currentPage === "1" ? "j-content-between" : ""}`}
                  id="title"
                >
                  <div className="relative">
                    <p className={!isSmallMobile ? "p-large-bold" : "p-small-bold"} id="title">
                      {script.title || "제목 없음"}
                    </p>
                    {isRoute && (
                      <button
                        className="absolute top-0 cursor-pointer size-full"
                        style={{ top: 0 }}
                        onClick={() => {
                          navigate(`/list/detail/${script.id}`);
                        }}
                      ></button>
                    )}
                  </div>
                  {script.delete && (
                    <div className="hidden sm:block relative">
                      <img
                        id="title-info"
                        src={circleInfoBtn}
                        alt="circleInfoBtn"
                        onClick={() => {
                          setShowPopup(!showPopup);
                        }}
                      />
                      {showPopup && !isSmallMobile ? (
                        <ScriptContentPopup
                          className="left-[calc(19px+8px+5px)] translate-y-[-40%]"
                          onClose={() => setShowPopup(false)}
                          type={isDeletedScriptOnly ? "script" : "account"}
                        />
                      ) : null}
                    </div>
                  )}

                  {/* 작품 관리 페이지 상단 버튼: 심사 끝났을 경우 표시 */}
                  {currentPage === "1" &&
                    (script.checked === "PASS" ||
                      script.checked === "RE_WAIT" ||
                      script.checked === "RE_PASS") && (
                      <div className="translate-y-[-15px]">
                        <ScriptManageTopBtn className="" script={script} />
                      </div>
                    )}
                  {/* 작품 관리 페이지에서 심사 중일 경우 */}
                  {currentPage === "1" && script.checked === "WAIT" && (
                    <div className="hidden md:block translate-y-[-15px]">
                      <ScriptManageEachTopBtn>심사 중</ScriptManageEachTopBtn>
                    </div>
                  )}
                </div>

                <hr className="ml-[-3px]! border-[1px] border-solid border-[#9E9E9E]"></hr>
                <p className={!isSmallMobile ? "p-large-medium" : "p-12-bold"} id="author">
                  {currentPage === "1"
                    ? ""
                    : !isDeletedScriptAndAccount
                    ? script.writer
                    : "삭제된 계정"}
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
                    <>
                      <PriceText type="perform" value={script.performancePrice || 0} />
                      <div style={!isSmallMobile ? { height: "32px" } : { height: "16px" }}></div>
                      {(isMobile || isSmallMobile) && (
                        <PurchasedPerformPossibleInfo script={script} />
                      )}
                    </>
                  ) : null
                ) : (
                  <div className="pl-[6px] pr-[6px] sm:pr-0">
                    <PriceTextsVertical
                      script={script.script}
                      scriptPrice={script.scriptPrice || 0}
                      performance={script.performance}
                      performPrice={script.performancePrice || 0}
                    />
                  </div>
                )}
                {/* (모바일 화면) 작품 관리 페이지 상단 버튼: 심사 끝났을 경우 표시 */}
                {(isMobile || isSmallMobile) &&
                currentPage === "1" &&
                (script.checked === "PASS" ||
                  script.checked === "RE_WAIT" ||
                  script.checked === "RE_PASS") ? (
                  <div className="relative">
                    <ScriptManageTopBtn className="mobile" script={script} />
                  </div>
                ) : currentPage === "1" && script.checked === "WAIT" ? (
                  <div className="block md:hidden translate-y-[-43.4px]">
                    <ScriptManageEachTopBtn>심사 중</ScriptManageEachTopBtn>
                  </div>
                ) : null}
              </div>
              <div className=" __script-content-btn">
                {/* Button: props */}
                {currentPage === "0" && !script.delete ? (
                  // 구매한 작품 페이지 (PurchasedScript.jsx)
                  currentTogglePage === "0" ? (
                    // PurchasedScriptBtn.jsx
                    <Button
                      purchaseStatus={[script.script, script.performance]}
                      script={script}
                      id={script.id}
                      title={script.title}
                      productId={script.productId}
                      buyPerformance={script.buyPerformance}
                      style={isSmallMobile ? { width: "129px", height: "40px" } : {}}
                    />
                  ) : (
                    <section className="j-content-between">
                      {!(isMobile || isSmallMobile) ? (
                        <PurchasedPerformPossibleInfo script={script} />
                      ) : (
                        <div></div>
                      )}

                      {/* PurchasedPerformBtn.jsx */}
                      <Button id={script.id} possibleCount={script.possibleCount} />
                    </section>
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
        );
      })}
    </div>
  );
};

export default ScriptContent;
