import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import GoBack from "../../components/button/GoBack";
import { PerformInputField } from "../../components/inputField";
import SmallOnOffBtn from "../../components/button/SmallOnOffBtn";

import plusBtn from "../../assets/image/button/circleAddBtn.svg";
import minusBtn from "../../assets/image/button/circleSubBtn.svg";

import "./PerformanceRefund.css";
import "./PerformanceTop.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

const PerformanceRefund = () => {
  const [reason, setReason] = useState("");
  const [currentAmount, setCurrentAmount] = useState(1);
  const [currentLength, setCurrentLength] = useState(0);

  const navigate = useNavigate();

  const POSSIBLE_MAX_AMOUNT = 10;
  const MAX_LENGTH = 50;

  /**
   * @param {number} action - 1: plus, -1: minus
   */
  const changeAmount = (action) => {
    if (action === 1 && currentAmount < POSSIBLE_MAX_AMOUNT) {
      setCurrentAmount(currentAmount + 1);
    }
    if (action === -1 && currentAmount > 1) {
      setCurrentAmount(currentAmount - 1);
    }
  };

  return (
    <div>
      <MainNav />
      <div className="min-height perform-refund perform-top">
        <GoBack url="/mypage/purchased" />
        <h4 className="h4-bold">구매한 작품들을 볼 수 있어요!</h4>

        <p className="p-medium-regular">공연권 환불 신청</p>
        <hr />
        <div className="script">
          <div className="d-flex">
            <div
              className="script-thumbnail"
              style={{
                backgroundImage: `url(${"default_image_url_here"})`,
              }}
            ></div>
            <div className="script-detail">
              <div className="script-tag">
                <div className="d-flex a-items-center" id="title">
                  <p className="p-large-bold" id="title">
                    Archive
                  </p>
                </div>
                <hr></hr>
                <p className="p-large-medium" id="author">
                  작가명작가명작가
                </p>
              </div>
            </div>
          </div>

          <hr />

          <div id="detail">
            <div className="j-content-between detail-content">
              <p className="p-medium-bold c-grey">구매 일자</p>
              <p className="p-medium-regular c-grey">YYYY. MM. DD. HH:MM:SS</p>
            </div>
            <hr />
            <div className="j-content-between detail-content">
              <p className="p-medium-bold c-grey">주문번호</p>
              <p className="p-medium-regular c-grey">XX</p>
            </div>
            <hr />
            <div className="j-content-between detail-content">
              <p className="p-medium-bold c-grey">구매한 공연권 수량 및 금액</p>
              <div className="j-content-end">
                <p className="p-large-medium c-grey">10</p>
                <div style={{ width: "2.69rem" }} />
                <p className="p-large-medium c-grey">000,000원</p>
              </div>
            </div>
            <hr />
            <div className="j-content-between detail-content">
              <p className="p-medium-bold c-grey">환불 가능한 공연권 수량 및 금액</p>
              <div className="j-content-end">
                <p className="p-large-medium c-grey">{POSSIBLE_MAX_AMOUNT}</p>
                <div style={{ width: "2.69rem" }} />
                <p className="p-large-medium c-grey">000,000원</p>
              </div>
            </div>
            <hr />
            <div className="j-content-between a-items-center detail-content" id="total">
              <p className="p-medium-bold">환불 예정 공연권 수량 및 금액</p>
              <div className="j-content-end a-items-center">
                <div className="j-content-between a-items-center" id="total-amount">
                  <img
                    className="c-pointer"
                    src={minusBtn}
                    alt="minusBtn"
                    onClick={() => {
                      changeAmount(-1);
                    }}
                  />
                  <p className="p-large-medium">{currentAmount}</p>
                  <img
                    className="c-pointer"
                    src={plusBtn}
                    alt="plusBtn"
                    onClick={() => {
                      changeAmount(1);
                    }}
                  />
                </div>
                <p className="p-large-medium" id="total-price">
                  000,000원
                </p>
              </div>
            </div>
          </div>

          <hr />
          <div className="j-content-between a-items-center">
            <p className="p-medium-bold">환불 사유</p>
            <p className="p-xs-medium">
              {currentLength} / {MAX_LENGTH}
            </p>
          </div>
          <div style={{ height: "0.63rem" }} />
          <PerformInputField
            placeholder="자유롭게 입력해주세요."
            value={reason}
            onChange={(event) => {
              if (event.target.value.length <= MAX_LENGTH) {
                setReason(event.target.value);
                setCurrentLength(event.target.value.length);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Backspace") {
                setReason(event.target.value);
              }
            }}
          />

          <div className="j-content-end" id="btn">
            <SmallOnOffBtn
              text="취소하기"
              color="white"
              onClick={() => {
                navigate("/mypage/purchased");
              }}
            />
            <SmallOnOffBtn text="신청하기" color="purple" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerformanceRefund;
