import InfiniteBanner from "@/components/banner/InfiniteBanner.js";
import RightArrow from "@/assets/image/button/arrow/ic_black_right_arrow.svg";
import { TabLayout } from "@/components/tab/tabLayout";
import { useCallback, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PerformanceNews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "전체";

  const handleChangeCategory = useCallback(
    (value: string, type: "tab") => {
      const next = new URLSearchParams(searchParams.toString());
      next.set(type, value);
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );
  return (
    <div className="flex flex-col list-wrap-wrap border ">
      {/* 상단 Info  */}
      <div className="md:mb-5 border flex justify-between w-[114px] sm:w-[133px] md:w-full mt-[60px] sm:mt-[72px] ">
        <p className="sm:h5-bold p-medium-bold">공연 소식</p>
        <section className="flex items-center justify-center gap-[5px] md:gap-[10px]">
          <button className="p-large-medium hidden md:block ">
            공연 소식 등록하기
          </button>
          <button className="p-xs-medium block md:hidden">등록하기 </button>
          <img
            src={RightArrow}
            alt="등록하기"
            className="w-[5px] h-[8px] md:w-[10px] md:h-[16px]"
          />
        </section>
      </div>
      <InfiniteBanner />
      {/* 메뉴 선택 */}
      <section className="mt-[8px] sm:mt-[30px] md:mt-[21px]">
        <TabLayout
          tabs={["전체", "지금 공연중", "공연 예정", "지난 공연"]}
          activeTab={activeTab}
          onChange={(value) => handleChangeCategory(value, "tab")}
        />
      </section>
      {/* 전체 */}
      {activeTab === "전체" && <div>전체</div>}
      {/* 지금 공연중 */}
      {activeTab === "지금 공연중" && <div>지금 공연중</div>}
      {/* 공연 예정 */}
      {activeTab === "공연 예정" && <div>공연 예정</div>}
      {/* 지난 공연 */}
      {activeTab === "지난 공연" && <div>지난 공연</div>}
      <div className="mt-[0px] md:mt-[60px] lg:mt-[100px]"></div>
    </div>
  );
};

export default PerformanceNews;
