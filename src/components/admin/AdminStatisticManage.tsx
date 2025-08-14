import StatCard from "@/components/admin/dashBoard/StatCard";

const AdminStatisticManage = () => {
  return (
    <div className="pb-[1205px]">
      <div className=" grid grid-cols-3 gap-x-[21px] gap-y-[20px] mt-[80px] mb-[40px]">
        <StatCard label={"유저"} value={5} />
        <StatCard label={"작품"} value={5} />
        <StatCard label={"조회수"} value={5} />
        <StatCard label={"후기"} value={5} />
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
