import BannerImage from "@/assets/image/company/company_info_banner.png";
import DownArrow from "@/assets/image/company/ic_down_arrow.svg?react";
const CompanyProfile = () => {
  return (
    <div>
      <div className="relative w-full h-screen max-h-[552px] sm:max-h-[830px] md:max-h-[1080px] border">
        <img
          src={BannerImage}
          alt="Banner"
          className="w-full h-full max-h-[552px] sm:max-h-[830px] md:max-h-[1080px] object-cover "
        />
        <span className="absolute top-[71.6%] left-[50%] translate-x-[-50%] text-white text-center ">
          <p className="p-medium-bold sm:h4-bold md:company-title-medium lg:company-title-large whitespace-nowrap">
            스토리를 세상과 연결하는 플랫폼을
          </p>
          <p className="p-medium-bold sm:h4-bold md:company-title-medium lg:company-title-large whitespace-nowrap">
            만들고 있습니다.
          </p>
        </span>
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2">
          <DownArrow className="w-[40px] h-[13px] animate-float " />
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
