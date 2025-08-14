import { useParams } from "react-router-dom";

import FindID from "./FindID";
import FindPW from "./FindPW";
import ToggleBar from "../../components/toggleBar/ToggleBar";

import "./FindBar.scss";
import "./../../styles/utilities.css";

const FindBar = () => {
  const { id } = useParams();

  return (
    <div className="find">
      <ToggleBar
        defaultRoute={id}
        firstName="아이디 찾기"
        firstComponent={<FindID />}
        secondName="비밀번호 찾기"
        secondComponent={<FindPW />}
      />
    </div>
  );
};

export default FindBar;
