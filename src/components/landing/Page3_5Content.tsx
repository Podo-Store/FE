import { MOCK_SHOWS } from "@/constants/ShowCard";

const Page3_5Content = () => {
  return MOCK_SHOWS.map((show) => (
    <div
      key={show.id}
      className="w-[120px] sm:w-[195px] md:w-[260px] lg:w-[286px]"
    >
      <div
        className="h-[160px] sm:h-[260px] md:h-[347px] lg:h-[389px] rounded-[20px] bg-[#D9D9D9] bg-cover bg-center"
        style={{ backgroundImage: `url(${show.image})` }}
      ></div>

      <div className="flex flex-col gap-[8px] sm:gap-[10px] md:gap-[15px] mt-[8px] w-full">
        <div className="flex flex-col gap-[3px] sm:gap-[5px] w-full">
          <h4 className="p-small-bold sm:p-large-bold md:h4-bold truncate">
            {show.title}
          </h4>
          <h5 className="p-12-bold sm:p-medium-bold md:h5-bold truncate">
            {show.author}
          </h5>
        </div>

        <div className="flex flex-col gap-[3px] sm:gap-[5px] w-full">
          <h5 className="p-xs-regular sm:p-medium-regular md:h5-regular truncate">
            {show.troupe}
          </h5>
          <h5 className="p-xs-regular sm:p-medium-regular md:h5-regular truncate">
            {show.period}
          </h5>
        </div>
      </div>
    </div>
  ));
};

export default Page3_5Content;
