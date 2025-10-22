import { MOCK_SHOWS } from "@/constants/ShowCard";

const Page3_5Content = () => {
  return MOCK_SHOWS.map((show) => (
    <div key={show.id}>
      <div
        className="w-[286px] h-[389px] rounded-[20px] bg-[#D9D9D9] bg-cover bg-center"
        style={{ backgroundImage: `url(${show.image})` }}
      ></div>
      <div className="flex flex-col gap-[15px]">
        <div className="flex flex-col gap-[5px] mt-[5px]">
          <h4 className="h4-bold">{show.title}</h4>
          <h5 className="h5-bold">{show.author}</h5>
        </div>
        <div className="flex flex-col gap-[5px]">
          <h5 className="h5-regular">{show.troupe}</h5>
          <h5 className="h5-regular">{show.period}</h5>
        </div>
      </div>
    </div>
  ));
};

export default Page3_5Content;
