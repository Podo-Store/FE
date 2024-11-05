import { useNavigate } from "react-router-dom";

import logo from "../assets/image/footer/new_logo.svg";
import instagramIcon from "../assets/image/footer/instagramIcon.svg";
import mail from "../assets/image/footer/mail.svg";
// import youtubeIcon from "../assets/image/footer/youtubeIcon.svg";
// import XIcon from "../assets/image/footer/XIcon.svg";

import "./Footer.css";
import "./../styles/text.css";
import "./../styles/utilities.css";

function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="footer">
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
            <p>연락처 : 010-5251-5830</p>
            <p>대표 : 서준</p>
          </div>

          <div className="sitemap">
            <div className="sitemap-section">
              <hr />

              <ul id="menu">
                <li
                  onClick={() => {
                    navigate("/list");
                    scrollToTop();
                  }}
                >
                  작품 둘러보기
                </li>
                <li
                  onClick={() => {
                    navigate("/post");
                    scrollToTop();
                  }}
                >
                  작품 등록하기
                </li>
              </ul>
            </div>
            <div className="sitemap-section">
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
              <hr />
              <ul>
                <li>Follow us.</li>
                <li id="icons">
                  <a
                    href="https://www.instagram.com/podosangjeom"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={instagramIcon} alt="instagramIcon" />
                    <p>@podosangjeom</p>
                  </a>
                </li>
                <div style={{ height: "12px" }}></div>
                <li>Contact.</li>
                <li className="d-flex" id="contact">
                  <img src={mail} alt="contact" />
                  <p>podostore1111@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
