/**
 * statusNum: 0: 대기, 1: 완료, 2: 취소
 */
export const tableData2 = [
  {
    id: 1,
    orderDate: "2024-01-10",
    title: "별의 노래",
    author: "홍길동",
    customer: "이영희",
    status: "대기",
    orderedScript: 1,
    orderedPerform: 1,
    price: 20000,
    statusNum: 0,
  },
  {
    id: 2,
    orderDate: "2024-02-15",
    title: "달의 속삭임",
    author: "김철수",
    customer: "박철수",
    status: "완료",
    orderedScript: 2,
    orderedPerform: 2,
    price: 40000,
    statusNum: 1,
  },
  {
    id: 3,
    orderDate: "2024-03-20",
    title: "태양의 열정",
    author: "이영희",
    customer: "김영희",
    status: "취소",
    orderedScript: 0,
    orderedPerform: 1,
    price: 10000,
    statusNum: 2,
  },
  // 추가 데이터...
];
