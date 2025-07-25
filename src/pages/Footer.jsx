import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import MyPageInterceptor from "@/components/myPage/footer/MyPageInterceptor";

import logo from "../assets/image/footer/new_logo.svg";
import instagramIcon from "../assets/image/footer/instagramIcon.svg";
import mail from "../assets/image/footer/mail.svg";
// import youtubeIcon from "../assets/image/footer/youtubeIcon.svg";
// import XIcon from "../assets/image/footer/XIcon.svg";

import "./Footer.scss";
import "./../styles/text.css";
import "./../styles/utilities.css";

function Footer() {
  const navigate = useNavigate();

  const footerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      <MyPageInterceptor footerRef={footerRef}></MyPageInterceptor>
      <div className="footer" ref={footerRef}>
        <div className="footer-inner">
          <div className="footer-upper">
            <img src={logo} alt="navLogo" />
            <div style={{ height: "10px" }}></div>
            <p>포도상점은 저작권의 당사자가 아닌 대리중개업체입니다.</p>
            <p>Copyright © 2024 포도상점. Powered by 포도상점</p>
          </div>
          <div className="footer-lower">
            <div className="business-info">
              {/*<p>사업자 번호 : 111-11-111111</p>*/}
              <p>&nbsp;</p>
              <p>연락처 : 010-5251-5830</p>
              <p>대표 : 서준</p>
            </div>

            <div className="sitemap">
              <div id="left" className="sitemap-section">
                <>
                  <hr />

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
                <hr id="right" />
                <ul id="us">
                  <div className="f-dir-column">
                    <li className="p-xs-regular">Follow us.</li>
                    <li id="icons">
                      <a
                        href="https://www.instagram.com/podosangjeom"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={instagramIcon} alt="instagramIcon" />
                        <p className="p-xs-regular">@podosangjeom</p>
                      </a>
                    </li>
                  </div>

                  <div className="contact f-dir-column">
                    <li className="p-xs-regular">Contact.</li>
                    <li className="a-items-center" id="contact">
                      <img src={mail} alt="contact" />
                      <p className="p-xs-regular">podostore1111@gmail.com</p>
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
