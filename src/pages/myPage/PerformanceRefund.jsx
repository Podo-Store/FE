import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import GoBack from "../../components/button/GoBack";
import OnOffBtn from "../../components/button/OnOffBtn";
import { PerformInputField } from "../../components/inputField";
import SmallOnOffBtn from "../../components/button/SmallOnOffBtn";

import { useRequest } from "../../hooks/useRequest";

import { formatPrice } from "../../utils/formatPrice";
import formatDate2 from "../../utils/formatDate2";

import { SERVER_URL } from "../../constants/ServerURL";

import plusBtn from "../../assets/image/button/circleAddBtn.svg";
import minusBtn from "../../assets/image/button/circleSubBtn.svg";

import "./PerformanceRefund.css";
import "./PerformanceTop.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

const PerformanceRefund = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [singlePrice, setSinglePrice] = useState(0);
  const [orderDate, setOrderDate] = useState("");
  const [orderNum, setOrderNum] = useState(0);
  const [orderedAmount, setOrderedAmount] = useState(0);
  const [orderedPrice, setOrderedPrice] = useState(0);
  const [refundPossibleAmount, setRefundPossibleAmount] = useState(0);
  const [refundPossiblePrice, setRefundPossiblePrice] = useState(0);

  const [reason, setReason] = useState("");
  const [currentAmount, setCurrentAmount] = useState(1);
  const [currentLength, setCurrentLength] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const MAX_LENGTH = 50;

  useRequest(async () => {
    try {
      const response = await axios.get(`${SERVER_URL}profile/refund`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        params: {
          id,
        },
      });

      setTitle(response.data.title);
      setAuthor(response.data.writer);
      setSinglePrice(response.data.performancePrice);
      setOrderDate(response.data.orderDate);
      setOrderNum(response.data.orderNum);
      setOrderedAmount(response.data.orderAmount);
      setOrderedPrice(response.data.orderPrice);
      setRefundPossibleAmount(response.data.possibleAmount);
      setRefundPossiblePrice(response.data.possiblePrice);
    } catch (error) {
      alert(error.response.data.error);
    }
  });

  /**
   * @param {number} action - 1: plus, -1: minus
   */
  const changeAmount = (action) => {
    if (action === 1 && currentAmount < refundPossibleAmount) {
      setCurrentAmount(currentAmount + 1);
    }
    if (action === -1 && currentAmount > 1) {
      setCurrentAmount(currentAmount - 1);
    }
  };

  const onClickRequestRefund = async () => {
    try {
      await axios.post(
        `${SERVER_URL}profile/refund`,
        {
          orderItemId: id,
          refundAmount: currentAmount,
          reason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      setShowPopup(true);
    } catch (error) {
      alert(error.response.data.error);
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
                    {title}
                  </p>
                </div>
                <hr></hr>
                <p className="p-large-medium" id="author">
                  {author}
                </p>
              </div>
            </div>
          </div>

          <hr />

          <div id="detail">
            <div className="j-content-between detail-content">
              <p className="p-medium-bold c-grey">구매 일자</p>
              <p className="p-medium-regular c-grey">{orderDate ? formatDate2(orderDate) : ""}</p>
            </div>
            <hr />
            <div className="j-content-between detail-content">
              <p className="p-medium-bold c-grey">주문번호</p>
              <p className="p-medium-regular c-grey">{orderNum}</p>
            </div>
            <hr />
            <div className="j-content-between detail-content">
              <p className="p-medium-bold c-grey">구매한 공연권 수량 및 금액</p>
              <div className="j-content-end">
                <p className="p-large-medium c-grey">{orderedAmount}</p>
                <div style={{ width: "2.69rem" }} />
                <p className="p-large-medium c-grey">{formatPrice(orderedPrice)}원</p>
              </div>
            </div>
            <hr />
            <div className="j-content-between detail-content">
              <p className="p-medium-bold c-grey">환불 가능한 공연권 수량 및 금액</p>
              <div className="j-content-end">
                <p className="p-large-medium c-grey">{refundPossibleAmount}</p>
                <div style={{ width: "2.69rem" }} />
                <p className="p-large-medium c-grey">{formatPrice(refundPossiblePrice)}원</p>
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
                  {formatPrice(singlePrice * currentAmount)}원
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
                if (showPopup) {
                  return;
                }
                navigate("/mypage/purchased");
              }}
            />
            <SmallOnOffBtn
              text="신청하기"
              color="purple"
              disabled={reason.length === 0}
              onClick={() => {
                if (showPopup) {
                  return;
                }
                onClickRequestRefund();
              }}
            />
          </div>
          {showPopup ? (
            <div className="f-dir-column j-content-center" id="refund-popup">
              <p>환불 신청이 완료되었어요.</p>
              <div className="d-flex">
                <p>환불에는 영업일 기준&nbsp;</p>
                <p className="c-main">2-4일</p>
                <p>&nbsp;이 필요해요.</p>
              </div>
              <p>환불이 완료되면 저장된 메일 주소로</p>
              <div className="d-flex">
                <p className="c-main">환불 완료 메일</p>
                <p>을 보내드리니 확인 부탁드려요.</p>
              </div>

              <div className="j-content-center" id="bottom-btn-wrap">
                <OnOffBtn
                  text="구매한 작품으로 돌아가기"
                  color="purple"
                  style={{ width: "220px" }}
                  onClick={() => {
                    navigate("/mypage/purchased");
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerformanceRefund;
