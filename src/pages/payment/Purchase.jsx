import Footer from "../Footer";
import MainNav from "../MainNav";
import "./Purchase.css";
import scriptImg from "./../../assets/image/post/list/script.svg";
import performImg from "./../../assets/image/post/list/perform.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatPrice } from "../../utils/formatPrice";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../constants/ServerURL";

const Purchase = () => {
  const [thumbnailImg, setThumbnailImg] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // 장편극 / 단편극
  const [lengthType, setLengthType] = useState("");
  const [scriptPrice, setScriptPrice] = useState(0);
  const [isPerformSelected, setIsPerformSelected] = useState(false);
  const [performPrice, setPerformPrice] = useState(0);

  const [totalPrice, setTotalPrice] = useState(scriptPrice);

  const { id } = useParams();
  const location = useLocation();
  const { isAlsoPerform } = location.state || {};

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchaseDetail = async () => {
      try {
        // TODO: 로그인 상태
        const response = await axios.get(`${SERVER_URL}order/item`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          params: {
            productId: id,
            // 대본: 항상 true
            script: true,
            performance: isAlsoPerform,
          },
        });
        setThumbnailImg(response.data.imagePath);
        setTitle(response.data.title);
        setAuthor(response.data.writer);
        setLengthType(response.data.playType === 1 ? "장편극" : "단편극");
        setScriptPrice(response.data.scriptPrice);
        setPerformPrice(response.data.performancePrice);
        setTotalPrice(response.data.totalPrice);
        setIsPerformSelected(response.data.performance);
      } catch (error) {
        alert("작품 정보 조회 실패");
      }
    };

    fetchPurchaseDetail();
  }, [id]);

  useEffect(() => {
    if (isPerformSelected) {
      setTotalPrice(scriptPrice + performPrice);
    }
  }, [isPerformSelected]);

  // 버튼 클릭 시 post message
  const handlePurchaseBtn = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}order/item`,
        {
          orderItem: [
            {
              productId: id,
              script: true, // 대본권, 항상 true
              scriptPrice: scriptPrice,
              performance: isPerformSelected,
              performancePrice: performPrice,
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

      if (response.data === true) {
        alert("결제가 완료되었습니다.");
        navigate("/purchase/success");
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="purchase">
      <MainNav />
      <div className="purchase-wrap">
        <h4 id="title">결제</h4>
        <div className="purchase-flex">
          <div className="list-side">
            <div className="purchase-list">
              <div className="thumbnail" style={{ backgroundImage: `url(${thumbnailImg})` }}></div>
              <div className="detail">
                <h5>{title}</h5>
                <hr></hr>
                <h6>{author}</h6>
                <p id="tag"># {lengthType}</p>
                <div className="detail-price">
                  <img src={scriptImg}></img>
                  <p>{formatPrice(scriptPrice)}원</p>
                  {/* 공연권이 선택됐을 경우 */}
                  {isPerformSelected ? (
                    <div style={{ display: "flex", gap: "0.625rem" }}>
                      <img src={performImg}></img>
                      <p>{formatPrice(performPrice)}원</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="purchase-side">
            <div className="purchase-summary-box">
              <h4>주문 요약</h4>
              <div className="price-wrap">
                <p>대본 가격</p>
                <p>{formatPrice(scriptPrice)}원</p>
              </div>
              <div className="price-wrap">
                <p>공연권 가격</p>
                {/* 공연권이 선택됐을 경우 */}
                {isPerformSelected ? <p>{formatPrice(performPrice)}원</p> : <p> - 원</p>}
              </div>
              <hr></hr>
              <div className="price-wrap">
                <p>총 금액</p>
                <p>{formatPrice(totalPrice)}원</p>
              </div>
            </div>
            <button className="purchase-btn" onClick={handlePurchaseBtn}>
              결제하기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Purchase;
