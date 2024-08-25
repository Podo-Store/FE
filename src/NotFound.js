import MainNav from "./pages/MainNav";
import Footer from "./pages/Footer";

import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="Not-Found">
      <MainNav />
      <div className="not-found">
        <h1>404</h1>
        <p>요청하신 페이지가 존재하지 않거나 사용할 수 없어요.</p>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
