import { SyncLoader } from "react-spinners";

import "./Loading.css";

const Loading = () => {
  return (
    <div className="Loading">
      <div className="loading-wrap">
        <SyncLoader color="#6b39c0" margin={12} />
        <p>로딩중</p>

        <div className="loading-content">
          <p>포도 씨앗 뿌리는 중</p>
          <p>포도 나무 자라는 중</p>
          <p>포도 열매 맺히는 중</p>
        </div>

        <div className="loading-content">
          <p>토독토독 글 쓰는 중</p>
          <p>뚝딱뚝딱 공연 만드는 중</p>
          <p>헤헤히히 관극 가는 중</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
