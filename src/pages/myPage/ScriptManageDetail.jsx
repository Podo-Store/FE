import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../Loading";

import GoBack from "../../components/button/GoBack.tsx";
import SmallOnOffBtn from "../../components/button/RoundBtn_135_40";
import FileInputBox from "../../components/file/FileInputBox";
import RectInputField from "../../components/inputField/RectInputField.tsx";
import DialogPopup from "@/components/popup/DialogPopup";
import Select from "../../components/select/Select";
import ThumbnailImg from "../../components/thumbnail/ThumbnailImg";

import { useRequest } from "../../hooks/useRequest";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { SERVER_URL } from "../../constants/ServerURL";

import "./ScriptManageDetail.scss";
import "./../../styles/text.css";
import OverLapPartialLoading from "@/components/loading/OverLapPartialLoading";
import { pxToDesignUnit } from "@/utils/unitCalc";

const ScriptManageDetail = () => {
  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [scriptPrice, setScriptPrice] = useState("0");
  const [performPrice, setPerformPrice] = useState("0");
  // getThumbnailImgUrl: API 요청으로부터 받아온 이미지 URL
  const [getThumbnailImgUrl, setGetThumbnailImgUrl] = useState("");
  // imgFile: 입력받은 이미지 파일, imgUrl: 입력받은 이미지 파일 -> URL
  const [InputtedThumbnailImgFile, setInputtedThumbnailImgFile] =
    useState(null);
  const [InputtedThumbnailImgUrl, setInputtedThumbnailImgUrl] = useState("");

  const [saleScriptStatus, setSaleScriptStatus] = useState(false);
  const [salePerformStatus, setSalePerformStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // API 요청으로부터 받아온 설명 파일
  const [getFileUrl, setGetFileUrl] = useState(null);
  // 업로드된 설명 파일
  const [uploadedFile, setUploadedFile] = useState(null);

  // 삭제하기 클릭 시 경고 박스
  const [showDeleteAlertBox, setShowDeleteAlertBox] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isPartialLoading, setPartialLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    widthConditions: { isMobile },
  } = useWindowDimensions();

  useRequest(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${SERVER_URL}profile/detail`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        params: {
          script: id,
        },
      });
      setTitle(response.data.title);
      setPlot(response.data.plot);
      setScriptPrice(response.data.scriptPrice);
      setPerformPrice(response.data.performancePrice);
      setGetThumbnailImgUrl(response.data.imagePath);
      setSaleScriptStatus(response.data.script);
      setSalePerformStatus(response.data.performance);
      setGetFileUrl(response.data.descriptionPath);
    } catch (error) {
      alert(error.response.data.error || "예상치 못한 오류가 발생했습니다.");
    }
    setIsLoading(false);
  });

  // 글자 수 제한
  useEffect(() => {
    if (title && title.length > 20) {
      setTitle(title.slice(0, 20));
    }
  }, [title]);
  useEffect(() => {
    if (plot && plot.length > 150) {
      setPlot(plot.slice(0, 150));
    }
  }, [plot]);

  useEffect(() => {
    if (saleScriptStatus && salePerformStatus) {
      setSelectedOption("scriptPerformSale");
    } else if (saleScriptStatus) {
      setSelectedOption("scriptSale");
    } else if (salePerformStatus) {
      setSelectedOption("performSale");
    } else {
      setSelectedOption("notSale");
    }
  }, [saleScriptStatus, salePerformStatus]);

  // 사진을 선택했을 경우
  const onClickChangeThumbnailImg = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imgUrl = URL.createObjectURL(file);
        setInputtedThumbnailImgUrl(imgUrl);
      }
      setInputtedThumbnailImgFile(file);
    };
    fileInput.click();
  };

  const onClickModifyBtn = async () => {
    // select -> state: 비동기 문제 발생, ∴ 변수에 할당
    let updatedSaleScriptStatus = false;
    let updatedSalePerformStatus = false;

    if (selectedOption === "scriptSale") {
      updatedSaleScriptStatus = true;
    } else if (selectedOption === "performSale") {
      updatedSalePerformStatus = true;
    } else if (selectedOption === "scriptPerformSale") {
      updatedSaleScriptStatus = true;
      updatedSalePerformStatus = true;
    }

    // API POST 요청
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("script", updatedSaleScriptStatus);
      formData.append("performance", updatedSalePerformStatus);
      formData.append("scriptPrice", scriptPrice);
      formData.append("performancePrice", performPrice);
      formData.append("plot", plot);

      if (InputtedThumbnailImgFile) {
        // 이미지를 변경한 경우
        formData.append("scriptImage", InputtedThumbnailImgFile);
      } else if (getThumbnailImgUrl) {
        // 이미지 변경하지 않은 경우
        formData.append("imagePath", getThumbnailImgUrl);
      }

      if (uploadedFile) {
        // 설명 파일을 변경한 경우
        formData.append("description", uploadedFile);
      } else if (getFileUrl) {
        // 설명 파일을 변경하지 않은 경우
        formData.append("descriptionPath", getFileUrl);
      }

      setPartialLoading(true);
      await axios.post(`${SERVER_URL}profile/detail`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      alert("수정이 완료되었습니다.");
      navigate("/mypage/scriptmanage");
    } catch (error) {
      if (error.response.data.error === "ScriptImage file type is not jpg") {
        alert("이미지 파일은 jpg 형식만 업로드 가능합니다.");
      } else if (
        error.response.data.error === "Description file type is not pdf"
      ) {
        alert("PDF 파일만 업로드 가능합니다.");
      } else if (error.response.data.error === "제목 유효성 검사 실패") {
        alert("제목은 1자~20자 이내로 입력해주세요.");
      } else {
        alert(error.response.data.error || "예상치 못한 오류가 발생했습니다.");
      }
    } finally {
      setPartialLoading(false);
    }
  };

  const onClickDeleteConfirm = async () => {
    setPartialLoading(true);
    try {
      await axios.delete(`${SERVER_URL}profile/deleteScript/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      alert("작품이 삭제되었습니다.");
      navigate("/mypage/scriptmanage");
    } catch (error) {
      if (error.response.data.error === "작가가 아님") {
        alert("작가 본인이 쓴 작품만 삭제할 수 있습니다.");
      } else if (error.response.data.error === "심사 중") {
        alert("심사 중인 작품입니다.");
      } else {
        alert(error.response.data.error);
      }
    } finally {
      setPartialLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <OverLapPartialLoading isLoading={isPartialLoading} />
      <div className=" mt-[3.426vh]   ">
        <GoBack url="/mypage/scriptmanage" />

        <div className="flex flex-col gap-[4.259vh] border-b-1 border-[#B489FF] pb-[0.463vh]">
          <h1 className="h4-bold">등록한 작품들을 관리할 수 있어요!</h1>
          <p id="p-medium-regular">작품 상세 페이지 수정</p>
        </div>

        <div className="m-auto flex w-[32.8vw] min-w-[630px] flex-col pt-[3.241vh] ">
          {/* top info */}
          <div className="  grid grid-cols-[31%_69%]">
            <ThumbnailImg
              className="flex items-end justify-end w-full h-full"
              imagePath={
                InputtedThumbnailImgFile
                  ? InputtedThumbnailImgUrl
                  : getThumbnailImgUrl
              }
            >
              {/* ㄴ 이미지 input이 있을 경우 그 file의 url로, 아닐 경우 서버에서 받아온 url */}
              <p
                className="p-xs-under c-pointer mb-[7.106%] mr-[10.66%]"
                onClick={onClickChangeThumbnailImg}
              >
                대표 이미지 수정하기
              </p>
            </ThumbnailImg>

            {/* 작품 정보 */}
            <div className="w-full cript-info-detail">
              <p className="p-medium-bold mb-[0.926vh] pl-[4.6%]">작품 정보*</p>

              <div className="f-dir-column gap-[1.11vh]  ">
                {/* 제목 */}
                <div className="relative pl-[4.6%]">
                  <RectInputField
                    type="text"
                    placeholder="작품 제목을 입력해주세요. (최대 20자)"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    style={!isMobile ? {} : { width: "100%" }}
                    className="placeholder:text-[rgba(0,0,0,0.17)] "
                  />
                  <div className="absolute rounded-tl-[5px] rounded-br-[5px] border-r-[0.5px] border-b-[0.5px] border-[#BABABA] bg-[#F5F0FF] p-xs-regular px-[5px] text-[#777777] bottom-[0%] right-[0%]  ">
                    {title ? title.length : 0} / 20자
                  </div>
                </div>
                <div className="relative h-[10vh]  pl-[4.6%]">
                  <textarea
                    className=" focus:outline-none focus:border-[0.5px] focus:border-[#caabff] p-small-regular placeholder:text-[rgba(0,0,0,0.17)] resize-none h-full w-full rounded-[5px] border-[0.5px] border-[#BABABA] bg-[#FFF] px-[1.15vw] py-[1.20vh] p-small-regular  box-border "
                    placeholder="간단한 줄거리를 입력해주세요. (최대 150자)"
                    value={plot}
                    onChange={(e) => {
                      setPlot(e.target.value);
                    }}
                  />
                  <div className="absolute rounded-tl-[5px] rounded-br-[5px] border-r-[0.5px] border-b-[0.5px] border-[#BABABA] bg-[#F5F0FF] p-xs-regular px-[5px] text-[#777777] bottom-[0%] right-[0%]">
                    {plot ? plot.length : 0} / 150자
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* bottom info */}
          <div className="flex flex-col ">
            <div className="select-wrap">
              <div className="">
                <p className=" title p-medium-bold">대본 정보</p>
                <div className="gap-[3%] grid grid-cols-[65%_32%]">
                  <RectInputField
                    type="number"
                    placeholder="대본 가격을 숫자로 입력해주세요."
                    value={scriptPrice}
                    onChange={(e) => {
                      setScriptPrice(e.target.value);
                    }}
                    style={!isMobile ? {} : { width: "270px" }}
                  />
                  <Select
                    value={saleScriptStatus ? "scriptSale" : "notSale"}
                    onChange={(event) => {
                      setSaleScriptStatus(event.target.value === "scriptSale");
                    }}
                    style={
                      !isMobile
                        ? { width: "197px", height: "40px" }
                        : { width: "140px", height: "40px" }
                    }
                  >
                    <option value="notSale">판매 중지</option>
                    <option value="scriptSale">판매</option>
                  </Select>
                </div>
              </div>
              <div style={{ height: "15px" }}></div>
              <div id="select">
                <p className="title p-medium-bold">공연권 정보</p>
                <div className="gap-[3%] grid grid-cols-[65%_32%]">
                  <RectInputField
                    type="number"
                    placeholder="대본 가격을 숫자로 입력해주세요."
                    value={performPrice}
                    onChange={(e) => {
                      setPerformPrice(e.target.value);
                    }}
                    style={!isMobile ? {} : { width: "270px" }}
                  />
                  <Select
                    value={salePerformStatus ? "performSale" : "notSale"}
                    onChange={(event) => {
                      setSalePerformStatus(
                        event.target.value === "performSale"
                      );
                    }}
                    style={
                      !isMobile
                        ? { width: "197px", height: "40px" }
                        : { width: "140px", height: "40px" }
                    }
                  >
                    <option value="notSale">판매 중지</option>
                    <option value="performSale">판매</option>
                  </Select>
                </div>
              </div>
            </div>

            <div className=" a-items-center mt-[2.57%]">
              <FileInputBox
                title="작품 설명"
                infoText={
                  "작품 설명은 5페이지 이내의\n PDF 형식 파일만 가능해요."
                }
                onFileUpload={(file) => {
                  setUploadedFile(file);
                }}
                style={
                  !isMobile
                    ? { width: "100%", height: "180px" }
                    : { width: "430px", height: "180px" }
                }
                titleStyle={{
                  fontSize: "1rem",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "1.5rem",
                }}
              />
            </div>

            <div className=" bottom-wrap">
              <div className="btn-wrap">
                <SmallOnOffBtn
                  color="white"
                  onClick={() => navigate("/mypage/scriptmanage")}
                >
                  취소하기
                </SmallOnOffBtn>
                <SmallOnOffBtn
                  color="purple"
                  disabled={
                    title === "" || scriptPrice === "" || performPrice === ""
                  }
                  onClick={onClickModifyBtn}
                >
                  수정하기
                </SmallOnOffBtn>
              </div>
            </div>
            <div className="j-content-end">
              <p
                className="delete"
                onClick={() => {
                  setShowDeleteAlertBox(true);
                }}
              >
                작품 삭제
              </p>
            </div>
            {showDeleteAlertBox ? (
              <DialogPopup
                text="작품을 정말 삭제할까요?"
                negativeBtn={{
                  text: "삭제하기",
                  onClick: () => {
                    onClickDeleteConfirm();
                  },
                }}
                positiveBtn={{
                  text: "취소하기",
                  onClick: () => {
                    setShowDeleteAlertBox(false);
                  },
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptManageDetail;
