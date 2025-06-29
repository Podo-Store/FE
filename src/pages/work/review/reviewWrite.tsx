import { useState, useRef, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import HeaderWithBack from "@/components/header/HeaderWithBack";
import GoBack from "@/components/button/GoBack";
import defaultImg from "@/assets/image/post/list/defaultProfile.png";
import SmallOnOffBtn from "@/components/button/RoundBtn_135_40";
import "./reviewWrite.scss";
const reviewWrite = () => {
  const { id } = useParams<string>();
  const [text, setText] = useState("");
  const [selectedStar, setSelectedStar] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  return (
    <div className="mx-auto all pb-[92px]">
      <div className="mt-[37px]  flex  flex-col  gap-[14px]">
        <GoBack url="/mypage/scriptmanage" />

        <div className="flex flex-col gap-[75px] border-b-1 border-[#B489FF] ">
          <h1 className="h4-bold">후기를 작성해 주세요!</h1>
          <span></span>
        </div>
      </div>

      <div className="mx-auto content mt-[35px]">
        <div className="  flex flex-col gap-[35px]">
          <div className="flex flex-row gap-[34px]">
            <div className={`flex flex-col  content-img gap-[7px] `}>
              <img
                src={defaultImg}
                className="border border-[var(--grey3)] rounded-[20px]"
              ></img>
              <div className="flex flex-col gap-[3px]">
                <span className="w-full truncate p-large-bold">
                  제목제목제목제목제목제목제목제목
                </span>
                <span className="w-full truncate p-medium-bold">
                  작가작가작가작가작가작가자가자가작
                </span>
              </div>
            </div>

            <div className="flex flex-col w-full gap-[47px]">
              <div>
                {/* 작품의 평점 */}
                <span className="p-large-bold mb-[11px]">작품의 평점</span>
                <div className="flex flex-row gap-[15px]">
                  <div className="flex flex-row gap-[2px]">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          if (selectedStar === i + 1) {
                            setSelectedStar(i);
                          } else {
                            setSelectedStar(i + 1);
                          }
                        }}
                        className="cursor-pointer"
                      >
                        {i >= selectedStar ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                          >
                            <path
                              d="M22.1694 8.6211L15.9707 7.72022L13.1997 2.10255C13.124 1.94874 12.9995 1.82423 12.8457 1.74854C12.4599 1.55811 11.9912 1.71681 11.7983 2.10255L9.02731 7.72022L2.82858 8.6211C2.65768 8.64552 2.50143 8.72608 2.3818 8.84815C2.23717 8.9968 2.15748 9.19679 2.16022 9.40416C2.16297 9.61154 2.24794 9.80935 2.39645 9.95411L6.88131 14.3267L5.82174 20.501C5.79689 20.6446 5.81279 20.7923 5.86762 20.9274C5.92245 21.0624 6.01403 21.1794 6.13196 21.2651C6.2499 21.3507 6.38948 21.4016 6.53487 21.412C6.68027 21.4224 6.82565 21.3918 6.95455 21.3237L12.499 18.4087L18.0434 21.3237C18.1948 21.4043 18.3706 21.4312 18.539 21.4019C18.9638 21.3286 19.2495 20.9258 19.1762 20.501L18.1167 14.3267L22.6015 9.95411C22.7236 9.83448 22.8042 9.67823 22.8286 9.50733C22.8945 9.08009 22.5966 8.68458 22.1694 8.6211ZM16.2295 13.7114L17.1108 18.8457L12.499 16.4238L7.88717 18.8482L8.76852 13.7139L5.03805 10.0762L10.1943 9.32667L12.499 4.65626L14.8037 9.32667L19.9599 10.0762L16.2295 13.7114Z"
                              fill="#BABABA"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                          >
                            <path
                              d="M22.1694 8.6211L15.9707 7.72022L13.1997 2.10255C13.124 1.94874 12.9995 1.82423 12.8457 1.74854C12.4599 1.55811 11.9912 1.71681 11.7983 2.10255L9.02731 7.72022L2.82858 8.6211C2.65768 8.64552 2.50143 8.72608 2.3818 8.84815C2.23717 8.9968 2.15748 9.19679 2.16022 9.40416C2.16297 9.61154 2.24794 9.80935 2.39645 9.95411L6.88131 14.3267L5.82174 20.501C5.79689 20.6446 5.81279 20.7923 5.86762 20.9274C5.92245 21.0624 6.01403 21.1794 6.13196 21.2651C6.2499 21.3507 6.38948 21.4016 6.53487 21.412C6.68027 21.4224 6.82565 21.3918 6.95455 21.3237L12.499 18.4087L18.0434 21.3237C18.1948 21.4043 18.3706 21.4312 18.539 21.4019C18.9638 21.3286 19.2495 20.9258 19.1762 20.501L18.1167 14.3267L22.6015 9.95411C22.7236 9.83448 22.8042 9.67823 22.8286 9.50733C22.8945 9.08009 22.5966 8.68458 22.1694 8.6211Z"
                              fill="#6A39C0"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="flex flex-row gap-[9px]">
                    <p className="p-large-bold">{selectedStar}</p>
                    <p className="p-medium-regular">/ 5</p>
                  </span>
                </div>
              </div>

              {/* 이 작품은 특히*/}
              <div>
                <span className=" p-large-bold  mb-[10px]">
                  이 작품은 특히...
                </span>
                <span className="flex flex-row list-none p-medium-medium gap-[20px] whitespace-nowrap">
                  <li>캐릭터가 매력적이에요</li>
                  <li>관계성이 탄탄해요</li>
                  <li>스토리가 좋아요</li>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="p-large-bold mb-[10px]"> 내용 작성</span>
            <div className="flex flex-col border-[0.5px] rounded-[5px] h-[250px] ">
              <textarea
                className=" p-medeim-regular h-[203px] p-[20px] border-none box-border resize-none  rounded-[5px] focus:outline-none focus:ring-0 "
                onChange={handleChange}
              ></textarea>
              <span className="h-[47px] bg-[var(--purple10)] w-full flex flex-row justify-between  rounded-[5px] ">
                <p className="flex my-auto ml-[20px] w-fit p-medium-regular">
                  EX) 내용이 재밌었요!
                </p>
                <span className="my-auto mr-[13px]">
                  {text.length} / 50자 이상
                </span>
              </span>
            </div>
          </div>
        </div>

        <ul className="text-[var(--grey5)] p-small-bold  p-[0] m-[0] list-none  mt-[30px]">
          <li>• 후기 작성 시 유의사항</li>
          <li className="list-none">
            - 비속어 및 부적절한 내용은 별도의 고지 없이 삭제됩니다.
          </li>
        </ul>

        <div className="flex flex-row gap-[15px] justify-end mt-[80px]">
          <SmallOnOffBtn
            color="white"
            onClick={() => navigate("/mypage/scriptmanage")}
          >
            취소하기
          </SmallOnOffBtn>
          <SmallOnOffBtn
            color="purple"
            disabled={text.length < 50}
            onClick={() => navigate("/mypage/scriptmanage")}
          >
            작성하기
          </SmallOnOffBtn>
        </div>

        <span className="flex justify-end p-small-under mt-[80px]">
          후기 삭제
        </span>
      </div>
    </div>
  );
};

export default reviewWrite;
