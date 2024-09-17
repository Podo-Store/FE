import closeBtn from "../../assets/image/button/CloseBtn.svg";

import "./ScriptContentPopUp.css";
import "./../../styles/utilities.css";

const ScriptContentPopUp = ({ onClose }) => {
  return (
    <div className="script-content-popup">
      <div className="d-flex j-content-end">
        <img src={closeBtn} alt="" className="close-button" onClick={onClose}></img>
      </div>
      <div className="d-flex j-content-center">
        <p>
          작가가 계정을 삭제하여 <br /> 더 이상 공연권을 구매하거나 <br /> 대본을 다운받을 수
          없습니다.{" "}
        </p>
      </div>
    </div>
  );
};

export default ScriptContentPopUp;
