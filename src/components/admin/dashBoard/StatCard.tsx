interface StatCardProps {
  label: string; // 항목명 (유저, 작품 등)
  value: number | string; // 표시할 값
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className=" flex justify-between px-[30px] py-[23px] bg-[var(--grey4)]/20 rounded-[10px] h2-bold  w-[413px] h-[85px]">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default StatCard;
