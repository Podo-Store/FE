import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import RoundBtnV2 from "./RoundBtnV2";

const meta = {
  title: "Button/RoundBtnV2",
  component: RoundBtnV2,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onClick: fn(), children: "버튼" },
} satisfies Meta<typeof RoundBtnV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 퍼플: Story = {
  args: { color: "purple", className: "p-large-bold" },
};

export const 화이트: Story = {
  args: { color: "white", className: "p-large-bold" },
};

export const 그레이: Story = {
  args: { color: "grey", className: "p-large-bold" },
};

export const 다크모드: Story = {
  args: { color: "dark_mode", className: "p-large-bold" },
  decorators: [
    (Story) => (
      <div className="bg-[#1a1a1a] p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const 비활성화: Story = {
  args: { color: "purple", className: "p-large-bold", disabled: true },
};
