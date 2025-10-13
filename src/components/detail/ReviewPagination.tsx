import clsx from "clsx";
import leftDisabledIcon from "../../assets/image/button/arrow/ic_gray_left_arrow.svg";
import rightDisabledIcon from "../../assets/image/button/arrow/ic_gray_right_arrow.svg";
import leftIcon from "../../assets/image/button/arrow/ic_black_left_arrow.svg";
import rightIcon from "../../assets/image/button/arrow/ic_black_right_arrow.svg";

interface ReviewPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ReviewPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ReviewPaginationProps) => {
  const PAGE_LIMIT = 5;
  const currentGroup = Math.floor((currentPage - 1) / PAGE_LIMIT);
  const startPage = currentGroup * PAGE_LIMIT + 1;
  const endPage = Math.min(startPage + PAGE_LIMIT - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePrevGroup = () => {
    if (startPage > 1) {
      onPageChange(startPage - 1); // 이전 블록의 마지막 페이지로 이동
    }
  };
  const handleNextGroup = () => {
    if (endPage < totalPages) {
      onPageChange(endPage + 1); // 다음 블록의 첫 페이지로 이동
    }
  };

  return (
    <div className="flex justify-center items-center gap-[20px]">
      <button onClick={handlePrevGroup} disabled={startPage === 1}>
        <img src={startPage === 1 ? leftDisabledIcon : leftIcon} alt="이전" />
      </button>

      <div className="flex items-center gap-[30px]">
        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={clsx("p-medium-medium", {
              "text-[#BABABA]": p !== currentPage,
            })}
          >
            {p}
          </button>
        ))}
      </div>

      <button onClick={handleNextGroup} disabled={endPage === totalPages}>
        <img
          src={endPage === totalPages ? rightDisabledIcon : rightIcon}
          alt="다음"
        />
      </button>
    </div>
  );
};

export default ReviewPagination;
