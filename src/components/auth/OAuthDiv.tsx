import { api } from "@/api/api";
import googleBtn from "@/assets/image/auth/googleBtn.svg";
import kakaoBtn from "@/assets/image/auth/kakaoBtn.svg";
import naverBtn from "@/assets/image/auth/naverBtn.svg";
import { useLocation } from "react-router-dom";

interface OAuthDivProps {
  setIsLoading: (isLoading: boolean) => void;
}

const OAuthDiv = ({ setIsLoading }: OAuthDivProps) => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // 이전 페이지로 이동

  const handleSocialLogin = async (type: "google" | "kakao" | "naver") => {
    try {
      setIsLoading(true);
      localStorage.setItem("auth_from", from);

      const { data } = await api.get(`/auth/${type}`);
      let redirectUrl =
        typeof data === "string"
          ? data
          : data?.redirectURL || data?.redirectUrl || data?.url;
      if (redirectUrl) {
        try {
          const cleaned = encodeURI(
            String(redirectUrl).replace(/&amp;/g, "&").trim()
          );
          window.location.assign(cleaned);
        } catch {
          window.location.href = String(redirectUrl);
        }
      } else {
        alert("리디렉션 URL을 받지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (e) {
      alert("소셜 로그인 시작에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center gap-[22.5px] sm:gap-[30px] mt-[25px] sm:mt-[30px]">
      <button
        type="button"
        className="size-[45px] sm:size-[60px] cursor-pointer"
        onClick={() => handleSocialLogin("naver")}
      >
        <img src={naverBtn} alt="naver" />
      </button>
      <button
        type="button"
        className="size-[45px] sm:size-[60px] cursor-pointer"
        onClick={() => handleSocialLogin("kakao")}
      >
        <img src={kakaoBtn} alt="kakao" />
      </button>
      <button
        type="button"
        className="size-[45px] sm:size-[60px] cursor-pointer"
        onClick={() => handleSocialLogin("google")}
      >
        <img src={googleBtn} alt="google" />
      </button>
    </div>
  );
};

export default OAuthDiv;
