import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import download from "./../../assets/image/fileInput/download.svg";
import inputCheck from "./../../assets/image/fileInput/inputCheck.svg";

import "./FileInputBox.css";

const FileInputBox = ({ title, onFileUpload, style, titleStyle }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles) => {
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
    accept: "application/pdf",
  });

  const handleClick = (e) => {
    if (!Cookies.get("accessToken")) {
      e.preventDefault(); // 클릭 동작 중지
      e.stopPropagation(); // 이벤트 전파 중지
      alert("로그인이 필요한 서비스입니다.");
      navigate("/signin");
    }
  };

  return (
    <div className="file-input-box">
      {title ? <p style={{ ...titleStyle }}>{title}</p> : null}
      <div
        className="input-box-content"
        {...getRootProps({ onClick: handleClick })} // handleClick 함수를 getRootProps에 전달
        style={{ ...style }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>파일을 여기에 드롭하세요...</p>
        ) : uploadedFile ? (
          <p>{uploadedFile.name}</p>
        ) : (
          <p>파일을 마우스로 끌어오세요.</p>
        )}

        {uploadedFile ? (
          <div>
            <img src={inputCheck} alt="checked" />
            <p id="pdf"></p>
            <p id="find">다시하기</p>
          </div>
        ) : (
          <div>
            <img src={download} alt="download" />
            <p id="pdf">PDF</p>
            <p id="find">내 PC에서 찾기</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInputBox;
