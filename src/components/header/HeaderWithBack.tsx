import React from "react";
import GoBack from "@/components/button/GoBack";

interface Props {
  backUrl: string;
  headerTitle: string;
  headerFont: string;
  subtitle?: string;
  subFont?: string;
}

const HeaderWithBack = ({ backUrl, headerTitle, headerFont }: Props) => {
  return (
    <div className="flex flex-col gap-[14px]">
      <GoBack url={backUrl} />
      <h1 className={headerFont}>{headerTitle}</h1>
    </div>
  );
};

export default HeaderWithBack;
