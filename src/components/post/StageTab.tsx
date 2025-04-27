import React from "react";

interface Props {
  activeCategory: string;
  setActiveCategory: (value: string) => void;
}

const stages = ["포도밭", "포도알", "포도송이", "와인"];

const StageTab = ({ activeCategory, setActiveCategory }: Props) => {
  return (
    <>
      <ul
        className="flex relative list-none mt-[10px] mb-[-4px]"
        style={{ padding: 0 }}
      >
        {stages.map((stage) => {
          const isActive = activeCategory === stage;

          return (
            <li
              key={stage}
              className={`z-10 px-[15px] py-[10px] text-[20px] leading-[28px] font-medium tracking-[-0.4px] font-['Pretendard']
           text-black
              ${
                isActive
                  ? "border-b-4 border-[#6A39C0] rounded-[1px] "
                  : "text-black"
              }
            
          `}
            >
              {stage}
            </li>
          );
        })}
      </ul>
      <span className=" w-full h-[1px] block bg-[#E2E2E2] z-0 "></span>
    </>
  );
};
export default StageTab;
