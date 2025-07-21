import { useState, useRef, useEffect } from "react";
import downDropIcon from "@/assets/image/post/ic_arrow_down.svg";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import "./SortDropdown.scss";
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
  const { widthConditions } = useWindowDimensions();
  const { isSmallMobile, isMobile, isTablet, isLaptop, isDesktop } =
    widthConditions;
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
    <div className="relative sort-drop-down" ref={dropdownRef}>
      {/* 선택 영역 */}
      <button
        onClick={toggleDropdown}
        className={`sort-drop-down-button flex flex-row items-center  whitespace-nowrap  hover:text-[#6A39C0] ${
          isSmallMobile ? "p-xs-regular" : "p-medium-regular"
        }`}
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
        <ul
          className={`sort-drop-down-menu absolute z-10 mt-[5px] flex flex-col  list-none text-center px-[0px]  bg-[var(--white)] border border-[var(--grey3)] rounded-[5px] ${
            isSmallMobile ? "p-xs-medium" : "p-medium-medium"
          }`}
        >
          {SORT_OPTIONS.map((option) => (
            <li
              key={option}
              className={`cursor-pointer   ${
                selected === option
                  ? `${isSmallMobile ? "p-xs-medium" : "p-medium-medium"}`
                  : `${
                      isSmallMobile ? "p-xs-regular" : "p-medium-regular"
                    } text-[var(--grey6)] hover:text-[#6A39C0]`
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
