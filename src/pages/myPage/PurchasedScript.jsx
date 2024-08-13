import Footer from "../Footer";
import MainNav from "../MainNav";
import "./PurchasedScript.css";
import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../constants/ServerURL";
import Cookies from "js-cookie";
import MyPageMenu from "../../components/myPage/MyPageMenu";
import { useRequest } from "../../hooks/useRequest";
import ScriptContent from "../../components/myPage/ScriptContent";
import PurchasedScriptBtn from "../../components/myPage/PurchasedScriptBtn";

const PurchasedScript = () => {
  const [nickname, setNickname] = useState("");
  const [scriptList, setScriptList] = useState([]);

  useRequest(async () => {
    try {
      const response = await axios.get(`${SERVER_URL}profile/orderItems`, {
        headers: {
          "Content-Type": "multipart/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setNickname(response.data.nickname);
      setScriptList(response.data.orderList);
    } catch (error) {}
  });

  return (
    <div className="purchased-script">
      <MainNav />
      <div className="purchased-script-wrap">
        <MyPageMenu nickname={nickname} currentPage="0" />
        <div className="content-side">
          <h1>구매한 작품들을 볼 수 있어요!</h1>
          {scriptList.map((order, index) => (
            <ScriptContent order={order} index={index} Button={PurchasedScriptBtn} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedScript;
