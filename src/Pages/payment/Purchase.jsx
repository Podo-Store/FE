import Footer from "../Footer";
import MainNav from "../MainNav";
import "./Purchase.css";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatPrice } from "../../utils/formatPrice";

const Purchase = () => {
  const [title, setTitle] = useState("Archive");
  const [author, setAuthor] = useState("서준");
  // 장편극 / 단편극
  const [lengthType, setLengthType] = useState("장편극");
  const [scriptPrice, setScriptPrice] = useState(20000);
  const [isPerformSelected, setIsPerformSelected] = useState(true);
  const [performPrice, setPerformPrice] = useState(20000);

  const [totalPrice, setTotalPrice] = useState(scriptPrice);

  const navigate = useNavigate();

  useEffect(() => {
    if (isPerformSelected) {
      setTotalPrice(scriptPrice + performPrice);
    }
  }, [isPerformSelected]);

  return (
    <div className="purchase">
      <MainNav />
      <div className="purchase-wrap">
        <h4 id="title">결제</h4>
        <div className="purchase-flex">
          <div className="list-side">
            <div className="purchase-list">
              <div className="thumbnail"></div>
              <div className="detail">
                <h5>{title}</h5>
                <hr></hr>
                <h6>{author}</h6>
                <p id="tag"># {lengthType}</p>
                <div className="detail-price">
                  <img src={scriptImg}></img>
                  <p>{formatPrice(scriptPrice)}원</p>
                  {/* 공연권이 선택됐을 경우 */}
                  {isPerformSelected ? (
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <img src={performImg}></img>
                      <p>{formatPrice(performPrice)}원</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="purchase-side">
            <div className="purchase-summary-box">
              <h4>주문 요약</h4>
              <div className="price-wrap">
                {" "}
                {/* display: flex */}
                <p>대본 가격</p>
                <p>{formatPrice(scriptPrice)}원</p>
              </div>
              <div className="price-wrap">
                {" "}
                {/* display: flex */}
                <p>공연권 가격</p>
                <p>{formatPrice(performPrice)}원</p>
              </div>
              <hr></hr>
              <div className="price-wrap">
                {" "}
                {/* display: flex, last-child */}
                <p>총 금액</p>
                <p>{formatPrice(totalPrice)}원</p>
              </div>
            </div>
            <button
              className="purchase-btn"
              onClick={() => {
                alert("결제가 완료되었습니다.");
                navigate("/purchase/success");
              }}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Purchase;
