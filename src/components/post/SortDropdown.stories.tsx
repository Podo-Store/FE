import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import SortDropdown from "./SortDropdown";

const meta = {
  title: "Post/SortDropdown",
  component: SortDropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof SortDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 조회수순: Story = {
  args: { selected: "POPULAR" },
};

export const 좋아요순: Story = {
  args: { selected: "LIKE_COUNT" },
};

export const 최신순: Story = {
  args: { selected: "LATEST" },
};

export const 인터랙티브: Story = {
  render: () => {
    const [selected, setSelected] = useState<"POPULAR" | "LIKE_COUNT" | "LATEST">("POPULAR");
    return <SortDropdown selected={selected} onChange={setSelected} />;
  },
};
