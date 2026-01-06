import { ShowCard } from "@/types/show";
import mongJungPoster from "../assets/image/performedWork/mongjung_poster.png";
import archivePoster from "../assets/image/performedWork/archive_poster.jpeg";
import sisonPoster from "@/assets/image/performedWork/sison_poster.PNG";

export const MOCK_SHOWS: ShowCard[] = [
  {
    id: "1",
    image: sisonPoster,
    title: "끝나지 않은 일",
    author: "이진성",
    troupe: "시선",
    period: "2025.11.20 - 2025.11.21",
    link: "https://www.podo-store.com/list/detail/f9a49931-e35f-478a-af16-fb4f8d82513a",
  },
  {
    id: "2",
    image: sisonPoster,
    title: "불씨",
    author: "Woo",
    troupe: "시선",
    period: "2025.11.20 - 2025.11.21",
    link: "https://www.podo-store.com/list/detail/c19756fe-e331-4757-926f-64cc05425203",
  },
  {
    id: "3",
    image: mongJungPoster,
    title: "이 사랑은 아직도",
    author: "박금순",
    troupe: "동양대학교 공연영상학부",
    period: "2025.07.31",
  },
  {
    id: "4",
    image: mongJungPoster,
    title: "여름 지나 가을",
    author: "김수영",
    troupe: "동양대학교 공연영상학부",
    period: "2025.07.31",
    link: "https://www.podo-store.com/list/detail/ba8f886d-e753-47d0-b975-d33c61193dee",
  },
  {
    id: "5",
    image: mongJungPoster,
    title: "사랑하는 게 죄는 아니잖아",
    author: "산초작가",
    troupe: "동양대학교 공연영상학부",
    period: "2025.07.31",
    link: "https://www.podo-store.com/list/detail/53e05ff9-0742-4167-be96-7538a8e13c34",
  },
  {
    id: "6",
    image: mongJungPoster,
    title: "한여름 밤에 꿈이 계속",
    author: "바람깃",
    troupe: "동양대학교 공연영상학부",
    period: "2025.07.31",
    link: "https://www.podo-store.com/list/detail/6ddf44cc-d53f-4f26-98d0-36f63cc761e8",
  },
  {
    id: "7",
    image: archivePoster,
    title: "Archive",
    author: "감자튀김",
    troupe: "프로젝트 항해",
    period: "2025.07.12 - 2025.07.13",
    link: "https://www.podo-store.com/list/detail/17133b1a-da07-40d5-889d-82dff04baf5e",
  },
];
