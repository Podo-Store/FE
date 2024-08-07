import Footer from "../Footer";
import MainNav from "../MainNav";
import "./PurchasedScript.css";
import pencilImg from "../../assets/image/myPage/pencil.svg";
import scriptImg from "../../assets/image/myPage/script.svg";

const PurchasedScript = () => {
  return (
    <div className="purchased-script">
      <MainNav />
      <div className="purchased-script-wrap">
        <div className="menu-side">
          <h1>알맹이 000 님,</h1>
          <h3>오늘도 달콤한 하루 되세요!</h3>
          <div className="select-menu-btn">
            <h6>작품 관리</h6>
            <img src={pencilImg}></img>
          </div>
          <div className="select-menu-btn">
            <h6>구매한 작품</h6>
            <img src={scriptImg}></img>
          </div>
          <p>회원 정보 수정</p>
        </div>
        <div className="content-side">
          <h1>구매한 작품들을 볼 수 있어요!</h1>
          <h3 id="date">YYYY.MM.DD.</h3>
          <hr></hr>
          <div className="script">
            <div className="script-thumbnail"></div>
            <div className="script-detail">
              <h3>Archive</h3>
              <hr></hr>
              <h4>작가명작가명작가</h4>
              <div className="price-wrap">
                <img></img>
                <p>00,000 원</p>
              </div>
              <div className="price-wrap">
                <img></img>
                <p>00,000 원</p>
              </div>
              <div className="btn-wrap">
                <button>공연권 신청</button>
                <button>대본 받기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchasedScript;
