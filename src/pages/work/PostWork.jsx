import { Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import FileInputBox from "../../components/file/FileInputBox";
import AnimatedCheckedSvg from "@/components/loading/AnimatedCheckedSvg";
import PartialLoading from "@/components/loading/PartialLoading";
import InfoPopup from "@/components/popup/InfoPopup";
import PolicyPopup from "@/components/popup/PolicyPopup";
import { SERVER_URL } from "../../constants/ServerURL";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import { toastAlert } from "@/utils/ToastAlert";

import infoBtn from "@/assets/image/button/circleInfoBlackBtn.svg";
import postingProcess from "../../assets/image/post/postingProcess.png";
import postingProcess2 from "../../assets/image/post/postingProcess2.png";
import podoalIcon from "../../assets/image/post/ic_podoal.svg";
import podoSongIIcon from "@/assets/image/post/ic_podosongi.svg";
import wine from "../../assets/image/post/Wine.png";
import doubleRiteIcon from "../../assets/image/post/ic_double_right.svg";
import checkSquare from "../../assets/image/ic_check_square.svg";
import noCheckSquare from "../../assets/image/ic_no_check_square.svg";
import { AUTHOR_TERMS_CONTENT } from "../../constants/PopupTexts/PostWorkTexts.js";

import "./PostWork.scss";

const PostWork = () => {
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Image popup
  const [showPopup, setShowPopup] = useState(false);
  const [authorPopup, setAuthorPopup] = useState(false);
  const popupRef = useRef(null);

  const { width } = useWindowDimensions();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };
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
          toastAlert("작품 등록이 완료되었습니다.");
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
      <div className=" post-work-wrap p-relative">
        {isLoading && (
          <Dialog open={true}>
            <DialogContent className="loading-dialog">
              {uploadSuccess ? <AnimatedCheckedSvg /> : <PartialLoading />}
            </DialogContent>
          </Dialog>
        )}
        <div className=" left-side">
          <div className=" inside-field">
            <div className="inside-field-title h1-bold">
              <p>자신만의</p>
              <p>작품을</p>
              <p>등록해주세요!</p>
            </div>

            <div className=" stage-info-container">
              <h5 className="title h5-bold">스테이지 시스템 안내</h5>

              <div className=" contants">
                {/* 포도알 */}
                <div className=" step">
                  <div className="icon">
                    <img src={podoalIcon} alt="podoal" />
                    <p className="p-large-medium">포도알</p>
                  </div>
                  <div className="p-small-medium info">
                    <p>
                      • 대본 가격 <span>무료</span>만 설정 가능
                    </p>
                    <p> • 공연권 가격 설정 가능</p>
                  </div>
                </div>

                <div className="arrow-box">
                  <img
                    src={doubleRiteIcon}
                    alt="doubleRite"
                    style={{ width: "30px" }}
                  />
                  <div className="divider"></div>
                </div>

                {/* 포도송이 */}
                <div className="step ">
                  <div className="icon">
                    <img src={podoSongIIcon} alt="podoSongI" />
                    <p className="p-large-medium">포도송이</p>{" "}
                  </div>
                  <div className="info">
                    <div className="TBD-info">
                      <p>• 추후 업데이트 예정</p>
                    </div>
                  </div>
                </div>

                <div className="arrow-box">
                  <img src={doubleRiteIcon} alt="doubleRite" />
                </div>

                {/* 와인 */}
                <div className="step">
                  <div className="icon">
                    <img src={wine} alt="wine" style={{ height: "43px" }} />
                    <p className="p-large-medium">와인</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="upload-title items-center gap-[8px] relative ">
                <h6>작품 등록 신청</h6>
                {/* 팝업 메뉴 */}
                <button
                  id="info-btn"
                  className="w-fit h-[20px] box-border"
                  onClick={() => setShowPopup(!showPopup)}
                >
                  <img src={infoBtn} alt="infoBtn" />
                </button>
                {showPopup && (
                  <div ref={popupRef}>
                    <InfoPopup
                      message={
                        <img
                          className="popup-process w-[315px]"
                          src={postingProcess2}
                          alt="작품 등록 도식화"
                        />
                      }
                      onClose={() => setShowPopup(!showPopup)}
                      style={{
                        top: "unset",
                        bottom: "0",
                        padding: "11px",
                        transform:
                          "translate(calc(113.75px + 8px + 20px + 5px), 0)",
                      }}
                      buttonId="info-btn"
                    />
                  </div>
                )}
              </div>

              <FileInputBox
                onFileUpload={(file) => {
                  if (file) {
                    setFile(file);
                    setFileSelected(true);
                  }
                }}
                style={{ height: "180px" }}
              />

              <div className="flex flex-row mt-[14px] gap-[9px] items-center relative">
                <label className=" flex gap-[5px] items-center ">
                  <div className="relative w-[20px] h-[20px]">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleChange}
                      className="absolute top-0 opacity-0 cursor-pointer peer"
                    />
                    <img
                      className="absolute hidden peer-checked:block "
                      alt="check"
                      src={checkSquare}
                    />
                    <img
                      className="absolute peer-checked:hidden"
                      alt="noCheck"
                      src={noCheckSquare}
                    />
                  </div>

                  <p
                    className={`${
                      isChecked ? "text-[#6A39C0]" : ""
                    } p-small-medium `}
                  >
                    작가 대상 이용약관 동의
                  </p>
                </label>

                <span
                  className="cursor-pointer p-xs-under"
                  onClick={() => setAuthorPopup(true)}
                >
                  자세히 보기
                </span>
                {authorPopup && (
                  <PolicyPopup
                    title={"작가 대상 이용약관 (포도알 스테이지)"}
                    detail={AUTHOR_TERMS_CONTENT}
                    setShowPopup={setAuthorPopup}
                    page={3}
                  />
                )}
              </div>
              <button
                id="upload-btn"
                onClick={onClickUpload}
                disabled={!fileSelected || !isChecked}
              >
                작품 보내기
              </button>
            </div>
          </div>
        </div>
        <div className=" right-side">
          <img
            src={width >= 1920 ? postingProcess : postingProcess2}
            alt="작품 등록 도식화"
          ></img>
        </div>
      </div>
    </div>
  );
};
export default PostWork;
