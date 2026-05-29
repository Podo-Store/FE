import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MemoryRouter } from "react-router-dom";
import { OnePostCard } from "./OnePostCard";
import type { ScriptItem } from "@/api/user/postListApi";

const base: ScriptItem = {
  id: "1",
  title: "밤의 끝에서",
  writer: "김서연",
  imagePath: "https://picsum.photos/seed/1/400/560",
  script: true,
  scriptPrice: 5000,
  performance: false,
  performancePrice: 0,
  checked: "PASS",
  date: new Date().toISOString(),
  like: false,
  likeCount: 128,
  viewCount: 342,
};

const meta = {
  title: "Post/OnePostCard",
  component: OnePostCard,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onToggleLike: fn() },
} satisfies Meta<typeof OnePostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 기본_그리드: Story = {
  args: { posts: base, viewType: "grid" },
};

export const 기본_카드: Story = {
  args: {
    posts: { ...base, performance: true, performancePrice: 20000 },
    viewType: "card",
  },
};

export const 좋아요됨: Story = {
  args: { posts: { ...base, like: true, likeCount: 129 }, viewType: "grid" },
};

export const 이미지없음: Story = {
  args: { posts: { ...base, imagePath: "" }, viewType: "grid" },
};

export const 대본_공연_모두있음: Story = {
  args: {
    posts: { ...base, script: true, scriptPrice: 5000, performance: true, performancePrice: 20000 },
    viewType: "card",
  },
};
