import Footer from "../Footer";
import MainNav from "../MainNav";
import "./List.css";
import ListThumbnail from "./ListThumbnail";
import ListPopup from "./ListPopup";
import circleInfoBtn from "./../../assets/image/post/list/circleInfoBtn.svg";
import sparkles from "./../../assets/image/post/list/sparkles.svg";
import leftBtn from "./../../assets/image/post/list/leftBtn.svg";
import rightBtn from "./../../assets/image/post/list/rightBtn.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../components/constants/ServerURL";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const List = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [longPlays, setLongPlays] = useState([]);
  const [shortPlays, setShortPlays] = useState([]);

  const navigate = useNavigate();

  const handleInfoBtnClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;
    setPopupPosition({ x, y });
    setShowPopup(true);
  };

  useEffect(() => {
    const listAPI = async () => {
      try {
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
      } catch (error) {
        console.error(error);
      }
    };

    listAPI();
  }, []);

  const handleThumbnailClick = (id) => {
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
            onClick={handleInfoBtnClick}
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
            {longPlays.map((play) => (
              <ListThumbnail
                key={play.id}
                thumbnailImg={play.imagePath}
                title={play.title}
                author={play.writer}
                scriptPrice={play.scriptPrice}
                performPrice={play.performancePrice}
                onClick={() => handleThumbnailClick(play.id)}
              />
            ))}
          </div>
        </div>

        <div className="work-list">
          <div className="work-list-title">
            <img src={sparkles} alt="sparkles"></img>
            <h5>단편극</h5>
            <img src={sparkles} alt="sparkles"></img>
          </div>
          <div className="work-list-content">
            {shortPlays.map((play) => (
              <ListThumbnail
                key={play.id}
                thumbnailImg={play.imagePath}
                title={play.title}
                author={play.writer}
                scriptPrice={play.scriptPrice}
                performPrice={play.performancePrice}
                onClick={() => handleThumbnailClick(play.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
