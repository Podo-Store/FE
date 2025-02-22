import 광운극예술연구회_photo from "../assets/image/landing/organizations/광운대_광운극예술연구회/photo.png";
import 광운극예술연구회_logo from "../assets/image/landing/organizations/광운대_광운극예술연구회/logo.png";
import 작은공간_photo from "../assets/image/landing/organizations/광운대_작은공간/photo.png";
import 작은공간_logo from "../assets/image/landing/organizations/광운대_작은공간/logo.png";
import 리버액트_photo from "../assets/image/landing/organizations/서울대_리버액트/photo.png";
import 리버액트_logo from "../assets/image/landing/organizations/서울대_리버액트/logo.png";
import 낙산극회_photo from "../assets/image/landing/organizations/한성대_낙산극회/photo.png";
import 낙산극회_logo from "../assets/image/landing/organizations/한성대_낙산극회/logo.png";

interface Organizations {
  // 추가할 때마다 key값 증가
  [key: number]: {
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
    additionalDeleteCircle?: number[]; // 추가로 삭제할 원의 index
  };
}

export const organizations: Organizations = {
  3: {
    name: "광운극예술연구회",
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
  // 바다
  2: {
    name: "작은공간",
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
  1: {
    name: "리버액트",
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
  0: {
    name: "낙산극회",
    photo: {
      src: 낙산극회_photo,
      style: {},
    },
    logo: {
      src: 낙산극회_logo,
      style: { width: "60%", transform: "translate(2%, -2%)" },
    },
    keywords: ["#한성대학교", "#Since1977", "#순수연극", "#창작극", "#각색맛집"],
    additionalDeleteCircle: [2],
  },
};
