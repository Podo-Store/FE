import { useEffect, useRef } from "react";

export const useRequest = (fn) => {
  const loadingRef = useRef(false);

  useEffect(() => {
    if (loadingRef.current) {
      return;
    }
    loadingRef.current = true;

    fn();
  }, [fn]);
};
