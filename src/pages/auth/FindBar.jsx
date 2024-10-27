import { useParams } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import FindID from "./FindID";
import FindPW from "./FindPW";
import ToggleBar from "../../components/toggleBar/ToggleBar";

import "./FindBar.css";
import "./../../styles/utilities.css";

const FindBar = () => {
  const { id } = useParams();

  return (
    <div className="find">
      <MainNav />
      <ToggleBar
        defaultRoute={id}
        firstName="아이디 찾기"
        firstComponent={<FindID />}
        secondName="비밀번호 찾기"
        secondComponent={<FindPW />}
      />
      <Footer />
    </div>
  );
};

export default FindBar;
