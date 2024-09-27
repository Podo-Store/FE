import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import "./Abort.css";

const Abort = () => {
  const navigate = useNavigate();

  return (
    <div className="purchase-abort">
      <MainNav />
      <div className="purchase-abort-wrap">
        <h5 id="title">결제 취소</h5>
        <div className="purchase-abort-content">
          <h5>결제가 취소되었습니다.</h5>
          <p>주문 내용 확인 후 다시 결제해주세요.</p>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            결제하러 가기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Abort;
