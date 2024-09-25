import { useLocation, useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import PurchaseSummaryBox from "../../components/payment/PurchaseSummaryBox";

import "./PurchaseSuccess.css";
import OnOffBtn from "../../components/button/OnOffBtn";

const parseDate = (dateString) => {
  // 원래 문자열에서 T와 초 이하 부분 제거
  let formattedString = dateString.split(".")[0];

  // Date 객체로 변환
  let dateObj = new Date(formattedString);

  // 년, 월, 일, 시, 분, 초 가져오기
  let year = dateObj.getFullYear();
  let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  let day = String(dateObj.getDate()).padStart(2, "0");
  let hours = String(dateObj.getHours()).padStart(2, "0");
  let minutes = String(dateObj.getMinutes()).padStart(2, "0");
  let seconds = String(dateObj.getSeconds()).padStart(2, "0");

  // 원하는 형식으로 문자열 생성
  return `${year}. ${month}. ${day}. ${hours}:${minutes}:${seconds}`;
};

const PurchaseSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    orderDate,
    orderNumber,
    buyScript,
    scriptPrice,
    buyPerform,
    performPrice,
    performAmount,
  } = location.state || {};

  const formattedOrderDate = orderDate ? parseDate(orderDate) : "";

  return (
    <div className="PurchaseSuccess">
      <MainNav />
      <div className="purchase-success">
        <div className="purchase-success-content">
          <h1>대본 구매가 완료되었습니다.</h1>
          <div className="p-wrap">
            <p>&nbsp;{formattedOrderDate}</p>
            <div className="order-num">
              <p>주문 번호</p>
              <p>{orderNumber}</p>
            </div>
          </div>
          <div className="purchase-summary">
            <PurchaseSummaryBox
              title="결제 상품"
              page={1}
              buyScript={buyScript}
              scriptPrice={scriptPrice}
              buyPerform={buyPerform}
              performPrice={performPrice}
              performAmount={performAmount}
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
      <Footer />
    </div>
  );
};

export default PurchaseSuccess;
