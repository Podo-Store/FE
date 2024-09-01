import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import download from "./../../assets/image/fileInput/download.svg";
import inputCheck from "./../../assets/image/fileInput/inputCheck.svg";

import "./FileInputBox.css";

const FileInputBox = ({ title, onFileUpload, style }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // 첫 번째 파일만 처리
      const file = acceptedFiles[0];
      setUploadedFile(file);
      // 상위 component 전달
      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="file-input-box">
      {title ? <p>{title}</p> : null}
      <div className="input-box-content" {...getRootProps()} style={{ ...style }}>
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
