import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MemoryRouter } from "react-router-dom";
import { AllPostCard, PostCardPreview } from "./PostList";
import type { ScriptItem } from "@/api/user/postListApi";

const makeMock = (id: number, overrides?: Partial<ScriptItem>): ScriptItem => ({
  id: String(id),
  title: `작품 제목 ${id}`,
  writer: `작가 ${id}`,
  imagePath: `https://picsum.photos/seed/${id}/400/560`,
  script: id % 2 === 0,
  scriptPrice: id % 2 === 0 ? 3000 : 0,
  performance: id % 3 === 0,
  performancePrice: id % 3 === 0 ? 15000 : 0,
  checked: "PASS",
  date: new Date().toISOString(),
  like: id % 4 === 0,
  likeCount: id * 10,
  viewCount: id * 25,
  ...overrides,
});

const posts = Array.from({ length: 10 }, (_, i) => makeMock(i + 1));

const meta = {
  title: "Post/PostList",
  component: AllPostCard,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: { onToggleLike: fn() },
} satisfies Meta<typeof AllPostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 전체_5열_그리드: Story = {
  args: { posts, colNum: 5, viewType: "grid" },
};

export const 전체_3열_그리드: Story = {
  args: { posts, colNum: 3, viewType: "grid" },
};

export const 전체_2열_그리드: Story = {
  args: { posts, colNum: 2, viewType: "grid" },
};

export const 카드뷰: Story = {
  args: { posts, colNum: 3, viewType: "card" },
};

export const 미리보기_5개제한: StoryObj<typeof PostCardPreview> = {
  render: (args) => <PostCardPreview {...args} />,
  args: { posts, colNum: 5, viewType: "grid", postNum: 5, onToggleLike: fn() },
};
