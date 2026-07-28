import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./StoryLengthTabs.scss";

interface Props {
  activeStoryLength: string;
  setActiveStoryLength: (value: string) => void;
}

const storyLength = ["전체", "단편", "장편", "공모"];

const StoryLengthTeb = ({ activeStoryLength, setActiveStoryLength }: Props) => {
  const tabListRef = useRef<HTMLUListElement>(null);
  const tabRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const recalculateIndicator = () => {
    const tabList = tabListRef.current;
    const activeTab = tabRefs.current[activeStoryLength];
    if (!tabList || !activeTab) return;

    const listRect = tabList.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    setIndicatorStyle({
      left: tabRect.left - listRect.left,
      width: tabRect.width,
    });
  };

  useLayoutEffect(recalculateIndicator, [activeStoryLength]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(recalculateIndicator);
    if (tabListRef.current) resizeObserver.observe(tabListRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <ul
      ref={tabListRef}
      className="flex relative list-none story-length"
      role="tablist"
      style={{ padding: 0, margin: 0 }}
    >
      {storyLength.map((length) => {
        const isActive = activeStoryLength === length;
        return (
          <li
            key={length}
            ref={(element) => {
              tabRefs.current[length] = element;
            }}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              if (!isActive) {
                setActiveStoryLength(length);
              }
            }}
            className={`cursor-pointer z-10 whitespace-nowrap p-small-medium sm:h5-medium hover:text-[#6A39C0] ${
              isActive ? "text-[#6A39C0]" : "text-black"
            }`}
          >
            {length}
          </li>
        );
      })}
      <span className="story-length-indicator" aria-hidden="true" style={indicatorStyle} />
    </ul>
  );
};

export default StoryLengthTeb;
