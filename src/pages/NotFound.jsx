import MainNav from "./MainNav";
import Footer from "./Footer";

import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="Not-Found">
      <MainNav />
      <div className="min-height not-found">
        <h1>404</h1>
        <p>요청하신 페이지가 존재하지 않거나 사용할 수 없어요.</p>
        <p>궁금한 점이 있으시면 포도상점 메일로 문의해주세요.</p>
        <p>감사합니다.</p>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
