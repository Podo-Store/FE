import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "../pages/Footer";
import MainNav from "../pages/MainNav";

import "./DefaultLayout.css";

const DefaultLayout = () => {
  // route 이동 시 최상단 이동
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="__default-layout__">
      <MainNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
