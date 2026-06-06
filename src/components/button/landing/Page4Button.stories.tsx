import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import instagram from "@/assets/image/landing/page4/instagram.svg";
import facebook from "@/assets/image/landing/page4/facebook.svg";
import youtube from "@/assets/image/landing/page4/youtube.svg";
import brunch from "@/assets/image/landing/page4/brunch.svg";
import Page4Button from "./Page4Button";

const meta = {
  title: "Button/Page4Button",
  component: Page4Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Page4Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 인스타그램: Story = {
  args: { src: instagram, alt: "instagram" },
};

export const 페이스북: Story = {
  args: { src: facebook, alt: "facebook" },
};

export const 유튜브: Story = {
  args: { src: youtube, alt: "youtube" },
};

export const 브런치: Story = {
  args: { src: brunch, alt: "brunch" },
};
