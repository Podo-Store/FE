import useWindowDimensions from "@/hooks/useWindowDimensions";
import "./StageTab.scss";

interface Props {
  activeStage: string;
  setActiveStage: (value: string) => void;
}

const stages = ["포도밭", "포도알", "포도송이", "와인"];
const availableStages = ["포도밭", "포도알"];

const StageTab = ({ activeStage, setActiveStage }: Props) => {
  const { widthConditions } = useWindowDimensions();
  const { isSmallMobile, isMobile, isTablet, isLaptop, isDesktop } =
    widthConditions;

  const handleStageClick = (stage: string) => {
    if (!availableStages.includes(stage)) return;
    setActiveStage(stage);
  };

  return (
    <>
      <ul
        className="flex relative list-none mt-[10px] mb-[-4px] stage-tab"
        style={{ padding: 0 }}
      >
        {stages.map((stage) => {
          const isActive = activeStage === stage;
          const isAvailable = availableStages.includes(stage);

          return (
            <li
              key={stage}
              className={` stage-tab-li z-10  whitespace-nowrap ${
                isSmallMobile ? "p-small-medium" : " h5-medium"
              }
              ${
                isActive
                  ? " border-b-4 border-[#6A39C0] rounded-[1px]"
                  : "text-black"
              }
               ${
                 isAvailable
                   ? "cursor-pointer text-black hover:text-[#6A39C0]"
                   : "text-[var(--grey6)]"
               }
            
          `}
              onClick={() => {
                if (isAvailable) {
                  handleStageClick(stage);
                  setActiveStage(stage);
                }
              }}
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
