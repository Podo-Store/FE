import { useEffect, useState } from "react";

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.outerWidth,
    height: window.outerHeight,
    widthConditions: {
      isMobile: window.outerWidth < 768,
      isTablet: window.outerWidth < 1280,
      isLaptop: window.outerWidth < 1920,
      isDesktop: window.outerWidth >= 1920,
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.outerWidth,
        height: window.outerHeight,
        widthConditions: {
          isMobile: window.outerWidth < 768,
          isTablet: window.outerWidth < 1280,
          isLaptop: window.outerWidth < 1920,
          isDesktop: window.outerWidth >= 1920,
        },
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
