import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { handlers } from "@/mocks/handlers";
import PostGallery from "./PostGallery";

const makeDecorator = (initialEntry: string) => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (Story: React.ComponentType) => (
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const meta = {
  title: "Page/PostGallery",
  component: PostGallery,
  parameters: {
    layout: "fullscreen",
    msw: { handlers },
  },
} satisfies Meta<typeof PostGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const 전체보기: Story = {
  decorators: [makeDecorator("/?stage=포도밭&category=전체")],
};

export const 장편탭: Story = {
  decorators: [makeDecorator("/?stage=포도밭&category=장편")],
};

export const 단편탭: Story = {
  decorators: [makeDecorator("/?stage=포도밭&category=단편")],
};
