import { SyncLoader } from "react-spinners";
import MainNav from "./MainNav";
import Footer from "./Footer";
import '../styles/text.css';


import "./Loading.css";

const Loading = () => {
  return (
    <div className="Loading">
      <MainNav />
      <div className="loading-wrap">
        <SyncLoader color="#6b39c0" margin={12} />
        <p className="p-large-bold">로딩중</p>
      </div>
      <Footer />
    </div>
  );
};

export default Loading;
