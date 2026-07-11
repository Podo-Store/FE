export const BANK_LIST = [
  "KB국민은행",
  "신한은행",
  "우리은행",
  "하나은행",
  "NH농협은행",
  "SC제일은행",
  "한국씨티은행",
  "카카오뱅크",
  "케이뱅크",
  "토스뱅크",
  "부산은행",
  "경남은행",
  "광주은행",
  "전북은행",
  "제주은행",
  "iM뱅크",
] as const;

export type Bank = (typeof BANK_LIST)[number];
