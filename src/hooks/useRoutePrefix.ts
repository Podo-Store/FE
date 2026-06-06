import { useLocation } from "react-router-dom";

export const useRoutePrefix = () => {
  const { pathname } = useLocation();
  return pathname.startsWith("/author") ? "/author" : "";
};
