import Footer from "../Footer";
import MainNav from "../MainNav";
import "./PurchasedScript.css";
import pencilMenuImg from "../../assets/image/myPage/pencil.svg";
import scriptMenuImg from "../../assets/image/myPage/script.svg";
import PriceTextsVertical from "../../components/price/PriceTextsVertical";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../components/constants/ServerURL";
import Cookies from "js-cookie";

const PurchasedScript = () => {
  const [nickname, setNickname] = useState("");
  const [scriptList, setScriptList] = useState([]);

  useEffect(() => {
    const fetchPurchasedScript = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}profile/orderItems`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });
        setNickname(response.data.nickname);

        const orders = response.data.orderList || [];
        // 중첩된 orderItem 배열을 하나의 script 배열로 평탄화
        const scripts = orders.flatMap((order) => order.orderItem);
        setScriptList(scripts);
      } catch (error) {}
    };

    fetchPurchasedScript();
  }, []);

  return (
    <div className="purchased-script">
      <MainNav />
      <div className="purchased-script-wrap">
        <div className="menu-side">
          <h1>알맹이 000 님,</h1>
          <h3>오늘도 달콤한 하루 되세요!</h3>
          <div className="select-menu-btn">
            <h6>구매한 작품</h6>
            <img src={scriptMenuImg}></img>
          </div>
          <div className="select-menu-btn">
            <h6>작품 관리</h6>
            <img src={pencilMenuImg}></img>
          </div>
          <p>회원 정보 수정</p>
        </div>
        <div className="content-side">
          <h1>구매한 작품들을 볼 수 있어요!</h1>
          {scriptList.map((script) => (
            <div key={script.id}>
              <h3 id="date">{script.createdAt}</h3>
              <hr></hr>
              <div className="script">
                <div
                  className="script-thumbnail"
                  style={{
                    backgroundImage: `url(${script.imagePath})`,
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
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedScript;
