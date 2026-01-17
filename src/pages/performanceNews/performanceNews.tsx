import InfiniteBanner from "@/components/banner/InfiniteBanner.js";
import RightArrow from "@/assets/image/button/arrow/ic_black_right_arrow.svg";
import { TabLayout } from "@/components/tab/tabLayout";
import { usePerformanceMain } from '@/feature/performanceNews/performanceMain/queries';
import type {PerformanceMainItem} from '@/feature/performanceNews/performanceMain/types';
import { usePerformanceListInfinite } from '@/feature/performanceNews/performanceList/queries';

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import clsx from "clsx";

type SectionId = "ongoing" | "upcoming" | "past";

type SectionConfig = {
  id: SectionId;
  title: string;
  onClickSeeAll: () => void;
};

const PerformanceNews = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "전체";

  const tabToStatus = (tab: string) => {
    if (tab === '지금 공연중') return 'ONGOING';
    if (tab === '공연 예정') return 'UPCOMING';
    return 'PAST';
  };

  const { data, isLoading, isError } = usePerformanceMain();

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
    sectionId: SectionId;
    title: string;
    onClickSeeAll: () => void;
    items: PerformanceMainItem[];
  };

  const ViewAllSections = ({ sectionId, title, onClickSeeAll,items }: ViewAllSectionsProps) => {
    const list = items.slice(0, 4);

  
    return (
      <section className="px-[20px] sm:px-0">
        <header className="flex items-center gap-[10px] px-[10px] sm:pl-[13px] md:pl-[3px] sm:gap-5 mb-[20px] sm:mb-[28px]">
          <p className="p-small-medium sm:h5-medium w-fit">{title}</p>
  
          <div className="flex justify-between items-center flex-1">
            <div className="flex items-center gap-2 sm:gap-[10px]">
              {/* <button
                type="button"
                className={`p-12-medium sm:p-small-medium ${
                  filter === 'all' ? 'text-black' : 'text-[var(--grey6)]'
                }`}
                onClick={() => setFilter('all')}
              >
                전체
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" width="1" height="8" viewBox="0 0 1 8" fill="none">
                <path d="M0.25 0V8" stroke="#BABABA" strokeWidth="0.5" />
              </svg>
              <button
                type="button"
                className={`p-12-medium sm:p-small-medium ${
                  filter === 'podo' ? 'text-black' : 'text-[var(--grey6)]'
                }`}
                onClick={() => setFilter('podo')}
              >
                포도상점
              </button> */}
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
        {items.length === 0&&<div className = "flex justify-center">존재하는 공연이 없습니다.</div>}
  
        <section className="grid grid-cols-2 gap-[10px] mb-[43px] sm:gap-[20px] sm:mb-0 md:grid-cols-3 xl:grid-cols-4">
          {list.map((item) => (
            <PerformanceCard key={item.id} item={item} />
          ))}
        </section>
  
        <button
          type="button"
          className="w-full h-[32px] border border-[var(--grey4)] rounded-[9px] flex items-center justify-center gap-[10px] sm:hidden"
          onClick={onClickSeeAll}
        >
          <p className="p-12-bold">{title} 전체보기</p>
          <img src={RightArrow} alt="" className="w-[5px] h-[10px]" />
        </button>
      </section>
    );
  };
  



  const PerformanceCard = ({ item }: { item: PerformanceMainItem }) => {
  
    function normalizationDate(){
      const splitEndDate = item.endDate.split('-');
      const finalEndDate = `${splitEndDate[1]}.${splitEndDate[2]}`;
      const splitStartDate =  item.startDate.split('-');
      const finalStartDate = `${splitStartDate[0]}.${splitStartDate[1]}.${splitStartDate[2]}`;
      return `${finalStartDate}~${finalEndDate}`;

    }

    
    return(
    <article className="w-full">
      <div className="w-full aspect-[135/180] overflow-hidden rounded-[20px] bg-[var(--grey2)]">
        <img
          src={item.posterPath}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-[10px] sm:mt-[20px]">
        <p className="p-small-bold sm:p-large-bold md:h5-bold text-[#000] line-clamp-1">{item.title}</p>
        <p className="p-12-regular sm:p-medium-regular text-[#000] line-clamp-1 mt-[7px] sm:mt-[13px]">{item.place}</p>
        <p className="p-12-regular sm:p-medium-regular text-[#000] mt-[3px]">
          {normalizationDate()}
        </p>

      {item.isUsed && (<div className = "p-xs-bold sm:p-12-bold text-[var(--purple4)] flex items-center justify-center bg-[#DFCDFFE5]/90 w-[45px] sm:w-[62px] aspect-[9/4] rounded-[6px] mt-[16px] sm:mt-[20px]">포도상점</div>)}
      </div>
       
    </article>
    );
  }

  type ViewSingleSectionsProps = {
    title: string;
  };


const ViewSingleSections = ({ title }: { title: string }) => {
  const status = useMemo(() => tabToStatus(title), [title]);
  const [isUsed, setIsUsed] = useState<boolean | undefined>(undefined);
  const { 
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePerformanceListInfinite({ status,isUsed });

  const items = useMemo(
    () => data?.pages.flat() ?? [],
    [data]
  );

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <>로딩</>;
  if (isError) return <>에러</>;

//   <p
//   className={clsx(
//     "c-grey",
//     !isSmallMobile ? "p-medium-medium" : "p-12-400"
//   )}
// >
  return (
    <section className="px-[20px] sm:px-0">
      <header className="flex items-center gap-[10px] px-[10px] sm:pl-[13px] md:pl-[3px] sm:gap-5 mb-[20px] sm:mb-[28px]">
        <p className="p-small-medium sm:h5-medium w-fit">{title}</p>
        {/* ❗ button 안에 button 금지 → 바깥은 div로 */}
        <div className="flex justify-between items-center flex-1">
            <div className="flex items-center gap-2 sm:gap-[10px]">
              <p className={clsx("p-12-medium sm:p-small-medium cursor-pointer", isUsed === undefined &&"text-[#6A39C0]")} onClick={()=>setIsUsed(undefined)}>전체</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1"
                height="8"
                viewBox="0 0 1 8"
                fill="none"
              >
                <path d="M0.25 0V8" stroke="#BABABA" strokeWidth="0.5" />
              </svg>
              <p className={clsx("p-12-medium sm:p-small-medium cursor-pointer", isUsed === true &&"text-[#6A39C0]")} onClick={()=>setIsUsed(true)}>포도상점</p>
            </div>
          </div>
      </header>

      {items.length === 0&&<div className = "flex justify-center">존재하는 공연이 없습니다.</div>}
      <section className="grid grid-cols-2 gap-[10px] mb-[43px] sm:gap-[20px] md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <PerformanceCard key={item.id} item={item} />
        ))}
      </section>

      {/* ✅ sentinel */}
      <div ref={bottomRef} className="h-10" />

      {isFetchingNextPage && <div className="py-4 text-center">불러오는 중...</div>}
    </section>
  );
};
  if (isLoading) return <>로딩</>;
  if (isError || !data) return <>에러</>;


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
              sectionId={section.id}
              title={section.title}
              items={data[section.id]} 
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
