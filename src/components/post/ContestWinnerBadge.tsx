import clsx from "clsx";
import contestWinnerBadge from "@/assets/image/post/list/contestWinnerBadge.svg";

const contestWinnerIds = new Set([
  "8160b27e-27c4-4e2b-b8f6-276f07777e8a", // 내 삶은 이곳으로
  "9fe41c1e-e0b8-4630-bd3d-523de35c1725", // 영웅은 죽어야만 한다
  "f7ac34ef-5d4a-42d0-a409-61be86b5b8e8", // 코넬리우스
]);

interface Props {
  scriptId?: string;
  variant?: "card" | "detail";
}

export const ContestWinnerBadge = ({ scriptId, variant = "card" }: Props) => {
  if (!scriptId || !contestWinnerIds.has(scriptId)) return null;

  return (
    <span
      className={clsx(
        "pointer-events-none absolute left-[10px] top-[10px] z-10 flex h-[22px] w-[67px] items-center justify-center whitespace-nowrap p-xs-medium text-[var(--purple4)]",
        variant === "detail" &&
          "md:left-[16px] md:top-[16px] md:h-[33px] md:w-[100px] md:text-[14px] md:leading-[20px]"
      )}
    >
      <img
        src={contestWinnerBadge}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
      <span className="relative">공모전 당선작</span>
    </span>
  );
};
