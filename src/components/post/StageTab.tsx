import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  activeCategory: string;
  setActiveCategory: (value: string) => void;
}

const stages = ["포도밭", "포도알", "포도송이", "와인"];
const availableStages = ["포도밭"];

const StageTab = ({ activeCategory, setActiveCategory }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <ul
        className="flex relative list-none mt-[10px] mb-[-4px]"
        style={{ padding: 0 }}
      >
        {stages.map((stage) => {
          const isActive = activeCategory === stage;
          const isAvailable = availableStages.includes(stage);

          return (
            <li
              key={stage}
              className={`z-10 px-[15px] py-[10px]  leading-[28px] h5-medium
              ${
                isActive
                  ? " border-b-4 border-[#6A39C0] rounded-[1px] "
                  : "text-black"
              }
               ${
                 isAvailable
                   ? "cursor-pointer text-black"
                   : "text-[var(--grey6)]"
               }
            
          `}
            >
              {stage}
            </li>
          );
        })}
      </ul>
      {/* <span className=" w-full h-[1px] block bg-[#E2E2E2] z-0 "></span> */}
    </>
  );
};
export default StageTab;
