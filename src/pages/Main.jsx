import React, { useState, useRef } from "react";

import mainVideo from "../assets/video/idle.mp4";
import changeVideo from "../assets/video/change.mp4";

import "./Main.css";

const Main = () => {
  const [currentVideo, setCurrentVideo] = useState(mainVideo);
  const [videoSwitch, setVideoSwitch] = useState(false);

  // 비디오 요소를 참조하는지 여부, 참조시 true
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    if (videoSwitch) {
      setCurrentVideo(changeVideo);
      setVideoSwitch(false);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      // 전환을 위해 loop를 일시적으로 해제
      if (videoRef.current.loop) {
        videoRef.current.loop = false;
      }
      setVideoSwitch(true);
    }
  };

  // 변경된 비디오 loop 설정 코드
  /*useEffect(() => {
    if (currentVideo === changeVideo && videoRef.current) {
      videoRef.current.loop = true; // 두 번째 비디오가 재생될 때 loop 설정
    }
  }, [currentVideo]);
  */
  return (
    <div className="main_body">
      <video
        ref={videoRef}
        src={currentVideo}
        loop={currentVideo === mainVideo}
        onEnded={handleVideoEnd}
        onClick={handleVideoClick} // 비디오 클릭 이벤트 처리
        style={{ cursor: "pointer" }} // 클릭 가능하다는 표시를 위해 커서 스타일 추가
      />
    </div>
  );
};

export default Main;
