import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MemoryRouter } from "react-router-dom";
import SectionBlock from "./SectionBlock";
import type { ScriptItem } from "@/api/user/postListApi";

const makeMock = (id: number): ScriptItem => ({
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
});

const posts = Array.from({ length: 8 }, (_, i) => makeMock(i + 1));

const meta = {
  title: "Post/SectionBlock",
  component: SectionBlock,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: { onMoreClick: fn(), onToggleLike: fn() },
} satisfies Meta<typeof SectionBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 장편섹션: Story = {
  args: { title: "장편", posts, colNum: 5, postNum: 5, viewType: "grid" },
};

export const 단편섹션: Story = {
  args: { title: "단편", posts, colNum: 5, postNum: 5, viewType: "grid" },
};

export const 카드뷰: Story = {
  args: { title: "단편", posts, colNum: 3, postNum: 6, viewType: "card" },
};

export const 작품없음: Story = {
  args: { title: "장편", posts: [], colNum: 5, postNum: 5, viewType: "grid" },
};

export const 좋아요페이지_작품없음: Story = {
  args: { title: "단편", posts: [], colNum: 5, postNum: 5, viewType: "grid", isLikePage: true },
};
