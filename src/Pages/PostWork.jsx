import "./PostWork.css";
import MainNav from "./MainNav";
import Footer from "./Footer";
import infoBtn from "../assets/image/post/infoBtn.svg";
import typeWriterImg from "../assets/image/post/typeWriterImg.svg";
import React, { Component, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContext from "../contexts/AuthContext";
import { SERVER_URL } from "../components/constants/ServerURL";

const PostWork = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSelected, setFileSelected] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);

  // 로그인 되어 있지 않을 경우 로그인 페이지로 이동
  // TODO: 별도 커스텀 훅으로 분리
  const checkedAuthFlag = useRef(false);
  useEffect(() => {
    if (!isAuthenticated && !checkedAuthFlag.current) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/signin");
    }
    checkedAuthFlag.current = true;
  }, [isAuthenticated, navigate]);

  const handleFileSelect = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      setFileSelected(true);
    }
  };

  const handleUpload = async () => {
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
        alert("업로드 과정 중 문제가 발생했습니다.");
      }
    }
  };

  return (
    <div className="post-work">
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
                <img src={infoBtn} alt="infoBtn" />
              </div>
              <div className="upload-content">
                <button id="select-file" onClick={() => fileInputRef.current.click()}>
                  파일 선택
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                  accept="application/pdf"
                />
                <div className="file-info">{fileName}</div>
              </div>
              <div className="upload-btn-div">
                <button id="upload-btn" onClick={handleUpload} disabled={!fileSelected}>
                  작품 보내기
                </button>
              </div>
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
