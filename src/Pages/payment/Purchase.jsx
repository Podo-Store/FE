import Footer from "../Footer";
import MainNav from "../MainNav";
import "./Purchase.css";
import scriptImg from "./../../assets/image/post/list/script.svg";

const Purchase = () => {
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
                <h5>Archive</h5>
                <hr></hr>
                <h6>작가명작가명작가</h6>
                <p id="tag"># 장편극</p>
                <div className="detail-price">
                  <img src={scriptImg} alt="script image"></img>
                  <p>20,000원</p>
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
                <p>60,000원</p>
              </div>
              <div className="price-wrap">
                {" "}
                {/* display: flex */}
                <p>공연권 가격</p>
                <p>60,000원</p>
              </div>
              <hr></hr>
              <div className="price-wrap">
                {" "}
                {/* display: flex, last-child */}
                <p>총 금액</p>
                <p>60,000원</p>
              </div>
            </div>
            <button className="purchase-btn">결제하기</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Purchase;
