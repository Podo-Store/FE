import CloseBtn from "./../../assets/image/button/CloseBtn.svg";
import inequalityLeft from "./../../assets/image/button/inequalityLeft.svg";
import inequalityRight from "./../../assets/image/button/inequalityRight.svg";

import "./PreviewDiv.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

const PreviewDiv = ({ Page, showThreshold, selectedPage, setSelectedPage }) => {
  return (
    <div>
      <hr id="selected-page-hr" />

      <div id="selected-page">
        <div className="f-dir-column f-center">
          <img
            className="c-pointer"
            id="close-btn"
            src={CloseBtn}
            alt="close"
            onClick={() => setSelectedPage(null)}
          />
          <div className="d-flex" id="background-page-wrap">
            <div id="background-page" style={selectedPage === 1 ? { opacity: "0" } : null}></div>
            <div
              id="background-page"
              style={selectedPage === showThreshold ? { opacity: "0" } : null}
            ></div>
          </div>
          <div className="f-center no-drag" id="page" onClick={(e) => e.stopPropagation()}>
            <img
              src={inequalityLeft}
              alt="left-btn"
              className="c-pointer"
              onClick={() => {
                if (selectedPage > 1) {
                  setSelectedPage(selectedPage - 1);
                }
              }}
            />
            <div className="p-relative">
              <Page renderMode="canvas" pageNumber={selectedPage} width={609} />
              <h3 className="h3-regular" id="select-page">
                {selectedPage}
              </h3>
            </div>
            <img
              src={inequalityRight}
              alt="right-btn"
              className="c-pointer"
              onClick={() => {
                if (selectedPage < showThreshold) {
                  setSelectedPage(selectedPage + 1);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewDiv;
