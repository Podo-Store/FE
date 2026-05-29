import type { Meta, StoryObj } from "@storybook/react-vite";
import InfiniteBanner from "./InfiniteBanner";

const placeholderBanners = [
  { image: "https://picsum.photos/seed/banner1/1280/300", link: "#" },
  { image: "https://picsum.photos/seed/banner2/1280/300", link: "#" },
  { image: "https://picsum.photos/seed/banner3/1280/300", link: "#" },
];

const meta = {
  title: "Banner/InfiniteBanner",
  component: InfiniteBanner,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof InfiniteBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 기본_실제배너: Story = {};

export const 플레이스홀더배너: Story = {
  args: { banners: placeholderBanners },
};

export const 단일배너: Story = {
  args: {
    banners: [{ image: "https://picsum.photos/seed/single/1280/300", link: "#" }],
  },
};
