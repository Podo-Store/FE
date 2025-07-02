import page1 from "../assets/image/landing/page1.svg";

const MobileError = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-[100vh]">
      <h3 className="h3-bold mt-[100px] text-[#6A39C0] text-center">
        모바일 접속 안내
      </h3>
      <p className="p-large-bold mt-[23px] text-center text-[#777]">
        보다 나은 서비스를 위해 <br />
        모바일 환경 개선 작업 중입니다. <br />
        PC 환경에서 접속해주시면 <br />
        원활한 이용이 가능합니다. <br />
        이용에 불편을 드려 죄송합니다.
      </p>
      <img src={page1} alt="" className="mt-[29px] w-[313px]" />
    </div>
  );
};

export default MobileError;
