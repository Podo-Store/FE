import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import MainNav from "../pages/MainNav";

import "./DefaultLayout.css";

const DefaultLayout = () => {
  return (
    <div className="__default-layout__">
      <MainNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
