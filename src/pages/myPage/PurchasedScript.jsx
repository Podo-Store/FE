import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useRef, useState } from "react";

import FloatingBtn from "@/components/button/FloatingBtn";
import ToggleSlideV2 from "../../components/button/ToggleSlideV2";
import PartialLoading from "../../components/loading/PartialLoading";
import {
  MyPageMenu,
  ScriptContent,
  PurchasedScriptBtn,
  PurchasedPerformBtn,
} from "../../components/myPage";
import NullScriptContent from "@/components/myPage/NullScriptContent";
import { useRequest } from "../../hooks/useRequest";

import AuthContext from "../../contexts/AuthContext";

import { SERVER_URL } from "../../constants/ServerURL";

import circleGreyWarning from "./../../assets/image/myPage/circleGreyWarning.svg";

import "./MyPageContentsDefault.scss";
import "./PurchasedScript.scss";
import InfoPopup from "@/components/popup/InfoPopup";
import GrayPopup from "@/components/popup/GrayPopup";

const PurchasedScript = () => {
  const [scriptList, setScriptList] = useState([]);
  const [performList, setPerformList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { userNickname } = useContext(AuthContext);

  const [openPopup, setOpenPopup] = useState(false);
  const [toggle, setToggle] = useState(false);
  // const toggle = true;

  const [isScriptListNull, setIsScriptListNull] = useState(false);
  const [isPerformListNull, setIsPerformListNull] = useState(false);

  // API 요청
  useRequest(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}profile/orderScripts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      if (response.data.orderList.length === 0) {
        setIsScriptListNull(true);
      }
      setScriptList(response.data.orderList);

      const response2 = await axios.get(`${SERVER_URL}profile/orderPerformances`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      if (response2.data.orderList.length === 0) {
        setIsPerformListNull(true);
      }
      setPerformList(response2.data.orderList);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  });

  return (
    <div className="purchased-script myPage-contents-default">
      <FloatingBtn />

      <div className="myPage-contents-default-wrap">
        <MyPageMenu nickname={userNickname} currentPage="0" />
        <div className="content-side">
          <div className="content-side-grid">
            <div className="flex items-center gap-[8px]">
              <h4 className="p-medium-bold sm:h4-bold whitespace-nowrap">
                구매한 작품들을 볼 수 있어요!
              </h4>
              <div className="flex relative">
                <button
                  type="button"
                  className="block xl:hidden cursor-pointer"
                  onClick={() => setOpenPopup(!openPopup)}
                >
                  <img className="size-[19px]! max-w-[19px]!" src={circleGreyWarning} />
                </button>
                {openPopup && (
                  <GrayPopup
                    onClose={() => setOpenPopup(false)}
                    className="left-[100%] translate-x-[calc(-134px-68px)] translate-y-[calc(19px+10px)] sm:left-[-5px] sm:translate-x-[-100%] sm:translate-y-0 md:left-[25px] md:translate-x-0"
                  >
                    <p className="p-xs-regular">
                      공연권은 구매시점으로부터 3개월 이내만 사용 가능해요.
                      <br />
                      <br />
                      공연권 사용 시 홍보물에 반드시 저작자의 이름과 대본이 저작자의 것임을 표시해야
                      하며, 대본이 '포도상점'을 통하여 제공되었음을 표시하여야 합니다.
                      <br />
                      <br />
                      대본 파일, 각색 및 굿즈 제작 관련하여 포도상점 메일로 문의해주세요.
                    </p>
                  </GrayPopup>
                )}
              </div>
            </div>

            <div className="toggle-wrap">
              <ToggleSlideV2
                toggle={toggle}
                onChangeToggle={() => {
                  setToggle(!toggle);
                }}
              />
            </div>
          </div>

          <div style={{ height: "1.75vh" }}></div>

          {isLoading ? (
            <PartialLoading />
          ) : !toggle ? (
            !isScriptListNull ? (
              scriptList.map((order, index) => (
                <ScriptContent
                  order={order}
                  index={index}
                  currentPage="0"
                  Button={PurchasedScriptBtn}
                  currentTogglePage="0"
                />
              ))
            ) : (
              // 구매한 작품이 없을 때
              <NullScriptContent currentPage={0} />
            )
          ) : !isPerformListNull ? (
            performList.map((order, index) => (
              <ScriptContent
                order={order}
                index={index}
                currentPage="0"
                Button={PurchasedPerformBtn}
                currentTogglePage="1"
              />
            ))
          ) : (
            // 구매한 공연권이 없을 때
            <NullScriptContent currentPage={0} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasedScript;
