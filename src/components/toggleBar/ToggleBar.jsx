import { useState } from "react";

import "./ToggleBar.css";

/**
 *
 * @param {object} props
 * @param {number} props.defaultRoute - 처음 routing할 탭. default: 0
 * @param {string} props.firstName - 첫 번째 탭 이름
 * @param {JSX.Element} props.firstComponent - 첫 번째 탭 컴포넌트
 * @param {string} props.secondName - 두 번째 탭 이름
 * @param {JSX.Element} props.secondComponent - 두 번째 탭 컴포넌트
 * @returns
 */
const ToggleBar = ({
  defaultRoute = 0,
  firstName,
  firstComponent,
  secondName,
  secondComponent,
}) => {
  const TAB_NAME = [firstName, secondName];
  const [currentTab, setCurrentTab] = useState(TAB_NAME[defaultRoute]);

  return (
    <div className="toggle-bar">
      <div className="f-dir-column a-items-center toggle-bar-content">
        <div className="f-center f-dir-column tab-nav-wrap">
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

          {currentTab === TAB_NAME[0] && firstComponent}
          {currentTab === TAB_NAME[1] && secondComponent}
        </div>
      </div>
    </div>
  );
};

export default ToggleBar;
