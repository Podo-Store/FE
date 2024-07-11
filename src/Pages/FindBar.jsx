import { useState } from "react";
import "./FindBar.css";

import MainNav from "./MainNav";
import Box from "../Components/auth/Box";

const Find = () => {
  const TAB_NAME = ["아이디 찾기", "비밀번호 찾기"];
  const [currentTab, setCurrentTab] = useState(TAB_NAME[0]);

  return (
    <div>
      <MainNav />
      <Box id="box">
        <div className="container">
          <div className="tab-nav">
            <h4
              className={`tab-name ${TAB_NAME[0] === currentTab ? "current" : ""}`}
              onClick={() => setCurrentTab(TAB_NAME[0])}
            >
              {TAB_NAME[0]}
            </h4>

            <h4
              className={`tab-name ${TAB_NAME[1] === currentTab ? "current" : ""}`}
              onClick={() => setCurrentTab(TAB_NAME[1])}
            >
              {TAB_NAME[1]}
            </h4>
          </div>

          {currentTab === TAB_NAME[0] && <p>FindID /</p>}
          {currentTab === TAB_NAME[1] && <p>FindPW /</p>}
        </div>
      </Box>
    </div>
  );
};

export default Find;
