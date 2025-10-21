import BannerImage from "@/assets/image/company/company_info_banner.png";
import DownArrow from "@/assets/image/company/ic_down_arrow.svg?react";
import { useUserStatistics } from "@/hooks/useUserStatistics";
import { useMemo, useState } from "react";
import { YearTabs } from "@/components/tab/YearTabs";
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
    <div>
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
      <div className="flex bg-[#1A1004] w-full flex-col items-center gap-[200px] px-[9.4vw] 2xl:px-[320px] xl:px-[85px] md:px-[50px] sm:px-[40px]">
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
                      <span className="whitespace-pre-line">{event.title}</span>
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
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;

type Dot = { y: number; size?: number };
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
