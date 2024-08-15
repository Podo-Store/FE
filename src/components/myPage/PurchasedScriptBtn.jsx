import axios from "axios";
import { SERVER_URL } from "../../constants/ServerURL";
import Cookies from "js-cookie";
import "./PurchasedScriptBtn.css";

const ContractStatus = {
  NON_SALE: 0,
  REQUEST: 1,
  PROCESSING: 2,
  COMPLETE: 3,
};

const PurchasedScriptBtn = ({ contractStatus, id, title }) => {
  const onClickRequestBtn = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}profile/mailSend`,
        { id: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      if (response.data === true) {
        alert("메일이 발송되었습니다.");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const onClickOpenContract = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}profile/contract`, {
        headers: {
          "Content-Type": "multipart/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        params: {
          id: id,
        },
      });
      window.open(response.data);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const onClickDownloadScript = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}profile/download`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        params: {
          id: id,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.pdf`); // 파일명 추출 및 설정
      document.body.appendChild(link);
      link.click(); // 링크 클릭으로 다운로드 시작
      link.remove(); // 링크 요소 제거
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="purchased-script-btn">
      {
        {
          [ContractStatus.NON_SALE]: null,
          [ContractStatus.REQUEST]: (
            <button style={{ backgroundColor: "#3876F2" }} onClick={onClickRequestBtn}>
              공연권 신청
            </button>
          ),
          [ContractStatus.PROCESSING]: (
            <button style={{ backgroundColor: "#BABABA" }}>계약 중</button>
          ),
          // TODO: 계약서 열람 API 연결
          [ContractStatus.COMPLETE]: (
            <button style={{ backgroundColor: "#D9ADCD" }} onClick={onClickOpenContract}>
              계약서 열람
            </button>
          ),
        }[contractStatus]
      }
      <button onClick={onClickDownloadScript}>대본 받기</button>
    </div>
  );
};

export default PurchasedScriptBtn;
