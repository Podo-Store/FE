import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import ToggleSlideV2 from "./ToggleSlideV2";

const meta = {
  title: "Button/ToggleSlideV2",
  component: ToggleSlideV2,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onChangeToggle: fn() },
} satisfies Meta<typeof ToggleSlideV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 대본선택: Story = {
  args: { toggle: false },
};

export const 공연권선택: Story = {
  args: { toggle: true },
};

export const 인터랙티브: Story = {
  args: { toggle: false },
  render: () => {
    const [toggle, setToggle] = useState(false);
    return <ToggleSlideV2 toggle={toggle} onChangeToggle={() => setToggle((v) => !v)} />;
  },
};
