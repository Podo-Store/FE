import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import DefaultInputField from "@/components/inputField/DefaultInputField";
import GoBack from "@/components/button/GoBack";
import DefaultThumbnail from "@/components/thumbnail/DefaultThumbNail";
import RoundButton_135x40 from "@/components/button/RoundButton_135x40";
import defaultThumbnail from "@/assets/image/defaultThumbnail.png";
import { useRegisterPerformance } from "@/feature/performanceNews/performanceRegister/queries";
import { usePerformanceDetail } from "@/feature/performanceNews/performanceDetail/queries";
import { useUpdatePerformanceNews } from "@/feature/performanceNews/performanceEdit/queries";

const AddPerformanceNews = ({ mode }: { mode: "create" | "edit" }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [origin, setOrigin] = useState<{
    title: string;
    place: string;
    startDate: string;
    endDate: string;
    link: string;
    isUsed: boolean;
    posterPath: string;
  } | null>(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [link, setLink] = useState("");
  const [podoScriptOn, setPodoScriptOn] = useState(false);
  const [posterPreview, setPosterPreview] = useState<string>("");

  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const updateMutation = useUpdatePerformanceNews(id ?? "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const posterPreviewUrl = useMemo(() => {
    if (posterFile) return URL.createObjectURL(posterFile);
    return posterPreview; // 기존 이미지
  }, [posterFile, posterPreview]);
  const { mutateAsync, isPending } = useRegisterPerformance();
  const {
    data: detailData,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = usePerformanceDetail(id ?? "", true);

  useEffect(() => {
    if (mode !== "edit" || !detailData) return;

    setTitle(detailData.title);
    setPlace(detailData.place);
    setStartDate(detailData.startDate);
    setEndDate(detailData.endDate);
    setLink(detailData.link);
    setPodoScriptOn(detailData.isUsed);
    setPosterPreview(detailData.posterPath);

    setOrigin({
      title: detailData.title,
      place: detailData.place,
      startDate: detailData.startDate,
      endDate: detailData.endDate,
      link: detailData.link,
      isUsed: detailData.isUsed,
      posterPath: detailData.posterPath,
    });
  }, [mode, detailData]);

  const isValidDate = (date: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

    const [y, m, d] = date.split("-").map(Number);
    const parsed = new Date(y, m - 1, d);

    return parsed.getFullYear() === y && parsed.getMonth() === m - 1 && parsed.getDate() === d;
  };

  const isRangeInvalid = isValidDate(startDate) && isValidDate(endDate) && startDate > endDate;

  const isInvalid =
    title.trim() === "" ||
    place.trim() === "" ||
    !isValidDate(startDate) ||
    !isValidDate(endDate) ||
    isRangeInvalid ||
    link.trim() === "";

  const isSubmitDisabled =
    isInvalid || isPending || (mode === "edit" && (!id || !origin || updateMutation.isPending));

  const getDefaultPosterFile = async (): Promise<File> => {
    const response = await fetch(defaultThumbnail);
    const blob = await response.blob();

    return new File([blob], "default-thumbnail.svg", {
      type: blob.type,
    });
  };

  const onClickSubmit = async () => {
    setErrorMessage("");

    try {
      if (mode === "create") {
        const poster = posterFile ?? (await getDefaultPosterFile());
        const ok = await mutateAsync({
          poster,
          title,
          place,
          startDate,
          endDate,
          link,
          isUsed: podoScriptOn,
        });

        if (ok) navigate("/performanceNews");
        else setErrorMessage("등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      // ---- edit ----
      if (!id) {
        setErrorMessage("공연 소식 id가 없습니다.");
        return;
      }
      if (!origin) {
        setErrorMessage("기존 데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      const payload: any = {};

      // 바뀐 값만 넣기
      if (title !== origin.title) payload.title = title;
      if (place !== origin.place) payload.place = place;
      if (startDate !== origin.startDate) payload.startDate = startDate;
      if (endDate !== origin.endDate) payload.endDate = endDate;
      if (link !== origin.link) payload.link = link;
      if (podoScriptOn !== origin.isUsed) payload.isUsed = podoScriptOn;

      // 포스터는 선택했을 때만
      if (posterFile) payload.poster = posterFile;

      // 아무것도 안 바꿨으면 그냥 돌아가거나 메시지
      if (Object.keys(payload).length === 0) {
        navigate("/performanceNews");
        return;
      }

      const ok = await updateMutation.mutateAsync(payload);

      if (ok) navigate("/performanceNews");
      else setErrorMessage("수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } catch (e: any) {
      const msg = e?.response?.data?.error || e?.message || "처리 중 오류가 발생했습니다.";
      setErrorMessage(msg);
    }
  };

  const formatDateInput = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 8);

    const year = numbersOnly.slice(0, 4);
    const month = numbersOnly.slice(4, 6);
    const day = numbersOnly.slice(6, 8);

    if (numbersOnly.length <= 4) return year;
    if (numbersOnly.length <= 6) return `${year}-${month}`;
    return `${year}-${month}-${day}`;
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(formatDateInput(value));
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(formatDateInput(value));
  };

  return (
    <div className="list-wrap-wrap px-[20px] sm:px-0">
      <div className="pt-[73px] ">
        <header className="flex-col border-b-1 border-[#B489FF] ">
          <GoBack url="/performanceNews" />

          <div className="flex flex-col mt-[14px] mb-[8px] sm:mb-[5px] gap-[34px] sm:gap-[46px]">
            <p className="sm:h4-bold p-medium-bold">공연 소식</p>
            <p id="p-xs-regular sm:p-medium-regular">
              {mode === "edit" ? "공연 소식 수정하기" : "공연 소식 등록하기"}
            </p>
          </div>
        </header>

        <main className="flex flex-col gap-[50px] md:gap-[40px] md:flex-row mt-[25px] sm:mt-[50px] md:mt-[90px] md:px-[19px] md:w-[668px] md:mx-auto ">
          <div className="flex justify-center w-full h-full md:flex-1">
            <DefaultThumbnail
              className="w-[210px] h-[280px] sm:w-[305px] sm:h-[407px]"
              imagePath={posterPreviewUrl}
            >
              <p
                className="p-xs-under c-pointer mb-[7.106%] mr-[10.66%]"
                onClick={() => fileInputRef.current?.click()}
              >
                포스터 수정하기
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setPosterFile(file);
                }}
              />
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
                placeholder="공연 시작일을 입력하세요. (YYYYMMDD)"
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                inputMode="numeric"
                pattern="\d*"
                maxLength={10}
                autoComplete="off"
                className="p-xs-regular"
              />
              <DefaultInputField
                type="text"
                placeholder="공연 종료일을 입력하세요. (YYYYMMDD)"
                inputMode="numeric"
                pattern="\d*"
                maxLength={10}
                autoComplete="off"
                value={endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
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
                            ${podoScriptOn ? "bg-[var(--purple4)]" : "bg-[#AEB3B7]"}
                            focus:outline-none 
                        `}
              >
                <span
                  className={`
                            inline-block h-5 w-5 transform rounded-full bg-white transition
                            ${podoScriptOn ? "translate-x-[26px]" : "translate-x-[2px]"}
                            `}
                />
              </button>
            </section>

            <button className="flex gap-[10px] sm:gap-[15px] justify-center mt-[150px] sm:mt-[120px] md:mt-[235px]">
              <RoundButton_135x40 color="white" onClick={() => navigate("/performanceNews")}>
                취소하기
              </RoundButton_135x40>
              <RoundButton_135x40
                color="purple"
                disabled={isSubmitDisabled}
                onClick={onClickSubmit}
              >
                {mode === "edit" ? "수정하기" : "등록하기"}
              </RoundButton_135x40>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddPerformanceNews;
