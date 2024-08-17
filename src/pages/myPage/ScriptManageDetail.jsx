import goBackArrowImg from "../../assets/image/myPage/goBackArrow.svg";
import downloadImg from "../../assets/image/myPage/download.svg";
import "./ScriptManageDetail.css";
import MainNav from "../MainNav";
import Footer from "../Footer";
import RectInputField from "../../components/inputField/RectInputField";
import { useCallback, useEffect, useState } from "react";
import Select from "../../components/select/Select";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useRequest } from "../../hooks/useRequest";
import axios from "axios";
import { SERVER_URL } from "../../constants/ServerURL";
import Cookies from "js-cookie";

const ScriptManageDetail = () => {
  const [title, setTitle] = useState("");
  const [scriptPrice, setScriptPrice] = useState("");
  const [performPrice, setPerformPrice] = useState("");
  const [thumbnailImg, setThumbnailImg] = useState(null);

  const [saleScriptStatus, setSaleScriptStatus] = useState(false);
  const [salePerformStatus, setSalePerformStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [uploadedFile, setUploadedFile] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useRequest(async () => {
    try {
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
      // TODO: 이미지 형식 API 반영
      //setThumbnailImg(response.data.imagePath);
      setSaleScriptStatus(response.data.script);
      setSalePerformStatus(response.data.performance);
      setUploadedFile(response.data.descriptionPath);
    } catch (error) {
      alert(error.response.data.error || "예상치 못한 오류가 발생했습니다.");
    }
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

  const onDrop = useCallback((acceptedFiles) => {
    // 첫 번째 파일만 처리
    const file = acceptedFiles[0];
    setUploadedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onClickChangeThumbnailImg = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      setThumbnailImg(file);
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

    // API 요청
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("script", updatedSaleScriptStatus);
      formData.append("performance", updatedSalePerformStatus);
      formData.append("scriptPrice", scriptPrice);
      formData.append("performancePrice", performPrice);
      if (thumbnailImg) {
        formData.append("scriptImage", thumbnailImg);
      }
      if (uploadedFile) {
        formData.append("description", uploadedFile);
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

  return (
    <div className="script-manage-detail">
      <MainNav />
      <div className="script-manage-detail-wrap">
        <div
          className="go-back"
          onClick={() => {
            navigate("/mypage/scriptmanage");
          }}
        >
          <img src={goBackArrowImg} alt="go back"></img>
          <h6>뒤로가기</h6>
        </div>
        <h1>등록한 작품들을 관리할 수 있어요!</h1>
        <p id="title">작품 상세 페이지 수정</p>
        <hr />
        <div className="script-info-wrap">
          <div className="script-info">
            <div
              className="script-info-thumbnail"
              style={{ backgroundImage: `url(${thumbnailImg ? thumbnailImg : null})` }}
            >
              {/* TODO: ㄴ이미지 업로드 시 미리보기 */}
              <p onClick={onClickChangeThumbnailImg}>대표 이미지 수정하기</p>
            </div>
            <div className="script-info-detail">
              <RectInputField
                title="작품 제목"
                type="text"
                placeholder="podo_store"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <div className="script-info-detail-price">
                <RectInputField
                  title="대본 가격 (원)"
                  type="text"
                  placeholder="00,000"
                  value={scriptPrice}
                  onChange={(e) => {
                    setScriptPrice(e.target.value);
                  }}
                />
                <RectInputField
                  title="공연권 가격 (원)"
                  type="text"
                  placeholder="00,000"
                  value={performPrice}
                  onChange={(e) => {
                    setPerformPrice(e.target.value);
                  }}
                />
              </div>
              <p>상태 변경하기</p>
              <Select
                value={selectedOption}
                onChange={(event) => {
                  setSelectedOption(event.target.value);
                }}
              >
                <option value="notSale">대본&공연권 모두 판매 중지</option>
                <option value="scriptSale">대본만 판매</option>
                <option value="performSale">공연권만 판매</option>
                <option value="scriptPerformSale">대본&공연권 모두 판매</option>
              </Select>
            </div>
          </div>
          <div className="description-wrap">
            <p>작품 설명</p>
            <div
              className="script-description"
              {...getRootProps()}
              style={{
                border: "2px dashed #007bff",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>파일을 여기에 드롭하세요...</p>
              ) : uploadedFile ? (
                <p>업로드된 파일: {uploadedFile.name}</p>
              ) : (
                <p>파일을 마우스로 끌어오세요.</p>
              )}
              <img src={downloadImg} alt="download" />
              <p id="pdf">PDF</p>
              <p id="find">내 PC에서 찾기</p>
            </div>
            <div className="bottom-wrap">
              <p id="delete">작품 삭제</p>
              <div className="btn-wrap">
                <button
                  id="cancel"
                  onClick={() => {
                    navigate("/mypage/scriptmanage");
                  }}
                >
                  취소하기
                </button>
                <button id="modify" onClick={onClickModifyBtn}>
                  수정하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScriptManageDetail;