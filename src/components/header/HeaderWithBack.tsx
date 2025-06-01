import React from "react";
import GoBack from "@/components/button/GoBack";

interface Props {
  backUrl: string;
  headerTitle: string;
  headerFont: string;
  subtitle?: string;
  subFont?: string;
  className?: string;
}

const HeaderWithBack = ({
  backUrl,
  headerTitle,
  headerFont,
  subtitle,
  subFont,
  className,
}: Props) => {
  return (
    <div className={`flex flex-col gap-[14px] ${className}`}>
      <GoBack url={backUrl} />
      <div>
        <h1 className={headerFont}>{headerTitle}</h1>
        {subtitle ? <span className={subFont}>{subtitle}</span> : <></>}
      </div>
    </div>
  );
};

export default HeaderWithBack;
