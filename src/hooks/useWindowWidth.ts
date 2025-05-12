import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth < 1280,
    isLaptop: window.innerWidth < 1920,
    isDesktop: window.innerWidth >= 1920,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth < 1280,
        isLaptop: window.innerWidth < 1920,
        isDesktop: window.innerWidth >= 1920,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;
