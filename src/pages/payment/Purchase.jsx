import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import Loading from "../Loading";
import PurchaseSummaryBox from "../../components/payment/PurchaseSummaryBox";

import { useRequest } from "../../hooks/useRequest";

import { formatPrice } from "../../utils/formatPrice";

import { SERVER_URL } from "../../constants/ServerURL";

import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";

import "./Purchase.css";
import "./../../styles/utilities.css";
import PurchaseCheckBox from "../../components/purchase/PurchaseCheckBox";
import OnOffBtn from "../../components/button/OnOffBtn";

const Purchase = () => {
  const [thumbnailImg, setThumbnailImg] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // 장편극 / 단편극
  const [lengthType, setLengthType] = useState("");

  const [buyScript, setBuyScript] = useState(false);
  const [buyPerform, setBuyPerform] = useState(false);

  const [scriptPrice, setScriptPrice] = useState(0);
  const [performPrice, setPerformPrice] = useState(0);

  const [totalPrice, setTotalPrice] = useState(scriptPrice);

  const [checkBoxCondition, setCheckBoxCondition] = useState({
    purchaseAgreement: false,
    refundPolicy: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const { isScriptSelected = false, isPerformSelected = false } = location.state || {};

  const navigate = useNavigate();

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
          performance: isPerformSelected,
        },
      });
      setThumbnailImg(response.data.imagePath);
      setTitle(response.data.title);
      setAuthor(response.data.writer);
      setLengthType(response.data.playType === 1 ? "장편극" : "단편극");
      setScriptPrice(response.data.scriptPrice);
      setPerformPrice(response.data.performancePrice);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      if (error.response.data.error === "본인 작품 구매 불가") {
        alert("본인이 작성한 작품은 구매할 수 없습니다.");
      } else {
        alert(error.response.data.error);
      }
      navigate("/purchase/abort");
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

  // 버튼 클릭 시 post 요청
  const onClickPurchase = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}order/item`,
        {
          orderItem: [
            {
              productId: id,
              script: buyScript,
              performance: buyPerform,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      // 싀바거 이게 문제였냐??
      const orderData = response.data[0];

      alert("결제가 완료되었습니다.");
      navigate("/purchase/success", {
        state: {
          orderDate: orderData.orderDate,
          orderNumber: orderData.orderNum,
          buyScript,
          scriptPrice,
          buyPerform,
          performPrice,
          totalPrice,
        },
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="purchase">
      <MainNav />
      <div className="purchase-wrap">
        <h4 id="title">결제</h4>
        <div className="purchase-flex">
          <div className="list-side">
            {buyScript ? (
              <div className="content">
                <h4 id="subtitle">대본</h4>
                <div className="purchase-list">
                  <div
                    className="thumbnail"
                    style={{ backgroundImage: `url(${thumbnailImg})` }}
                  ></div>
                  <div className="detail">
                    <h5>{title}</h5>
                    <hr></hr>
                    <h6>{author}</h6>
                    {/*<p id="tag"># {lengthType}</p>*/}
                    <div className="detail-price">
                      <div className="price-wrap">
                        <img
                          src={scriptImg}
                          alt="script"
                          style={{ width: "0.75rem", height: "0.9375rem" }}
                        ></img>
                        <p>{formatPrice(scriptPrice)}원</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <hr id="script-perform" />
            {buyPerform ? (
              <div className="content">
                <h4 id="subtitle">공연권</h4>
                <div className="purchase-list">
                  <div
                    className="thumbnail"
                    style={{ backgroundImage: `url(${thumbnailImg})` }}
                  ></div>
                  <div className="detail">
                    <h5>{title}</h5>
                    <hr></hr>
                    <h6>{author}</h6>
                    {/*<p id="tag"># {lengthType}</p>*/}
                    <div className="detail-price">
                      <div className="price-wrap">
                        <img
                          src={performImg}
                          alt="perform"
                          style={{ width: "1.24994rem", height: "1.24325rem" }}
                        ></img>
                        <p>{formatPrice(performPrice)}원</p>
                      </div>
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
              performPrice={performPrice}
              totalPrice={totalPrice}
            />

            <PurchaseCheckBox setCheckBoxCondition={setCheckBoxCondition} />

            <div style={{ marginTop: "1rem" }}></div>

            <OnOffBtn
              text="결제하기"
              onClick={onClickPurchase}
              disabled={!(checkBoxCondition.purchaseAgreement && checkBoxCondition.refundPolicy)}
              style={{ width: "25.8125rem" }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Purchase;
