import { ShowCard } from "@/types/show";

const PerformedCard = ({ data }: { data: ShowCard }) => {
  return (
    <div
      className={`flex flex-col w-full sm:w-[195px] ${
        data.link ? "cursor-pointer" : ""
      }`}
      onClick={() => {
        if (data.link) {
          window.open(data.link, "_blank");
        }
      }}
    >
      <div className="relative w-full overflow-hidden rounded-[20px] bg-neutral-200 aspect-[120/160] sm:aspect-[195/260]">
        {/* 이미지 */}
        <img
          src={data.image}
          alt={data.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* 텍스트 */}
      <div className="mt-[8px] leading-tight">
        <p className="sm:p-large-bold p-small-bold line-clamp-2 text-ellipsis whitespace-nowrap">
          {data.title}
        </p>
        <p className="sm:p-medium-bold p-12-bold line-clamp-1 text-ellipsis whitespace-nowrap">
          {data.author}
        </p>
        <p className="sm:p-medium-regular p-xs-regular line-clamp-1 mt-[10px] text-ellipsis whitespace-nowrap">
          {data.troupe}
        </p>
        <p className="sm:p-medium-regular p-xs-regular">{data.period}</p>
      </div>
    </div>
  );
};

export default PerformedCard;
