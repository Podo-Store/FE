import { useLocation, useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import PurchaseSummaryBox from "../../components/payment/PurchaseSummaryBox";

import "./PurchaseSuccess.css";

const PurchaseSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDate, orderNumber, buyScript, scriptPrice, buyPerform, performPrice, totalPrice } =
    location.state || {};

  return (
    <div className="PurchaseSuccess">
      <MainNav />
      <div className="purchase-success">
        <h1 id="title">결제 완료</h1>
        <div className="purchase-success-content">
          <h1>대본 구매가 완료되었습니다.</h1>
          <div className="p-wrap">
            <p>&nbsp;{orderDate}</p>
            <div className="order-num">
              <p>주문 번호</p>
              <p>{orderNumber}</p>
            </div>
          </div>
          <div className="purchase-summary">
            <PurchaseSummaryBox
              title="결제 상품"
              buyScript={buyScript}
              scriptPrice={scriptPrice}
              buyPerform={buyPerform}
              performPrice={performPrice}
              totalPrice={totalPrice}
            />
            <div className="btn-wrap">
              <button
                onClick={() => {
                  navigate("/mypage/purchased");
                }}
              >
                구매한 작품 보러가기
              </button>
              <button
                onClick={() => {
                  navigate("/list");
                }}
              >
                작품 더 둘러보기
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchaseSuccess;
