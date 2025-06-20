import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface Props {
  activeStoryLength: string;
  setActiveStoryLength: (value: string) => void;
}

const storyLength = ["전체", "단편", "장편"];

const pathMap: Record<string, string> = {
  전체: "",
  장편: "/long",
  단편: "/short",
};

const StoryLengthTeb = ({ activeStoryLength, setActiveStoryLength }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname.includes("/long")) {
  //     setActiveStoryLength("장편");
  //   } else if (location.pathname.includes("/short")) {
  //     setActiveStoryLength("단편");
  //   } else {
  //     setActiveStoryLength("전체");
  //   }
  // }, [location.pathname, setActiveStoryLength]);

  return (
    <ul className="flex list-none " style={{ padding: 0, margin: 0 }}>
      {storyLength.map((length) => {
        const isActive = activeStoryLength === length;
        return (
          <li
            key={length}
            onClick={() => {
              if (!isActive) {
                setActiveStoryLength(length);
              }
            }}
            className={`cursor-pointer z-10 px-[15px] py-[10px] text-[20px] leading-[28px] font-medium tracking-[-0.4px] font-['Pretendard']  ${
              isActive
                ? "border-b-2 border-[#6A39C0] rounded-[1px] "
                : "text-black"
            }`}
          >
            {length}
          </li>
        );
      })}
    </ul>
  );
};

export default StoryLengthTeb;
