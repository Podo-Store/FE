import { useState, type CSSProperties, type ReactNode } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import "./ToggleBar.scss";

type ToggleBarProps = {
  defaultRoute?: number | string;
  firstName: string;
  firstComponent: ReactNode;
  secondName: string;
  secondComponent: ReactNode;
};

type TabNavStyle = CSSProperties & {
  "--active-tab-index": number;
};

const ToggleBar = ({
  defaultRoute = 0,
  firstName,
  firstComponent,
  secondName,
  secondComponent,
}: ToggleBarProps) => {
  const TAB_NAME = [firstName, secondName];
  const initialTabIndex = Number(defaultRoute) === 1 ? 1 : 0;
  const [currentTabIndex, setCurrentTabIndex] = useState(initialTabIndex);
  const { isSmallMobile, isMobile } = useWindowDimensions().widthConditions;
  const currentTab = TAB_NAME[currentTabIndex];

  const handleTabChange = (nextTabIndex: number) => {
    if (nextTabIndex !== currentTabIndex) {
      setCurrentTabIndex(nextTabIndex);
    }
  };

  return (
    <div className="toggle-bar">
      <div className="f-dir-column a-items-center toggle-bar-content">
        <div className=" f-center f-dir-column tab-nav-wrap">
          <div
            className="tab-nav"
            role="tablist"
            style={{ "--active-tab-index": currentTabIndex } as TabNavStyle}
          >
            <button
              type="button"
              role="tab"
              aria-selected={currentTabIndex === 0}
              className={` tab-name ${
                isSmallMobile ? "p-small-medium" : isMobile ? "p-large-medium" : "h5-medium"
              } ${currentTabIndex === 0 ? "current" : ""}`}
              onClick={() => handleTabChange(0)}
            >
              {TAB_NAME[0]}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={currentTabIndex === 1}
              className={`tab-name ${
                isSmallMobile ? "p-small-medium" : isMobile ? "p-large-medium" : "h5-medium"
              }
               ${currentTabIndex === 1 ? "current" : ""}`}
              onClick={() => handleTabChange(1)}
            >
              {TAB_NAME[1]}
            </button>
            <span className="tab-indicator" aria-hidden="true" />
          </div>

          <div className="tab-panel" role="tabpanel" key={currentTab}>
            {currentTabIndex === 0 ? firstComponent : secondComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToggleBar;
