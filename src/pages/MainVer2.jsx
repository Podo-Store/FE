import React from "react";
import { useNavigate } from "react-router-dom";

import FloatingBtn from "@/components/button/FloatingBtn";
import ImageBtn from "../components/button/ImageBtn";
import Page4Button from "../components/button/landing/Page4Button";
import Page3 from "@/components/landing/Page3";
import MobileError from "./MobileError";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import arrow from "../assets/image/landing/Vector 22.svg";
import circleIcon from "../assets/image/landing/page1.svg";
import {
  content1,
  content1_768,
  content2,
  content2_768,
  content3,
  content3_768,
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
  const {
    widthConditions: { isDesktop, isLaptop, isTablet, isMobile },
  } = useWindowDimensions();

  const content2Title = () => "작품 둘러보기";
  const content2Texts = () => {
    return (
      <h4 className={page2TextsClassName}>
        다양한 작품을 마음껏 둘러보고 <br />
        원하는 걸 골라보세요!
      </h4>
    );
  };
  const content3Title = () => "공연권 신청하기";
  const content3Texts = () => {
    return (
      <h4 className={page2TextsClassName}>
        구매한 작품의 <br />
        공연권을 바로 신청해보세요!
      </h4>
    );
  };

  const page2TitleClassName = !isMobile ? "h1-medium" : "h4-medium";
  const page2TextsClassName = !isMobile
    ? "h4-regular c-white"
    : "p-large-regular c-white";

  if (isMobile) {
    return <MobileError />;
  }

  return (
    <div className=" main-ver2">
      <FloatingBtn />

      <div>
        <div className=" page1">
          <section className=" page1-width">
            <div
              className={`page1-title-img pt-[136px]   ${
                isLaptop
                  ? " gap-[80px]"
                  : isTablet
                  ? "gap-[60px]  w-[768px]"
                  : "gap-[42px]"
              }  justify-between`}
            >
              <div
                className={`  ${
                  isLaptop ? "" : ""
                }  h-fit title-wrap f-dir-column p-relative`}
              >
                <h1 className=" title">
                  대본과 {isLaptop && <br />}공연권 거래
                  <br />
                  포도상점에서
                </h1>

                <h5 className=" sub-title whitespace-nowrap">
                  편리하게 대본과 공연권을 거래해요.
                  <br />
                  여러분들이 원하던 스토리 IP 플랫폼,
                  <br />
                  포도상점을 시작하세요!
                </h5>
              </div>
              {!isTablet && !isMobile ? (
                <img src={circleIcon} alt="circle" className=" circle-icon" />
              ) : (
                <div className="flex justify-end w-full ">
                  <img
                    src={circleIcon}
                    alt="circle"
                    className=" circle-icon w-[438px]"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center w-full  h-content mt-[50px]  p">
              <img src={arrow} alt="First" className=" arrow" />
            </div>
          </section>
        </div>

        <div className={`page2 `}>
          <h1 className=" page2-title title_64px">
            포도상점에서는 이런 것들이 가능해요
          </h1>
          <div className=" page2-content-wrap j-content-center">
            <div className="page2-content" onClick={() => navigate("/post")}>
              <img
                src={!isTablet ? null : title}
                alt=""
                className="page2-content-title"
              />
              <h1 className={page2TitleClassName}>작품 등록하기</h1>
              <h4 className={page2TextsClassName}>
                여러분의 톡톡 튀는 아이디어, <br />
                포도상점에 올려주세요!
              </h4>
              <div className="page2-img-wrap j-content-center">
                <img src={!isTablet ? null : content1_768} alt="" />
              </div>
              <ImageBtn
                src={page2ButtonImg}
                alt="->"
                className="page2-button"
              />
            </div>

            {/* 768 아래에선 밑의 두 요소 contents 교체 */}
            <div
              className="page2-content f-dir-column j-content-between"
              onClick={() =>
                !isTablet ? navigate("/list") : navigate("/myPage/purchased")
              }
            >
              <img
                src={!isTablet ? null : title_right}
                alt=""
                className="page2-content-title"
              />
              <div className="page2-img-wrap j-content-end">
                <img src={!isTablet ? null : content3_768} alt="" />
              </div>
              <div>
                {!isTablet ? content2Texts() : content3Texts()}

                <h1 className={page2TitleClassName}>
                  {!isTablet ? content2Title() : content3Title()}
                </h1>

                {/* <ImageBtn
                  src={page2ButtonImg}
                  alt="->"
                  className="page2-button"
                /> */}
              </div>
            </div>

            <div
              className="page2-content"
              onClick={() =>
                !isTablet ? navigate("/mypage/purchased") : navigate("/list")
              }
            >
              <img
                src={!isTablet ? null : title}
                alt=""
                className="page2-content-title"
              />
              <div className="page2-img-wrap j-content-center">
                <img src={!isTablet ? null : content2_768} alt="" />
              </div>

              <h1 className={page2TitleClassName + " t-right"}>
                {!isTablet ? content3Title() : content2Title()}
              </h1>

              {!isTablet ? content3Texts() : content2Texts()}

              {/* <ImageBtn
                src={page2ButtonImg}
                alt="->"
                className="page2-button"
              /> */}
            </div>
          </div>
        </div>

        <Page3 />

        <div className=" page4 page-size">
          <div className=" page4-size">
            <h1 className=" title_64px">포도상점을 더 알고 싶다면?</h1>
            <h3 className="title_20px">포도상점만의 이야기를 들려드릴게요.</h3>
          </div>
          <div className=" page4-button-wrap j-content-center page4-size">
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
                window.open(
                  `https://www.facebook.com/profile.php?id=61565446313244`,
                  "_blank"
                );
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
