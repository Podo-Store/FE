import clsx from "clsx";

interface PreviewNoticeProps extends React.HTMLAttributes<HTMLDivElement> {
  totalPages: number;
  showThreshold: number;
}

const PreviewNotice = ({
  totalPages,
  showThreshold,
  className,
  ...props
}: PreviewNoticeProps) => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center px-[20px] w-[168px] h-[46px] rounded-[20px] bg-[#FBFBFB] shadow-[0_0_20px_0_rgba(0,0,0,0.25)] box-border",
        className
      )}
      {...props}
    >
      <p className="p-xs-bold text-center">
        전체 {totalPages} 페이지 중 {showThreshold} 페이지까지만 미리보기로 볼
        수 있어요.
      </p>
    </div>
  );
};

export default PreviewNotice;
