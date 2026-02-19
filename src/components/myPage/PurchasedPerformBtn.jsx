import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./../button/RoundBtn_149_48";
import DownloadScriptModal from "../modal/DownloadScriptModal"
import "./PurchasedScriptBtn.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";
import { useScriptDownloadMutation } from "@/feature/profile/scriptDownload/queries"

/**
 *
 * @param {object} props
 * @param {number} props.id - id
 * @param {number} props.possibleCount - 공연 가능 횟수
 * @returns
 */
const PurchasedPerformBtn = ({ id, possibleCount = 0, style }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => setOpenModal(false);
  const { mutate: download, isPending } = useScriptDownloadMutation();

  const handleConfirmDownload = () => {
    download(id);
    console.log("확인(다운로드)");
    setOpenModal(false);
  };

  return (
    <div className="j-content-end purchased-script-btn">
      <div className="purchased-script-btn">
        <Button
          onClick={() => {
            navigate(`/mypage/purchased/performance-info/${id}`);
          }}
          color="white"

        >
          공연 신청 정보

        </Button>
      </div>
      <div className="purchased-script-btn">
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          대본 다운로드

        </Button>
      </div>

      <DownloadScriptModal
        isOpen={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDownload}
      />

    </div>
  );
};

export default PurchasedPerformBtn;
