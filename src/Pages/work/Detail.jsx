import Footer from "../Footer";
import MainNav from "../MainNav";
import typeWriterImg from "./../../assets/image/post/vintageTypeWriter.svg";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import "./Detail.css";

const detail = ({
  title = "Archive",
  author = "서준",
  scriptPrice = "30,000",
  performPrice = "30,000",
  description = "교보문고 보니까 아예 이미지로 홍보 내용을 만들어서 올렸더라구요.. 기본 정보 (발행(출시)일자, 쪽 수, ), 목차, 줄거리, 작가 정보, 수상 정보, 책 속으로 (p. 27 이렇게해서인용도하더라구요",
}) => {
  return (
    <div className="detail">
      <MainNav />
      <div className="detail-wrap">
        <div className="detail-title-wrap">
          <div className="detail-thumbnail-wrap">
            <div
              className="thumbnail-img"
              style={{
                backgroundImage: `url(${typeWriterImg})`,
              }}
            ></div>
          </div>
          <div className="detail-title">
            <h1>
              {title}
              <br />
              {author}
            </h1>
            <div className="detail-price">
              <img src={scriptImg} alt="script image"></img>
              <p>대본 {scriptPrice} 원</p>
            </div>
            <div className="detail-price">
              <img src={performImg} alt="perform image"></img>
              <p>공연권 {performPrice} 원</p>
            </div>
            <h4>옵션 선택</h4>
            <select name="" id="option">
              <option value="" disabled selected>
                옵션 선택
              </option>
              <option value="">대본</option>
              <option value="">대본 & 공연권</option>
            </select>
            <div className="detail-btn-wrap">
              <button id="cart-btn">장바구니</button>
              <button id="purchase-btn">구매하기</button>
            </div>
          </div>
        </div>

        <div className="detail-description">
          <hr></hr>

          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </div>
      <div className="detail-bottom-bar">
        <h6>총 금액</h6>
        <h3> 60,000 원</h3>
        <select name="" id="option">
          <option value="" disabled selected>
            옵션 선택
          </option>
          <option value="">대본</option>
          <option value="">대본 & 공연권</option>
        </select>
        <button id="cart-btn">장바구니</button>
        <button id="purchase-btn">구매하기</button>
      </div>
      <Footer />
    </div>
  );
};

export default detail;
