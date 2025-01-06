import { useNavigate } from "react-router-dom";

import OnOffBtn from "../../components/button/OnOffBtn";

import "./Abort.css";

const Abort = () => {
  const navigate = useNavigate();

  return (
    <div className="purchase-abort">
      <div className="purchase-abort-wrap">
        <div className="purchase-abort-content">
          <h5>결제를 실패하였습니다.</h5>
          <p>주문 내용 확인 후 다시 결제해주세요.</p>
          <OnOffBtn
            onClick={() => {
              navigate(-1);
            }}
            color="purple"
          >
            결제하러 가기
          </OnOffBtn>
        </div>
      </div>
    </div>
  );
};

export default Abort;
