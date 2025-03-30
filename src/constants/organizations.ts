import 광운극예술연구회_photo from "../assets/image/landing/organizations/광운대_광운극예술연구회/photo.png";
import 광운극예술연구회_logo from "../assets/image/landing/organizations/광운대_광운극예술연구회/logo.png";
import 북악극예술연구회_photo from "../assets/image/landing/organizations/국민대_북악극예술연구회/photo.png";
import 북악극예술연구회_logo from "../assets/image/landing/organizations/국민대_북악극예술연구회/logo.png";
import 작은공간_photo from "../assets/image/landing/organizations/광운대_작은공간/photo.png";
import 작은공간_logo from "../assets/image/landing/organizations/광운대_작은공간/logo.png";
import 리버액트_photo from "../assets/image/landing/organizations/서울대_리버액트/photo.png";
import 리버액트_logo from "../assets/image/landing/organizations/서울대_리버액트/logo.png";
import 낙산극회_photo from "../assets/image/landing/organizations/한성대_낙산극회/photo.png";
import 낙산극회_logo from "../assets/image/landing/organizations/한성대_낙산극회/logo.png";
import 동덕극회_photo from "../assets/image/landing/organizations/동덕여대_동덕극회/photo.png";
import 동덕극회_logo from "../assets/image/landing/organizations/동덕여대_동덕극회/logo.png";
import 이화여대총연극회_photo from "../assets/image/landing/organizations/이화여대_총연극회/photo.png";
import 이화여대총연극회_logo from "../assets/image/landing/organizations/이화여대_총연극회/logo.png";

interface Organizations {
  name: string;
  photo: {
    src: string; // 이미지 경로
    style: React.CSSProperties;
  };
  logo: {
    src: string; // 이미지 경로
    style: React.CSSProperties;
  };
  keywords: string[];
  additionalDeleteCircle?: number[]; // 마지막 원에 더해 추가로 삭제할 원의 index
}

/* 복사하여 사용
  {
    name: "",
    photo: {
      src: "",
      style: {},
    },
    logo: {
      src: "",
      style: { width: "60%" },
    },
    keywords: [],
    additionalDeleteCircle: [2],
  },
*/

const organizations: Organizations[] = [
  {
    name: "광운대학교 광운극예술연구회",
    photo: {
      src: 광운극예술연구회_photo,
      style: { backgroundPosition: "center calc(50% + 60px)" },
    },
    logo: {
      src: 광운극예술연구회_logo,
      style: { width: "70%" },
    },
    keywords: ["#광운대학교", "#Since1980", "#열정가득", "#과몰입", "#두번째가족"],
    additionalDeleteCircle: [2],
  },
  {
    name: "국민대학교 북악극예술연구회",
    photo: {
      src: 북악극예술연구회_photo,
      style: {},
    },
    logo: {
      src: 북악극예술연구회_logo,
      style: { width: "70%" },
    },
    keywords: ["#국민대학교", "#누구나", "#청춘", "#지금_이_순간"],
    additionalDeleteCircle: [2],
  },
  {
    name: "광운대학교 작은공간",
    photo: {
      src: 작은공간_photo,
      style: {},
    },
    logo: {
      src: 작은공간_logo,
      style: { width: "150%", transform: "translate(1.5%, -2.5%)" },
    },
    keywords: ["#광운대학교", "#화학공학과", "#소모임", "#작지만매운", "#패짱", "#추억"],
    additionalDeleteCircle: [2],
  },
  {
    name: "서울대학교 리버액트",
    photo: {
      src: 리버액트_photo,
      style: {},
    },
    logo: {
      src: 리버액트_logo,
      style: { width: "60%" },
    },
    keywords: ["#서울대학교", "#자유전공학부", "#창작극", "#연기맛집", "#관악최고", "#재밌는연극"],
    additionalDeleteCircle: [2],
  },
  {
    name: "한성대학교 낙산극회",
    photo: {
      src: 낙산극회_photo,
      style: { backgroundPosition: "center calc(50% - 45px)" },
    },
    logo: {
      src: 낙산극회_logo,
      style: { width: "60%", transform: "translate(2%, -2%)" },
    },
    keywords: ["#한성대학교", "#Since1977", "#순수연극", "#창작극", "#각색맛집"],
    additionalDeleteCircle: [2],
  },
  {
    name: "동덕여자대학교 극예술연구회",
    photo: {
      src: 동덕극회_photo,
      style: { backgroundPosition: "center center" },
    },
    logo: {
      src: 동덕극회_logo,
      style: { width: "60%", transform: "translate(2%, 0)" },
    },
    keywords: [
      "#동덕여자대학교",
      "#그림자를_비추는_사람들",
      "#모두가_평등한_연극",
      "#소수자와_함께하는_연극",
      "#학내_유일_연극동아리",
    ],
    additionalDeleteCircle: [1, 3],
  },
  {
    name: "이화여자대학교 총연극회",
    photo: {
      src: 이화여대총연극회_photo,
      style: {},
    },
    logo: {
      src: 이화여대총연극회_logo,
      style: { width: "60%" },
    },
    keywords: ["#이화여자대학교", "#중앙연극동아리", "#깨어있는", "#연극을", "#위하여"],
    additionalDeleteCircle: [1],
  },
];

export const organizationsExport = Array.from(organizations).reverse();
export const organizationsLength = organizationsExport.length;
