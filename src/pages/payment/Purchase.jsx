import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import OnOffBtn from "../../components/button/OnOffBtn";
import SmallOnOffBtn from "../../components/button/RoundBtn_135_40";
import AmountChange from "../../components/detail/AmountChange";
import { AuthInputField, AuthPhoneInputField } from "../../components/inputField";
import PurchaseSummaryBox from "../../components/payment/PurchaseSummaryBox";
import InfoPopup from "../../components/popup/InfoPopup";
import PurchaseCheckBox from "../../components/purchase/PurchaseCheckBox";
import ThumbnailImg from "../../components/thumbnail/ThumbnailImg";
import Loading from "../Loading";

import { useRequest } from "../../hooks/useRequest";

import { formatPrice } from "../../utils/formatPrice";

import { PURCHASE_TEXT } from "../../constants/PopupTexts/PurchaseTexts";
import { SERVER_URL } from "../../constants/ServerURL";

import circleGreyWarning from "../../assets/image/myPage/circleGreyWarning.svg";
import circleInfoBtn from "../../assets/image/button/circleInfoBtn.svg";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";

import "./Purchase.css";
import "./../../styles/utilities.css";

const Purchase = () => {
  const [thumbnailImg, setThumbnailImg] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [buyScript, setBuyScript] = useState(false);
  const [buyPerform, setBuyPerform] = useState(false);

  const [scriptPrice, setScriptPrice] = useState(0);
  const [performPrice, setPerformPrice] = useState(0);
  // 공연권 개당 가격
  const [performPricePerAmount, setPerformPricePerAmount] = useState(0);

  const [totalPrice, setTotalPrice] = useState(scriptPrice);

  const [modifiedPurchasePerformAmount, setModifiedPurchasePerformAmount] = useState(1);

  // 공연권 거래 시
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  const [address, setAddress] = useState("");
  const [addressValid, setAddressValid] = useState(false);

  const [checkBoxCondition, setCheckBoxCondition] = useState({
    purchaseAgreement: false,
    refundPolicy: false,
  });
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const {
    isScriptSelected = false,
    isPerformSelected = false,
    // 0: 공연권 구매 X, 1~: 구매 개수
    purchasePerformAmount = 0,
  } = location.state || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (name.length > 0 && name.trim() !== "") {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  }, [name]);

  useEffect(() => {
    if (phone.length > 0 && phone.trim() !== "") {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  }, [phone]);

  useEffect(() => {
    if (address.length > 0 && address.trim() !== "") {
      setAddressValid(true);
    } else {
      setAddressValid(false);
    }
  }, [address]);

  useEffect(() => {
    setModifiedPurchasePerformAmount(purchasePerformAmount);
  }, [purchasePerformAmount]);

  useRequest(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}order/item`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        params: {
          productId: id,
          script: isScriptSelected,
          performanceAmount: isPerformSelected ? purchasePerformAmount : 0,
        },
      });
      setThumbnailImg(response.data.imagePath);
      setTitle(response.data.title);
      setAuthor(response.data.writer);
      setScriptPrice(response.data.scriptPrice);
      setPerformPrice(response.data.performanceTotalPrice);
      setPerformPricePerAmount(response.data.performancePrice);
    } catch (error) {
      if (error.response.data.error === "본인 작품 구매 불가") {
        alert("본인이 작성한 작품은 구매할 수 없습니다.");
        navigate(-1);
      } else {
        alert(error.response.data.error);
      }
    }
    setIsLoading(false);
  });

  useEffect(() => {
    if (isScriptSelected) {
      setBuyScript(true);
    }
    if (isPerformSelected) {
      setBuyPerform(true);
    }
  }, [isScriptSelected, isPerformSelected]);

  useEffect(() => {
    if (buyScript && buyPerform) {
      setTotalPrice(scriptPrice + performPrice);
    }
  }, [buyScript, buyPerform, scriptPrice, performPrice]);

  useEffect(() => {
    if (!(checkBoxCondition.purchaseAgreement && checkBoxCondition.refundPolicy)) {
      setButtonEnabled(false);
      return;
    }
    if (isPerformSelected && !(name.length > 0 && phone.length > 0 && address.length > 0)) {
      setButtonEnabled(false);
      return;
    }

    setButtonEnabled(true);
  }, [checkBoxCondition, name, phone, address, isPerformSelected]);

  const onClickPurchase = async () => {
    setIsLoading(true);

    if (buyPerform && (!nameValid || !phoneValid || !addressValid)) {
      alert("신청자 정보를 다시 확인해주세요.");
      return;
    }

    try {
      const requestBody = {
        orderItem: [
          {
            productId: id,
            script: buyScript,
            performanceAmount: buyPerform ? modifiedPurchasePerformAmount : 0,
          },
        ],
        // 결제 방식 - 0: 0원, 1: 계좌이체
        paymentMethod:
          (buyScript && scriptPrice === 0) || (buyPerform && performPrice === 0) ? 0 : 1,
      };

      // Include applicant only if performance rights are being purchased
      if (buyPerform) {
        requestBody.applicant = {
          name,
          phoneNumber: phone,
          address,
        };
      } else {
        requestBody.applicant = undefined;
      }

      const response = await axios.post(`${SERVER_URL}order/item`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      const orderData = response.data[0];

      alert("결제가 완료되었습니다.");
      navigate("/purchase/success", {
        state: {
          orderId: orderData.id,
        },
      });
    } catch (error) {
      alert(error.response?.data?.error || "결제 요청 중 문제가 발생했습니다.");
      navigate("/purchase/abort");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="purchase">
      <div className="purchase-wrap">
        <h5 className="h5-bold">결제</h5>
        <div className="purchase-flex">
          <div className="list-side">
            {buyScript ? (
              <div className="content">
                <p className="p-large-bold" id="subtitle">
                  대본
                </p>
                <div className="purchase-list">
                  <ThumbnailImg imagePath={thumbnailImg} />
                  <div className="detail">
                    <p className="left-margin p-large-bold">{title}</p>
                    <hr></hr>
                    <p className="left-margin p-large-medium">{author}</p>
                    {/*<p id="tag"># {lengthType}</p>*/}
                    <div className="detail-price">
                      <div className="price-wrap">
                        <img src={scriptImg} alt="script"></img>
                        <p>{formatPrice(scriptPrice)}원</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {buyScript && buyPerform ? <hr id="script-perform" /> : null}

            {buyPerform ? (
              <div className="content">
                <div>
                  <p className="p-large-bold">공연권</p>
                  <div style={{ height: "6px" }}></div>
                  <p className="p-xs-regular">
                    공연권 사용 시 홍보물에 반드시 저작자의 이름과 대본이 저작자의 것임을 표시해야
                    하며, 대본이 ‘포도상점’을 통하여 제공되었음을 표시하여야 합니다.
                  </p>
                  <div style={{ height: "16px" }}></div>
                </div>
                <div className="purchase-list">
                  <ThumbnailImg imagePath={thumbnailImg} />
                  <div className="f-dir-column j-content-between detail">
                    <div className="detail">
                      <p className="left-margin p-large-bold">{title}</p>
                      <hr></hr>
                      <p className="left-margin p-large-medium">{author}</p>
                      {/*<p id="tag"># {lengthType}</p>*/}
                      <div className="detail-price">
                        <div className="price-wrap">
                          <img src={performImg} alt="perform"></img>
                          <p>{formatPrice(performPricePerAmount)}원</p>
                        </div>
                      </div>
                    </div>
                    <div className="j-content-end">
                      <AmountChange
                        performPrice={performPrice}
                        purchasePerformAmount={modifiedPurchasePerformAmount}
                        setPurchasePerformAmount={setModifiedPurchasePerformAmount}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="purchase-side">
            <PurchaseSummaryBox
              title="주문 요약"
              page={0}
              buyScript={buyScript}
              scriptPrice={scriptPrice}
              buyPerform={buyPerform}
              performPrice={performPricePerAmount}
              performAmount={modifiedPurchasePerformAmount}
              totalPrice={totalPrice}
            />

            <div className="purchase-method">
              <p className="p-large-bold">결제 방법</p>
              <div className="btn-wrap d-flex">
                <SmallOnOffBtn
                  style={{
                    width: "108px",
                    height: "36px",
                    border: "3px solid var(--purple-purple-7, #B489FF)",
                  }}
                >
                  계좌 이체
                </SmallOnOffBtn>
                <SmallOnOffBtn disabled={true} style={{ width: "108px", height: "36px" }}>
                  -
                </SmallOnOffBtn>
                <SmallOnOffBtn disabled={true} style={{ width: "108px", height: "36px" }}>
                  -
                </SmallOnOffBtn>
              </div>
              <p className="p-small-bold c-grey4 t-align-center">
                계좌 이체 방법은 메일로 전송됩니다.
              </p>
            </div>

            {isPerformSelected ? (
              <div id="user-info-wrap">
                <hr id="user-info-hr" />

                <div className="a-items-center" id="user-info">
                  <p className="p-medium-bold" id="user-info-title">
                    신청자 정보
                  </p>
                  <img
                    src={circleInfoBtn}
                    alt="circleInfoBtn"
                    className="c-pointer"
                    id="popup-btn"
                    onClick={() => {
                      setShowPopup(!showPopup);
                    }}
                  />
                  {showPopup ? (
                    <InfoPopup
                      message={PURCHASE_TEXT}
                      onClose={() => {
                        setShowPopup(!showPopup);
                      }}
                      style={{ padding: "8px 10px" }}
                      buttonId="popup-btn"
                    />
                  ) : null}
                </div>

                <div className="f-dir-column" id="input-wrap">
                  <AuthInputField
                    placeholder="신청자 성함을 입력해주세요."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <AuthPhoneInputField
                    placeholder="신청자 연락처를 입력해주세요."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <AuthInputField
                    placeholder="신청자 주소를 입력해주세요."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            ) : null}

            <PurchaseCheckBox
              setCheckBoxCondition={setCheckBoxCondition}
              isPerformSelected={isPerformSelected}
            />

            <div style={{ marginTop: "1rem" }}></div>

            <OnOffBtn
              text="결제하기"
              onClick={onClickPurchase}
              disabled={!buttonEnabled}
              style={{ width: "25.8125rem" }}
            />

            {isScriptSelected ? (
              <div className="j-content-center" id="refund-wrap">
                <img src={circleGreyWarning} alt="warning"></img>
                <div className="d-flex" id="refund">
                  <p id="p-1">대본은</p>
                  <p id="p-2">청약철회 불가</p>
                  <p id="p-1">상품입니다.</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
