import SmallOnOffBtn from "../../components/button/RoundBtn_135_40";

import "./DialogPopup.css";

interface DialogPopupProps {
  text: string;
  positiveBtn: {
    text: string;
    onClick: () => void;
  };
  negativeBtn: {
    text: string;
    onClick: () => void;
  };
}

/**
 * DialogPopup component (취소, 확인 등)
 * @param {Object} props
 * @param {string} props.text - 팝업 내용
 * @param {Object} props.positiveBtn - 확인 버튼
 * @param {string} props.positiveBtn.text - 확인 버튼 텍스트
 * @param {Function} props.positiveBtn.onClick - 확인 버튼 onClick
 * @param {Object} props.negativeBtn - 취소 버튼
 * @param {string} props.negativeBtn.text - 취소 버튼 텍스트
 * @param {Function} props.negativeBtn.onClick - 취소 버튼 onClick
 * @returns
 */
const DialogPopup: React.FC<DialogPopupProps> = ({ text, positiveBtn, negativeBtn }) => {
  return (
    <div className="dialog-popup f-dir-column j-content-between a-items-center">
      <p className="p-medium-bold">{text}</p>
      <div className="btn-wrap d-flex">
        <SmallOnOffBtn color="grey" onClick={negativeBtn.onClick}>
          {negativeBtn.text}
        </SmallOnOffBtn>
        <SmallOnOffBtn color="purple" onClick={positiveBtn.onClick}>
          {positiveBtn.text}
        </SmallOnOffBtn>
      </div>
    </div>
  );
};

export default DialogPopup;
