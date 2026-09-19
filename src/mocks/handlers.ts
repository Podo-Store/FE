import { delay, http, HttpResponse } from "msw";
import type { ScriptItem } from "@/api/user/postListApi";
import type { Review, ReviewStatistics } from "@/types/review";

const BASE = "http://localhost:8080";

const makePlaceholderImage = (id: number) => `https://picsum.photos/seed/${id}/400/560`;

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

const base64UrlEncode = (obj: object) =>
  btoa(
    encodeURIComponent(JSON.stringify(obj)).replace(/%([0-9A-F]{2})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

const makeFakeJwt = (payload: object) =>
  `${base64UrlEncode({ alg: "none", typ: "JWT" })}.${base64UrlEncode(payload)}.mock-signature`;

const longPlays: ScriptItem[] = [
  makeScript({
    id: "1",
    title: "밤의 끝에서",
    writer: "김서연",
    script: true,
    scriptPrice: 5000,
    performance: false,
    like: true,
    likeCount: 128,
    viewCount: 342,
    date: daysAgo(2),
  }),
  makeScript({
    id: "2",
    title: "붉은 여름",
    writer: "이준혁",
    script: false,
    performance: true,
    performancePrice: 20000,
    likeCount: 87,
    viewCount: 210,
    date: daysAgo(5),
  }),
  makeScript({
    id: "3",
    title: "고요한 폭풍",
    writer: "박민지",
    script: true,
    scriptPrice: 3000,
    likeCount: 55,
    viewCount: 175,
    date: daysAgo(8),
  }),
  makeScript({
    id: "4",
    title: "두 개의 달",
    writer: "최지우",
    script: true,
    scriptPrice: 4000,
    performance: true,
    performancePrice: 15000,
    likeCount: 203,
    viewCount: 519,
    date: daysAgo(1),
  }),
  makeScript({
    id: "5",
    title: "잊혀진 계절",
    writer: "정하늘",
    script: false,
    performance: false,
    likeCount: 31,
    viewCount: 98,
    date: daysAgo(12),
  }),
  makeScript({
    id: "6",
    title: "빛의 잔해",
    writer: "강다은",
    script: true,
    scriptPrice: 6000,
    likeCount: 412,
    viewCount: 801,
    date: daysAgo(3),
  }),
  makeScript({
    id: "7",
    title: "세 번째 문",
    writer: "윤재원",
    script: true,
    scriptPrice: 4500,
    performance: true,
    performancePrice: 18000,
    likeCount: 76,
    viewCount: 230,
    date: daysAgo(6),
  }),
  makeScript({
    id: "8",
    title: "안녕, 어른",
    writer: "임소희",
    script: false,
    performance: true,
    performancePrice: 12000,
    likeCount: 144,
    viewCount: 388,
    date: daysAgo(9),
  }),
  makeScript({
    id: "9",
    title: "낯선 집",
    writer: "한지민",
    script: true,
    scriptPrice: 2500,
    likeCount: 98,
    viewCount: 267,
    date: daysAgo(4),
  }),
  makeScript({
    id: "10",
    title: "우리가 남긴 것들",
    writer: "오세진",
    script: true,
    scriptPrice: 5500,
    performance: true,
    performancePrice: 22000,
    likeCount: 330,
    viewCount: 702,
    date: daysAgo(7),
  }),
  makeScript({
    id: "11",
    title: "기억의 서랍",
    writer: "신예린",
    script: false,
    performance: false,
    likeCount: 19,
    viewCount: 54,
    date: daysAgo(20),
  }),
  makeScript({
    id: "12",
    title: "그림자 연극",
    writer: "배수현",
    script: true,
    scriptPrice: 3500,
    likeCount: 61,
    viewCount: 189,
    date: daysAgo(15),
  }),
  makeScript({
    id: "13",
    title: "푸른 달의 아이들",
    writer: "조태양",
    script: true,
    scriptPrice: 7000,
    performance: true,
    performancePrice: 25000,
    like: true,
    likeCount: 501,
    viewCount: 980,
    date: daysAgo(0),
  }),
  makeScript({
    id: "14",
    title: "마지막 공연",
    writer: "권나리",
    script: false,
    performance: true,
    performancePrice: 16000,
    likeCount: 88,
    viewCount: 241,
    date: daysAgo(11),
  }),
  makeScript({
    id: "15",
    title: "어느 봄날의 편지",
    writer: "홍주원",
    script: true,
    scriptPrice: 4000,
    likeCount: 45,
    viewCount: 134,
    date: daysAgo(18),
  }),
  makeScript({
    id: "16",
    title: "동쪽 창문",
    writer: "문채린",
    script: true,
    scriptPrice: 3000,
    performance: false,
    likeCount: 73,
    viewCount: 198,
    date: daysAgo(13),
  }),
  makeScript({
    id: "17",
    title: "이름 없는 목소리",
    writer: "류지호",
    script: false,
    performance: true,
    performancePrice: 14000,
    likeCount: 120,
    viewCount: 315,
    date: daysAgo(16),
  }),
  makeScript({
    id: "18",
    title: "해질 무렵",
    writer: "나유진",
    script: true,
    scriptPrice: 5000,
    performance: true,
    performancePrice: 19000,
    likeCount: 265,
    viewCount: 610,
    date: daysAgo(2),
  }),
  makeScript({
    id: "19",
    title: "천 개의 별",
    writer: "엄기준",
    script: true,
    scriptPrice: 6500,
    likeCount: 389,
    viewCount: 845,
    date: daysAgo(10),
  }),
  makeScript({
    id: "20",
    title: "비 오는 오후",
    writer: "손민아",
    script: false,
    performance: false,
    likeCount: 27,
    viewCount: 79,
    date: daysAgo(22),
  }),
  makeScript({
    id: "21",
    title: "거울 속의 나",
    writer: "황도경",
    script: true,
    scriptPrice: 4500,
    performance: true,
    performancePrice: 17000,
    likeCount: 152,
    viewCount: 421,
    date: daysAgo(5),
  }),
  makeScript({
    id: "22",
    title: "숲의 끝",
    writer: "전미래",
    script: true,
    scriptPrice: 3000,
    likeCount: 48,
    viewCount: 143,
    date: daysAgo(25),
  }),
  makeScript({
    id: "23",
    title: "붉은 실",
    writer: "차승우",
    script: false,
    performance: true,
    performancePrice: 21000,
    like: true,
    likeCount: 199,
    viewCount: 470,
    date: daysAgo(3),
  }),
  makeScript({
    id: "24",
    title: "먼지 속의 꽃",
    writer: "탁지연",
    script: true,
    scriptPrice: 5000,
    performance: false,
    likeCount: 83,
    viewCount: 225,
    date: daysAgo(14),
  }),
  makeScript({
    id: "25",
    title: "지구 끝의 온실",
    writer: "남가희",
    script: true,
    scriptPrice: 8000,
    performance: true,
    performancePrice: 30000,
    likeCount: 620,
    viewCount: 1240,
    date: daysAgo(1),
  }),
  makeScript({
    id: "26",
    title: "달빛 연가",
    writer: "서채원",
    script: false,
    performance: true,
    performancePrice: 13000,
    likeCount: 37,
    viewCount: 111,
    date: daysAgo(30),
  }),
  makeScript({
    id: "27",
    title: "바람의 노래",
    writer: "성은지",
    script: true,
    scriptPrice: 4000,
    performance: false,
    likeCount: 91,
    viewCount: 255,
    date: daysAgo(7),
  }),
  makeScript({
    id: "28",
    title: "침묵의 섬",
    writer: "표지훈",
    script: true,
    scriptPrice: 5500,
    performance: true,
    performancePrice: 20000,
    likeCount: 174,
    viewCount: 450,
    date: daysAgo(4),
  }),
  makeScript({
    id: "29",
    title: "두 번째 인생",
    writer: "마소연",
    script: false,
    performance: false,
    likeCount: 14,
    viewCount: 42,
    date: daysAgo(35),
  }),
  makeScript({
    id: "30",
    title: "여름의 잔상",
    writer: "도현수",
    script: true,
    scriptPrice: 3500,
    likeCount: 66,
    viewCount: 178,
    date: daysAgo(9),
  }),
];

const shortPlays: ScriptItem[] = [
  makeScript({
    id: "31",
    title: "오후 세 시",
    writer: "윤서아",
    script: true,
    scriptPrice: 2000,
    like: true,
    likeCount: 64,
    viewCount: 143,
    date: daysAgo(3),
  }),
  makeScript({
    id: "32",
    title: "첫 번째 눈",
    writer: "임현준",
    script: false,
    performance: true,
    performancePrice: 10000,
    likeCount: 39,
    viewCount: 88,
    date: daysAgo(7),
  }),
  makeScript({
    id: "33",
    title: "어제의 나",
    writer: "한수빈",
    script: true,
    scriptPrice: 1500,
    likeCount: 22,
    viewCount: 67,
    date: daysAgo(10),
  }),
  makeScript({
    id: "34",
    title: "작은 세계",
    writer: "오다인",
    script: false,
    performance: false,
    likeCount: 17,
    viewCount: 45,
    date: daysAgo(14),
  }),
  makeScript({
    id: "35",
    title: "5분 전",
    writer: "구도현",
    script: true,
    scriptPrice: 1000,
    performance: true,
    performancePrice: 8000,
    likeCount: 88,
    viewCount: 213,
    date: daysAgo(2),
  }),
  makeScript({
    id: "36",
    title: "커피 한 잔",
    writer: "장민서",
    script: true,
    scriptPrice: 2500,
    likeCount: 51,
    viewCount: 127,
    date: daysAgo(5),
  }),
  makeScript({
    id: "37",
    title: "택시 안에서",
    writer: "양지원",
    script: false,
    performance: true,
    performancePrice: 9000,
    like: true,
    likeCount: 103,
    viewCount: 278,
    date: daysAgo(1),
  }),
  makeScript({
    id: "38",
    title: "편의점 새벽",
    writer: "곽태준",
    script: true,
    scriptPrice: 2000,
    performance: false,
    likeCount: 35,
    viewCount: 96,
    date: daysAgo(8),
  }),
  makeScript({
    id: "39",
    title: "엘리베이터",
    writer: "석지현",
    script: true,
    scriptPrice: 1500,
    performance: true,
    performancePrice: 7000,
    likeCount: 72,
    viewCount: 188,
    date: daysAgo(4),
  }),
  makeScript({
    id: "40",
    title: "마지막 전화",
    writer: "주하영",
    script: false,
    performance: false,
    likeCount: 8,
    viewCount: 23,
    date: daysAgo(21),
  }),
  makeScript({
    id: "41",
    title: "버스 정류장",
    writer: "노예린",
    script: true,
    scriptPrice: 2000,
    likeCount: 44,
    viewCount: 117,
    date: daysAgo(6),
  }),
  makeScript({
    id: "42",
    title: "창밖의 고양이",
    writer: "금나현",
    script: false,
    performance: true,
    performancePrice: 11000,
    likeCount: 67,
    viewCount: 172,
    date: daysAgo(9),
  }),
  makeScript({
    id: "43",
    title: "반지하",
    writer: "피재민",
    script: true,
    scriptPrice: 1800,
    performance: false,
    likeCount: 29,
    viewCount: 81,
    date: daysAgo(17),
  }),
  makeScript({
    id: "44",
    title: "빈자리",
    writer: "태소율",
    script: true,
    scriptPrice: 2200,
    performance: true,
    performancePrice: 8500,
    like: true,
    likeCount: 156,
    viewCount: 402,
    date: daysAgo(0),
  }),
  makeScript({
    id: "45",
    title: "화분",
    writer: "사민규",
    script: false,
    performance: false,
    likeCount: 11,
    viewCount: 34,
    date: daysAgo(28),
  }),
  makeScript({
    id: "46",
    title: "옥상에서",
    writer: "라지수",
    script: true,
    scriptPrice: 1500,
    performance: true,
    performancePrice: 9500,
    likeCount: 93,
    viewCount: 244,
    date: daysAgo(3),
  }),
  makeScript({
    id: "47",
    title: "유리창",
    writer: "마윤호",
    script: true,
    scriptPrice: 2500,
    likeCount: 38,
    viewCount: 102,
    date: daysAgo(12),
  }),
  makeScript({
    id: "48",
    title: "퇴근길",
    writer: "바다빈",
    script: false,
    performance: true,
    performancePrice: 10500,
    likeCount: 47,
    viewCount: 131,
    date: daysAgo(6),
  }),
  makeScript({
    id: "49",
    title: "문 앞에서",
    writer: "사하율",
    script: true,
    scriptPrice: 2000,
    performance: false,
    likeCount: 25,
    viewCount: 70,
    date: daysAgo(19),
  }),
  makeScript({
    id: "50",
    title: "이별 연습",
    writer: "아진솔",
    script: true,
    scriptPrice: 3000,
    performance: true,
    performancePrice: 12000,
    likeCount: 210,
    viewCount: 548,
    date: daysAgo(2),
  }),
];

const PAGE_SIZE = 6;

const sortList = (list: ScriptItem[], sortType: string) =>
  [...list].sort((a, b) => {
    if (sortType === "LIKE_COUNT") return b.likeCount - a.likeCount;
    if (sortType === "LATEST") return new Date(b.date).getTime() - new Date(a.date).getTime();
    return b.viewCount - a.viewCount; // POPULAR
  });

const getLikedLongPlays = () => longPlays.filter((script) => script.like);
const getLikedShortPlays = () => shortPlays.filter((script) => script.like);

type WorkReviewStatus = "WAIT" | "PASS" | "RE_WAIT" | "RE_PASS";

interface ManagedWork {
  id: string;
  title: string;
  writer: string;
  imagePath: string;
  script: boolean;
  scriptPrice: number;
  performance: boolean;
  performancePrice: number;
  checked: WorkReviewStatus;
  createdDate: string;
  descriptionPath: string;
  playType: "SHORT" | "LONG";
  plot: string;
  intention: string;
  buyStatus: number;
  any: number;
  male: number;
  female: number;
  stageComment: string;
  runningTime: number;
  scene: number;
  act: number;
}

// 작품 관리 화면에서 심사/판매 상태별 UI를 한 번에 확인하기 위한 개발용 데이터입니다.
let managedWorks: ManagedWork[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    title: "유리 온실의 밤",
    writer: "테스트작가",
    imagePath: makePlaceholderImage(101),
    script: true,
    scriptPrice: 5000,
    performance: true,
    performancePrice: 30000,
    checked: "PASS",
    createdDate: "2026-09-18",
    descriptionPath: "/test.pdf",
    playType: "LONG",
    plot: "폐쇄를 앞둔 식물원에서 세 사람이 마지막 밤을 보내며 감춰 둔 진실을 마주한다.",
    intention: "떠나보내는 과정에서 비로소 선명해지는 관계를 무대 위에 담고자 했습니다.",
    buyStatus: 0,
    any: 1,
    male: 1,
    female: 2,
    stageComment: "온실을 연상시키는 투명한 소품과 푸른 조명을 권장합니다.",
    runningTime: 90,
    scene: 6,
    act: 2,
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    title: "막차는 오지 않는다",
    writer: "테스트작가",
    imagePath: makePlaceholderImage(102),
    script: true,
    scriptPrice: 3500,
    performance: false,
    performancePrice: 0,
    checked: "PASS",
    createdDate: "2026-09-18",
    descriptionPath: "/test.pdf",
    playType: "SHORT",
    plot: "막차가 끊긴 시골 정류장에서 낯선 두 사람이 서로의 목적지를 묻는다.",
    intention: "기다림이라는 짧은 시간 안에 생기는 연대와 위로를 이야기합니다.",
    buyStatus: 0,
    any: 0,
    male: 1,
    female: 1,
    stageComment: "벤치 하나만으로 공연할 수 있는 소극장용 작품입니다.",
    runningTime: 35,
    scene: 3,
    act: 1,
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    title: "파도에게 보내는 편지",
    writer: "테스트작가",
    imagePath: makePlaceholderImage(103),
    script: false,
    scriptPrice: 4500,
    performance: true,
    performancePrice: 18000,
    checked: "RE_WAIT",
    createdDate: "2026-09-12",
    descriptionPath: "/test.pdf",
    playType: "LONG",
    plot: "섬마을 우체국에 배달되지 못한 편지들이 쌓이면서 오래된 사건이 다시 떠오른다.",
    intention: "전하지 못한 말이 사람과 공동체에 남기는 흔적을 그리고 싶었습니다.",
    buyStatus: 0,
    any: 1,
    male: 2,
    female: 3,
    stageComment: "파도 소리를 장면 전환의 중심 요소로 사용합니다.",
    runningTime: 105,
    scene: 8,
    act: 2,
  },
  {
    id: "10000000-0000-4000-8000-000000000004",
    title: "오늘의 분실물",
    writer: "테스트작가",
    imagePath: makePlaceholderImage(104),
    script: false,
    scriptPrice: 0,
    performance: false,
    performancePrice: 0,
    checked: "WAIT",
    createdDate: "2026-09-05",
    descriptionPath: "/test.pdf",
    playType: "SHORT",
    plot: "분실물 보관소 직원이 주인 없는 물건들의 하루를 상상하며 기록한다.",
    intention: "사라진 물건을 통해 평범한 하루의 소중함을 바라봅니다.",
    buyStatus: 0,
    any: 1,
    male: 1,
    female: 1,
    stageComment: "여러 개의 상자와 작은 테이블이 필요합니다.",
    runningTime: 45,
    scene: 5,
    act: 1,
  },
  {
    id: "10000000-0000-4000-8000-000000000005",
    title: "별이 내리는 세탁소",
    writer: "테스트작가",
    imagePath: makePlaceholderImage(105),
    script: true,
    scriptPrice: 6000,
    performance: true,
    performancePrice: 25000,
    checked: "RE_PASS",
    createdDate: "2026-08-27",
    descriptionPath: "/test.pdf",
    playType: "LONG",
    plot: "밤에만 문을 여는 세탁소에서 손님들은 옷과 함께 잊고 싶은 기억을 맡긴다.",
    intention: "기억을 지우는 대신 잘 개어 간직하는 방법에 관한 이야기입니다.",
    buyStatus: 0,
    any: 2,
    male: 2,
    female: 2,
    stageComment: "회전하는 세탁기 조명을 별빛처럼 활용할 수 있습니다.",
    runningTime: 80,
    scene: 7,
    act: 2,
  },
];

const toManagedWorkList = () => {
  const groups = new Map<string, ManagedWork[]>();
  managedWorks.forEach((work) => {
    groups.set(work.createdDate, [...(groups.get(work.createdDate) ?? []), work]);
  });

  return [...groups.entries()]
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([date, works]) => ({
      date,
      works: works.map(({ createdDate: _createdDate, ...work }) => work),
    }));
};

const detailReviews: Review[] = [
  {
    id: "20000000-0000-4000-8000-000000000001",
    nickname: "포도독자",
    stageType: "GRAPE_CLUSTER",
    date: "2026-09-17T14:20:00",
    isEdited: false,
    myself: false,
    rating: 5,
    standardType: "STORY",
    content:
      "장면이 바뀔 때마다 앞에서 지나쳤던 대사가 새롭게 들렸어요. 마지막 장면까지 긴장감이 잘 이어지는 작품입니다.",
    isLike: true,
    likeCount: 18,
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    nickname: "무대위고양이",
    stageType: "WINE",
    date: "2026-09-15T09:10:00",
    isEdited: true,
    myself: false,
    rating: 4,
    standardType: "CHARACTER",
    content:
      "등장인물의 선택에 충분한 이유가 있어서 배우들과 인물을 분석하기 좋았습니다. 소극장 공연으로도 잘 어울릴 것 같아요.",
    isLike: false,
    likeCount: 11,
  },
  {
    id: "20000000-0000-4000-8000-000000000003",
    nickname: "오늘도연습",
    stageType: "SINGLE_GRAPE",
    date: "2026-09-12T18:45:00",
    isEdited: false,
    myself: false,
    rating: 5,
    standardType: "RELATION",
    content: "인물 사이의 거리감이 대사와 동선으로 섬세하게 표현되어 있어 인상 깊었습니다.",
    isLike: false,
    likeCount: 7,
  },
  {
    id: "20000000-0000-4000-8000-000000000004",
    nickname: "극장앞자리",
    stageType: "DEFAULT",
    date: "2026-09-10T11:30:00",
    isEdited: false,
    myself: false,
    rating: 3,
    standardType: "STORY",
    content: "중반부 전개는 조금 느렸지만 결말이 좋았고 읽고 난 뒤에도 여운이 남았습니다.",
    isLike: false,
    likeCount: 3,
  },
  {
    id: "20000000-0000-4000-8000-000000000005",
    nickname: "보라빛무대",
    stageType: "GRAPE_CLUSTER",
    date: "2026-09-08T20:05:00",
    isEdited: false,
    myself: false,
    rating: 5,
    standardType: "CHARACTER",
    content: "각 인물의 말투가 뚜렷해서 대본만 읽어도 장면이 자연스럽게 그려졌습니다.",
    isLike: true,
    likeCount: 14,
  },
  {
    id: "20000000-0000-4000-8000-000000000006",
    nickname: "대학로산책",
    stageType: "SINGLE_GRAPE",
    date: "2026-09-05T16:40:00",
    isEdited: false,
    myself: false,
    rating: 4,
    standardType: "RELATION",
    content: "적은 인원으로도 관계의 변화를 풍성하게 보여줄 수 있는 작품이라 좋았습니다.",
    isLike: false,
    likeCount: 5,
  },
];

const toPercent = (count: number, total: number) =>
  total === 0 ? 0 : Math.round((count / total) * 1000) / 10;

const makeReviewStatistics = (reviews: Review[]): ReviewStatistics => {
  const total = reviews.length;
  const countRating = (rating: number) =>
    reviews.filter((review) => review.rating === rating).length;
  const countStandard = (standard: string) =>
    reviews.filter((review) => review.standardType === standard).length;

  return {
    totalReviewCount: total,
    reviewAverageRating:
      total === 0
        ? 0
        : Math.round((reviews.reduce((sum, review) => sum + review.rating, 0) / total) * 10) / 10,
    fiveStarPercent: toPercent(countRating(5), total),
    fourStarPercent: toPercent(countRating(4), total),
    threeStarPercent: toPercent(countRating(3), total),
    twoStarPercent: toPercent(countRating(2), total),
    oneStarPercent: toPercent(countRating(1), total),
    characterPercent: toPercent(countStandard("CHARACTER"), total),
    relationPercent: toPercent(countStandard("RELATION"), total),
    storyPercent: toPercent(countStandard("STORY"), total),
  };
};

const detailEngagement = new Map<string, { like: boolean; likeCount: number; viewCount: number }>();

const findDetailWork = (id: string) => {
  const managed = managedWorks.find((work) => work.id === id);
  if (managed) return managed;

  const listed = [...longPlays, ...shortPlays].find((work) => work.id === id);
  if (!listed) return undefined;

  return {
    ...listed,
    createdDate: listed.date.slice(0, 10),
    descriptionPath: "/test.pdf",
    playType: longPlays.includes(listed) ? ("LONG" as const) : ("SHORT" as const),
    plot: "서로 다른 비밀을 품은 인물들이 한 공간에 모이면서 예상하지 못한 진실과 마주한다.",
    intention: "관계 속에서 쉽게 말하지 못했던 마음과 선택의 순간을 담아낸 작품입니다.",
    buyStatus: 0,
    any: 1,
    male: 2,
    female: 2,
    stageComment: "간결한 무대와 장면의 분위기를 살리는 조명 연출을 권장합니다.",
    runningTime: longPlays.includes(listed) ? 90 : 40,
    scene: longPlays.includes(listed) ? 7 : 4,
    act: longPlays.includes(listed) ? 2 : 1,
  };
};

const getPdfResponse = async () => {
  const pdf = await fetch(new URL("/test.pdf", globalThis.location.origin));
  return pdf.arrayBuffer();
};

export const handlers = [
  // 로그인 (조건 없이 항상 성공)
  http.post(`${BASE}/auth/signin`, async ({ request }) => {
    const body = (await request.json()) as { userId?: string; password?: string };
    const mockUserId = body?.userId || "mockuser";

    return HttpResponse.json({
      accessToken: makeFakeJwt({ id: mockUserId, sub: mockUserId, auth: false }),
      refreshToken: makeFakeJwt({ id: mockUserId, sub: mockUserId, type: "refresh" }),
      nickname: mockUserId,
    });
  }),

  // 토큰 재발급 (조건 없이 항상 성공)
  http.post(`${BASE}/auth/newToken`, () => {
    return HttpResponse.json({
      accessToken: makeFakeJwt({ id: "mockuser", sub: "mockuser", auth: false }),
    });
  }),

  // 마이페이지 > 작품 관리 목록
  http.get(`${BASE}/profile/work`, async () => {
    await delay(250);
    return HttpResponse.json({
      nickname: "테스트작가",
      dateWorks: toManagedWorkList(),
    });
  }),

  // 작품 관리 상세
  http.get(`${BASE}/profile/work/detail`, ({ request }) => {
    const id = new URL(request.url).searchParams.get("script");
    const work = managedWorks.find((item) => item.id === id);
    if (!work) return HttpResponse.json({ error: "상품을 찾을 수 없습니다." }, { status: 404 });

    const { createdDate, ...detail } = work;
    return HttpResponse.json({ ...detail, date: `${createdDate}T12:00:00` });
  }),

  // 상세 수정, 삭제, 심사 취소 및 파일 변경 플로우
  http.post(`${BASE}/profile/work/detail`, async ({ request }) => {
    const form = await request.formData();
    const id = String(form.get("id") ?? "");
    const index = managedWorks.findIndex((item) => item.id === id);
    if (index < 0) return HttpResponse.json({ error: "상품을 찾을 수 없습니다." }, { status: 404 });

    const current = managedWorks[index];
    managedWorks[index] = {
      ...current,
      title: String(form.get("title") ?? current.title),
      plot: String(form.get("plot") ?? current.plot),
      intention: String(form.get("intention") ?? current.intention),
      script: form.get("script") === "true",
      performance: form.get("performance") === "true",
      scriptPrice: Number(form.get("scriptPrice") ?? current.scriptPrice),
      performancePrice: Number(form.get("performancePrice") ?? current.performancePrice),
      any: Number(form.get("any") ?? current.any),
      male: Number(form.get("male") ?? current.male),
      female: Number(form.get("female") ?? current.female),
      stageComment: String(form.get("stageComment") ?? current.stageComment),
      runningTime: Number(form.get("runningTime") ?? current.runningTime),
      scene: Number(form.get("scene") ?? current.scene),
      act: Number(form.get("act") ?? current.act),
    };
    return HttpResponse.json(true);
  }),

  http.delete(`${BASE}/profile/work/deleteScript/:id`, ({ params }) => {
    const exists = managedWorks.some((work) => work.id === params.id);
    if (!exists) return HttpResponse.json({ error: "상품을 찾을 수 없습니다." }, { status: 404 });
    managedWorks = managedWorks.filter((work) => work.id !== params.id);
    return HttpResponse.json(true);
  }),

  http.delete(`${BASE}/profile/work/cancel/:id`, ({ params }) => {
    const exists = managedWorks.some((work) => work.id === params.id);
    if (!exists) return HttpResponse.json({ error: "상품을 찾을 수 없습니다." }, { status: 404 });
    managedWorks = managedWorks.filter((work) => work.id !== params.id);
    return HttpResponse.json(true);
  }),

  http.post(`${BASE}/profile/work/changeScript`, async ({ request }) => {
    const form = await request.formData();
    const id = String(form.get("id") ?? "");
    const work = managedWorks.find((item) => item.id === id);
    if (!work) return HttpResponse.json({ error: "상품을 찾을 수 없습니다." }, { status: 404 });
    work.checked = "RE_WAIT";
    return HttpResponse.json(true);
  }),

  // 작품 상세: 정보, 후기 정렬 및 페이지네이션
  http.get(`${BASE}/scripts/detail`, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("script") ?? "";
    const page = Number(url.searchParams.get("page") ?? 0);
    const sortType = url.searchParams.get("sortType") ?? "LIKE_COUNT";
    const work = findDetailWork(id);

    if (!work) return HttpResponse.json({ error: "상품을 찾을 수 없습니다." }, { status: 404 });

    const listed = [...longPlays, ...shortPlays].find((item) => item.id === id);
    const engagement = detailEngagement.get(id) ?? {
      like: listed?.like ?? false,
      likeCount: listed?.likeCount ?? 24,
      viewCount: listed?.viewCount ?? 187,
    };
    detailEngagement.set(id, engagement);

    const sortedReviews = [...detailReviews].sort((a, b) =>
      sortType === "LATEST"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : b.likeCount - a.likeCount
    );
    const reviews = sortedReviews.slice(page * 5, (page + 1) * 5);

    return HttpResponse.json({
      id: work.id,
      title: work.title,
      writer: work.writer,
      imagePath: work.imagePath,
      script: work.script,
      scriptPrice: work.scriptPrice,
      performance: work.performance,
      performancePrice: work.performancePrice,
      playType: work.playType,
      checked: work.checked,
      plot: work.plot,
      date: `${work.createdDate}T12:00:00`,
      buyOptions: [
        ...(work.script ? ["SCRIPT"] : []),
        ...(work.performance ? ["PERFORMANCE"] : []),
      ],
      like: engagement.like,
      likeCount: engagement.likeCount,
      viewCount: engagement.viewCount,
      any: work.any,
      male: work.male,
      female: work.female,
      stageComment: work.stageComment,
      runningTime: work.runningTime,
      scene: work.scene,
      act: work.act,
      intention: work.intention,
      isReviewWritten: false,
      isMine: managedWorks.some((managedWork) => managedWork.id === id),
      reviewStatistics: makeReviewStatistics(detailReviews),
      reviews,
    });
  }),

  // 상세 화면에서 자동으로 불러오는 작품 설명 PDF와 대본 미리보기
  http.get(`${BASE}/scripts/description`, async () => {
    const pdf = await getPdfResponse();
    return new HttpResponse(pdf, {
      headers: { "Content-Type": "application/pdf" },
    });
  }),

  http.get(`${BASE}/scripts/preview`, async ({ request }) => {
    const id = new URL(request.url).searchParams.get("script") ?? "";
    const work = findDetailWork(id);
    if (!work) return HttpResponse.json({ error: "상품을 찾을 수 없습니다." }, { status: 404 });

    const pdf = await getPdfResponse();
    return new HttpResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "X-Total-Pages": work.playType === "SHORT" ? "18" : "72",
      },
    });
  }),

  http.post(`${BASE}/scripts/review/like/:id`, ({ params }) => {
    const review = detailReviews.find((item) => item.id === params.id);
    if (!review) return HttpResponse.json({ error: "후기를 찾을 수 없습니다." }, { status: 404 });
    review.isLike = !review.isLike;
    review.likeCount += review.isLike ? 1 : -1;
    return HttpResponse.json(true);
  }),

  // 좋아요한 작품 조회
  http.get(`${BASE}/profile/like`, async () => {
    await delay(350);
    return HttpResponse.json({
      longPlay: getLikedLongPlays(),
      shortPlay: getLikedShortPlays(),
    });
  }),

  // 좋아요한 장편 작품 페이지네이션
  http.get(`${BASE}/profile/like/long`, async ({ request }) => {
    await delay(350);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 0);
    const likedLongPlays = getLikedLongPlays();
    return HttpResponse.json(likedLongPlays.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE));
  }),

  // 좋아요한 단편 작품 페이지네이션
  http.get(`${BASE}/profile/like/short`, async ({ request }) => {
    await delay(350);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 0);
    const likedShortPlays = getLikedShortPlays();
    return HttpResponse.json(likedShortPlays.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE));
  }),

  // 전체 작품 조회 (페이지네이션, Spring Page 응답 형태)
  http.get(`${BASE}/scripts/v2`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 0);
    const size = Number(url.searchParams.get("size") ?? 40);
    const sortType = url.searchParams.get("sortType") ?? "POPULAR";
    const playType = url.searchParams.get("playType");
    const search = (url.searchParams.get("search") ?? "").trim().toLowerCase();
    const works =
      playType === "LONG"
        ? longPlays
        : playType === "SHORT"
          ? shortPlays
          : [...longPlays, ...shortPlays];
    const all = sortList(
      search
        ? works.filter(
            ({ title, writer }) =>
              title.toLowerCase().includes(search) || writer.toLowerCase().includes(search)
          )
        : works,
      sortType
    );
    const totalPages = Math.ceil(all.length / size);
    const content = all.slice(page * size, (page + 1) * size);

    return HttpResponse.json({
      content,
      pageable: {
        pageNumber: page,
        pageSize: size,
        sort: { empty: false, sorted: true, unsorted: false },
        offset: page * size,
        paged: true,
        unpaged: false,
      },
      last: page >= totalPages - 1,
      totalElements: all.length,
      totalPages,
      first: page === 0,
      size,
      number: page,
      sort: { empty: false, sorted: true, unsorted: false },
      numberOfElements: content.length,
      empty: content.length === 0,
    });
  }),

  // 공모전 작품 둘러보기 (페이지네이션, Spring Page 응답 형태)
  http.get(`${BASE}/scripts/contest`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 0);
    const sortType = url.searchParams.get("sortType") ?? "POPULAR";
    const all = sortList([...longPlays, ...shortPlays], sortType);
    const totalPages = Math.ceil(all.length / PAGE_SIZE);
    const content = all.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    return HttpResponse.json({
      content,
      pageable: {
        pageNumber: page,
        pageSize: PAGE_SIZE,
        sort: { empty: false, sorted: true, unsorted: false },
        offset: page * PAGE_SIZE,
        paged: true,
        unpaged: false,
      },
      last: page >= totalPages - 1,
      totalElements: all.length,
      totalPages,
      first: page === 0,
      size: PAGE_SIZE,
      number: page,
      sort: { empty: false, sorted: true, unsorted: false },
      numberOfElements: content.length,
      empty: content.length === 0,
    });
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
    const id = String(params.id);
    const target = [...longPlays, ...shortPlays].find((script) => script.id === id);

    if (target) {
      target.like = !target.like;
      target.likeCount += target.like ? 1 : -1;
      const engagement = detailEngagement.get(id);
      if (engagement) {
        engagement.like = target.like;
        engagement.likeCount = target.likeCount;
      }
      return HttpResponse.json({ message: target.like ? "like" : "cancel like" });
    }

    if (!managedWorks.some((work) => work.id === id)) {
      return HttpResponse.json({ error: "상품을 찾을 수 없습니다." }, { status: 404 });
    }

    const engagement = detailEngagement.get(id) ?? { like: false, likeCount: 24, viewCount: 187 };
    engagement.like = !engagement.like;
    engagement.likeCount += engagement.like ? 1 : -1;
    detailEngagement.set(id, engagement);
    return HttpResponse.json({ message: engagement.like ? "like" : "cancel like" });
  }),
];
