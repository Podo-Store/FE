import BannerImage from "@/assets/image/company/company_info_banner.png";
import DownArrow from "@/assets/image/company/ic_down_arrow.svg?react";
import { useUserStatistics } from "@/hooks/useUserStatistics";
import { useMemo, useState } from "react";
import { YearTabs } from "@/components/tab/YearTabs";
import newsThumbnail from "@/assets/image/company/news_thumbnail.png";
import CompanyNav from "../CompanyNav";
import Footer from "../Footer";

const timelineData = [
  {
    year: 2025,
    events: [
      { month: "08", title: "[포도상점] 사업자 등록" },
      { month: "07", title: "[포도상점] 베타버전 출시" },
      {
        month: "07",
        title:
          "제2회 대학 연합 무대 컨퍼런스 개최 \n (총 120명, 26개 공연 단체 참여)",
      },
      { month: "07", title: "작가 워크숍 ‘포도 창작소 1기’ 운영" },
      {
        month: "07",
        title: "서울문화재단 예비 예술창업 인큐베이팅 지원사업 선정",
      },
      {
        month: "05",
        title: "한국콘텐츠진흥원 아이디어 사업화 \n 지원사업 선정",
      },
      { month: "04", title: "광운대학교 캠퍼스타운 입주기업 선정" },
      {
        month: "01",
        title:
          "제1회 대학 연합 무대 컨퍼런스 개최 \n(총 24명, 5개 공연 단체 참여)",
      },
    ],
  },
  {
    year: 2024,
    events: [
      { month: "12", title: "마스코트 ‘포’‘도’ 저작권 등록" },
      { month: "12", title: "제1회 노원 스타트업 박람회 참여 기업 선정" },
      { month: "11", title: "[포도상점] 상표 출원" },
      { month: "10", title: "아이엠마켓 셀러 선정 및 부스 운영" },
      {
        month: "06",
        title: "(사)함께만드는세상 청년 창업 자조활동 \n[알파청년 5기] 선정",
      },
      { month: "06", title: "포도상점 출발" },
    ],
  },
];

const mediaData = [
  {
    image: newsThumbnail,
    title: "창작 스토리 거래 플랫폼 ‘포도상점’, 신규 입점 작가 모집",
    content:
      "창작 스토리 거래 플랫폼 ‘포도상점’이 신규 작가 모집을 진행한다고 밝혔다. 연극, 뮤지컬을 위한 대본을 집필하는 작가라면 누구나 복잡한 절차 없이 지금 바로 작가 등록이 가능하다. 포도상점은 소규모 공연단체를 위한 대본 및 공연권 거래 플랫폼으로, 누구나 스토리를 자유롭게 등록, 열람, 판매할 수 있다. 작품 공개를 통해 인정을 받으면 공연 단체, 출판사 등과의 라이선스 계약을 통해 수익화까지 원스톱으로 진행할 수 있는 새로운 스토리 IP 오픈 마켓으로 주목받고 있다.",
    date: "2025.08.20",
    url: "https://www.ksilbo.co.kr/news/articleView.html?idxno=1034763",
  },
  {
    image: newsThumbnail,
    title: "창작 스토리 거래 플랫폼 ‘포도상점’, 극작가의 꿈 지원",
    content:
      "창작 스토리 거래 플랫폼 ‘포도상점’이 작품의 제작과 수익화를 원하는 신규 작가를 모집한다고 밝혔다. 포도상점은 희곡과 시나리오, 대본 등을 누구나 자유롭게 등록, 열람, 판매하는 스토리 IP 오픈 마켓으로, 극작가 및 작품 발굴을 통한 업계 활성화를 목표로 한다. 회원으로 등록한 작가가 자신의 작품을 사이트에 올리면 별점과 댓글을 통해 독자 및 업계 관계자의 피드백을 얻을 수 있다. 더불어 공연 단체, 출판사 등과 라이선스 계약을 맺어 수익화도 할 수 있다. 이달 중 작품의 유료 판매 서비스도 시작할 예정이다. 이와 함께 신규 작가를 위한 다양한 프로그램에 참여할 수 있다. 지난 7월 성황리에 공연을 마친 낭독극 <몽중>에 포함된 4편의 작품은 제작부터 유통까지 전 과정을 지원하는 ‘포도창작소’를 통해 선정되었다.",
    date: "2025.08.20",
    url: "https://www.thebigdata.co.kr/view.php?ud=2025082010063285546cf2d78c68_23",
  },
  {
    image: newsThumbnail,
    title: "창작 스토리 거래 플랫폼 ‘포도상점’, 신규 작가 모집",
    content:
      "창작 스토리 거래 플랫폼 ‘포도상점’이 신규 작가를 모집한다고 밝혔다. 스토리 IP 오픈 마켓 포도상점은 희곡과 시나리오, 대본 등을 누구나 자유롭게 올릴 수 있는 곳으로, 별점과 댓글을 통해 독자 및 업계 관계자의 피드백을 얻을 수 있다. 나아가 공연 단체나 출판사 등과의 라이선스 계약을 통해 수익화가 가능하다. 콘텐츠 제작사가 원스톱 시스템을 통해 원하는 작품의 검색부터 계약까지 한 번에 진행할 수 있기 때문이다. 이와 함께 작가의 창작 역량을 강화하기 위해 작품 제작부터 유통까지 전 과정을 지원하는 ‘포도창작소’를 운영 중이다. 지난 7월에는 해당 프로그램을 통해 선정된 4편의 작품이 낭독극 <몽중>이라는 이름으로 무대에 올라 성황리에 공연을 마쳤다.",
    date: "2025.08.20",
    url: "https://www.lecturernews.com/news/articleView.html?idxno=185200",
  },
  {
    image: newsThumbnail,
    title:
      "누구나 스토리를 자유롭게 거래하는 ‘포도상점’, 신규 작가에 도전하세요!",
    content:
      "누구나 나만의 스토리를 자유롭게 등록하고, 판매할 수 있는 새로운 ‘콘텐츠 거래 플랫폼’이 열렸다. 창작 스토리 거래 플랫폼 ‘포도상점’은 역량 있는 신진 작가를 발굴하고, 창작 콘텐츠의 거래를 활성화하기 위해 ‘신규 입점 작가’를 모집한다고 밝혔다. 포도상점은 소규모 공연단체를 위한 대본 및 공연권 거래 플랫폼으로, 희곡 작가라면 누구나 간단하게 작가 등록 후 바로 활동할 수 있다. 특히, 창작 과정부터 피드백은 물론 공연 단체, 출판사 등과의 라이선스 계약을 통한 수익화까지 가능해 신진 희곡 작가들을 위한 등단 기회로 주목받고 있다.",
    date: "2025.08.20",
    url: "https://www.beyondpost.co.kr/view.php?ud=2025082010205894836cf2d78c68_30",
  },
  {
    image: newsThumbnail,
    title: "창작 스토리 거래 플랫폼 ‘포도상점’, 신규 작가 참여 모집",
    content:
      "창작 스토리 거래 플랫폼 포도상점이 신규 작가를 모집한다고 20일 밝혔다. 포도상점은 작품 등록·열람·판매가 가능한 플랫폼으로, 작가가 자신의 대본을 소개하고 개인 및 단체를 통해 수익화할 수 있는 시스템을 제공한다. 플랫폼의 수익화 구조는 단계별로 구성되어 있다. 작품 등록 및 열람은 ‘포도알’ 단계에서 무료로 제공되며, ‘포도송이’와 ‘와인’ 단계에서는 작가가 원하는 금액을 설정해 판매할 수 있어, 작품의 가치를 직접 수익으로 연결할 수 있다. 플랫폼 내에서는 공연단체, 출판사 등 콘텐츠 제작사와의 라이선스 계약까지 원스톱으로 진행할 수 있어, 창작부터 유통, 수익화까지 한 곳에서 관리할 수 있다.",
    date: "2025.08.20",
    url: "https://www.it-b.co.kr/news/articleView.html?idxno=83595",
  },
];

const years = timelineData.map((s) => s.year);

const CompanyProfile = () => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useUserStatistics();

  const [activeYear, setActiveYear] = useState<number>(years[0]); // 2025부터 시작

  const activeData = useMemo(
    () => timelineData.find((d) => d.year === activeYear) ?? timelineData[0],
    [activeYear]
  );

  return (
    <div className="w-full min-h-screen">
      <CompanyNav />
      <div className="bg-[#1A1004] pb-[300px]">
        {/* 배너 */}
        <div className="relative w-full h-screen max-h-[552px] sm:max-h-[830px] md:max-h-[1080px] border">
          <img
            src={BannerImage}
            alt="Banner"
            className="w-full h-full max-h-[552px] sm:max-h-[830px] md:max-h-[1080px] object-cover "
          />
          <span className="absolute top-[71.6%] left-[50%] translate-x-[-50%] text-[#F2F2F2] text-center ">
            <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
              스토리를 세상과 연결하는 플랫폼을
            </p>
            <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
              만들고 있습니다.
            </p>
          </span>
          <div className="absolute bottom-[7.4%] left-1/2 -translate-x-1/2">
            <DownArrow className="w-[40px] h-[13px] animate-float " />
          </div>
        </div>

        {/* 본문 */}
        <div className="flex w-full flex-col items-center gap-[200px] px-[9.4vw] 2xl:px-[320px] xl:px-[85px] md:px-[50px] sm:px-[40px]">
          <div className="flex flex-col w-full mt-[100px] gap-[50px] sm:gap-[80px] md:gap-[100px]">
            <span className="text-[#F2F2F2] ">
              <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
                이야기를 나누고 싶은 사람들이 모여
              </p>
              <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
                세상에 울림을 남깁니다.
              </p>
            </span>
            {/* xl :1280px */}
            <div className="flex flex-col gap-[50px] items-center hidden xl:flex">
              <div className="flex gap-[160px]">
                <div className="text-[#F2F2F2] bg-[var(--c-Main)] w-[260px] h-[260px] rounded-full flex flex-col items-center justify-center">
                  <span className="company-title-large text-[#F2F2F2]">
                    {data?.userCnt} 명+
                  </span>
                  <span className="h4-bold text-[#BABABA]">사용자 수</span>
                </div>
                <div className="text-[#F2F2F2] bg-[var(--c-Main)] w-[260px] h-[260px] rounded-full flex flex-col items-center justify-center">
                  <span className="company-title-large text-[#F2F2F2]">
                    34 건+
                  </span>
                  <span className="h4-bold text-[#BABABA]">총 매칭 건수</span>
                </div>
              </div>
              <div className="flex gap-[160px]">
                <div className="text-[#F2F2F2] bg-[var(--c-Main)] w-[260px] h-[260px] rounded-full flex flex-col items-center justify-center">
                  <span className="company-title-large text-[#F2F2F2]">
                    {data?.scriptCnt} 개+
                  </span>
                  <span className="h4-bold text-[#BABABA]">등록 작품 수</span>
                </div>
                <div className="text-[#F2F2F2] bg-[var(--c-Main)] w-[260px] h-[260px] rounded-full flex flex-col items-center justify-center">
                  <span className="company-title-large text-[#F2F2F2]">
                    {data?.viewCnt} 회+
                  </span>
                  <span className="h4-bold text-[#BABABA]">총 열람 수</span>
                </div>
                <div className="text-[#F2F2F2] bg-[var(--c-Main)] w-[260px] h-[260px] rounded-full flex flex-col items-center justify-center">
                  <span className="company-title-large text-[#F2F2F2]">
                    {data?.reviewCnt} 개+
                  </span>
                  <span className="h4-bold text-[#BABABA]">총 후기 수</span>
                </div>
              </div>
            </div>
            {/* sm */}
            <div className="grid grid-cols-2 gap-y-[50px] sm:gap-y-[54px] md:gap-y-[60px] xl:hidden px-[6.25vw] sm:px-[50px] md:px-[60px]">
              {/* 1 */}
              <div>
                <div className="flex flex-col">
                  <span className=" p-medium-bold sm:h4-bold md:company-title-large text-[#F2F2F2]">
                    {data?.userCnt} 명+
                  </span>
                  <span className=" p-xs-bold sm:p-medium-bold md:h4-bold text-[#BABABA]">
                    사용자 수
                  </span>
                </div>
              </div>

              {/* 2 */}
              <div>
                <div className="flex flex-col">
                  <span className=" p-medium-bold sm:h4-bold md:company-title-large text-[#F2F2F2]">
                    34 건+
                  </span>
                  <span className=" p-xs-bold sm:p-medium-bold md:h4-bold text-[#BABABA]">
                    총 매칭 건수
                  </span>
                </div>
              </div>

              {/* 3 */}
              <div>
                <div className="flex flex-col">
                  <span className=" p-medium-bold sm:h4-bold md:company-title-large text-[#F2F2F2]">
                    {data?.scriptCnt} 개+
                  </span>
                  <span className=" p-xs-bold sm:p-medium-bold md:h4-bold text-[#BABABA]">
                    등록 작품 수
                  </span>
                </div>
              </div>

              {/* 4 */}
              <div>
                <div className="flex flex-col">
                  <span className=" p-medium-bold sm:h4-bold md:company-title-large text-[#F2F2F2]">
                    {data?.viewCnt} 회+
                  </span>
                  <span className=" p-xs-bold sm:p-medium-bold md:h4-bold text-[#BABABA]">
                    총 열람 수
                  </span>
                </div>
              </div>

              <div>
                <div className="flex flex-col">
                  <span className=" p-medium-bold sm:h4-bold md:company-title-large text-[#F2F2F2]">
                    {data?.reviewCnt} 개+
                  </span>
                  <span className=" p-xs-bold sm:p-medium-bold md:h4-bold text-[#BABABA]">
                    총 후기 수
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-[50px] sm:gap-[80px] md:gap-[100px]">
            <span className="text-[#F2F2F2] ">
              <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
                당신의 이야기가 세상에서 빛나도록
              </p>
              <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
                멈추지 않고 나아갑니다.
              </p>
            </span>

            {/* lg */}
            <div className=" items-center w-fit flex flex-col 2xl:px-[101px] xl:px-[60px] hidden xl:flex ">
              <div className="relative">
                <div className="absolute left-[161px] translate-y-[20px]">
                  <VerticalTimelineSVG yearDots={[10, 860, 1390]} />
                </div>
                {timelineData.map((item, index) => (
                  <div
                    key={index}
                    className="flex grid grid-cols-[121px_1fr] gap-[80px] "
                  >
                    <h2 className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large text-[#F2F2F2]">
                      {item.year}
                    </h2>

                    <ul className="flex flex-col gap-[70px] mb-[70px] translate-y-[15px]">
                      {item.events.map((event, index) => (
                        <li key={index} className="h3-bold text-[#F2F2F2]">
                          <span className="text-[#BABABA] h4-bold mr-[15px] ">
                            {event.month}.
                          </span>
                          {event.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* md */}

            <div className="xl:hidden">
              <YearTabs
                years={years}
                active={activeYear}
                onChange={setActiveYear}
              />

              {/* 타임라인 본문 */}
              <div className=" sm:px-[15px] md:px-[20px] mt-[30px] md:mt-[50px]">
                <ul className="flex flex-col gap-[20px] sm:gap-[30px] md:gap-[50px] translate-y-[15px]">
                  {activeData.events.map((event, idx) => (
                    <li
                      key={idx}
                      className="p-12-medium sm:p-large-bold md:h4-bold text-[#F2F2F2]"
                    >
                      <div className="grid grid-cols-[3.5ch_1fr] gap-3 items-start">
                        <span className="text-[#BABABA] p-xs-bold sm:p-medium-bold md:h5-bold text-right tabular-nums">
                          {event.month}.
                        </span>
                        <span className="whitespace-pre-line">
                          {event.title}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-[50px] sm:gap-[80px] md:gap-[100px]">
            <span className="text-[#F2F2F2] ">
              <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
                언론 속 포도상점
              </p>
            </span>
            <div className="">
              {mediaData.map((item, index) => (
                <div
                  key={index}
                  className="flex sm:grid sm:grid-cols-[164px_1fr] md:grid-cols-[219px_1fr] xl:grid-cols-[360px_1fr] sm:gap-[15px] xl:gap-[60px] md:gap-[20px] border-b border-[#BABABA] py-[20px] sm:py-[30px] md:py-[40px] xl:py-[50px]"
                  onClick={() => window.open(item.url, "_blank")}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className=" hidden sm:block"
                  />
                  <div className="flex flex-col gap-[25px] md:gap-[15px] xl:gap-[20px] justify-center  w-full min-w-0 ">
                    <span className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large text-[#F2F2F2] xl:h1-bold md:h5-medium sm:p-large-bold sm:whitespace-normal md:truncate">
                      {item.title}
                    </span>
                    <span className="text-[#BABABA] h5-medium xl:h4-bold hidden md:line-clamp-2 xl:line-clamp-3 ">
                      {item.content}
                    </span>
                    <span className="p-xs-bold sm:p-medium-bold md:h5-bold text-[#BABABA] ">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompanyProfile;

type Props = {
  height?: number;
  x?: number;
  lineTop?: number;
  lineBottom?: number;
  yearDots: number[]; // 섹션 시작 y들 (큰 점)
};

function VerticalTimelineSVG({
  height = 1400,
  x = 10,
  lineTop = 0,
  lineBottom = height,
  yearDots,
}: Props) {
  return (
    <svg
      width="20"
      height={height}
      viewBox={`0 0 20 ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={x}
        y1={lineTop}
        x2={x}
        y2={lineBottom}
        stroke="#6A39C0"
        strokeWidth="5"
      />
      {yearDots.map((y, i) => (
        <circle key={`Y-${i}`} cx={x} cy={y} r={10} fill="#6A39C0" />
      ))}
    </svg>
  );
}
