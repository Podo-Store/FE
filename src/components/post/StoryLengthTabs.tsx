import useWindowDimensions from "@/hooks/useWindowDimensions";
import "./StoryLengthTabs.scss";

interface Props {
  activeStoryLength: string;
  setActiveStoryLength: (value: string) => void;
}

const storyLength = ["전체", "단편", "장편"];

const StoryLengthTeb = ({ activeStoryLength, setActiveStoryLength }: Props) => {
  const { widthConditions } = useWindowDimensions();
  const { isSmallMobile, isMobile, isTablet, isLaptop, isDesktop } =
    widthConditions;

  return (
    <ul
      className="flex list-none story-length"
      style={{ padding: 0, margin: 0 }}
    >
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
            className={`cursor-pointer z-10  whitespace-nowrap ${
              isSmallMobile ? "p-small-medium" : " h5-medium"
            } hover:text-[#6A39C0] ${
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
