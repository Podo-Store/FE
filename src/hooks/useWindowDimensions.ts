import { useEffect, useState } from "react";

const getWidthConditions = (width: number) => ({
  isMobile: width < 768,
  isTablet: width >= 768 && width < 1280,
  isLaptop: width >= 1280 && width < 1920,
  isDesktop: width >= 1920,
});

const getWindowDimensions = () => {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
      widthConditions: {
        isMobile: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: false,
      },
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    width,
    height,
    widthConditions: getWidthConditions(width),
  };
};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
