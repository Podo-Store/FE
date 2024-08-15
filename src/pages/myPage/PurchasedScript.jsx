import Footer from "../Footer";
import MainNav from "../MainNav";
import "./MyPageContentsDefault.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../constants/ServerURL";
import Cookies from "js-cookie";
import MyPageMenu from "../../components/myPage/MyPageMenu";
import { useRequest } from "../../hooks/useRequest";
import ScriptContent from "../../components/myPage/ScriptContent";
import PurchasedScriptBtn from "../../components/myPage/PurchasedScriptBtn";
import AuthContext from "../../contexts/AuthContext";

const PurchasedScript = () => {
  const [scriptList, setScriptList] = useState([]);

  const { userNickname } = useContext(AuthContext);

  useRequest(async () => {
    try {
      const response = await axios.get(`${SERVER_URL}profile/orderItems`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setScriptList(response.data.orderList);
    } catch (error) {}
  });

  return (
    <div className="myPage-contents-default">
      <MainNav />
      <div className="myPage-contents-default-wrap">
        <MyPageMenu nickname={userNickname} currentPage="0" />
        <div className="content-side">
          <h1>구매한 작품들을 볼 수 있어요!</h1>
          {scriptList.map((order, index) => (
            <ScriptContent
              order={order}
              index={index}
              currentPage="0"
              Button={PurchasedScriptBtn}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedScript;
