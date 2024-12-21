/**
 * classification: 0: 미선택, 1: 장편극, 2: 단편극
 * permission: 0: 미선택, 1: 승인, 2: 거절
 */
export const tableData = [
  {
    id: 1,
    submitDate: "2024-01-10",
    title: "별의 노래",
    author: "홍길동",
    status: "수락",
    classification: 1, // 1: 장편극
    permission: 1,
  },
  {
    id: 2,
    submitDate: "2024-02-15",
    title: "달의 속삭임",
    author: "김철수",
    status: "수락",
    classification: 2, // 2: 단편극
    permission: 1,
  },
  {
    id: 3,
    submitDate: "2024-03-20",
    title: "태양의 열정",
    author: "이영희",
    status: "대기",
    classification: 0, // 0: 미선택
    permission: 0,
  },
  // 추가 데이터...
];
