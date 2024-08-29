import axios from "axios";
import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import PostWorkPopup from "./PostWorkPopup";

//import { refreshAccessToken } from "./../../contexts/AuthContext";

import { SERVER_URL } from "../../constants/ServerURL";

import infoBtn from "../../assets/image/button/circleInfoBtn.svg";
import typeWriterImg from "../../assets/image/post/typeWriterImg.svg";

import "./PostWork.css";
import FileInputBox from "../../components/file/FileInputBox";

const PostWork = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSelected, setFileSelected] = useState(false);

  // 팝업 메뉴
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const onClickUpload = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("script", file);

    try {
      const response = await axios.post(`${SERVER_URL}register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      if (response.data === true) {
        alert("작품 등록이 완료되었습니다.");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("로그인이 필요한 서비스입니다.");
          navigate("/signin");
        } else if (error.response.data.error === "contentType is not PDF") {
          alert(".pdf 확장자 형식만 업로드 가능합니다.");
        } else {
          alert(error.response.data.error);
        }
      } else {
        if (!Cookies.get("accessToken")) {
          alert("로그인이 필요한 서비스입니다.");
          navigate("/signin");
        } else {
          alert("업로드 과정 중 문제가 발생했습니다.");
        }
      }
    }
  };

  return (
    <div className="post-work">
      {showPopup && (
        <PostWorkPopup onClose={() => setShowPopup(false)} initialPosition={popupPosition} />
      )}
      <MainNav />
      <div className="post-work-wrap">
        <div className="left-side">
          <div className="inside-field">
            <div className="title">
              <h1>느닷없이</h1>
              <h1>글이</h1>
              <h1>쓰고 싶어졌다</h1>
            </div>
            <div>
              <div className="upload-title">
                <h6>작품 등록 신청</h6>
                {/* 팝업 메뉴 */}
                <img
                  src={infoBtn}
                  alt="infoBtn"
                  onClick={(event) => {
                    setShowPopup(true);
                    const rect = event.target.getBoundingClientRect();
                    setPopupPosition({ x: rect.left, y: rect.bottom });
                  }}
                />
              </div>

              <FileInputBox
                onFileUpload={(file) => {
                  if (file) {
                    setFile(file);
                    setFileName(file.name);
                    setFileSelected(true);
                  }
                }}
              />

              <button id="upload-btn" onClick={onClickUpload} disabled={!fileSelected}>
                작품 보내기
              </button>
            </div>
          </div>
        </div>
        <div
          className="right-side"
          style={{
            backgroundImage: `url(${typeWriterImg})`,
          }}
        ></div>
      </div>
      <Footer />
    </div>
  );
};
export default PostWork;
