import inequalityLeft from "./../../assets/image/button/inequalityLeft.svg";
import inequalityRight from "./../../assets/image/button/inequalityRight.svg";

import "./Modal.css";

const Modal = ({ Page, showThreshold, selectedPage, setSelectedPage }) => {
  const closeModal = () => {
    setSelectedPage(null); // modal 닫기
  };

  return (
    <div className="f-center modal-overlay" onClick={closeModal}>
      <img
        src={inequalityLeft}
        alt="left-btn"
        className={selectedPage !== 1 ? "c-pointer" : null}
        onClick={(e) => {
          e.stopPropagation();
          if (selectedPage > 1) {
            setSelectedPage(selectedPage - 1);
          }
        }}
      />
      <div className="no-drag modal-content" onClick={(e) => e.stopPropagation()}>
        <Page renderMode="canvas" pageNumber={selectedPage} width={600} />
      </div>
      <img
        src={inequalityRight}
        alt="right-btn"
        className={selectedPage !== showThreshold ? "c-pointer" : null}
        onClick={(e) => {
          e.stopPropagation();
          if (selectedPage < showThreshold) {
            setSelectedPage(selectedPage + 1);
          }
        }}
      />
    </div>
  );
};

export default Modal;
