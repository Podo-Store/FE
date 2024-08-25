import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import ListThumbnail from "./../../components/list/ListThumbnail.jsx";
import ListPopup from "./../../components/list/ListPopup.jsx";
import PartialLoading from "../../components/loading/PartialLoading.jsx";

import { useRequest } from "../../hooks/useRequest.js";

import { SERVER_URL } from "../../constants/ServerURL.js";

import circleInfoBtn from "./../../assets/image/post/circleInfoBtn.svg";
import sparkles from "./../../assets/image/post/list/sparkles.svg";
import leftBtn from "./../../assets/image/post/list/leftBtn.svg";
import rightBtn from "./../../assets/image/post/list/rightBtn.svg";

import "./List.css";

const List = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [longPlays, setLongPlays] = useState([]);
  const [shortPlays, setShortPlays] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onClickInfoBtn = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;
    setPopupPosition({ x, y });
    setShowPopup(true);
  };

  useRequest(async () => {
    try {
      setIsLoading(true);
      let response;
      // 로그아웃 상태
      if (!Cookies.get("accessToken")) {
        response = await axios.get(`${SERVER_URL}scripts`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // 로그인 상태
        response = await axios.get(`${SERVER_URL}scripts`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        });
      }

      setLongPlays(response.data.longPlay);
      setShortPlays(response.data.shortPlay);
    } catch (error) {}
    setIsLoading(false);
  });

  const onClickThumbnail = (id) => {
    navigate(`/list/detail/${id}`);
  };

  return (
    <div className="list">
      <MainNav />
      {showPopup && <ListPopup onClose={() => setShowPopup(false)} position={popupPosition} />}
      <div className="list-wrap">
        <div className="title">
          <h5>작품 둘러보기</h5>
          <img
            src={circleInfoBtn}
            alt="info btn"
            onClick={onClickInfoBtn}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="banner-wrap">
          <div className="banner"></div>
          <img src={leftBtn} alt="banner left btn" />
          <img src={rightBtn} alt="banner right btn" />
        </div>
        <div className="work-list">
          <div className="work-list-title">
            <img src={sparkles} alt="sparkles"></img>
            <h5>장편극</h5>
            <img src={sparkles} alt="sparkles"></img>
          </div>
          <div className="work-list-content">
            {isLoading ? (
              <PartialLoading />
            ) : (
              longPlays.map((play) => (
                <ListThumbnail
                  key={play.id}
                  thumbnailImg={play.imagePath}
                  title={play.title}
                  author={play.writer}
                  scriptPrice={play.scriptPrice}
                  performPrice={play.performancePrice}
                  onClick={() => onClickThumbnail(play.id)}
                />
              ))
            )}
          </div>
        </div>

        <div className="work-list">
          <div className="work-list-title">
            <img src={sparkles} alt="sparkles"></img>
            <h5>단편극</h5>
            <img src={sparkles} alt="sparkles"></img>
          </div>
          <div className="work-list-content">
            {isLoading ? (
              <PartialLoading />
            ) : (
              shortPlays.map((play) => (
                <ListThumbnail
                  key={play.id}
                  thumbnailImg={play.imagePath}
                  title={play.title}
                  author={play.writer}
                  scriptPrice={play.scriptPrice}
                  performPrice={play.performancePrice}
                  onClick={() => onClickThumbnail(play.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
