import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";

import MainNav from "../MainNav";
import Footer from "../Footer";

import {
  MyPageMenu,
  ScriptContent,
  PurchasedScriptBtn,
  PurchasedPerformBtn,
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

  useRequest(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}profile/orderScripts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setScriptList(response.data.orderList);

      const response2 = await axios.get(`${SERVER_URL}profile/orderPerformances`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setPerformList(response2.data.orderList);
    } catch (error) {}
    setIsLoading(false);
  });

  return (
    <div className="myPage-contents-default">
      <MainNav />
      <div className="myPage-contents-default-wrap">
        <MyPageMenu nickname={userNickname} currentPage="0" />
        <div className="content-side">
          <div className="d-flex j-content-between a-items-center">
            <h1>구매한 작품들을 볼 수 있어요!</h1>
            <ToggleSlide
              toggle={toggle}
              onChangeToggle={() => {
                setToggle(!toggle);
              }}
            />
          </div>
          <div className="m-bottom-8-88vh"></div>
          {isLoading ? (
            <PartialLoading />
          ) : !toggle ? (
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
            performList.map((order, index) => (
              <ScriptContent
                order={order}
                index={index}
                currentPage="0"
                Button={PurchasedPerformBtn}
                currentTogglePage="1"
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedScript;
