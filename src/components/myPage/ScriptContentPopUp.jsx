import clsx from "clsx";
import closeBtn from "../../assets/image/button/CloseBtn.svg";

import "./ScriptContentPopUp.css";
import "./../../styles/utilities.css";

/**
 * @param {Object} props - Component properties
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onClose - Callback function to close the popup
 * @param {string} props.type - Type of the popup ("script" or "account")
 */
const ScriptContentPopUp = ({ className, onClose, type }) => {
  let content;
  if (type === "script") {
    content = (
      <p>
        작가가 작품을 삭제하여 <br /> 더 이상 공연권을 구매하거나 <br /> 대본을
        다운받을 수 없습니다.{" "}
      </p>
    );
  } else if (type === "account") {
    content = (
      <p>
        작가가 계정을 삭제하여 <br /> 더 이상 공연권을 구매하거나 <br /> 대본을
        다운받을 수 없습니다.{" "}
      </p>
    );
  }

  return (
    <div
      className={clsx(
        "script-content-popup flex flex-col justify-center items-center",
        className
      )}
    >
      {/* <div className="d-flex j-content-end">
        <img
          src={closeBtn}
          alt=""
          className="close-button"
          onClick={onClose}
        ></img>
      </div> */}
      <div className="d-flex j-content-center">{content}</div>
    </div>
  );
};

export default ScriptContentPopUp;
