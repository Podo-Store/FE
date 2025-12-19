import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import Button from "./../button/RoundBtn_149_48";

import { toastAlert } from "@/utils/ToastAlert";

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
const PurchasedScriptBtn = ({ script, id, title, productId, buyPerformance, style }) => {
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

  return (
    <div className="j-content-end purchased-script-btn">
      {buyPerformance !== 0 ? (
        <Button color="white" onClick={onClickPurchasePerform} style={style}>
          공연권 구매
        </Button>
      ) : null}

      <Button
        onClick={() => {
          navigate(`/list/view/${productId}`, {
            state: {
              script,
            },
          });
        }}
        style={style}
      >
        대본 열람하기
      </Button>
    </div>
  );
};

export default PurchasedScriptBtn;
