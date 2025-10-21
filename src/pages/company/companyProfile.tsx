import BannerImage from "@/assets/image/company/company_info_banner.png";
import DownArrow from "@/assets/image/company/ic_down_arrow.svg?react";
const CompanyProfile = () => {
  return (
    <div>
      {/* 배너 */}
      <div className="relative w-full h-screen max-h-[552px] sm:max-h-[830px] md:max-h-[1080px] border">
        <img
          src={BannerImage}
          alt="Banner"
          className="w-full h-full max-h-[552px] sm:max-h-[830px] md:max-h-[1080px] object-cover "
        />
        <span className="absolute top-[71.6%] left-[50%] translate-x-[-50%] text-[#F2F2F2] text-center ">
          <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
            스토리를 세상과 연결하는 플랫폼을
          </p>
          <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
            만들고 있습니다.
          </p>
        </span>
        <div className="absolute bottom-[7.4%] left-1/2 -translate-x-1/2">
          <DownArrow className="w-[40px] h-[13px] animate-float " />
        </div>
      </div>

      {/* 본문 */}
      <div className="flex bg-[#1A1004] w-full flex-col items-center gap-[200px] px-[9.4vw] 2xl:px-[320px] xl:px-[85px] md:px-[50px] sm:px-[40px]">
        <div className="flex flex-col w-full mt-[100px] gap-[50px] sm:gap-[80px] md:gap-[100px]">
          <span className="text-[#F2F2F2] ">
            <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
              이야기를 나누고 싶은 사람들이 모여
            </p>
            <p className="p-medium-bold sm:h4-bold md:company-title-medium xl:company-title-large whitespace-nowrap">
              세상에 울림을 남깁니다.
            </p>
          </span>
          {/* xl :1280px */}
          <div className="flex flex-col gap-[50px] items-center hidden xl:flex">
            <div className="flex gap-[160px]">
              <div className="text-[#F2F2F2] bg-[var(--c-Main)] w-[260px] h-[260px] rounded-full flex flex-col items-center justify-center">
                <span className="company-title-large text-[#F2F2F2]">
                  124명 +
                </span>
                <span className="h4-bold text-[#BABABA]">사용자 수</span>
              </div>
              <div className="text-[#F2F2F2] bg-[var(--c-Main)] w-[260px] h-[260px] rounded-full flex flex-col items-center justify-center">
                <span className="company-title-large text-[#F2F2F2]">
                  124명 +
                </span>
                <span className="h4-bold text-[#BABABA]">사용자 수</span>
              </div>
            </div>
            <div className="flex gap-[160px]">
              <div className="text-[#F2F2F2] bg-[var(--c-Main)] w-[260px] h-[260px] rounded-full flex flex-col items-center justify-center">
                <span className="company-title-large text-[#F2F2F2]">
                  124명 +
                </span>
                <span className="h4-bold text-[#BABABA]">사용자 수</span>
              </div>
              <div className="text-[#F2F2F2] bg-[var(--c-Main)] w-[260px] h-[260px] rounded-full flex flex-col items-center justify-center">
                <span className="company-title-large text-[#F2F2F2]">
                  124명 +
                </span>
                <span className="h4-bold text-[#BABABA]">사용자 수</span>
              </div>
              <div className="text-[#F2F2F2] bg-[var(--c-Main)] w-[260px] h-[260px] rounded-full flex flex-col items-center justify-center">
                <span className="company-title-large text-[#F2F2F2]">
                  124명 +
                </span>
                <span className="h4-bold text-[#BABABA]">사용자 수</span>
              </div>
            </div>
          </div>
          {/* sm */}
          <div className="grid grid-cols-2 gap-y-[50px] sm:gap-y-[54px] md:gap-y-[60px] xl:hidden px-[6.25vw] sm:px-[50px] md:px-[60px]">
            {/* 1 */}
            <div>
              <div className="flex flex-col">
                <span className=" p-medium-bold sm:h4-bold md:company-title-large text-[#F2F2F2]">
                  124명+
                </span>
                <span className=" p-xs-bold sm:p-medium-bold md:h4-bold text-[#BABABA]">
                  사용자 수
                </span>
              </div>
            </div>

            {/* 2 */}
            <div>
              <div className="flex flex-col">
                <span className=" p-medium-bold sm:h4-bold md:company-title-large text-[#F2F2F2]">
                  124명+
                </span>
                <span className=" p-xs-bold sm:p-medium-bold md:h4-bold text-[#BABABA]">
                  사용자 수
                </span>
              </div>
            </div>

            {/* 3 */}
            <div>
              <div className="flex flex-col">
                <span className=" p-medium-bold sm:h4-bold md:company-title-large text-[#F2F2F2]">
                  124명+
                </span>
                <span className=" p-xs-bold sm:p-medium-bold md:h4-bold text-[#BABABA]">
                  사용자 수
                </span>
              </div>
            </div>

            {/* 4 */}
            <div>
              <div className="flex flex-col">
                <span className=" p-medium-bold sm:h4-bold md:company-title-large text-[#F2F2F2]">
                  124명+
                </span>
                <span className=" p-xs-bold sm:p-medium-bold md:h4-bold text-[#BABABA]">
                  사용자 수
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-col">
                <span className=" p-medium-bold sm:h4-bold md:company-title-large text-[#F2F2F2]">
                  124명+
                </span>
                <span className=" p-xs-bold sm:p-medium-bold md:h4-bold text-[#BABABA]">
                  사용자 수
                </span>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default CompanyProfile;
