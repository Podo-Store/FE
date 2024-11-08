import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import Loading from "../Loading";
import GoBack from "../../components/button/GoBack";
import SmallOnOffBtn from "../../components/button/RoundBtn_135_40";
import FileInputBox from "../../components/file/FileInputBox";
import RectInputField from "../../components/inputField/RectInputField";
import Select from "../../components/select/Select";
import ThumbnailImg from "../../components/thumbnail/ThumbnailImg";

import { useRequest } from "../../hooks/useRequest";

import { SERVER_URL } from "../../constants/ServerURL";

import "./ScriptManageDetail.css";
import "./../../styles/text.css";

const ScriptManageDetail = () => {
  const [title, setTitle] = useState("");
  const [scriptPrice, setScriptPrice] = useState("0");
  const [performPrice, setPerformPrice] = useState("0");
  // getThumbnailImgUrl: API 요청으로부터 받아온 이미지 URL
  const [getThumbnailImgUrl, setGetThumbnailImgUrl] = useState("");
  // imgFile: 입력받은 이미지 파일, imgUrl: 입력받은 이미지 파일 -> URL
  const [InputtedThumbnailImgFile, setInputtedThumbnailImgFile] = useState(null);
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

  const navigate = useNavigate();
  const { id } = useParams();

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
      } else if (error.response.data.error === "Description file type is not pdf") {
        alert("PDF 파일만 업로드 가능합니다.");
      } else if (error.response.data.error === "제목 유효성 검사 실패") {
        alert("제목은 1자~20자 이내로 입력해주세요.");
      } else {
        alert(error.response.data.error || "예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  const onClickDeleteConfirm = async () => {
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
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="script-manage-detail">
      <MainNav />
      <div className="script-manage-detail-wrap">
        <GoBack url="/mypage/scriptmanage" />

        <h1>등록한 작품들을 관리할 수 있어요!</h1>
        <p id="title">작품 상세 페이지 수정</p>
        <hr />
        <div className="script-info-wrap">
          <div className="script-info">
            <ThumbnailImg
              className="script-info-thumbnail"
              imagePath={InputtedThumbnailImgFile ? InputtedThumbnailImgUrl : getThumbnailImgUrl}
            >
              {/* ㄴ 이미지 input이 있을 경우 그 file의 url로, 아닐 경우 서버에서 받아온 url */}
              <p className="p-xs-under c-pointer" onClick={onClickChangeThumbnailImg}>
                대표 이미지 수정하기
              </p>
            </ThumbnailImg>
            <div className="script-info-detail">
              <p className="p-medium-bold">작품 정보*</p>
              <div className="f-dir-column" id="info-input">
                <RectInputField
                  type="text"
                  placeholder="작품 제목을 입력해주세요."
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                {/* 가격 0원으로 고정 */}
                {/* <RectInputField
                  type="number"
                  placeholder="대본 가격을 숫자로 입력해주세요."
                  value={scriptPrice}
                  onChange={(e) => {
                    setScriptPrice(e.target.value);
                  }}
                />
                <RectInputField
                  type="number"
                  placeholder="공연권 가격을 숫자로 입력해주세요."
                  value={performPrice}
                  onChange={(e) => {
                    setPerformPrice(e.target.value);
                  }}
                /> */}
                <RectInputField
                  type="number"
                  placeholder="대본 가격을 숫자로 입력해주세요."
                  value={scriptPrice}
                  readOnly={true}
                />
                <RectInputField
                  type="number"
                  placeholder="공연권 가격을 숫자로 입력해주세요."
                  value={performPrice}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="d-flex" id="select-wrap">
            <div id="select">
              <p className="p-medium-bold">대본 판매 상태</p>
              <Select
                value={saleScriptStatus ? "scriptSale" : "notSale"}
                onChange={(event) => {
                  setSaleScriptStatus(event.target.value === "scriptSale");
                }}
                style={{ height: "2.125rem" }}
              >
                <option value="notSale">판매 중지</option>
                <option value="scriptSale">판매</option>
              </Select>
            </div>
            <div id="select">
              <p className="p-medium-bold">공연권 판매 상태</p>
              <Select
                value={salePerformStatus ? "performSale" : "notSale"}
                onChange={(event) => {
                  setSalePerformStatus(event.target.value === "performSale");
                }}
                style={{ height: "2.125rem" }}
              >
                <option value="notSale">판매 중지</option>
                <option value="performSale">판매</option>
              </Select>
            </div>
          </div>
          <div className="description-wrap">
            <FileInputBox
              title="작품 설명"
              onFileUpload={(file) => {
                setUploadedFile(file);
              }}
              style={{ width: "39.3125rem" }}
              titleStyle={{
                margin: "0",
                marginTop: "2.222vh",
                marginBottom: "0.63rem",
                fontSize: "1rem",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "1.5rem",
              }}
            />

            <div className="bottom-wrap">
              <div className="btn-wrap">
                <SmallOnOffBtn
                  text="취소하기"
                  color="white"
                  onClick={() => navigate("/mypage/scriptmanage")}
                />
                <SmallOnOffBtn
                  text="수정하기"
                  color="purple"
                  disabled={title === "" || scriptPrice === "" || performPrice === ""}
                  onClick={onClickModifyBtn}
                />
              </div>
            </div>
            <div className="j-content-end">
              <p
                id="delete"
                onClick={() => {
                  setShowDeleteAlertBox(true);
                }}
              >
                작품 삭제
              </p>
            </div>
            {showDeleteAlertBox ? (
              <div id="delete-alert-box" className="f-dir-column j-content-between a-items-center">
                <p className="p-medium-bold">작품을 정말 삭제할까요?</p>
                <div id="btn-wrap" className="d-flex">
                  <SmallOnOffBtn text="삭제하기" color="grey" onClick={onClickDeleteConfirm} />
                  <SmallOnOffBtn
                    text="취소하기"
                    color="purple"
                    onClick={() => {
                      setShowDeleteAlertBox(false);
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScriptManageDetail;
