import { Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import FileInputBox from "../../components/file/FileInputBox";
import AnimatedCheckedSvg from "@/components/loading/AnimatedCheckedSvg";
import PartialLoading from "@/components/loading/PartialLoading";

import { SERVER_URL } from "../../constants/ServerURL";

import infoBtn from "@/assets/image/button/circleInfoBlackBtn.svg";
import postingProcess from "../../assets/image/post/postingProcess.png";
import postingProcess2 from "../../assets/image/post/postingProcess2.png";

import "./PostWork.scss";

const PostWork = () => {
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Image popup
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // event.target이 popupRef.current의 child가 아닐 때
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const onClickUpload = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("script", file);

    setIsLoading(true);

    try {
      const response = await axios.post(`${SERVER_URL}register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      if (response.data === true) {
        setUploadSuccess(true);
        setTimeout(() => {
          setUploadSuccess(false);
          setIsLoading(false);
          alert("작품 등록이 완료되었습니다.");
          navigate("/");
        }, 2500);
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
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="post-work">
      <div className="post-work-wrap p-relative">
        {isLoading && (
          <Dialog open={true}>
            <DialogContent className="loading-dialog">
              {uploadSuccess ? <AnimatedCheckedSvg /> : <PartialLoading />}
            </DialogContent>
          </Dialog>
        )}
        <div className="left-side">
          <div className="inside-field">
            <div className="title">
              <h1>자신만의</h1>
              <h1>작품을</h1>
              <h1>등록해주세요!</h1>
            </div>
            <div>
              <div className="upload-title">
                <h6>작품 등록 신청</h6>
                {/* 팝업 메뉴 */}

                <div className="p-relative" style={{ height: "20px" }} ref={popupRef}>
                  <img
                    src={infoBtn}
                    alt="i"
                    onClick={(event) => {
                      setShowPopup(!showPopup);
                    }}
                  />
                  {showPopup && (
                    <div className="image-popup f-center">
                      <img src={postingProcess2} alt="" />
                    </div>
                  )}
                </div>
              </div>

              <FileInputBox
                onFileUpload={(file) => {
                  if (file) {
                    setFile(file);
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
            backgroundImage: `url(${postingProcess})`,
          }}
        ></div>
      </div>
    </div>
  );
};
export default PostWork;
