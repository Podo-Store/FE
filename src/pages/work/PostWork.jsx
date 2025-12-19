import { Dialog, DialogContent } from "@mui/material";
import { api } from "@/api/api";
import Cookies from "js-cookie";
import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import FileInputBox from "../../components/file/FileInputBox";
import AnimatedCheckedSvg from "@/components/loading/AnimatedCheckedSvg";
import PartialLoading from "@/components/loading/PartialLoading";
import InfoPopup from "@/components/popup/InfoPopup";
import PolicyPopup from "@/components/popup/PolicyPopup";
import DialogPopup from "@/components/popup/PolicyDialogPopup";
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
import greyDotLine from "@/assets/image/ic_grey_dot_line.svg";
import { AUTHOR_TERMS_CONTENT } from "../../constants/PopupTexts/PostWorkTexts.js";

import "./PostWork.scss";
const PostWork = () => {
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  // Image popup
  const [showPopup, setShowPopup] = useState(false);
  const [authorPopup, setAuthorPopup] = useState(false);
  const popupRef = useRef(null);

  const [isAuthorTermsPopup, setIsAuthorTermsPopup] = useState(false);
  const { width } = useWindowDimensions();

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setIsChecked(e.target.checked);
  // };
  const onClickUpload = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("script", file);

    setIsLoading(true);

    try {
      const response = await api.post(`/register`, formData);

      console.log(response);

      if (response.data === true || response.data?.success === true) {
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
            <div className="inside-field-title h4-bold sm:h1-bold">
              <p>자신만의</p>
              <p>작품을</p>
              <p>등록해주세요!</p>
            </div>

            <div className="stage-info-container">
              <h5 className="title p-medium-bold sm:h5-bold">
                스테이지 시스템 안내
              </h5>
              <section className="mt-[26px] sm:mt-[41px] md:mt-[53px] h-[110px] sm:h-[120px] md:h-[175px] grid grid-cols-[184fr_30fr_189fr_30fr_141fr]">
                <div className="grid grid-rows-[79fr_75fr] gap-y-[15px]">
                  <div className="flex flex-col justify-center items-center gap-[9px]">
                    <img
                      src={podoalIcon}
                      alt="podoal"
                      className="h-[26px] sm:h-[30px] md:h-[40px]"
                    />
                    <p className="p-xs-regular sm:p-medium-medium md:p-large-medium">
                      포도알
                    </p>
                  </div>
                  <div className="pt-[5px]">
                    <ul class="text-center p-xs-regular sm:p-xs-medium md:p-small-medium ">
                      <li>• 대본 가격 무료만 설정 가능</li>
                      <li>• 공연권 가격 설정 가능</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-rows-[79fr_75fr] gap-y-[15px] items-center">
                  <img src={doubleRiteIcon} alt="doubleRite" />
                  <img
                    src={greyDotLine}
                    alt="구분선"
                    className="mx-auto hidden md:block"
                  />
                </div>
                <div className="grid grid-rows-[79fr_75fr] gap-y-[15px]">
                  <div className="flex flex-col justify-center items-center gap-[9px]">
                    <img
                      src={podoSongIIcon}
                      alt="podoSongI"
                      className="w-[28px] sm:w-[33px] md:w-[44px] aspect-[28/26]"
                    />
                    <p className="p-xs-regular sm:p-medium-medium md:p-large-medium">
                      포도송이
                    </p>
                  </div>
                  <div className="pt-[5px]">
                    <ul class="text-center p-xs-regular sm:p-xs-medium md:p-small-medium ">
                      <li>• 대본 가격 설정 가능</li>
                      <li>• 공연권 가격 설정 가능</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-rows-[79fr_75fr] gap-y-[15px] items-center">
                  <img src={doubleRiteIcon} alt="doubleRite" />
                  <img
                    src={greyDotLine}
                    alt="구분선"
                    className="mx-auto hidden md:block"
                  />
                </div>
                <div className="grid grid-rows-[79fr_75fr] gap-y-[15px]">
                  <div className="flex flex-col justify-center items-center gap-[9px]">
                    <img
                      src={wine}
                      alt="wine"
                      className="w-[15px] sm:w-[19px] md:w-[26px] aspect-[15/26]"
                    />
                    <p className="p-xs-regular sm:p-medium-medium md:p-large-medium">
                      와인
                    </p>
                  </div>
                  <div className="pt-[5px]">
                    <ul class="text-center p-xs-regular sm:p-xs-medium md:p-small-medium ">
                      <li>• 추후 업데이트 예정</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div>
              <div className="upload-title items-center gap-[8px] relative ">
                <h6 className="p-medium-bold sm:h6-bold">작품 등록 신청</h6>
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
                          alt="작품 등록 도식화"
                        />
                      }
                      onClose={() => setShowPopup(!showPopup)}
                      style={{
                        top: "unset",
                        bottom: "0",
                        padding: "11px",
                        transform: "translate(calc(113.75px + 8px), 0)",
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

              <button
                id="upload-btn"
                onClick={() => setIsAuthorTermsPopup(true)}
                disabled={!fileSelected}
              >
                작품 보내기
              </button>
            </div>
          </div>
        </div>
        <div className="right-side">
          <img src={postingProcess} alt="작품 등록 도식화"></img>
        </div>
      </div>
      {isAuthorTermsPopup && (
        <DialogPopup
          onClick={onClickUpload}
          setShowPopup={setIsAuthorTermsPopup}
        />
      )}
    </div>
  );
};
export default PostWork;
