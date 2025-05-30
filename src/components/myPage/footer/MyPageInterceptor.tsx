import { useEffect } from "react";

import { myPageStore } from "@/store/MyPageStore";

interface MyPageInterceptorProps {
  footerRef: React.RefObject<HTMLDivElement>;
}

const MyPageInterceptor: React.FC<MyPageInterceptorProps> = ({ footerRef }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        myPageStore.isFooterVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  return null;
};

export default MyPageInterceptor;
