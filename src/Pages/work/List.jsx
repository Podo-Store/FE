import Footer from "../Footer";
import MainNav from "../MainNav";
import "./List.css";
import ListThumbnail from "./ListThumbnail";
import ListPopup from "./ListPopup";
import circleInfoBtn from "./../../assets/image/post/list/circleInfoBtn.svg";
import sparkles from "./../../assets/image/post/list/sparkles.svg";
import leftBtn from "./../../assets/image/post/list/leftBtn.svg";
import rightBtn from "./../../assets/image/post/list/rightBtn.svg";
import { useState } from "react";

const List = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleInfoBtnClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;
    setPopupPosition({ x, y });
    setShowPopup(true);
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
            {/* 컴포넌트 분리시 사용 <h5>{runtimeTitle}</h5> */}
            <h5>장편극</h5>
            <img src={sparkles} alt="sparkles"></img>
          </div>
          <div className="work-list-content">
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
          </div>
        </div>

        <div className="work-list">
          <div className="work-list-title">
            <img src={sparkles} alt="sparkles"></img>
            {/* 컴포넌트 분리시 사용 <h5>{runtimeTitle}</h5> */}
            <h5>단편극</h5>
            <img src={sparkles} alt="sparkles"></img>
          </div>
          <div className="work-list-content">
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
            <ListThumbnail />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
