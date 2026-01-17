import {useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DefaultInputField from "@/components/inputField/DefaultInputField";
import GoBack from "@/components/button/GoBack";
import DefaultThumbnail from "@/components/thumbnail/DefaultThumbNail";
import RoundButton_135x40 from "@/components/button/RoundButton_135x40";

const AddPerformanceNews = () => {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [link, setLink] = useState("");
  const [podoScriptOn, setPodoScriptOn] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="list-wrap-wrap px-[20px] sm:px-0">
      <div className="pt-[73px] ">
        <header className="flex-col border-b-1 border-[#B489FF] ">
          <GoBack url="/performanceNews" />

          <div className="flex flex-col mt-[14px] mb-[8px] sm:mb-[5px] gap-[34px] sm:gap-[46px]">
            <p className="p-medium-bold">공연 소식</p>
            <p id="p-medium-regular">공연 소식 등록하기</p>
          </div>
        </header>

        <main className="flex flex-col gap-[50px] md:gap-[40px] md:flex-row mt-[25px] sm:mt-[50px] md:mt-[90px] md:px-[19px] md:w-[668px] md:mx-auto ">
          <div className="w-full h-full flex md:flex-1 justify-center">
            <DefaultThumbnail className="w-[210px] h-[280px] sm:w-[305px] sm:h-[407px]">
              <p className="p-xs-under c-pointer mb-[7.106%] mr-[10.66%]">
                포스터 수정하기
              </p>
            </DefaultThumbnail>
          </div>
          <div className="flex flex-col gap-[30px] md:flex-1">
            <section className="flex flex-col gap-[10px]">
              <h2 className="p-medium-bold">공연 제목</h2>
              <DefaultInputField
                type="text"
                placeholder="공연 제목을 입력하세요."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="p-xs-regular"
              />
            </section>
            <section className="flex flex-col gap-[10px]">
              <h2 className="p-medium-bold">공연 장소</h2>
              <DefaultInputField
                type="text"
                placeholder="공연 장소를 입력하세요."
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
                className="p-xs-regular"
              />
            </section>
            <section className="flex flex-col gap-[10px]">
              <h2 className="p-medium-bold">공연 날짜</h2>
              <DefaultInputField
                type="text"
                placeholder="공연 시작일을 입력하세요"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                className="p-xs-regular"
              />
              <DefaultInputField
                type="text"
                placeholder="공연 종료일을 입력하세요"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                className="p-xs-regular"
              />
            </section>
            <section className="flex flex-col gap-[10px]">
              <h2 className="p-medium-bold">공연 정보 바로가기 링크</h2>
              <DefaultInputField
                type="text"
                placeholder="공연 정보 바로가기 링크를 입력하세요"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                className="p-xs-regular"
              />
            </section>
            <section className="flex justify-between">
              <h2 className="p-medium-bold">포도상점에서 선택한 대본이에요.</h2>
              <button
                type="button"
                role="switch"
                aria-checked={podoScriptOn}
                onClick={() => setPodoScriptOn((v) => !v)}
                className={`
                            relative inline-flex h-6 w-12 items-center rounded-full transition
                            ${
                              podoScriptOn
                                ? "bg-[var(--purple4)]"
                                : "bg-[#AEB3B7]"
                            }
                            focus:outline-none 
                        `}
              >
                <span
                  className={`
                            inline-block h-5 w-5 transform rounded-full bg-white transition
                            ${
                              podoScriptOn
                                ? "translate-x-[26px]"
                                : "translate-x-[2px]"
                            }
                            `}
                />
              </button>
            </section>

            <button className="flex gap-[10px] sm:gap-[15px]  justify-center mt-[150px] sm:mt-[120px] md:mt-[235px]">
              <RoundButton_135x40
                color="white"
                onClick={() => navigate("/mypage/scriptmanage")}
              >
              취소하기
              </RoundButton_135x40>
              <RoundButton_135x40
                color="purple"
                // disabled={
                //   title === "" || scriptPrice === "" || performPrice === ""
                // }
                // onClick={onClickModifyBtn}
                onClick={() => navigate("/mypage/scriptmanage")}
              >
                등록하기
              </RoundButton_135x40>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddPerformanceNews;
