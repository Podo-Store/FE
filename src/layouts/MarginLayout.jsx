import { Outlet } from "react-router-dom";

import "./MarginLayout.scss";

/** @deprecated */
const MarginLayout = () => {
  return (
    <div className="__margin-layout__">
      <Outlet />
    </div>
  );
};

export default MarginLayout;
