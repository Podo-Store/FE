import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";

import MainNav from "../MainNav";
import Footer from "../Footer";

import MyPageMenu from "../../components/myPage/MyPageMenu";
import ScriptContent from "../../components/myPage/ScriptContent";
import PurchasedScriptBtn from "../../components/myPage/PurchasedScriptBtn";
import PartialLoading from "../../components/loading/PartialLoading";

import { useRequest } from "../../hooks/useRequest";

import AuthContext from "../../contexts/AuthContext";

import { SERVER_URL } from "../../constants/ServerURL";

import "./MyPageContentsDefault.css";

const PurchasedScript = () => {
  const [scriptList, setScriptList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userNickname } = useContext(AuthContext);

  useRequest(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}profile/orderItems`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setScriptList(response.data.orderList);
    } catch (error) {}
    setIsLoading(false);
  });

  return (
    <div className="myPage-contents-default">
      <MainNav />
      <div className="myPage-contents-default-wrap">
        <MyPageMenu nickname={userNickname} currentPage="0" />
        <div className="content-side">
          <h1>구매한 작품들을 볼 수 있어요!</h1>
          {isLoading ? (
            <PartialLoading />
          ) : (
            scriptList.map((order, index) => (
              <ScriptContent
                order={order}
                index={index}
                currentPage="0"
                Button={PurchasedScriptBtn}
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
