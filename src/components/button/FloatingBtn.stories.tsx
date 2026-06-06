import type { Meta, StoryObj } from "@storybook/react-vite";
import FloatingBtn from "./FloatingBtn";

const meta = {
  title: "Button/FloatingBtn",
  component: FloatingBtn,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof FloatingBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 기본: Story = {};
