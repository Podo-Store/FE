import { useEffect, useRef, useState } from "react";

import web1_2 from "../assets/main/web1-2.mp4";
import web2_3 from "../assets/main/web2-3.mp4";
import web3_4 from "../assets/main/web3-4.mp4";

import "./NewMain.css";

const NewMain = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [firstVideoPlayed, setFirstVideoPlayed] = useState(false); // 첫 번째 비디오가 재생되었는지 여부
  const videoRefs = useRef([]);
  const sections = [
    { type: "video", src: web1_2, autoplay: false },
    { type: "video", src: web2_3, autoplay: true },
    { type: "video", src: web3_4, autoplay: true },
  ];

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const sectionHeight = document.body.scrollHeight / sections.length;
    const index = Math.floor(scrollPosition / sectionHeight);

    // 첫 번째 비디오의 스크롤 위치를 계산하여 조건에 따라 딱 한 번 재생
    if (index === 0 && scrollPosition >= window.innerHeight / 1.125 && !firstVideoPlayed) {
      const firstVideo = videoRefs.current[0];
      if (firstVideo && firstVideo.paused) {
        firstVideo.play().catch((error) => {
          console.error("Video play failed:", error);
        });
        setFirstVideoPlayed(true); // 첫 번째 비디오가 재생되었음을 기록
      }
    }

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex, firstVideoPlayed]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && entry.target !== videoRefs.current[0]) {
          // 첫 번째 비디오는 제외
          video.play().catch((error) => {
            console.error("Video play failed:", error);
          });
        } else if (entry.target !== videoRefs.current[0]) {
          // 첫 번째 비디오는 제외
          video.pause();
          video.currentTime = 0;
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    videoRefs.current.forEach((video, index) => {
      if (video instanceof Element && sections[index].autoplay) {
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach((video, index) => {
        if (video instanceof Element && sections[index].autoplay) {
          observer.unobserve(video);
        }
      });
    };
  }, [videoRefs.current]);

  return (
    <div className="main">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`media-container ${index === activeIndex ? "active" : ""}`}
          style={{ display: index === activeIndex ? "flex" : "none" }} // 현재 활성화된 비디오만 표시
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            className={`media ${index === activeIndex ? "video-active" : ""}`}
            muted
            preload="auto" // 비디오 미리 로드
            style={{ width: "47.5rem", height: "47.5rem" }}
          >
            <source src={section.src} type="video/mp4" />
          </video>
        </div>
      ))}
      <div style={{ height: "400vh" }} /> {/* 스크롤 높이 확보용 */}
    </div>
  );
};

export default NewMain;
