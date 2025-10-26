import React, { useEffect, useState } from "react";
import { useLocation, useNavigationType, useNavigate } from "react-router-dom";

import FloatingBtn from "@/components/button/FloatingBtn";
import ImageBtn from "../components/button/ImageBtn";
import Page4Button from "../components/button/landing/Page4Button";
import Page3 from "@/components/landing/Page3";
import Toast from "@/components/auth/signUp/Toast";
import MobileError from "./MobileError";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import arrow from "../assets/image/landing/Vector 22.svg";
import circleIcon from "../assets/image/landing/page1.png";
import {
  content1,
  content1_768,
  content1_480,
  content2,
  content2_768,
  content2_480,
  content3,
  content3_768,
  content3_480,
  page2ButtonImg,
  title,
  title_right,
} from "../assets/image/landing/page2";
import facebook from "../assets/image/landing/page4/facebook.svg";
import instagram from "../assets/image/landing/page4/instagram.svg";
import youtube from "../assets/image/landing/page4/youtube.svg";
import brunch from "../assets/image/landing/page4/brunch.svg";

import "./MainVer2.scss";
import "./MainVer2Page2.scss";
import clsx from "clsx";

const MainVer2 = () => {
  const [signUpToast, setSignUpToast] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const navType = useNavigationType();

  const {
    widthConditions: { isLaptop, isTablet, isMobile, isSmallMobile },
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

  const page2TitleClassName =
    !isMobile && !isSmallMobile
      ? "h1-medium"
      : !isSmallMobile
      ? "h4-medium"
      : "p-medium-medium";
  const page2TextsClassName =
    !isMobile && !isSmallMobile
      ? "h4-regular c-white"
      : !isSmallMobile
      ? "p-large-regular c-white"
      : "p-xs-regular c-white";

  // if (isMobile || isSmallMobile) {
  //   return <MobileError />;
  // }

  useEffect(() => {
    const rawState = location.state as {
      toastMessage?: string | { name?: string };
    } | null;

    const raw = rawState?.toastMessage;
    const nickname = typeof raw === "string" ? raw : raw?.name ?? "";

    if (nickname) {
      setSignUpToast(nickname);
      if (navType === "PUSH" || navType === "REPLACE") {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    }
  }, [location.state, navType]);
  return (
    <div className=" main-ver2">
      <FloatingBtn />
      <div className="flex flex-col items-center">
        <div className="page1">
          {signUpToast && (
            <Toast
              name={signUpToast}
              duration={1000}
              onClose={() => setSignUpToast("")}
            />
          )}
          <section className=" page1-width">
            <div className="page1-title-img">
              <div className="title-wrap h-fit f-dir-column p-relative">
                {/*<h1 className="title">
                  대본과 {isLaptop && <br />}공연권 거래
                  <br />
                  포도상점에서
                </h1>

                <h5 className="sub-title whitespace-nowrap">
                  편리하게 대본과 공연권을 거래해요.
                  <br />
                  여러분들이 원하던 스토리 IP 플랫폼,
                  <br />
                  포도상점을 시작하세요!
                </h5>*/}

                <h1 className=" title">
                  당신의 대본이
                  <br />
                  <span className="whitespace-nowrap">
                    무대위에 {isLaptop && <br />}오르기까지
                  </span>
                </h1>

                <h5 className="text-[16px] leading-[24px] sm:text-[24px] sm:leading-[45px] sm:tracking-[-0.48px] lg:text-[28px] lg:tracking-[-0.56px] 2xl:text-[32px] 2xl:leading-[50px] 2xl:tracking-[-0.64px] font-semibold text-[#9E9E9E] whitespace-nowrap">
                  동료 작가와 독자의 피드백으로 성장하고,
                  <br />
                  공연으로 연결되는 스토리 IP 플랫폼
                  <br />
                  포도상점과 함께해요.
                </h5>
              </div>
              {!isTablet && !isMobile && !isSmallMobile ? (
                <img src={circleIcon} alt="circle" className="circle-icon" />
              ) : (
                <div
                  className={clsx(
                    "flex w-full",
                    isSmallMobile ? "justify-center" : "justify-end"
                  )}
                >
                  <img src={circleIcon} alt="circle" className="circle-icon" />
                </div>
              )}
            </div>
            <div className="flex justify-center w-full h-content">
              <img src={arrow} alt="First" className=" arrow" />
            </div>
          </section>
        </div>

        <div className="page2">
          <h1 className="title_64px mb-[30px] sm:mb-[42px] md:mb-[78px]">
            포도상점에서는 이런 것들이 가능해요
          </h1>
          <div className=" page2-content-wrap j-content-center">
            <div className="page2-content" onClick={() => navigate("/post")}>
              <img src={title} alt="" className="page2-content-title" />
              <h1 className={page2TitleClassName}>작품 등록하기</h1>
              <h4 className={page2TextsClassName}>
                여러분의 톡톡 튀는 아이디어, <br />
                포도상점에 올려주세요!
              </h4>
              <div className="page2-img-wrap j-content-center">
                <img
                  src={
                    !isTablet
                      ? !isMobile
                        ? content1
                        : content1_480
                      : content1_768
                  }
                  alt=""
                />
              </div>
              <ImageBtn
                src={page2ButtonImg}
                alt="->"
                className="page2-button"
              />
            </div>

            {/* 768 아래에선 밑의 두 요소 contents 교체 */}
            {/* 나도 이제 뭐가 뭔지 모르겠다 대체
             * 일단 contents 내용 안바뀌고 작품 등록하기 - 작품 둘러보기 - 공연권 신청하기로 돼야 함 */}
            <div
              className="page2-content f-dir-column j-content-between"
              onClick={() =>
                !(isTablet || isMobile || isSmallMobile)
                  ? navigate("/list")
                  : navigate("/myPage/purchased")
              }
            >
              <img src={title_right} alt="" className="page2-content-title" />
              <div className="page2-img-wrap j-content-end">
                <img
                  src={
                    !isTablet
                      ? !isMobile && !isSmallMobile
                        ? content2
                        : content3_480
                      : content3_768
                  }
                  alt=""
                />
              </div>
              <div>
                {!(isTablet || isMobile || isSmallMobile)
                  ? content2Texts()
                  : content3Texts()}

                <h1
                  className={clsx(
                    page2TitleClassName,
                    !(isTablet || isMobile || isSmallMobile) &&
                      "translate-x-[20px]"
                  )}
                >
                  {!(isTablet || isMobile || isSmallMobile)
                    ? content2Title()
                    : content3Title()}
                </h1>

                <ImageBtn
                  src={page2ButtonImg}
                  alt="->"
                  className="page2-button"
                />
              </div>
            </div>

            <div
              className="page2-content"
              onClick={() =>
                !(isTablet || isMobile || isSmallMobile)
                  ? navigate("/mypage/purchased")
                  : navigate("/list")
              }
            >
              <img src={title} alt="" className="page2-content-title" />
              <div className="page2-img-wrap j-content-center">
                <img
                  src={
                    !isTablet
                      ? !isMobile && !isSmallMobile
                        ? content3
                        : content2_480
                      : content2_768
                  }
                  alt=""
                />
              </div>

              <h1 className={page2TitleClassName + " t-right"}>
                {!(isTablet || isMobile || isSmallMobile)
                  ? content3Title()
                  : content2Title()}
              </h1>

              {!(isTablet || isMobile || isSmallMobile)
                ? content3Texts()
                : content2Texts()}

              {/* 아마 이미지 export할 때 버튼 포함/버튼 제외로 다르게 불러와진 것 같음. -> 다르게 처리 */}
              {(isTablet || isMobile || isSmallMobile) && (
                <ImageBtn
                  src={page2ButtonImg}
                  alt="->"
                  className="page2-button"
                />
              )}
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
            <Page4Button
              src={brunch}
              alt="brunch"
              onClick={() => {
                window.open("https://brunch.co.kr/@651b8cc89832412", "_blank");
              }}
              imgClassName="w-[37.5px] h-[53px] md:w-[60.5px] md:h-[85px] lg:w-[95.5px] lg:h-[133.5px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainVer2;
