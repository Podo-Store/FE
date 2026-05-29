import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import PostHeaderControl from "./PostHeaderControl";
import type { StageType } from "@/types/stage";

const meta = {
  title: "Post/PostHeaderControl",
  component: PostHeaderControl,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    setActiveStage: fn(),
    setActiveStoryLength: fn(),
    setViewType: fn(),
    setSortType: fn(),
    stageBottomBorderWidth: "w-[100vw]",
  },
} satisfies Meta<typeof PostHeaderControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 기본: Story = {
  args: {
    activeStage: "포도밭",
    activeStoryLength: "전체",
    viewType: "grid",
    isSorted: true,
    sortType: "POPULAR",
    stageBelt: true,
  },
};

export const 정렬없음: Story = {
  args: {
    activeStage: "포도알",
    activeStoryLength: "단편",
    viewType: "grid",
    isSorted: false,
    stageBelt: false,
    stageBottomBorderWidth: "w-full",
  },
};

export const 인터랙티브: Story = {
  args: {
    activeStage: "포도밭",
    activeStoryLength: "전체",
    viewType: "grid",
    sortType: "POPULAR",
  },
  render: () => {
    const [stage, setStage] = useState<StageType>("포도밭");
    const [category, setCategory] = useState("전체");
    const [viewType, setViewType] = useState<"grid" | "card">("grid");
    const [sortType, setSortType] = useState<"POPULAR" | "LIKE_COUNT" | "LATEST">("POPULAR");
    return (
      <PostHeaderControl
        activeStage={stage}
        setActiveStage={(v) => setStage(v as StageType)}
        activeStoryLength={category}
        setActiveStoryLength={setCategory}
        viewType={viewType}
        setViewType={setViewType}
        isSorted
        sortType={sortType}
        setSortType={setSortType}
        stageBottomBorderWidth="w-[100vw]"
        stageBelt
      />
    );
  },
};
