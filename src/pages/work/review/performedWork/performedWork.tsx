import InfiniteBanner from "@/components/banner/InfiniteBanner.js";
import PerformedCard from "@/components/performed/PerformedCard";
import BannerImage1 from "@/assets/image/listBanner.jpg";
import BannerImage2 from "@/assets/image/postList_banner.png";
import { ShowCard } from "@/types/show";

import { useMemo } from "react";
import { MOCK_SHOWS } from "@/constants/ShowCard";

const PerformedWork = () => {
  const gridClass = useMemo(
    () => "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4",
    []
  );
  return (
    <div className="flex flex-col m-auto list-wrap-wrap py-[72px] px-[30px] sm:px-[0px]">
      <p className="sm:h5-bold p-medium-bold mb-[30px]">공연된 작품</p>
      <InfiniteBanner />
      <div className="mt-[0px] md:mt-[60px] lg:mt-[100px]">
        <div className={gridClass}>
          {MOCK_SHOWS.map((show) => (
            <PerformedCard key={show.id} data={show} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformedWork;
