import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { SERVER_URL } from "../../constants/ServerURL";

import "./PurchasedScriptBtn.css";
import "./../../styles/utilities.css";

/**
 * 구매한 대본 페이지 버튼 component
 * @param {Object} props - props
 * @param {number} props.id - 구매 내역의 id
 * @param {number} props.productId - 작품의 개별 id
 * @param {number} props.buyPerformance - 0: 구매 불가, 1: 계약 필요, 2: 구매 가능 아이콘 추가
 * @returns
 */
const PurchasedScriptBtn = ({ id, title, productId, buyPerformance }) => {
  const navigate = useNavigate();

  const onClickPurchasePerform = async () => {
    navigate(`/purchase/${productId}`, {
      state: {
        isScriptSelected: false,
        isPerformSelected: true,
        // 0: 공연권 구매 X, 1~: 구매 개수
        purchasePerformAmount: 1,
      },
    });
  };

  const onClickDownloadScript = async () => {
    alert("대본 다운로드 중...");
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
    <div className="j-content-end purchased-script-btn">
      {buyPerformance !== 0 ? (
        <button
          style={{
            backgroundColor: "#ffffff",
            border: "3px solid var(--Main, #6A39C0)",
            color: "var(--Main, #6A39C0)",
          }}
          onClick={onClickPurchasePerform}
        >
          공연권 구매
        </button>
      ) : null}

      <button style={{ backgroundColor: "var(--Main, #6A39C0)" }} onClick={onClickDownloadScript}>
        대본 받기
      </button>
    </div>
  );
};

export default PurchasedScriptBtn;
