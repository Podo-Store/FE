import InfiniteBanner from "@/components/banner/InfiniteBanner.js";
import RightArrow from "@/assets/image/button/arrow/ic_black_right_arrow.svg";
import { TabLayout } from "@/components/tab/tabLayout";
import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type SectionId = "ongoing" | "upcoming" | "past";

type SectionConfig = {
  id: SectionId;
  title: string;
  onClickSeeAll: () => void;
};

const PerformanceNews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "전체";
  const navigate = useNavigate();

  const handleChangeCategory = useCallback(
    (value: string, type: "tab") => {
      const next = new URLSearchParams(searchParams.toString());
      next.set(type, value);
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const handleSeeAll = useCallback(
    (tabName: string) => {
      handleChangeCategory(tabName, "tab");
    },
    [handleChangeCategory]
  );

  const ALL_SECTIONS: SectionConfig[] = useMemo(
    () => [
      {
        id: "ongoing",
        title: "지금 공연중",
        onClickSeeAll: () => handleSeeAll("지금 공연중"),
      },
      {
        id: "upcoming",
        title: "공연 예정",
        onClickSeeAll: () => handleSeeAll("공연 예정"),
      },
      {
        id: "past",
        title: "지난 공연",
        onClickSeeAll: () => handleSeeAll("지난 공연"),
      },
    ],
    [handleSeeAll]
  );

  type ViewAllSectionsProps = {
    title: string;
    onClickSeeAll: () => void;
  };

  const ViewAllSections = ({ title, onClickSeeAll }: ViewAllSectionsProps) => {
    return (
      <section className="px-[20px] sm:px-0">
        <header className="flex items-center gap-[10px] px-[10px] sm:pl-[13px] md:pl-[3px] sm:gap-5 mb-[20px] sm:mb-[28px]">
          <p className="p-small-medium sm:h5-medium w-fit">{title}</p>

          {/* ❗ button 안에 button 금지 → 바깥은 div로 */}
          <div className="flex justify-between items-center flex-1">
            <div className="flex items-center gap-2 sm:gap-[10px]">
              <p className="p-12-medium sm:p-small-medium">전체</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1"
                height="8"
                viewBox="0 0 1 8"
                fill="none"
              >
                <path d="M0.25 0V8" stroke="#BABABA" strokeWidth="0.5" />
              </svg>
              <p className="p-12-medium sm:p-small-medium">포도상점</p>
            </div>

            <button
              type="button"
              className="hidden sm:flex items-center gap-2"
              onClick={onClickSeeAll}
            >
              전체보기
              <img src={RightArrow} alt="" className="w-[6px] h-[12px]" />
            </button>
          </div>
        </header>

        <section
          className="grid grid-cols-2 gap-[10px] mb-[43px]
                 sm:gap-[20px] sm:mb-0
                 md:grid-cols-3 
                 lg:grid-cols-4"
        >
          <div className=" w-full aspect-[210/440]" />
        </section>

        <button
          type="button"
          className="w-full h-[32px] border border-[var(--grey4)] rounded-[9px] flex items-center justify-center gap-[10px] sm:hidden"
        >
          <p className="p-12-bold" onClick={onClickSeeAll}>
            {title} 전체보기
          </p>
          <img src={RightArrow} alt="" className="w-[5px] h-[10px]" />
        </button>
      </section>
    );
  };

  type ViewSingleSectionsProps = {
    title: string;
  };

  const ViewSingleSections = ({ title }: ViewSingleSectionsProps) => {
    return (
      <section className="px-[20px] sm:px-0">
        <header className="flex items-center gap-[10px] px-[10px] sm:pl-[13px] md:pl-[3px] sm:gap-5 mb-[20px] sm:mb-[28px]">
          <p className="p-small-medium sm:h5-medium w-fit">{title}</p>

          {/* ❗ button 안에 button 금지 → 바깥은 div로 */}
          <div className="flex justify-between items-center flex-1">
            <div className="flex items-center gap-2 sm:gap-[10px]">
              <p className="p-12-medium sm:p-small-medium">전체</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1"
                height="8"
                viewBox="0 0 1 8"
                fill="none"
              >
                <path d="M0.25 0V8" stroke="#BABABA" strokeWidth="0.5" />
              </svg>
              <p className="p-12-medium sm:p-small-medium">포도상점</p>
            </div>
          </div>
        </header>

        <section
          className="grid grid-cols-2 gap-[10px] mb-[43px]
                 sm:gap-[20px] sm:mb-0
                 md:grid-cols-3 
                 lg:grid-cols-4"
        >
          <div className="w-full aspect-[210/440]" />
        </section>
      </section>
    );
  };

  return (
    <main className="flex flex-col list-wrap-wrap ">
      {/* 상단 Info  */}
      <header className="md:mb-5 flex justify-between w-[114px] sm:w-[133px] md:w-full mt-[60px] sm:mt-[72px] ml-[20px] sm:ml-0 ">
        <p className="sm:h5-bold p-medium-bold">공연 소식</p>
        <button
          className="flex items-center justify-center gap-[5px] md:gap-[10px]"
          onClick={() => {
            navigate("/performanceNews/register");
          }}
        >
          <p className="p-large-medium hidden md:block ">공연 소식 등록하기</p>
          <p className="p-xs-medium block md:hidden">등록하기 </p>
          <img
            src={RightArrow}
            alt="등록하기"
            className="w-[5px] h-[8px] md:w-[10px] md:h-[16px]"
          />
        </button>
      </header>
      <InfiniteBanner />
      {/* 메뉴 선택 */}
      <nav
        aria-label="공연 소식 탭"
        className="mt-[8px] sm:mt-[30px] md:mt-[21px] mb-[35px] sm:mb-[47px]"
      >
        <TabLayout
          tabs={["전체", "지금 공연중", "공연 예정", "지난 공연"]}
          activeTab={activeTab}
          onChange={(value) => handleChangeCategory(value, "tab")}
        />
      </nav>
      {/* 전체 */}
      {activeTab === "전체" && (
        <section className="flex flex-col gap-[100px]">
          {ALL_SECTIONS.map((section) => (
            <ViewAllSections
              key={section.id}
              title={section.title}
              onClickSeeAll={section.onClickSeeAll}
            />
          ))}
        </section>
      )}
      {/* 지금 공연중 */}
      {activeTab === "지금 공연중" && <ViewSingleSections title={activeTab} />}
      {/* 공연 예정 */}
      {activeTab === "공연 예정" && <ViewSingleSections title={activeTab} />}
      {/* 지난 공연 */}
      {activeTab === "지난 공연" && <ViewSingleSections title={activeTab} />}
      <div className="mt-[0px] md:mt-[60px] lg:mt-[100px]"></div>
    </main>
  );
};

export default PerformanceNews;
