import React from "react";
import { useNavigate } from "react-router-dom";

import FloatingBtn from "@/components/button/FloatingBtn";
import ImageBtn from "../components/button/ImageBtn";
import Page4Button from "../components/button/landing/Page4Button";
import Page3 from "@/components/landing/Page3";

import arrow from "../assets/image/landing/Vector 22.svg";
import circleIcon from "../assets/image/landing/page1.png";
import {
  content1,
  content2,
  content3,
  page2ButtonImg,
  title,
  title_right,
} from "../assets/image/landing/page2";
import facebook from "../assets/image/landing/page4/facebook.svg";
import instagram from "../assets/image/landing/page4/instagram.svg";
import youtube from "../assets/image/landing/page4/youtube.svg";

import "./MainVer2.scss";
import "./MainVer2Page2.scss";

const MainVer2 = () => {
  const navigate = useNavigate();

  return (
    <div className="main-ver2">
      <FloatingBtn />

      <div>
        <div className="page1 f-dir-column j-content-between">
          <div className="title-wrap f-dir-column p-relative">
            <h1 className="title">
              대본과 공연권 거래
              <br />
              포도상점에서
            </h1>

            <h5 className="sub-title">
              대본과 공연권 모두 간단하고 편리하게 거래해요!
              <br />
              여러분들이 원하던 플랫폼,
              <br />
              포도상점을 시작하세요!
            </h5>

            <img src={circleIcon} alt="circle" className="circle-icon" />
          </div>
          <div className="j-content-center">
            <img src={arrow} alt="First" className="arrow" />
          </div>
        </div>

        <div className={`page2 ${window.innerWidth >= 1600 && "page-size"}`}>
          <h1 className="page2-title title_64px">포도상점에서는 이런 것들이 가능해요</h1>
          <div className="page2-content-wrap j-content-center">
            <div className="page2-content" onClick={() => navigate("/post")}>
              <img src={title} alt="" className="page2-content-title" />
              <h1 className="h1-medium">작품 등록하기</h1>

              <h4 className="h4-regular c-white">
                여러분의 톡톡 튀는 아이디어, <br />
                포도상점에 올려주세요!
              </h4>
              <div className="page2-img-wrap j-content-center">
                <img src={content1} alt="" />
              </div>

              <ImageBtn src={page2ButtonImg} alt="->" className="page2-button" />
            </div>

            <div
              className="page2-content f-dir-column j-content-between"
              onClick={() => navigate("/list")}
            >
              <img src={title} alt="" className="page2-content-title" />
              <div className="page2-img-wrap j-content-end">
                <img src={content2} alt="" />
              </div>
              <div>
                <h4 className="h4-regular c-white">
                  다양한 작품을 마음껏 둘러보고 <br />
                  원하는 걸 골라보세요!
                </h4>

                <h1 className="h1-medium">작품 둘러보기</h1>

                <ImageBtn src={page2ButtonImg} alt="->" className="page2-button" />
              </div>
            </div>

            <div className="page2-content" onClick={() => navigate("/mypage/purchased")}>
              <img src={title_right} alt="" className="page2-content-title" />
              <h1 className="h1-medium t-right">공연권 신청하기</h1>

              <h4 className="h4-regular c-white t-right">
                구매한 작품의 <br />
                공연권을 바로 신청해보세요!
              </h4>

              <div className="page2-img-wrap j-content-center">
                <img src={content3} alt="" />
              </div>

              <ImageBtn src={page2ButtonImg} alt="->" className="page2-button" />
            </div>
          </div>
        </div>

        <Page3 />

        <div className="page4 page-size">
          <div>
            <h1 className="title_64px">포도상점을 더 알고 싶다면?</h1>
            <h3 className="title_20px">포도상점만의 이야기를 들려드릴게요.</h3>
          </div>
          <div className="page4-button-wrap j-content-center">
            <Page4Button
              src={instagram}
              alt="instagram"
              onClick={() => {
                window.open(`https://www.instagram.com/podosangjeom`, "_blank");
              }}
            />
            <Page4Button
              src={facebook}
              alt="facebook"
              onClick={() => {
                window.open(`https://www.facebook.com/profile.php?id=61565446313244`, "_blank");
              }}
            />
            <Page4Button
              src={youtube}
              alt="youtube"
              onClick={() => {
                window.open(`https://www.youtube.com/@포도상점`, "_blank");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainVer2;
