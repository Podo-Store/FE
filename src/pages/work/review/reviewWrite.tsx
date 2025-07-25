import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  postReview,
  postReviewProops,
  getProfile,
  patchReview,
  deleteReview,
  patchReviewProps,
} from "@/api/user/review/reviewWriteApi";

import GoBack from "@/components/button/GoBack";
import SmallOnOffBtn from "@/components/button/RoundBtn_135_40";
import defaultThumbnail from "@/assets/image/defaultThumbnail.svg";
import { toastAlert } from "@/utils/ToastAlert";
import "./reviewWrite.scss";
import Loading from "@/pages/Loading";

const reviewWrite = () => {
  const { id } = useParams<string>();
  const [reviewId, setReviewId] = useState("");
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [text, setText] = useState<string>("");
  const [selectedStar, setSelectedStar] = useState(0);
  const [reason, setReason] = useState<Record<string, boolean>>({
    CHARACTER: false, // "캐릭터가 매력적이에요"
    RELATION: false, // "관계성이 탄탄해요"
    STORY: false, // "스토리가 좋아요"
  });
  const [mode, setMode] = useState<"edit" | "create">("create");
  const [originalReview, setOriginalReview] = useState({
    rating: 0,
    standardType: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const hasSelectedReason = Object.values(reason).some((value) => value);
  const navigate = useNavigate();

  // 리뷰 내용 가져오기
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const getInfo = await getProfile(id ?? "");

        if (getInfo.id) {
          setMode("edit");
        }
        setOriginalReview({
          rating: getInfo.rating ?? 0,
          standardType: getInfo.standardType ?? "",
          content: getInfo.content ?? "",
        });
        setTitle(getInfo.title);
        setWriter(getInfo.writer);
        setReviewId(getInfo.id);
        setThumbnail(getInfo.imagePath);
        if (getInfo.content) {
          setText(getInfo.content);
        }

        if (getInfo.standardType) {
          setReason({
            CHARACTER: getInfo.standardType === "CHARACTER",
            RELATION: getInfo.standardType === "RELATION",
            STORY: getInfo.standardType === "STORY",
          });
        }

        // 선택된 별점도 있으면 적용
        if (getInfo.rating) {
          setSelectedStar(getInfo.rating);
        }
      } catch (error) {
        console.error();
        throw new Error(`작품 정보 가져오기 실패: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [id]);

  // 이유
  const handleSelectReason = (key: string) => {
    setReason({
      CHARACTER: false,
      RELATION: false,
      STORY: false,
      [key]: true, // 선택한 것만 true
    });
  };

  // 내용
  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  // 수정하기
  const handleSubmit = async () => {
    const selectedStandardType =
      Object.keys(reason).find((key) => reason[key]) ?? "";

    const reviewData: postReviewProops = {
      productId: id ?? "",
      rating: selectedStar,
      standardType: selectedStandardType,
      content: text,
    };
    const patchData: patchReviewProps = {
      reviewId: reviewId ?? "",
      ...(selectedStar !== originalReview.rating && { rating: selectedStar }),
      ...(selectedStandardType !== originalReview.standardType && {
        standardType: selectedStandardType,
      }),
      ...(text !== originalReview.content && { content: text }),
    };

    try {
      const success =
        mode === "edit"
          ? await patchReview(patchData) // 수정
          : await postReview(reviewData); // 작성

      if (success) {
        toastAlert(
          mode === "edit" ? "리뷰를 수정했어요." : "리뷰를 작성했어요.",
          "success"
        );
        setTimeout(() => {
          navigate(-1);
        }, 500);
      }
    } catch (error) {
      toastAlert("리뷰 등록 중 오류가 발생하였습니다.", "error");
    }
  };

  // 삭제하기
  const handleDelete = async () => {
    try {
      const success = await deleteReview(reviewId);

      if (success) {
        toastAlert("리뷰를 삭제했어요.", "success");
        setTimeout(() => {
          navigate(-1);
        }, 500);
      }
    } catch (error) {
      toastAlert("리뷰 삭제 중 오류가 발생하였습니다.", "error");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto review-write-div pb-[92px] ">
      {/* 배너 */}
      <div className="mt-[37px]  flex  flex-col  gap-[14px]">
        <GoBack url="-1" />
        <div className="flex flex-col gap-[75px] border-b-1 border-[#B489FF] ">
          <h1 className="h4-bold">후기를 작성해 주세요!</h1>
          <span></span>
        </div>
      </div>

      {/* top contents*/}
      <div className="mx-auto content mt-[35px]">
        <div className="flex flex-col gap-[35px] ">
          <div className="flex flex-row gap-[34px]">
            {/* 작품 내용 */}
            <div className={`flex flex-col gap-[7px]`}>
              <img
                src={thumbnail ? thumbnail : defaultThumbnail}
                className="border border-[var(--grey3)]  box-border w-[197px] h-[197px] rounded-[20px]  object-cover"
              />
              <div className="flex flex-col gap-[3px]">
                <span className="w-full truncate p-large-bold">{title}</span>
                <span className="w-full truncate p-medium-bold">{writer}</span>
              </div>
            </div>

            <div className="flex flex-col w-full gap-[47px] pt-[20px] ">
              {/*  평점 */}
              <div>
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

              {/* 장점*/}
              <div>
                <span className=" p-large-bold  mb-[10px]">작품의 장점</span>
                <span className="flex flex-wrap whitespace-nowrap reason">
                  <button
                    className={`cursor-pointer py-[8px] bg-[var(--grey3)]  w-[180px] rounded-[30px] hover:text-[var(--white)] hover:bg-[var(--purple5)] ${
                      reason["CHARACTER"]
                        ? "bg-[var(--purple5)] text-[var(--white)]"
                        : ""
                    }`}
                    onClick={() => handleSelectReason("CHARACTER")}
                  >
                    <p className="p-medium-bold"> 캐릭터가 매력적이에요</p>
                  </button>
                  <button
                    className={`cursor-pointer py-[8px] bg-[var(--grey3)]  w-[180px] rounded-[30px] hover:text-[var(--white)] hover:bg-[var(--purple5)] ${
                      reason["RELATION"]
                        ? "bg-[var(--purple5)] text-[var(--white)]"
                        : ""
                    }`}
                    onClick={() => handleSelectReason("RELATION")}
                  >
                    <p className="p-medium-bold"> 관계성이 탄탄해요</p>
                  </button>
                  <button
                    className={`cursor-pointer py-[8px] bg-[var(--grey3)]  w-[180px] rounded-[30px] hover:text-[var(--white)] hover:bg-[var(--purple5)] ${
                      reason["STORY"]
                        ? "bg-[var(--purple5)] text-[var(--white)]"
                        : ""
                    }`}
                    onClick={() => handleSelectReason("STORY")}
                  >
                    <p className="p-medium-bold"> 스토리가 좋아요</p>
                  </button>

                  {/* {Object.entries(reason).map(([label, selected]) => (
                    <button
                      key={label}
                      onClick={() =>
                        setReason((prev) => ({
                          ...prev,
                          [label]: !prev[label],
                        }))
                      }
                      className={`cursor-pointer hover:text-[var(--purple5)] p-medium-medium ${
                        selected ? "text-[var(--purple5)] " : ""
                      }`}
                    >
                      {label}
                    </button>
                  ))} */}
                </span>
              </div>
            </div>
          </div>

          {/* bottom contents */}
          <div className="flex flex-col">
            {/* 내용 작성 */}
            <span className="p-large-bold mb-[10px]"> 내용 작성</span>
            <div className="flex flex-col border-[0.5px] rounded-[5px] h-[250px] ">
              <textarea
                className=" p-medeim-regular h-[203px] p-[20px] border-none box-border resize-none  rounded-[5px] focus:outline-none focus:ring-0 "
                onChange={handleChange}
                value={text}
              ></textarea>
              <span className="h-[47px] bg-[var(--purple10)] w-full flex flex-row justify-between  rounded-b-[5px] ">
                <p className="flex my-auto ml-[20px] w-fit p-medium-regular">
                  EX) 내용이 재밌었어요!
                </p>
                <span className="my-auto mr-[13px]">
                  {text.length} / 50자 이상
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 유의사항 */}
        <ul className="text-[var(--grey5)] p-small-bold  p-[0] m-[0] list-none  mt-[30px]">
          <li>• 후기 작성 시 유의사항</li>
          <li className="list-none">
            - 비속어 및 부적절한 내용은 별도의 고지 없이 삭제됩니다.
          </li>
        </ul>

        {/* 버튼 */}
        <div className="flex flex-row gap-[15px] justify-end mt-[80px]">
          <SmallOnOffBtn color="white" onClick={() => navigate(-1)}>
            취소하기
          </SmallOnOffBtn>
          <SmallOnOffBtn
            color="purple"
            disabled={
              text.length < 50 || selectedStar < 1 || !hasSelectedReason
            }
            onClick={() => {
              handleSubmit();
            }}
          >
            {mode === "edit" ? "수정하기" : "작성하기"}
          </SmallOnOffBtn>
        </div>
        {mode === "edit" ? (
          <span
            className="flex justify-end p-small-under mt-[80px] cursor-pointer"
            onClick={() => {
              handleDelete();
            }}
          >
            후기 삭제
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default reviewWrite;
