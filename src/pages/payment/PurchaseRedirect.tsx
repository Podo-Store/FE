import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PurchaseRedirect = () => {
  const navigate = useNavigate();

//   useEffect(() => {
//     // 필요하면 여기서 URLSearchParams로 resultCode, tid 같은 거 읽을 수 있음
//     // 일단은 그냥 결제 실패/중단 페이지로 보내거나
//     // 혹은 메인으로 돌려보내도 됨
//     navigate("/purchase/abort");
//   }, [navigate]);

  return <div>결제 결과를 확인 중입니다...</div>;
};

export default PurchaseRedirect;
