import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import StageTab from "./StageTab";
import type { StageType } from "@/types/stage";

const meta = {
  title: "Post/StageTab",
  component: StageTab,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: { setActiveStage: fn() },
} satisfies Meta<typeof StageTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 포도밭Active: Story = {
  args: { activeStage: "포도밭", stageIcon: true },
};

export const 포도알Active: Story = {
  args: { activeStage: "포도알", stageIcon: true },
};

export const 아이콘없음: Story = {
  args: { activeStage: "포도밭", stageIcon: false },
};

export const 인터랙티브: Story = {
  args: { activeStage: "포도밭" },
  render: () => {
    const [active, setActive] = useState<StageType>("포도밭");
    return (
      <StageTab
        activeStage={active}
        setActiveStage={(v) => setActive(v as StageType)}
        stageIcon
      />
    );
  },
};
