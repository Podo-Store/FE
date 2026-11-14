// 백엔드는 PASS 필터에 RE_PASS를, WAIT 필터에 RE_WAIT를 함께 포함해 조회한다.
export type FilterStatus = "ALL" | "PASS" | "WAIT" | "REJECT";
