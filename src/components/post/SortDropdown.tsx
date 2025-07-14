import { useState, useRef, useEffect } from "react";
import downDropIcon from "@/assets/image/post/ic_arrow_down.svg";
const SORT_OPTIONS = ["POPULAR", "LIKE_COUNT", "LATEST"];

interface SortDropdownProps {
  selected?: string; // optional
  onChange?: (val: "POPULAR" | "LIKE_COUNT" | "LATEST") => void; // optional
}

const LABEL_MAP: Record<"POPULAR" | "LIKE_COUNT" | "LATEST", string> = {
  POPULAR: "조회수순",
  LIKE_COUNT: "좋아요순",
  LATEST: "최신순",
};

const SortDropdown: React.FC<SortDropdownProps> = ({
  selected = "POPULAR",
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: "POPULAR" | "LIKE_COUNT" | "LATEST") => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 선택 영역 */}
      <button
        onClick={toggleDropdown}
        className="flex  flex-row items-center gap-[4px] whitespace-nowrap p-medium-regular hover:text-[#6A39C0]"
      >
        <span className="align-middle">
          {LABEL_MAP[selected as "POPULAR" | "LIKE_COUNT" | "LATEST"]}
        </span>
        <img
          src={downDropIcon}
          className={`transition-transform align-middle ${
            isOpen ? "rotate-180" : ""
          }`}
          alt="드롭다운 아이콘"
        ></img>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <ul className="absolute z-10 mt-[5px] flex flex-col gap-[10px] p-medium-regular list-none text-center py-[14px] px-[0px] w-[84px] bg-[var(--white)] border border-[var(--grey3)] rounded-[5px] ">
          {SORT_OPTIONS.map((option) => (
            <li
              key={option}
              className={`cursor-pointer   ${
                selected === option
                  ? "p-medium-medium"
                  : "p-medium-regular text-[var(--grey6)] hover:text-[#6A39C0]"
              } hover:bg-gray-100`}
              onClick={() =>
                handleSelect(option as "POPULAR" | "LIKE_COUNT" | "LATEST")
              }
            >
              {LABEL_MAP[option as "POPULAR" | "LIKE_COUNT" | "LATEST"]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SortDropdown;
