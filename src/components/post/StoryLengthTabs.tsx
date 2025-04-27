import React from "react";

interface Props {
  activeStoryLength: string;
  setActiveStoryLength: (value: string) => void;
}

const storyLength = ["전체", "장편", "단편"];

const StoryLengthTeb = ({ activeStoryLength, setActiveStoryLength }: Props) => {
  return (
    <ul className="flex list-none " style={{ padding: 0, margin: 0 }}>
      {storyLength.map((length) => {
        const isActive = activeStoryLength === length;
        return (
          <li
            key={length}
            className={`z-10 px-[15px] py-[10px] text-[20px] leading-[28px] font-medium tracking-[-0.4px] font-['Pretendard']  ${
              isActive
                ? "border-b-2 border-[#6A39C0] rounded-[1px] "
                : "text-black"
            }`}
            onClick={() => setActiveStoryLength(length)}
          >
            {length}
          </li>
        );
      })}
    </ul>
  );
};

export default StoryLengthTeb;
