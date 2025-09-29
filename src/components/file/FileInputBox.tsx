import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import InfoPopup from "../popup/InfoPopup";

import download from "./../../assets/image/fileInput/ic_download.svg";
import inputCheck from "./../../assets/image/fileInput/inputCheck.svg";
import circleInfoBtn from "./../../assets/image/button/circleInfoBtn.svg";
import circleInfoGrayBtn from "./../../assets/image/button/circleInfoGrayBtn.svg";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import "./FileInputBox.css";

interface FileInputBoxProps {
  title: string;
  infoText?: string;
  onFileUpload: (file: File) => void;
  style: React.CSSProperties;
  className?: string;
  titleStyle?: React.CSSProperties;
  grayInfoBtn?: boolean;
}

const FileInputBox: React.FC<FileInputBoxProps> = ({
  title,
  infoText = "",
  onFileUpload,
  style,
  titleStyle,
  grayInfoBtn = false,
  className,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [showPopup, setShowPopup] = useState(false);
  const {
    widthConditions: { isSmallMobile },
  } = useWindowDimensions();
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!Cookies.get("accessToken")) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/signin");
        return;
      }

      // 첫 번째 파일만 처리
      const file = acceptedFiles[0];

      if (file.type !== "application/pdf") {
        alert("PDF 파일만 업로드할 수 있습니다.");
        return;
      }

      setUploadedFile(file);
      // 상위 component 전달
      onFileUpload(file);
    },
    [onFileUpload, navigate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
    },
    multiple: false,
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!Cookies.get("accessToken")) {
      e.preventDefault(); // 클릭 동작 중지
      e.stopPropagation(); // 이벤트 전파 중지
      alert("로그인이 필요한 서비스입니다.");
      navigate("/signin");
    }
  };

  return (
    <div className="file-input-box">
      <div
        className="flex items-center title"
        style={!title ? { marginTop: "0" } : {}}
      >
        {title ? (
          <p className={className} style={{ ...titleStyle }}>
            {title}
          </p>
        ) : null}{" "}
        {infoText ? (
          <>
            <img
              id="_info-btn"
              className="c-pointer"
              src={grayInfoBtn ? circleInfoBtn : circleInfoBtn}
              alt="circleInfoBtn"
              onClick={() => {
                setShowPopup(!showPopup);
              }}
            />
            {showPopup ? (
              <InfoPopup
                message={infoText}
                onClose={() => {
                  setShowPopup(!showPopup);
                }}
                style={{
                  top: "unset",
                  bottom: "0",
                  padding: "11px",
                  transform: "translate(calc(20px + 75px), 0)",
                }}
                buttonId="_info-btn"
              />
            ) : null}
          </>
        ) : null}
      </div>
      <div
        className="input-box-content"
        {...getRootProps({ onClick: handleClick })} // handleClick 함수를 getRootProps에 전달
        style={{ ...style }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p
            className={`${
              isSmallMobile ? "p-small-medium" : "p-medium-medium"
            }`}
          >
            파일을 여기에 드롭하세요...
          </p>
        ) : uploadedFile ? (
          <p
            className={`${
              isSmallMobile ? "p-small-medium" : "p-medium-medium"
            }`}
          >
            {uploadedFile.name}
          </p>
        ) : (
          <p
            className={`${
              isSmallMobile ? "p-small-medium" : "p-medium-medium"
            }`}
          >
            파일을 마우스로 끌어오세요.
          </p>
        )}

        {uploadedFile ? (
          <div>
            <img src={inputCheck} alt="checked" />
            <p
              id="pdf"
              className={`${
                isSmallMobile ? "p-small-medium" : "p-medium-medium"
              }`}
            ></p>
            <p
              id="find"
              className={`${
                isSmallMobile ? "p-small-medium" : "p-medium-medium"
              }`}
            >
              다시하기
            </p>
          </div>
        ) : (
          <div className="flex-col items-center ">
            <img
              src={download}
              alt="download"
              className="size-[40px] mx-auto mb-[4px]"
            />
            <p id="pdf" className="p-small-bold">
              PDF
            </p>
            <p
              id="find"
              className={`${isSmallMobile ? "p-xs-under" : "p-small-under"}`}
            >
              내 PC에서 찾기
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInputBox;
