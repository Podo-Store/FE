import Footer from "../Footer";
import MainNav from "../MainNav";
import "./PurchasedScript.css";
import pencilMenuImg from "../../assets/image/myPage/pencil.svg";
import scriptMenuImg from "../../assets/image/myPage/script.svg";
import PriceTextsVertical from "../../components/price/PriceTextsVertical";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../constants/ServerURL";
import Cookies from "js-cookie";
import MyPageMenu from "../../components/myPage/MyPageMenu";
import { useRequest } from "../../hooks/useRequest";

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
            <div key={index}>
              <h3 id="date">{order.createdAt}</h3>
              <hr></hr>
              {order.orderItem.map((script) => (
                <div key={script.id}>
                  <div className="script">
                    <div
                      className="script-thumbnail"
                      style={{
                        backgroundImage: `url(${script.imagePath || "default_image_url_here"})`,
                      }}
                    ></div>
                    <div className="script-detail">
                      <h3 id="title">{script.title || "제목 없음"}</h3>
                      <hr></hr>
                      <h4>{script.writer || "작가 정보 없음"}</h4>
                      <PriceTextsVertical
                        scriptPrice={script.scriptPrice || 0}
                        performPrice={script.performancePrice || 0}
                      />
                      <div className="btn-wrap">
                        <button>공연권 신청</button>
                        <button>대본 받기</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedScript;
