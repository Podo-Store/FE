import { InputField } from "../../components/auth";
import goBackArrowImg from "../../assets/image/myPage/goBackArrow.svg";
import downloadImg from "../../assets/image/myPage/download.svg";
import "./ScriptManageDetail.css";
import MainNav from "../MainNav";
import Footer from "../Footer";

const ScriptManageDetail = () => {
  return (
    <div className="script-manage-detail">
      <MainNav />
      <div className="script-manage-detail-wrap">
        <div className="go-back">
          <img src={goBackArrowImg} alt="go back"></img>
          <h6>뒤로가기</h6>
        </div>
        <h1>등록한 작품들을 관리할 수 있어요!</h1>
        <p id="title">작품 상세 페이지 수정</p>
        <hr />
        <div className="script-info-wrap">
          <div className="script-info">
            <div className="script-info-thumbnail">
              <p>대표 이미지 수정하기</p>
            </div>
            <div className="script-info-detail">
              <InputField title="작품 제목" type="text" placeholder="podo_store" />
              <div className="script-info-detail-price">
                <InputField title="대본 가격 (원)" type="text" placeholder="00,000" />
                <InputField title="공연권 가격 (원)" type="text" placeholder="00,000" />
              </div>
              <p>상태 변경하기</p>
              <select name="" id="option">
                <option value="script">판매 중지</option>
                <option value="scriptPerform">판매중</option>
              </select>
            </div>
          </div>
          <p>작품 설명</p>
          <div className="script-description">
            <p>파일을 마우스로 끌어오세요.</p>
            <img src={downloadImg} alt="download"></img>
            <p id="find">내 PC에서 찾기</p>
          </div>
          <div className="btn-wrap">
            <button>취소하기</button>
            <button>수정하기</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScriptManageDetail;
