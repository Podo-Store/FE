import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "../pages/Footer";
import AuthorNav from "../pages/AuthorNav";

import "./DefaultLayout.css";

const AuthorLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="__default-layout__">
      <AuthorNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthorLayout;
