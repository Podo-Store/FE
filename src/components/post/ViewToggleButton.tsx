import cardView from "./../../assets/image/post/list/ic_card_view.svg";
import gridView from "./../../assets/image/post/list/ic_grid_view.svg";

import "./viewToggleButton.scss";

interface Props {
  viewType: "grid" | "card";
  setViewType: (value: "grid" | "card") => void;
}

const ViewToggleButton = ({ viewType, setViewType }: Props) => {
  const toggleViewType = () => {
    setViewType(viewType === "grid" ? "card" : "grid");
  };

  return (
    <img
      src={viewType === "grid" ? gridView : cardView}
      alt={viewType === "grid" ? "그리드 보기로 전환" : "카드 보기로 전환"}
      onClick={toggleViewType}
      className="cursor-pointer hover:bg-[#f4f2f3] view-toggle"
    />
  );
};

export default ViewToggleButton;
