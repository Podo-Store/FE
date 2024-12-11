import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useRef, useState } from "react";

import {
  MyPageMenu,
  ScriptContent,
  PurchasedScriptBtn,
  PurchasedPerformBtn,
  NullScriptContent,
} from "../../components/myPage";
import ToggleSlide from "../../components/button/ToggleSlide";
import PartialLoading from "../../components/loading/PartialLoading";

import { useRequest } from "../../hooks/useRequest";

import AuthContext from "../../contexts/AuthContext";

import { SERVER_URL } from "../../constants/ServerURL";

import "./MyPageContentsDefault.css";
import "./../../styles/utilities.css";

const PurchasedScript = () => {
  const [scriptList, setScriptList] = useState([]);
  const [performList, setPerformList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { userNickname } = useContext(AuthContext);

  const [toggle, setToggle] = useState(false);

  const [isScriptListNull, setIsScriptListNull] = useState(false);
  const [isPerformListNull, setIsPerformListNull] = useState(false);

  // MyPageMenu 스크롤 제어
  const footerRef = useRef(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

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
    <div className="myPage-contents-default">
      <div className="myPage-contents-default-wrap">
        <MyPageMenu nickname={userNickname} currentPage="0" isFooterVisible={isFooterVisible} />
        <div className="content-side">
          <div className="d-flex j-content-between a-items-start">
            <h1>구매한 작품들을 볼 수 있어요!</h1>
            <ToggleSlide
              toggle={toggle}
              onChangeToggle={() => {
                setToggle(!toggle);
              }}
            />
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
      <div ref={footerRef} style={{ height: "6.66vh" }}></div>
    </div>
  );
};

export default PurchasedScript;
