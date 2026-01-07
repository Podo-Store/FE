import { api } from "@/api/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GoBack from "../../components/button/GoBack.tsx";
import OnOffBtn from "../../components/button/OnOffBtn";
import { PerformInputField } from "../../components/inputField";
import SmallOnOffBtn from "../../components/button/RoundBtn_135_40";
import ThumbnailImg from "../../components/thumbnail/ThumbnailImg";

import { useRequest } from "../../hooks/useRequest";
import useWindowDimensions from "@/hooks/useWindowDimensions.ts";

import { formatPrice } from "../../utils/formatPrice";
import formatDate2 from "../../utils/formatDate2";

import { SERVER_URL } from "../../constants/ServerURL";

import plusBtn from "../../assets/image/button/circleAddBtn.svg";
import minusBtn from "../../assets/image/button/circleSubBtn.svg";

import "./PerformanceRefund.scss";
import "./PerformanceTop.scss";
import "./../../styles/text.css";
import "./../../styles/utilities.css";
import clsx from "clsx";

const PerformanceRefund = () => {
  const [thumbnail, setThumbnail] = useState("");
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
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  const MAX_LENGTH = 50;

  useRequest(async () => {
    try {
      const response = await api.get("/profile/refund", {
        params: {
          id,
        },
      });

      setThumbnail(response.data.scriptImage);
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
      await api.post("/profile/refund", {
        orderItemId: id,
        refundAmount: currentAmount,
        reason,
      });

      setShowPopup(true);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <div className="min-height perform-refund perform-top">
        <GoBack url="/mypage/purchased" />
        <h4 className="p-medium-bold sm:h4-bold">구매한 작품들을 볼 수 있어요!</h4>

        <p className="p-xs-regular sm:p-medium-regular">공연권 환불 신청</p>
        <hr />
        <section className="flex flex-col items-center">
          <div className="script">
            <div className="flex">
              <ThumbnailImg imagePath={thumbnail} />
              <div className="script-detail">
                <div className="script-tag">
                  <div className="flex items-center" id="title">
                    <p className="p-small-bold sm:p-large-bold" id="title">
                      {title}
                    </p>
                  </div>
                  <hr></hr>
                  <p className="p-12-bold sm:p-large-medium" id="author">
                    {author}
                  </p>
                </div>
              </div>
            </div>

            <hr />

            <div id="detail">
              <div className="detail-content flex justify-between">
                <p className="p-xs-medium sm:p-medium-bold text-grey-6">구매 일자</p>
                <p className="p-xs-regular sm:p-medium-regular text-grey-6">
                  {orderDate ? formatDate2(orderDate) : ""}
                </p>
              </div>
              <hr />
              <div className="detail-content flex justify-between">
                <p className="p-xs-medium sm:p-medium-bold text-grey-6">주문번호</p>
                <p className="p-xs-regular sm:p-medium-regular text-grey-6">{orderNum}</p>
              </div>
              <hr />
              <div className="detail-content flex justify-between">
                <p className="p-xs-medium sm:p-medium-bold text-grey-6">
                  구매한 공연권 수량 및 금액
                </p>
                <div className="flex justify-end">
                  <p className="p-xs-medium sm:p-large-medium text-grey-6">{orderedAmount}</p>
                  <div className="price-default-left" />
                  <p className="price-default p-xs-medium sm:p-large-medium text-grey-6">
                    {formatPrice(orderedPrice)}원
                  </p>
                </div>
              </div>
              <hr />
              <div className="detail-content flex justify-between">
                <p className="p-xs-medium sm:p-medium-bold text-grey-6">
                  환불 가능한 공연권 수량 및 금액
                </p>
                <div className="flex justify-end">
                  <p className="p-xs-medium sm:p-large-medium text-grey-6">
                    {refundPossibleAmount}
                  </p>
                  <div className="price-default-left" />
                  <p className="price-default p-xs-medium sm:p-large-medium text-grey-6">
                    {formatPrice(refundPossiblePrice)}원
                  </p>
                </div>
              </div>
              <hr />
              <div className="detail-content flex justify-between items-center" id="total">
                <p className="p-xs-medium sm:p-medium-bold">환불 예정 공연권 수량 및 금액</p>
                <div className="flex justify-end items-center">
                  {refundPossibleAmount !== 1 ? (
                    <div className="flex justify-between items-center" id="total-amount">
                      <img
                        className="c-pointer"
                        src={minusBtn}
                        alt="minusBtn"
                        onClick={() => {
                          changeAmount(-1);
                        }}
                      />
                      <p className="p-xs-medium sm:p-large-medium text-center">{currentAmount}</p>
                      <img
                        className="c-pointer"
                        src={plusBtn}
                        alt="plusBtn"
                        onClick={() => {
                          changeAmount(1);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex">
                      <p className="p-xs-medium sm:p-large-medium">{currentAmount}</p>
                      <div className="price-default-left" />
                    </div>
                  )}
                  <p className="price-default p-xs-medium sm:p-large-medium">
                    {formatPrice(singlePrice * currentAmount)}원
                  </p>
                </div>
              </div>
            </div>

            <hr />
            <div className="flex justify-between items-center">
              <p className="p-small-bold sm:p-medium-bold">환불 사유</p>
            </div>
            <div className="h-[0.63rem]" />
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
              rightElement={
                <p className="p-xs-medium c-default" id="length">
                  {currentLength} / {MAX_LENGTH}
                </p>
              }
            />

            <div className="flex justify-end" id="btn">
              <SmallOnOffBtn
                color="white"
                onClick={() => {
                  if (showPopup) {
                    return;
                  }
                  navigate("/mypage/purchased");
                }}
              >
                취소하기
              </SmallOnOffBtn>
              <SmallOnOffBtn
                color="purple"
                disabled={reason.length === 0}
                onClick={() => {
                  if (showPopup) {
                    return;
                  }
                  onClickRequestRefund();
                }}
              >
                신청하기
              </SmallOnOffBtn>
            </div>
            {showPopup ? (
              <div className="refund-popup flex flex-col justify-center text-center p-small-bold sm:p-medium-bold">
                <p>환불 신청이 완료되었어요.</p>
                <p>
                  환불에는 영업일 기준&nbsp;<span className="text-main">2-4일</span>이 필요해요.
                </p>
                <p>환불이 완료되면 저장된 메일 주소로</p>
                <p>
                  <span className="text-main">환불 완료 메일</span>을 보내드리니 확인 부탁드려요.
                </p>

                <div className="flex justify-center mt-[26px]">
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
        </section>
      </div>
    </div>
  );
};

export default PerformanceRefund;
