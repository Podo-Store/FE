import { SyncLoader } from "react-spinners";

import "./Loading.css";
import '../styles/text.css';

const Loading = () => {
  return (
    <div className="Loading">
      <div className="loading-wrap">
        <SyncLoader color="#6b39c0" margin={12} />
        <p className="p-large-bold">로딩중</p>
      </div>
    </div>
  );
};

export default Loading;
