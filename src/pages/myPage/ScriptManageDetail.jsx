import goBackArrowImg from "../../assets/image/myPage/goBackArrow.svg";
import downloadImg from "../../assets/image/myPage/download.svg";
import "./ScriptManageDetail.css";
import MainNav from "../MainNav";
import Footer from "../Footer";
import RectInputField from "../../components/inputField/RectInputField";
import { useState } from "react";
import Select from "../../components/select/Select";

const ScriptManageDetail = () => {
  const [title, setTitle] = useState("");
  const [scriptPrice, setScriptPrice] = useState("");
  const [performPrice, setPerformPrice] = useState("");

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
              <RectInputField
                title="작품 제목"
                type="text"
                placeholder="podo_store"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <div className="script-info-detail-price">
                <RectInputField
                  title="대본 가격 (원)"
                  type="text"
                  placeholder="00,000"
                  value={scriptPrice}
                  onChange={(e) => {
                    setScriptPrice(e.target.value);
                  }}
                />
                <RectInputField
                  title="공연권 가격 (원)"
                  type="text"
                  placeholder="00,000"
                  value={performPrice}
                  onChange={(e) => {
                    setPerformPrice(e.target.value);
                  }}
                />
              </div>
              <p>상태 변경하기</p>
              <Select>
                <option value="notSale">대본&공연권 모두 판매 중지</option>
                <option value="scriptSale">대본만 판매</option>
                <option value="performSale">공연권만 판매</option>
                <option value="scriptPerformSale">대본&공연권 모두 판매</option>
              </Select>
            </div>
          </div>
          <div className="description-wrap">
            <p>작품 설명</p>
            <div className="script-description">
              <p>파일을 마우스로 끌어오세요.</p>
              <img src={downloadImg} alt="download" />
              <p id="pdf">PDF</p>
              <p id="find">내 PC에서 찾기</p>
            </div>
            <div className="bottom-wrap">
              <p id="delete">작품 삭제</p>
              <div className="btn-wrap">
                <button id="cancel">취소하기</button>
                <button id="modify">수정하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScriptManageDetail;
