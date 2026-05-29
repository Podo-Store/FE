import { http, HttpResponse } from "msw";
import type { ScriptItem, ExploreScriptsResponse } from "@/api/user/postListApi";

const BASE = "http://localhost:8080";

const makePlaceholderImage = (id: number) =>
  `https://picsum.photos/seed/${id}/400/560`;

const makeScript = (overrides: Partial<ScriptItem> & { id: string }): ScriptItem => ({
  title: "제목 없음",
  writer: "작가명",
  imagePath: makePlaceholderImage(Number(overrides.id)),
  script: false,
  scriptPrice: 0,
  performance: false,
  performancePrice: 0,
  checked: "PASS",
  date: new Date().toISOString(),
  like: false,
  likeCount: 0,
  viewCount: 0,
  ...overrides,
});

const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();

const longPlays: ScriptItem[] = [
  makeScript({ id: "1",  title: "밤의 끝에서",       writer: "김서연", script: true,  scriptPrice: 5000,  performance: false,               like: true,  likeCount: 128, viewCount: 342, date: daysAgo(2)  }),
  makeScript({ id: "2",  title: "붉은 여름",          writer: "이준혁", script: false,                     performance: true,  performancePrice: 20000, likeCount: 87,  viewCount: 210, date: daysAgo(5)  }),
  makeScript({ id: "3",  title: "고요한 폭풍",         writer: "박민지", script: true,  scriptPrice: 3000,                                    likeCount: 55,  viewCount: 175, date: daysAgo(8)  }),
  makeScript({ id: "4",  title: "두 개의 달",          writer: "최지우", script: true,  scriptPrice: 4000,  performance: true,  performancePrice: 15000, likeCount: 203, viewCount: 519, date: daysAgo(1)  }),
  makeScript({ id: "5",  title: "잊혀진 계절",         writer: "정하늘", script: false,                     performance: false,               likeCount: 31,  viewCount: 98,  date: daysAgo(12) }),
  makeScript({ id: "6",  title: "빛의 잔해",           writer: "강다은", script: true,  scriptPrice: 6000,                                    likeCount: 412, viewCount: 801, date: daysAgo(3)  }),
  makeScript({ id: "7",  title: "세 번째 문",          writer: "윤재원", script: true,  scriptPrice: 4500,  performance: true,  performancePrice: 18000, likeCount: 76,  viewCount: 230, date: daysAgo(6)  }),
  makeScript({ id: "8",  title: "안녕, 어른",          writer: "임소희", script: false,                     performance: true,  performancePrice: 12000, likeCount: 144, viewCount: 388, date: daysAgo(9)  }),
  makeScript({ id: "9",  title: "낯선 집",             writer: "한지민", script: true,  scriptPrice: 2500,                                    likeCount: 98,  viewCount: 267, date: daysAgo(4)  }),
  makeScript({ id: "10", title: "우리가 남긴 것들",    writer: "오세진", script: true,  scriptPrice: 5500,  performance: true,  performancePrice: 22000, likeCount: 330, viewCount: 702, date: daysAgo(7)  }),
  makeScript({ id: "11", title: "기억의 서랍",         writer: "신예린", script: false,                     performance: false,               likeCount: 19,  viewCount: 54,  date: daysAgo(20) }),
  makeScript({ id: "12", title: "그림자 연극",         writer: "배수현", script: true,  scriptPrice: 3500,                                    likeCount: 61,  viewCount: 189, date: daysAgo(15) }),
  makeScript({ id: "13", title: "푸른 달의 아이들",   writer: "조태양", script: true,  scriptPrice: 7000,  performance: true,  performancePrice: 25000, like: true, likeCount: 501, viewCount: 980, date: daysAgo(0)  }),
  makeScript({ id: "14", title: "마지막 공연",         writer: "권나리", script: false,                     performance: true,  performancePrice: 16000, likeCount: 88,  viewCount: 241, date: daysAgo(11) }),
  makeScript({ id: "15", title: "어느 봄날의 편지",   writer: "홍주원", script: true,  scriptPrice: 4000,                                    likeCount: 45,  viewCount: 134, date: daysAgo(18) }),
  makeScript({ id: "16", title: "동쪽 창문",           writer: "문채린", script: true,  scriptPrice: 3000,  performance: false,               likeCount: 73,  viewCount: 198, date: daysAgo(13) }),
  makeScript({ id: "17", title: "이름 없는 목소리",   writer: "류지호", script: false,                     performance: true,  performancePrice: 14000, likeCount: 120, viewCount: 315, date: daysAgo(16) }),
  makeScript({ id: "18", title: "해질 무렵",           writer: "나유진", script: true,  scriptPrice: 5000,  performance: true,  performancePrice: 19000, likeCount: 265, viewCount: 610, date: daysAgo(2)  }),
  makeScript({ id: "19", title: "천 개의 별",          writer: "엄기준", script: true,  scriptPrice: 6500,                                    likeCount: 389, viewCount: 845, date: daysAgo(10) }),
  makeScript({ id: "20", title: "비 오는 오후",        writer: "손민아", script: false,                     performance: false,               likeCount: 27,  viewCount: 79,  date: daysAgo(22) }),
  makeScript({ id: "21", title: "거울 속의 나",        writer: "황도경", script: true,  scriptPrice: 4500,  performance: true,  performancePrice: 17000, likeCount: 152, viewCount: 421, date: daysAgo(5)  }),
  makeScript({ id: "22", title: "숲의 끝",             writer: "전미래", script: true,  scriptPrice: 3000,                                    likeCount: 48,  viewCount: 143, date: daysAgo(25) }),
  makeScript({ id: "23", title: "붉은 실",             writer: "차승우", script: false,                     performance: true,  performancePrice: 21000, like: true, likeCount: 199, viewCount: 470, date: daysAgo(3)  }),
  makeScript({ id: "24", title: "먼지 속의 꽃",        writer: "탁지연", script: true,  scriptPrice: 5000,  performance: false,               likeCount: 83,  viewCount: 225, date: daysAgo(14) }),
  makeScript({ id: "25", title: "지구 끝의 온실",      writer: "남가희", script: true,  scriptPrice: 8000,  performance: true,  performancePrice: 30000, likeCount: 620, viewCount: 1240, date: daysAgo(1) }),
  makeScript({ id: "26", title: "달빛 연가",           writer: "서채원", script: false,                     performance: true,  performancePrice: 13000, likeCount: 37,  viewCount: 111, date: daysAgo(30) }),
  makeScript({ id: "27", title: "바람의 노래",         writer: "성은지", script: true,  scriptPrice: 4000,  performance: false,               likeCount: 91,  viewCount: 255, date: daysAgo(7)  }),
  makeScript({ id: "28", title: "침묵의 섬",           writer: "표지훈", script: true,  scriptPrice: 5500,  performance: true,  performancePrice: 20000, likeCount: 174, viewCount: 450, date: daysAgo(4)  }),
  makeScript({ id: "29", title: "두 번째 인생",        writer: "마소연", script: false,                     performance: false,               likeCount: 14,  viewCount: 42,  date: daysAgo(35) }),
  makeScript({ id: "30", title: "여름의 잔상",         writer: "도현수", script: true,  scriptPrice: 3500,                                    likeCount: 66,  viewCount: 178, date: daysAgo(9)  }),
];

const shortPlays: ScriptItem[] = [
  makeScript({ id: "31", title: "오후 세 시",          writer: "윤서아", script: true,  scriptPrice: 2000,                                    like: true,  likeCount: 64,  viewCount: 143, date: daysAgo(3)  }),
  makeScript({ id: "32", title: "첫 번째 눈",          writer: "임현준", script: false,                     performance: true,  performancePrice: 10000, likeCount: 39,  viewCount: 88,  date: daysAgo(7)  }),
  makeScript({ id: "33", title: "어제의 나",           writer: "한수빈", script: true,  scriptPrice: 1500,                                    likeCount: 22,  viewCount: 67,  date: daysAgo(10) }),
  makeScript({ id: "34", title: "작은 세계",           writer: "오다인", script: false,                     performance: false,               likeCount: 17,  viewCount: 45,  date: daysAgo(14) }),
  makeScript({ id: "35", title: "5분 전",              writer: "구도현", script: true,  scriptPrice: 1000,  performance: true,  performancePrice: 8000,  likeCount: 88,  viewCount: 213, date: daysAgo(2)  }),
  makeScript({ id: "36", title: "커피 한 잔",          writer: "장민서", script: true,  scriptPrice: 2500,                                    likeCount: 51,  viewCount: 127, date: daysAgo(5)  }),
  makeScript({ id: "37", title: "택시 안에서",         writer: "양지원", script: false,                     performance: true,  performancePrice: 9000,  like: true, likeCount: 103, viewCount: 278, date: daysAgo(1)  }),
  makeScript({ id: "38", title: "편의점 새벽",         writer: "곽태준", script: true,  scriptPrice: 2000,  performance: false,               likeCount: 35,  viewCount: 96,  date: daysAgo(8)  }),
  makeScript({ id: "39", title: "엘리베이터",          writer: "석지현", script: true,  scriptPrice: 1500,  performance: true,  performancePrice: 7000,  likeCount: 72,  viewCount: 188, date: daysAgo(4)  }),
  makeScript({ id: "40", title: "마지막 전화",         writer: "주하영", script: false,                     performance: false,               likeCount: 8,   viewCount: 23,  date: daysAgo(21) }),
  makeScript({ id: "41", title: "버스 정류장",         writer: "노예린", script: true,  scriptPrice: 2000,                                    likeCount: 44,  viewCount: 117, date: daysAgo(6)  }),
  makeScript({ id: "42", title: "창밖의 고양이",       writer: "금나현", script: false,                     performance: true,  performancePrice: 11000, likeCount: 67,  viewCount: 172, date: daysAgo(9)  }),
  makeScript({ id: "43", title: "반지하",              writer: "피재민", script: true,  scriptPrice: 1800,  performance: false,               likeCount: 29,  viewCount: 81,  date: daysAgo(17) }),
  makeScript({ id: "44", title: "빈자리",              writer: "태소율", script: true,  scriptPrice: 2200,  performance: true,  performancePrice: 8500,  like: true, likeCount: 156, viewCount: 402, date: daysAgo(0)  }),
  makeScript({ id: "45", title: "화분",                writer: "사민규", script: false,                     performance: false,               likeCount: 11,  viewCount: 34,  date: daysAgo(28) }),
  makeScript({ id: "46", title: "옥상에서",            writer: "라지수", script: true,  scriptPrice: 1500,  performance: true,  performancePrice: 9500,  likeCount: 93,  viewCount: 244, date: daysAgo(3)  }),
  makeScript({ id: "47", title: "유리창",              writer: "마윤호", script: true,  scriptPrice: 2500,                                    likeCount: 38,  viewCount: 102, date: daysAgo(12) }),
  makeScript({ id: "48", title: "퇴근길",              writer: "바다빈", script: false,                     performance: true,  performancePrice: 10500, likeCount: 47,  viewCount: 131, date: daysAgo(6)  }),
  makeScript({ id: "49", title: "문 앞에서",           writer: "사하율", script: true,  scriptPrice: 2000,  performance: false,               likeCount: 25,  viewCount: 70,  date: daysAgo(19) }),
  makeScript({ id: "50", title: "이별 연습",           writer: "아진솔", script: true,  scriptPrice: 3000,  performance: true,  performancePrice: 12000, likeCount: 210, viewCount: 548, date: daysAgo(2)  }),
];

const PAGE_SIZE = 6;

const sortList = (list: ScriptItem[], sortType: string) =>
  [...list].sort((a, b) => {
    if (sortType === "LIKE_COUNT") return b.likeCount - a.likeCount;
    if (sortType === "LATEST") return new Date(b.date).getTime() - new Date(a.date).getTime();
    return b.viewCount - a.viewCount; // POPULAR
  });

export const handlers = [
  // 전체 작품 조회
  http.get(`${BASE}/scripts`, ({ request }) => {
    const sortType = new URL(request.url).searchParams.get("sortType") ?? "POPULAR";
    const body: ExploreScriptsResponse = {
      longPlay: sortList(longPlays, sortType),
      shortPlay: sortList(shortPlays, sortType),
    };
    return HttpResponse.json(body);
  }),

  // 장편 페이지네이션
  http.get(`${BASE}/scripts/long`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 0);
    const sortType = url.searchParams.get("sortType") ?? "POPULAR";
    const paged = sortList(longPlays, sortType).slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    return HttpResponse.json(paged);
  }),

  // 단편 페이지네이션
  http.get(`${BASE}/scripts/short`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 0);
    const sortType = url.searchParams.get("sortType") ?? "POPULAR";
    const paged = sortList(shortPlays, sortType).slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    return HttpResponse.json(paged);
  }),

  // 좋아요 토글
  http.post(`${BASE}/scripts/like/:id`, ({ params }) => {
    const target = [...longPlays, ...shortPlays].find((s) => s.id === params.id);
    if (!target) return new HttpResponse(null, { status: 404 });
    target.like = !target.like;
    target.likeCount += target.like ? 1 : -1;
    return HttpResponse.json({ message: target.like ? "like" : "cancel like" });
  }),
];
