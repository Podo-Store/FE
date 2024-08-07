import "./Footer.css";
import logo from "../assets/image/footer/logo.png";
import instagramIcon from "../assets/image/footer/instagramIcon.svg";
import youtubeIcon from "../assets/image/footer/youtubeIcon.svg";
import XIcon from "../assets/image/footer/XIcon.svg";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Footer() {
  const movePage = useNavigate();

  return (
    <div className="footer">
      <div className="inner">
        <div className="upper">
          <div className="logo-title">
            <img src={logo} alt="navLogo" style={{ display: "inline-block" }} />
            <h1>포도상점</h1>
          </div>
          <p>Copyright © 2024 포도상점. Powered by 포도상점</p>
        </div>
        <div className="lower">
          <div className="business-info">
            <p>사업자 번호 : 111-11-111111</p>
            <p>연락처 : 010-0000-0000</p>
            <p>대표 : 서준</p>
          </div>

          <div className="sitemap">
            <div className="sitemap-section">
              <ul>
                <li>
                  <strong>마이페이지</strong>
                </li>
                <li>
                  <a href="#">좋아한 작품</a>
                </li>
                <li>
                  <a href="#">구매한 작품</a>
                </li>
                <li>
                  <a href="#">등록한 작품</a>
                </li>
                <li>
                  <a href="#">Q&A</a>
                </li>
              </ul>

              <hr />

              <ul>
                <li>
                  <strong>
                    <a href="#">장바구니</a>
                  </strong>
                </li>
              </ul>

              <hr style={{ marginRight: "10px" }} />

              <ul>
                <strong>
                  <li>
                    <a href="#">작품 둘러보기</a>
                  </li>
                  <li>
                    <a href="#">지금 공연 중</a>
                  </li>
                  <li>
                    <a href="#">작품 등록하기</a>
                  </li>
                  <li>
                    <a href="#">희망 대본 신청 게시판</a>
                  </li>
                </strong>
              </ul>
            </div>

            <div className="sitemap-section"></div>

            <div className="sitemap-section">
              <ul>
                <li>개인정보처리방침</li>
                <li>
                  <button>문의하기</button>
                </li>
              </ul>
              <hr style={{ marginRight: "10px" }} />
              <ul>
                <li>About us</li>
                <li>
                  <strong>Front </strong>서준 @
                </li>
                <li>
                  <strong>Back </strong>김정윤 @
                </li>
                <li>
                  <strong>Marketing </strong>정지원 @
                </li>
                <li>
                  <strong>Design </strong>이인호 @
                </li>
              </ul>
            </div>

            <div className="sitemap-section">
              <hr style={{ marginRight: "10px" }} />
              <ul>
                <li>Follow us</li>
                <li className="icons">
                  <img
                    onClick={() => {
                      movePage("/instagram");
                    }}
                    src={instagramIcon}
                    alt="instagramIcon"
                  />
                  <img
                    onClick={() => {
                      movePage("/youtube");
                    }}
                    src={youtubeIcon}
                    alt="youtubeIcon"
                  />
                  <img
                    onClick={() => {
                      movePage("/X");
                    }}
                    src={XIcon}
                    alt="XIcon"
                  />
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
