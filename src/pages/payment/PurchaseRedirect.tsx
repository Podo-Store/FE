import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../constants/ServerURL";
import Cookies from "js-cookie";

const PurchaseRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const run = async () => {
      try {
        // 1) 나이스페이가 붙여준 파라미터 확인 (이름은 실제로 찍어보면서 맞추면 돼)
        const params = new URLSearchParams(location.search);
        console.log(params);
        const resultCode = params.get("ResultCode") || params.get("resultCode");

        // 실패거나 코드 못 읽으면 실패로 처리
        if (resultCode && resultCode !== "0000") {
          navigate("/purchase/abort");
          return;
        }

        // 2) 결제 전에 저장해둔 requestBody 꺼내기
        const saved = sessionStorage.getItem("podo_payment_request");
        if (!saved) {
          // 정보가 없으면 안전하게 실패 처리
          navigate("/purchase/abort");                                                  
          return;
        }

        const requestBody = JSON.parse(saved);

        // 3) 원래 fnSuccess 안에서 하던 주문 생성 API 호출
        const response = await axios.post(
          `${SERVER_URL}order/item`,
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        const orderData = response.data[0];

        // 사용한 정보 제거
        sessionStorage.removeItem("podo_payment_request");

        // 4) 성공 페이지로 이동
        navigate("/purchase/success", {
          state: { orderId: orderData.id },
        });
      } catch (error) {
        console.error("redirect 처리 중 오류:", error);
        navigate("/purchase/abort");
      }
    };

    run();
  }, [location.search, navigate]);

  return <div>결제 결과를 확인 중입니다...</div>;
};

export default PurchaseRedirect;
