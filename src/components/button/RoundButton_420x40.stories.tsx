import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import RoundButton_420x40 from "./RoundButton_420x40";

const meta = {
  title: "Button/RoundButton_420x40",
  component: RoundButton_420x40,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onClick: fn(), children: "확인" },
} satisfies Meta<typeof RoundButton_420x40>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 퍼플: Story = {
  args: { color: "purple" },
};

export const 화이트: Story = {
  args: { color: "white" },
};

export const 그레이: Story = {
  args: { color: "grey" },
};

export const 비활성화: Story = {
  args: { color: "purple", disabled: true },
};
