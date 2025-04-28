import { useEffect, useState } from "react";

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    widthConditions: {
      isMobile: window.innerWidth < 768,
      isTablet: window.innerWidth < 1280,
      isLaptop: window.innerWidth < 1920,
      isDesktop: window.innerWidth >= 1920,
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        widthConditions: {
          isMobile: window.innerWidth < 768,
          isTablet: window.innerWidth < 1280,
          isLaptop: window.innerWidth < 1920,
          isDesktop: window.innerWidth >= 1920,
        },
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
