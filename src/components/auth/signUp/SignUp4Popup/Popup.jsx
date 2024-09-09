import PopupClose from "./../../../../assets/image/button/PopupClose.svg";

import "./Popup.css";

import "./../../../../styles/text.css";
import "./../../../../styles/utilities.css";

const Popup = ({ title, detail, setShowPopup }) => {
  return (
    <div className="popup">
      <div className="j-content-between">
        <div className="j-content-center a-items-center" id="title">
          <p className="p-small-medium c-black">{title}</p>
        </div>
        <img
          className="c-pointer"
          id="close-btn"
          src={PopupClose}
          alt="close"
          onClick={() => {
            setShowPopup(false);
          }}
        ></img>
      </div>
      <div id="content-wrap">
        <div id="content">
          {
            // \n으로 구분된 문자열을 줄바꿈으로 나누어 출력
            detail.split("\n").map((line, index) => (
              <p key={index} className="p-small-medium c-black">
                {line}
                <br />
              </p>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Popup;
