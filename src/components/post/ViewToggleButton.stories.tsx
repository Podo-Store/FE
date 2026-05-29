import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import ViewToggleButton from "./ViewToggleButton";

const meta = {
  title: "Post/ViewToggleButton",
  component: ViewToggleButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { setViewType: fn() },
} satisfies Meta<typeof ViewToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 그리드뷰: Story = {
  args: { viewType: "grid" },
};

export const 카드뷰: Story = {
  args: { viewType: "card" },
};

export const 인터랙티브: Story = {
  args: { viewType: "grid" },
  render: () => {
    const [viewType, setViewType] = useState<"grid" | "card">("grid");
    return <ViewToggleButton viewType={viewType} setViewType={setViewType} />;
  },
};
