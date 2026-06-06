import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import GoBack from "./GoBack";

const meta = {
  title: "Button/GoBack",
  component: GoBack,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
} satisfies Meta<typeof GoBack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 기본: Story = {
  args: { url: "/home" },
};

export const 이전페이지: Story = {
  args: { url: "-1" },
};
