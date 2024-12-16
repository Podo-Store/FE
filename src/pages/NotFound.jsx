import "./NotFound.css";
import '../styles/text.css';

const NotFound = () => {
  return (
    <div className="Not-Found">
      <div className="min-height not-found">
        <h1>404</h1>
        <p className="p-large-bold">요청하신 페이지가 존재하지 않거나 사용할 수 없어요.</p>
        <p className="p-large-bold">궁금한 점이 있으시면 포도상점 메일로 문의해주세요.</p>
        <p className="p-large-bold">감사합니다.</p>
      </div>
    </div>
  );
};

export default NotFound;
