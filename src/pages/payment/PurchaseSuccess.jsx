import { useLocation, useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import OnOffBtn from "../../components/button/OnOffBtn";
import PurchaseSummaryBox from "../../components/payment/PurchaseSummaryBox";

import formatDate2 from "../../utils/formatDate2";

import "./PurchaseSuccess.css";

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
    scriptTitle,
  } = location.state || {};

  const formattedOrderDate = orderDate ? formatDate2(orderDate) : "";

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
      <Footer />
    </div>
  );
};

export default PurchaseSuccess;
