import BannerImage from "@/assets/image/company/company_info_banner.png";

const CompanyProfile = () => {
  return (
    <div>
      <img
        src={BannerImage}
        alt="Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default CompanyProfile;
