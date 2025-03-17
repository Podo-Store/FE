import { MouseEvent, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 현재 페이지와 같은 페이지 클릭 시 새로고침
/**
 * 현재 페이지와 같은 페이지 클릭 시 새로고침 + useNavigate
 * @param event
 * @param path
 */

export const useNavigateWithRefresh = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (event: MouseEvent, path: string) => {
      if (location.pathname === path) {
        event.preventDefault();
        window.location.reload();
      } else {
        navigate(path);
      }
    },
    [location.pathname, navigate]
  );

  return handleNavigation;
};
