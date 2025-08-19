import Cookies from "js-cookie";
import StatCard from "@/components/admin/dashBoard/StatCard";

import { GetStatisticsResponse } from "@/api/admin/statisticApi";
import { useAdminStatistics } from "@/hooks/useAdminStatistics";
const AdminStatisticManage = () => {
  const accessToken = Cookies.get("accessToken");

  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminStatistics(accessToken);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-x-[21px] gap-y-[20px] mt-[80px] mb-[40px]">
        <StatCard label="유저" value="—" />
        <StatCard label="작품" value="—" />
        <StatCard label="조회수" value="—" />
        <StatCard label="후기" value="—" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-[80px]">
        <p className="text-red-600">통계 불러오기 실패: {error.message}</p>
        <button className="mt-2 underline" onClick={() => refetch()}>
          다시 시도
        </button>
      </div>
    );
  }

  const EMPTY: GetStatisticsResponse = {
    userCnt: 0,
    scriptCnt: 0,
    viewCnt: 0,
    reviewCnt: 0,
  };
  const stats = data ?? EMPTY;

  return (
    <div className="pb-[1205px]">
      <div className="grid grid-cols-3 gap-x-[21px] gap-y-[20px] mt-[80px] mb-[40px]">
        <StatCard label="유저" value={stats.userCnt} />
        <StatCard label="작품" value={stats.scriptCnt} />
        <StatCard label="조회수" value={stats.viewCnt} />
        <StatCard label="후기" value={stats.reviewCnt} />
      </div>

      <span className="w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1280"
          height="4"
          viewBox="0 0 1280 4"
          fill="none"
        >
          <path
            d="M0 2H1280"
            stroke="black"
            stroke-opacity="0.1"
            stroke-width="4"
          />
        </svg>
      </span>
    </div>
  );
};

export default AdminStatisticManage;
