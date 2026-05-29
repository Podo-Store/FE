import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import StoryLengthTeb from "./StoryLengthTabs";

const meta = {
  title: "Post/StoryLengthTabs",
  component: StoryLengthTeb,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { setActiveStoryLength: fn() },
} satisfies Meta<typeof StoryLengthTeb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 전체Active: Story = {
  args: { activeStoryLength: "전체" },
};

export const 단편Active: Story = {
  args: { activeStoryLength: "단편" },
};

export const 장편Active: Story = {
  args: { activeStoryLength: "장편" },
};

export const 인터랙티브: Story = {
  args: { activeStoryLength: "전체" },
  render: () => {
    const [active, setActive] = useState("전체");
    return <StoryLengthTeb activeStoryLength={active} setActiveStoryLength={setActive} />;
  },
};
