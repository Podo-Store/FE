import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import MyPageInterceptor from "@/components/myPage/footer/MyPageInterceptor";

import logo from "../assets/image/footer/new_logo.svg";
import InstagramIcon from "../assets/image/footer/instagramIcon.svg?react";
import MailIcon from "../assets/image/footer/mail.svg?react";
// import youtubeIcon from "../assets/image/footer/youtubeIcon.svg";
// import XIcon from "../assets/image/footer/XIcon.svg";

import "./Footer.scss";
import "./../styles/text.css";
import "./../styles/utilities.css";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCompanyPage = location.pathname === "/company";

  const footerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      <MyPageInterceptor footerRef={footerRef}></MyPageInterceptor>
      <div
        className={clsx(
          "footer h-[298px] h-max-[300px]",
          isCompanyPage && "bg-[#1A1004] h-full"
        )}
        ref={footerRef}
      >
        <div className="footer-inner h-fit my-auto">
          <div
            className={clsx(
              "footer-upper text-[#333]",
              isCompanyPage && "text-[#F2F2F2]/90"
            )}
          >
            <img src={logo} alt="navLogo" />
            <div style={{ height: "10px" }}></div>
            <p>포도상점은 저작권의 당사자가 아닌 대리중개업체입니다.</p>
            <p>Copyright © 2025 포도상점. Powered by 포도상점</p>
          </div>
          <div className="footer-lower">
            <div
              className={clsx(
                "business-info p-xs-regular text-[#333]",
                isCompanyPage && "text-[#F2F2F2]/90"
              )}
            >
              <p>&nbsp;</p>
              <p>포도상점</p>
              <p className="">대표 : 서준</p>
              <p>사업자등록번호 : 196-64-00773</p>
              <p>통신판매업신고번호 : 2025-서울노원-1262</p>
              <p class="whitespace-pre-line">
                <span class="inline-block w-[25px]">주소 :</span>
                서울특별시 노원구 석계로 98-2, 3층 A-2호
                <br />
                <span class="inline-block w-[25px]"></span>(월계동,
                스타트업스테이션)
              </p>

              <p>연락처 : 010-5251-5830</p>
            </div>

            <div
              className={clsx("sitemap", isCompanyPage && "text-[#F2F2F2]/90")}
            >
              <div id="left" className="sitemap-section">
                <>
                  <hr
                    className={clsx(isCompanyPage && "!border-[#F2F2F2]/90")}
                  />

                  <ul id="menu">
                    <li
                      className="p-xs-bold c-pointer"
                      onClick={() => {
                        navigate("/list");
                        scrollToTop();
                      }}
                    >
                      작품 둘러보기
                    </li>
                    <li
                      className="p-xs-bold c-pointer"
                      onClick={() => {
                        navigate("/post");
                        scrollToTop();
                      }}
                    >
                      작품 등록하기
                    </li>
                    <li
                      className="p-xs-bold c-pointer"
                      onClick={() => {
                        navigate("/performedWork");
                        scrollToTop();
                      }}
                    >
                      공연 소식
                    </li>
                    <li
                      className="p-xs-bold c-pointer"
                      onClick={() => {
                        navigate("/company");
                        scrollToTop();
                      }}
                    >
                      회사 소개
                    </li>
                  </ul>
                </>
              </div>
              <div id="right" className="sitemap-section">
                <ul id="question">
                  <li
                    className="p-xs-regular"
                    onClick={() => {
                      navigate("/policy/0");
                      scrollToTop();
                    }}
                  >
                    개인정보처리방침
                  </li>
                  <li
                    className="p-xs-regular t-align-right"
                    onClick={() => {
                      navigate("/policy/1");
                      scrollToTop();
                    }}
                  >
                    이용약관
                  </li>
                  {/*<li>
                  <button>문의하기</button>
                </li>*/}
                </ul>
                <hr
                  id="right"
                  className={clsx(isCompanyPage && "!border-[#F2F2F2]/90")}
                />

                <ul id="us">
                  <div className="f-dir-column">
                    <li className="p-xs-regular">Follow us.</li>
                    <li id="icons">
                      <a
                        href="https://www.instagram.com/podosangjeom"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <InstagramIcon
                          className={clsx(
                            "text-[#000]",
                            isCompanyPage && "text-[#F2F2F2]/90"
                          )}
                        />
                        <p
                          className={clsx(
                            "p-xs-regular",
                            isCompanyPage && "text-[#F2F2F2]/90"
                          )}
                        >
                          @podosangjeom
                        </p>
                      </a>
                    </li>
                  </div>

                  <div className="contact f-dir-column">
                    <li className="p-xs-regular">각색 및 굿즈 제작 문의</li>
                    <li className="a-items-center" id="contact">
                      <MailIcon
                        className={clsx(
                          "text-[#000]",
                          isCompanyPage && "text-[#F2F2F2]/90"
                        )}
                      />
                      <p
                        className={clsx(
                          "p-xs-regular",
                          isCompanyPage && "text-[#F2F2F2]/90"
                        )}
                      >
                        podostore1111@gmail.com
                      </p>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
