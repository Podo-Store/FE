import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { SERVER_URL } from "../../constants/ServerURL";

import "./PurchasedPerformBtn";

const PurchaseStatus = {
  NON_PURCHASED: 0,
  SCRIPT_ONLY: 1,
  SCRIPT_PERFORM_BOTH: 2,
};

const BuyPerformance = {
  NON_SALE: 0,
  CONTRACT_REQUIRED: 1,
  CONTRACT_PROCEEDING: 2,
  PURCHASE_POSSIBLE: 3,
};

// TODO: 안쓰는거 삭제

/**
 * 구매한 대본 페이지 버튼 component
 * @param {number} id - 구매 내역의 id
 * @param {number} productId - 작품의 개별 id
 * @param {Object} purchaseStatus - 대본 / 공연권을 구매했는지 여부
 * @param {boolean} purchaseStatus[0] - 대본
 * @param {boolean} purchaseStatus[1] - 공연권
 * @param {number} buyPerformance - 0: 구매 불가, 1: 계약 필요, 2: 구매 가능 아이콘 추가
 * @returns
 */
const PurchasedScriptBtn = ({
  // purchaseStatus[0 / 1]: 대본 / 공연권을 구매했는지 여부
  purchaseStatus,
  isScriptPurchased,
  isPerformPurchased,
  id,
  title,
  productId,
  buyPerformance,
}) => {
  const navigate = useNavigate();

  let purchaseStatusNum;
  // Check if purchaseStatus is defined and is an array with at least 2 elements
  if (Array.isArray(purchaseStatus) && purchaseStatus.length >= 2) {
    if (purchaseStatus[0] === false && purchaseStatus[1] === false) {
      purchaseStatusNum = PurchaseStatus.NON_PURCHASED;
    } else if (purchaseStatus[0] === true && purchaseStatus[1] === false) {
      purchaseStatusNum = PurchaseStatus.SCRIPT_ONLY;
    } else {
      purchaseStatusNum = PurchaseStatus.SCRIPT_PERFORM_BOTH;
    }
  } else {
    // Handle the case where purchaseStatus is not defined or not an array
    purchaseStatusNum = PurchaseStatus.NON_PURCHASED;
  }

  /*
  if (isScriptPurchased === false && isPerformPurchased === false) {
    purchaseStatusNum = PurchaseStatus.NON_PURCHASED;
  } else if (isScriptPurchased === true && isPerformPurchased === false) {
    purchaseStatusNum = PurchaseStatus.SCRIPT_ONLY;
  } else {
    purchaseStatusNum = PurchaseStatus.SCRIPT_PERFORM_BOTH;
  }
    */

  const onClickPurchasePerform = async () => {
    navigate(`/purchase/${productId}`, {
      state: {
        isScriptSelected: false,
        isPerformSelected: true,
      },
    });
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
        /*
        {
          [PurchaseStatus.NON_PURCHASED]: null,
          [PurchaseStatus.SCRIPT_ONLY]: (
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
          ),
          [PurchaseStatus.SCRIPT_PERFORM_BOTH]: (
            // disabled 상태
            <button style={{ backgroundColor: "var(--grey4, #BABABA)", cursor: "default" }}>
              공연권 구매
            </button>
          ),
        }[purchaseStatusNum]
      }{
        */
        {
          [BuyPerformance.NON_SALE]: null,
          // [BuyPerformance.CONTRACT_REQUIRED]: (
          //   // disabled 상태
          //   <button style={{ backgroundColor: "var(--grey4, #BABABA)", cursor: "default" }}>
          //     공연권 구매
          //   </button>
          // ),
          // [BuyPerformance.CONTRACT_PROCEEDING]: (
          //   // disabled 상태
          //   <button style={{ backgroundColor: "var(--grey4, #BABABA)", cursor: "default" }}>
          //     공연권 구매
          //   </button>
          // ),
          [BuyPerformance.CONTRACT_REQUIRED]: (
            // enabled 상태
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
          ),
          [BuyPerformance.CONTRACT_PROCEEDING]: (
            // enabled 상태
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
          ),
          [BuyPerformance.PURCHASE_POSSIBLE]: (
            // enabled 상태
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
          ),
        }[buyPerformance]
      }
      <button style={{ backgroundColor: "var(--Main, #6A39C0)" }} onClick={onClickDownloadScript}>
        대본 받기
      </button>
    </div>
  );
};

export default PurchasedScriptBtn;
