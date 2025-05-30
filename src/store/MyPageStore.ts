import { proxy } from "valtio";

export const myPageStore = proxy({
  isFooterVisible: false,
});
