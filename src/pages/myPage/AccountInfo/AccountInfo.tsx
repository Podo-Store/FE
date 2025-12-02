import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twJoin } from "tailwind-merge";
import { api } from "@/api/api";
import { MyPageMenu } from "@/components/myPage";
import AuthContext from "@/contexts/AuthContext";
import ic_arrow_right from "@/assets/image/myPage/account_info/ic_arrow_right.svg";
import ic_arrow_right_grey from "@/assets/image/myPage/account_info/ic_arrow_right_grey.svg";
import googleBtn from "@/assets/image/auth/googleBtn.svg";
import kakaoBtn from "@/assets/image/auth/kakaoBtn.svg";
import naverBtn from "@/assets/image/auth/naverBtn.svg";

import "../MyPageContentsDefault.scss";
import "./AccountInfoChange.css";

const AccountInfo = () => {
  const { userNickname, logout } = useContext(AuthContext);

  const [id, setId] = useState("");
  const [socialLoginType, setSocialLoginType] = useState<null | "GOOGLE" | "KAKAO" | "NAVER">(null);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState(userNickname);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getUserInfo = async () => {
        const { data } = await api.get("/profile/account");
        setId(data.userId);
        setSocialLoginType(data.socialLoginType);
        setEmail(data.email);
        setNickname(data.nickname);
      };
      getUserInfo();
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, []);

  const socialTypeIcon = () => {
    switch (socialLoginType) {
      case "GOOGLE":
        return googleBtn;
      case "KAKAO":
        return kakaoBtn;
      case "NAVER":
        return naverBtn;
      default:
        return null;
    }
  };

  return (
    <main className="myPage-contents-default account-info-change">
      <div className="account-info-change-wrap">
        <MyPageMenu nickname={userNickname} currentPage="2" />
        <div className="content-side flex flex-col gap-[50px]">
          <section className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[10px]">
              <h4 className="p-medium-bold sm:h4-bold">회원 정보</h4>
              <p className="p-12-bold text-grey-6">
                아이디와 이메일은 수정이 불가합니다. <br />
                문의가 있으시면 포도상점 메일로 문의해주세요.
              </p>
            </div>

            <section className="flex flex-col gap-[28px] py-[32px] px-[30px] w-full border-[2px] border-main bg-grey-1 rounded-[20px]">
              <div className="flex justify-between items-center">
                <p className="p-small-regular">아이디</p>
                {id ? (
                  <p className="p-medium-regular">{id}</p>
                ) : (
                  <p className="p-medium-regular">&nbsp;</p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="p-small-regular">이메일</p>
                {email ? (
                  <span className="flex gap-[9px]">
                    {socialLoginType && (
                      <img className="size-[20px]" src={socialTypeIcon() || ""} alt="" />
                    )}
                    <p className="p-medium-regular">{email}</p>
                  </span>
                ) : (
                  <p className="p-medium-regular">&nbsp;</p>
                )}
              </div>
            </section>
          </section>
          <section className="flex flex-col gap-[30px]">
            <h4 className="p-medium-bold sm:h4-bold">수정</h4>

            <section className="flex flex-col gap-[28px] py-[32px] px-[30px] w-full border-[2px] border-main bg-grey-1 rounded-[20px]">
              <div className="flex justify-between items-center">
                <p className="p-small-regular">닉네임</p>
                <button
                  className="flex items-center gap-[15px] cursor-pointer"
                  onClick={() => navigate("/mypage/info/nickname")}
                >
                  {nickname ? (
                    <p className="p-medium-regular">{nickname}</p>
                  ) : (
                    <p className="p-medium-regular">&nbsp;</p>
                  )}
                  <img src={ic_arrow_right} alt=">" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <p className={twJoin("p-small-regular", socialLoginType && "text-grey-4")}>
                  비밀번호 변경
                </p>
                <button
                  className={socialLoginType ? "cursor-default" : "cursor-pointer"}
                  onClick={() => navigate("/mypage/info/password")}
                >
                  <img src={socialLoginType ? ic_arrow_right_grey : ic_arrow_right} alt=">" />
                </button>
              </div>
            </section>
          </section>

          <section className="flex justify-center items-center gap-[19px] mt-[150px]">
            <button
              className="p-small-regular cursor-pointer"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              로그아웃
            </button>
            <div className="w-[1.5px] h-[20px] bg-grey-4" />
            <button
              className="p-small-regular cursor-pointer"
              onClick={() => navigate("/mypage/delete")}
            >
              계정 삭제
            </button>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AccountInfo;
