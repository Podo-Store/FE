import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import OnOffBtn from "../../components/button/OnOffBtn";
import PurchaseSummaryBox from "../../components/payment/PurchaseSummaryBox";
import Loading from "../Loading";

import { useRequest } from "../../hooks/useRequest";

import formatDate2 from "../../utils/formatDate2";

import { SERVER_URL } from "../../constants/ServerURL";

import "./PurchaseSuccess.css";

const PurchaseSuccess = () => {
  const [orderDate, setOrderDate] = useState("");
  const [scriptTitle, setScriptTitle] = useState("");
  const [buyScript, setBuyScript] = useState(false);
  const [scriptPrice, setScriptPrice] = useState(0);
  const [performAmount, setPerformAmount] = useState(0);
  const [performPrice, setPerformPrice] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = location.state || {};

  useRequest(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${SERVER_URL}order/success`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        params: {
          orderId,
        },
      });

      setOrderDate(response.data.orderDate);
      setScriptTitle(response.data.title);
      setBuyScript(response.data.script);
      setScriptPrice(response.data.scriptPrice);
      setPerformAmount(response.data.performanceAmount);
      setPerformPrice(response.data.performancePrice);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  });

  const formattedOrderDate = orderDate ? formatDate2(orderDate) : "";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="PurchaseSuccess">
      <div className="purchase-success">
        <div className="purchase-success-content">
          <h1>결제가 완료되었습니다.</h1>
          <div className="p-wrap">
            <p>&nbsp;{formattedOrderDate}</p>
            <div className="order-num">
              <p>주문 번호</p>
              <p>{orderId}</p>
            </div>
          </div>
          <div className="purchase-summary">
            <PurchaseSummaryBox
              title="결제 상품"
              page={1}
              buyScript={buyScript}
              scriptPrice={scriptPrice}
              buyPerform={performAmount !== 0 ? true : false}
              performPrice={performPrice}
              performAmount={performAmount}
              scriptTitle={scriptTitle}
            />
            <div className="btn-wrap">
              <OnOffBtn
                text="구매한 작품 보러가기"
                color="white"
                onClick={() => {
                  navigate("/mypage/purchased");
                }}
              />
              <OnOffBtn
                text="작품 더 둘러보기"
                color="purple"
                onClick={() => {
                  navigate("/list");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
