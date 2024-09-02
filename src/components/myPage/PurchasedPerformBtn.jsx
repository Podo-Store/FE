import axios from "axios";
import Cookies from "js-cookie";

import { SERVER_URL } from "../../constants/ServerURL";

import "./PurchasedScriptBtn.css";

const ContractStatus = {
  NON_SALE: 0,
  REQUEST: 1,
  PROCESSING: 2,
  COMPLETE: 3,
};

const PurchasedPerformBtn = ({ contractStatus, id, title }) => {
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

  return (
    <div className="purchased-script-btn">
      {
        {
          [ContractStatus.NON_SALE]: null,
          [ContractStatus.REQUEST]: (
            <button style={{ backgroundColor: "var(--Main, #6A39C0)" }} onClick={onClickRequestBtn}>
              공연권 신청
            </button>
          ),
          [ContractStatus.PROCESSING]: (
            <button style={{ backgroundColor: "var(--grey4, #BABABA)" }}>계약 중</button>
          ),
          [ContractStatus.COMPLETE]: (
            <button
              style={{
                backgroundColor: "#ffffff",
                border: "3px solid var(--Main, #6A39C0)",
                color: "var(--Main, #6A39C0)",
              }}
              onClick={onClickOpenContract}
            >
              계약서 열람
            </button>
          ),
        }[contractStatus]
      }
      {/*<button onClick={onClickDownloadScript}>대본 받기</button>*/}
    </div>
  );
};

export default PurchasedPerformBtn;
