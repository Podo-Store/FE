import axios from "axios";
import { SERVER_URL } from "../../constants/ServerURL";
import Cookies from "js-cookie";

const ContractStatus = {
  NON_SALE: 0,
  REQUEST: 1,
  PROCESSING: 2,
  COMPLETE: 3,
};

const PurchasedScriptBtn = ({ contractStatus, id }) => {
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
    <div className="btn-wrap">
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
      <button>대본 받기</button>
    </div>
  );
};

export default PurchasedScriptBtn;
