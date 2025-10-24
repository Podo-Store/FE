import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getWorkDetail,
  WorkDetailResponse,
  postWorkDetail,
  deleteWorkDetail,
} from "@/api/user/profile/workDetailApi";

import OverLapPartialLoading from "@/components/loading/OverLapPartialLoading";
import ThumbnailImg from "@/components/thumbnail/ThumbnailImg";
import RectInputField from "@/components/inputField/RectInputField";
import DialogPopup from "@/components/popup/DialogPopup";
import FileInputBox from "@/components/file/FileInputBox";
import SmallOnOffBtn from "@/components/button/RoundBtn_135_40";
import HeaderWithBack from "@/components/header/HeaderWithBack";
import InfoPopup from "@/components/popup/InfoPopup";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import grayCheckIcon from "@/assets/image/myPage/ic_gray_check.svg";
import puppleCheckIcon from "@/assets/image/myPage/ic_pupple_check.svg";
import stickIcon from "@/assets/image/myPage/ic_stick.svg";
import puppleLine from "@/assets/image/myPage/pupple_line.svg";
import circleInfoBtn from "@/assets/image/button/circleInfoBtn.svg";
import Cookies from "js-cookie";

import { toastAlert } from "@/utils/ToastAlert";

import "./PostMangeDetail.scss";
type WorkFormState = Partial<
  Pick<
    WorkDetailResponse,
    | "title"
    | "script"
    | "performance"
    | "scriptPrice"
    | "performancePrice"
    | "plot"
    | "any"
    | "male"
    | "female"
    | "stageComment"
    | "runningTime"
    | "scene"
    | "act"
    | "buyStatus"
    | "playType"
    | "imagePath"
    | "descriptionPath"
    | "intention"
  >
>;

const PostManageDetail: React.FC = () => {
  const { scriptId } = useParams();
  const accessToken = Cookies.get("accessToken");
  const {
    widthConditions: { isMobile, isSmallMobile },
  } = useWindowDimensions();
  const navigate = useNavigate();

  const [isPartialLoading, setPartialLoading] = useState(false);
  const [InputtedThumbnailImgFile, setInputtedThumbnailImgFile] =
    useState<File | null>(null);
  const [InputtedThumbnailImgUrl, setInputtedThumbnailImgUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteAlertBox, setShowDeleteAlertBox] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // 업로드된 설명 파일
  const [form, setForm] = useState<WorkFormState>({
    title: "",
    script: false,
    performance: false,
    scriptPrice: 0,
    performancePrice: 0,
    plot: "",
    any: 0,
    male: 0,
    female: 0,
    stageComment: "",
    runningTime: 0,
    scene: 0,
    act: 0,
    imagePath: "",
    descriptionPath: "",
    intention: "",
  });

  const [isTouched, setIsTouched] = useState({
    any: false,
    male: false,
    female: false,
    runningTime: false,
    scene: false,
    act: false,
  });

  const podoStudioOpen = false;
  //  이미지
  const onClickChangeThumbnailImg = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imgUrl = URL.createObjectURL(file);
        setInputtedThumbnailImgUrl(imgUrl);
        setInputtedThumbnailImgFile(file); // ✅ File | null
        setForm((prev) => ({ ...prev, imagePath: imgUrl }));
      }
    };

    fileInput.click();
  };

  // 수정하기
  const onClickModifyBtn = async () => {
    if (!scriptId || !accessToken) return;
    try {
      const formData = new FormData();

      formData.append("id", scriptId);
      formData.append("title", form.title ?? "");
      formData.append("plot", form.plot ?? "");
      // formData.append("script", form.script ? "true" : "false");
      formData.append("script", form.script ? "true" : "false");
      formData.append("performance", form.performance ? "true" : "false");
      formData.append("scriptPrice", String(Number(form.scriptPrice ?? 0)));
      formData.append(
        "performancePrice",
        String(Number(form.performancePrice ?? 0))
      );
      formData.append("any", String(Number(form.any ?? 0)));
      formData.append("male", String(Number(form.male ?? 0)));
      formData.append("female", String(Number(form.female ?? 0)));
      formData.append("stageComment", form.stageComment ?? "");
      formData.append("runningTime", String(Number(form.runningTime ?? 0)));
      formData.append("scene", String(Number(form.scene ?? 0)));
      formData.append("act", String(Number(form.act ?? 0)));
      formData.append("intention", form.intention ?? "");

      if (InputtedThumbnailImgFile) {
        formData.append("scriptImage", InputtedThumbnailImgFile);
      } else if (form.imagePath) {
        formData.append("imagePath", form.imagePath);
      }

      if (uploadedFile) {
        formData.append("description", uploadedFile);
      } else if (form.descriptionPath) {
        formData.append("descriptionPath", form.descriptionPath);
      }

      const success = await postWorkDetail(formData);

      if (success) {
        toastAlert("작품 수정이 완료되었습니다.", "success");
        navigate("/mypage/scriptmanage");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  // 작품 삭제하기
  const onClickDeleteConfirm = async () => {
    if (!scriptId || !accessToken) return;
    try {
      const result = await deleteWorkDetail(scriptId, accessToken);
      if (result === true) {
        alert("작품이 삭제되었습니다.");
        navigate("/mypage/scriptmanage");
      }
    } catch (error: any) {
      alert(error.message); // "작가가 아님" 또는 "심사 중"
    }
  };

  useEffect(() => {
    const fetchWorkDetail = async () => {
      if (!scriptId || !accessToken) return;

      try {
        setPartialLoading(true);

        const data = await getWorkDetail(scriptId, accessToken);

        // title이 20자 초과 시 잘라서 세팅
        const trimmedTitle =
          data.title && data.title.length > 20
            ? data.title.slice(0, 20)
            : data.title;

        setForm({
          ...data,
          title: trimmedTitle,
          intention: normalizeLineBreaks(data.intention),
          plot: normalizeLineBreaks(data.plot),
        });
      } catch (err: any) {
        alert(err.message);
      } finally {
        setPartialLoading(false);
      }
    };

    fetchWorkDetail();
  }, [scriptId]);

  // 활성화 조건
  const totalActors =
    Number(form.male ?? 0) + Number(form.female ?? 0) + Number(form.any ?? 0);
  const hasValidTitle = form.title?.trim() !== "" && form.title !== null;
  const hasValidPlot = form.plot?.trim() !== "" && form.plot !== null;
  const hasValidStageComment =
    form.stageComment?.trim() !== "" && form.stageComment !== null;
  const hasActors = totalActors > 0;
  const hasRunningTime = (form.runningTime ?? 0) > 0;
  const hasSceneOrAct = (form.scene ?? 0) + (form.act ?? 0) > 0;
  // const hasValidPerformancePrice =
  //   form.script && form.performance
  //     ? (form.performancePrice ?? -1) <= 50000
  //     : true;
  const hasValidPerformancePrice = form.script && form.performance;
  const isFormValid = () => {
    return (
      hasValidTitle &&
      hasValidPlot &&
      hasValidStageComment &&
      hasActors &&
      hasRunningTime &&
      hasSceneOrAct
      // hasValidPerformancePrice
    );
  };

  // null일 때 함수 실행 고려 필요
  const normalizeLineBreaks = (text: string | null | undefined) =>
    (text ?? "").replace(/\r\n/g, "\n");

  return (
    <div className="w-full post-manage-detail">
      <OverLapPartialLoading isLoading={isPartialLoading} />

      {/* main */}
      <div className=" main">
        <HeaderWithBack
          backUrl="/mypage/scriptmanage"
          headerTitle="등록한 작품들을 관리할 수 있어요!"
          headerFont={isSmallMobile ? "p-medium-bold" : `h4-bold `}
        />
        {/* head */}
        <div
          className={`flex border-b-1 border-[#B489FF] ${
            isSmallMobile ? "mt-[34px] pb-[8px] " : "mt-[46px] pb-[5px]"
          }`}
        >
          <p
            className={`${isSmallMobile ? "p-xs-regular" : "p-medium-regular"}`}
          >
            작품 상세 페이지 수정
          </p>
        </div>
        {/* detail */}
        <div className="detail">
          {/* top info */}
          <div className=" top-info">
            {/* 이미지 */}
            <ThumbnailImg
              className="flex thumbnail aspect-square"
              imagePath={
                InputtedThumbnailImgFile
                  ? InputtedThumbnailImgUrl
                  : form.imagePath
              }
            >
              <p
                className={`p-xs-under c-pointer mb-[7.106%] mr-[10.66%]`}
                onClick={onClickChangeThumbnailImg}
              >
                대표 이미지 수정하기
              </p>
            </ThumbnailImg>

            {/* 작품 정보 */}
            <div className="w-full ">
              <p
                className={` ${
                  isSmallMobile
                    ? "p-small-bold mb-[8px]"
                    : "p-medium-bold mb-[10px]"
                }`}
              >
                작품 정보
              </p>

              <div
                className={`f-dir-column ${
                  isSmallMobile ? "gap-[8px]" : "gap-[10px]"
                }`}
              >
                {/* 제목 */}
                <div className="relative">
                  <RectInputField
                    type="text"
                    placeholder="작품 제목을 입력해주세요. (최대 20자)"
                    value={form.title ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if ([...value].length <= 20) {
                        setForm((prev) => ({ ...prev, title: value }));
                      }
                    }}
                    style={!isMobile ? {} : { width: "100%" }}
                    className="placeholder:text-[rgba(0,0,0,0.17)]  "
                    fontMode={isSmallMobile ? "xs" : "default"}
                  />
                  <div className="absolute rounded-tl-[5px] rounded-br-[5px] border-r-[0.5px] border-b-[0.5px] border-[#BABABA] bg-[#F5F0FF] p-xs-regular px-[5px] text-[#777777] bottom-[0%] right-[0%]">
                    {form.title ? [...form.title].length : 0} / 20자
                  </div>
                </div>

                {/* 설명 */}
                <div
                  className={`box-border relative focus-within:outline-none focus-within:border-[0.5px] focus-within:border-[#caabff] rounded-[5px] border-[0.5px] border-[#BABABA] w-full  ${
                    isSmallMobile ? " h-[85px]" : " h-[108px]"
                  }`}
                >
                  <textarea
                    className={`contents-textarea focus:outline-none border-none flex w-[92%] placeholder:text-[rgba(0,0,0,0.17)] resize-none bg-[#FFF] box-border ${
                      isSmallMobile ? "p-xs-regular" : "p-small-regular"
                    } `}
                    placeholder="간단한 줄거리를 입력해주세요. (최대 150자)"
                    value={form.plot ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if ([...value].length <= 150) {
                        setForm((prev) => ({ ...prev, plot: value }));
                      }
                    }}
                  />
                  <div className="absolute rounded-tl-[5px] rounded-br-[5px] border-r-[0.5px] border-b-[0.5px] border-[#BABABA] bg-[#F5F0FF] p-xs-regular px-[5px] text-[#777777] bottom-[0%] right-[0%]">
                    {form.plot ? [...form.plot].length : 0} / 150자
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bottom info */}
          <div className="flex flex-col ">
            {/* --- 개요 --- */}
            <div className="flex flex-col mt-[15px] mb-[11px]">
              <h2
                className={`${
                  isSmallMobile ? "p-small-bold" : "p-medium-bold "
                }`}
              >
                개요
              </h2>
              <div className="box-border relative outline1">
                {/* 등장인물 */}
                <div className=" characters">
                  <div
                    className={`box-border flex flex-row  ${
                      isSmallMobile ? "" : "items-center"
                    }`}
                  >
                    {" "}
                    <img
                      src={hasActors ? puppleCheckIcon : grayCheckIcon}
                      className={`aspect-square h-fit ${
                        isSmallMobile ? "w-[5vw]" : "w-[20px]"
                      }`}
                      alt="입력 체크"
                    />
                    <span
                      className={` whitespace-nowrap translate-y-[1px] flex-grow ${
                        isSmallMobile
                          ? "p-12-bold  ml-[1.56vw]"
                          : " p-small-medium ml-[6px]"
                      }`}
                    >
                      등장인물
                    </span>
                  </div>

                  <img
                    src={stickIcon}
                    className={`${isSmallMobile ? "h-[16px]" : "h-[20px]"}`}
                  />

                  <div
                    className={`flex whitespace-nowrap translate-y-[-2px]  ${
                      isSmallMobile
                        ? "p-12-regular flex-col "
                        : "p-small-regular  flex-row"
                    }`}
                  >
                    <div>
                      <span
                        className={`whitespace-nowrap  ${
                          isSmallMobile ? "p-12-regular  " : "p-small-regular  "
                        }`}
                      >
                        성별 무관
                      </span>
                      <input
                        type="text"
                        placeholder="00"
                        id="no-gender"
                        value={
                          form.any === 0 && !isTouched.any
                            ? ""
                            : String(form.any ?? "")
                        }
                        className={`box-border focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px] ${
                          isSmallMobile
                            ? "ml-[1.56vw] mr-[0.94vw] w-[7.81vw] p-12-regular"
                            : "ml-[5px] mr-[2px] w-[27px] p-small-regular"
                        }`}
                        onChange={(e) => {
                          const value = e.target.value;

                          setIsTouched((prev) => ({ ...prev, any: true }));

                          // 빈 문자열 입력 시 → 상태를 빈 문자열로 유지
                          if (value === "") {
                            setForm((prev) => ({ ...prev, any: undefined })); // 또는 null
                          } else if (/^\d{0,2}$/.test(value)) {
                            setForm((prev) => ({
                              ...prev,
                              any: Number(value),
                            }));
                          }
                        }}
                      />
                      <span
                        className={`whitespace-nowrap  ${
                          isSmallMobile ? "p-12-regular  " : "p-small-regular  "
                        }`}
                      >
                        명 / 남
                      </span>
                      <input
                        type="text"
                        placeholder="00"
                        id="male"
                        value={
                          form.male === 0 && !isTouched.male
                            ? ""
                            : String(form.male ?? "")
                        }
                        className={`box-border focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px] ${
                          isSmallMobile
                            ? "ml-[1.56vw] mr-[0.94vw] w-[7.81vw] p-12-regular"
                            : "ml-[5px] mr-[2px] w-[27px] p-small-regular"
                        }`}
                        onChange={(e) => {
                          const value = e.target.value;

                          setIsTouched((prev) => ({ ...prev, male: true }));

                          // 빈 문자열 입력 시 → 상태를 빈 문자열로 유지
                          if (value === "") {
                            setForm((prev) => ({ ...prev, male: undefined })); // 또는 null
                          } else if (/^\d{0,2}$/.test(value)) {
                            setForm((prev) => ({
                              ...prev,
                              male: Number(value),
                            }));
                          }
                        }}
                      />
                      {isSmallMobile ? (
                        <span
                          className={`whitespace-nowrap  ${
                            isSmallMobile
                              ? "p-12-regular  "
                              : "p-small-regular  "
                          }`}
                        >
                          명{" "}
                        </span>
                      ) : (
                        <span
                          className={`whitespace-nowrap  ${
                            isSmallMobile
                              ? "p-12-regular  "
                              : "p-small-regular  "
                          }`}
                        >
                          명 / 여
                        </span>
                      )}
                    </div>
                    {isSmallMobile ? (
                      <div>
                        <span
                          className={`whitespace-nowrap  ${
                            isSmallMobile
                              ? "p-12-regular  "
                              : "p-small-regular  "
                          }`}
                        >
                          {" "}
                          / 여{" "}
                        </span>
                        <input
                          value={
                            form.female === 0 && !isTouched.female
                              ? ""
                              : String(form.female ?? "")
                          }
                          id="female"
                          type="text"
                          placeholder="00"
                          className={`box-border focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px] ${
                            isSmallMobile
                              ? "ml-[1.56vw] mr-[0.94vw] w-[7.81vw] p-12-regular"
                              : "ml-[5px] mr-[2px] w-[27px] p-small-regular"
                          }`}
                          onChange={(e) => {
                            const value = e.target.value;

                            setIsTouched((prev) => ({ ...prev, female: true }));

                            // 빈 문자열 입력 시 → 상태를 빈 문자열로 유지
                            if (value === "") {
                              setForm((prev) => ({
                                ...prev,
                                female: undefined,
                              })); // 또는 null
                            } else if (/^\d{0,2}$/.test(value)) {
                              setForm((prev) => ({
                                ...prev,
                                female: Number(value),
                              }));
                            }
                          }}
                        />
                        <span
                          className={`whitespace-nowrap  ${
                            isSmallMobile
                              ? "p-12-regular  "
                              : "p-small-regular  "
                          }`}
                        >
                          명
                        </span>
                      </div>
                    ) : (
                      <div>
                        <input
                          value={
                            form.female === 0 && !isTouched.female
                              ? ""
                              : String(form.female ?? "")
                          }
                          id="female"
                          type="text"
                          placeholder="00"
                          className={`focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px] box-border ${
                            isSmallMobile
                              ? "ml-[1.56vw] mr-[0.94vw] w-[7.81vw] p-12-regular"
                              : "ml-[5px] mr-[2px] w-[27px] p-small-regular"
                          }`}
                          onChange={(e) => {
                            const value = e.target.value;

                            setIsTouched((prev) => ({ ...prev, female: true }));

                            // 빈 문자열 입력 시 → 상태를 빈 문자열로 유지
                            if (value === "") {
                              setForm((prev) => ({
                                ...prev,
                                female: undefined,
                              })); // 또는 null
                            } else if (/^\d{0,2}$/.test(value)) {
                              setForm((prev) => ({
                                ...prev,
                                female: Number(value),
                              }));
                            }
                          }}
                        />
                        <span>명</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* 공연 시간*/}
                <div className="performance-time">
                  <div className="box-border flex flex-row items-center ">
                    <img
                      src={hasRunningTime ? puppleCheckIcon : grayCheckIcon}
                      className={`aspect-square ${
                        isSmallMobile ? "w-[5vw]" : "w-[20px]"
                      }`}
                      alt="입력 체크"
                    />
                    <span
                      className={` whitespace-nowrap translate-y-[1px] flex-grow ${
                        isSmallMobile
                          ? "p-12-bold  ml-[1.56vw]"
                          : " p-small-medium ml-[6px]"
                      }`}
                    >
                      공연 시간
                    </span>
                  </div>
                  <img
                    src={stickIcon}
                    className={`${isSmallMobile ? "h-[16px]" : "h-[20px]"}`}
                  />
                  <div
                    className={`flex flex-row items-center whitespace-nowrap ${
                      isSmallMobile ? "p-12-regular" : "p-small-regular"
                    }`}
                  >
                    <span
                      className={`whitespace-nowrap  ${
                        isSmallMobile ? "p-12-regular  " : "p-small-regular  "
                      }`}
                    >
                      약
                    </span>
                    <input
                      type="text"
                      placeholder="000"
                      value={
                        form.runningTime === 0 && !isTouched.runningTime
                          ? ""
                          : String(form.runningTime ?? "")
                      }
                      className={`box-border focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px] ${
                        isSmallMobile
                          ? "ml-[1.56vw] mr-[0.94vw] w-[10vw] p-12-regular "
                          : "ml-[5px] mr-[2px] w-[36px] p-small-regular "
                      }`}
                      onChange={(e) => {
                        const value = e.target.value;

                        setIsTouched((prev) => ({
                          ...prev,
                          runningTime: true,
                        }));

                        // 빈 문자열 입력 시 → 상태를 빈 문자열로 유지
                        if (value === "") {
                          setForm((prev) => ({
                            ...prev,
                            runningTime: undefined,
                          })); // 또는 null
                        } else if (/^\d{0,3}$/.test(value)) {
                          setForm((prev) => ({
                            ...prev,
                            runningTime: Number(value),
                          }));
                        }
                      }}
                    />
                    <span
                      className={`whitespace-nowrap  ${
                        isSmallMobile ? "p-12-regular  " : "p-small-regular  "
                      }`}
                    >
                      분
                    </span>
                  </div>
                </div>
                {/* 무대 */}
                <div className="stage ">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={
                        hasValidStageComment ? puppleCheckIcon : grayCheckIcon
                      }
                      className={`aspect-square ${
                        isSmallMobile ? "w-[5vw]" : "w-[20px]"
                      }`}
                      alt="입력 체크"
                    />
                    <span
                      className={` whitespace-nowrap translate-y-[1px] flex-grow ${
                        isSmallMobile
                          ? "p-12-bold  ml-[1.56vw]"
                          : " p-small-medium ml-[6px]"
                      }`}
                    >
                      무대
                    </span>
                  </div>
                  <img
                    className={` my-auto ${
                      isSmallMobile ? "h-[16px]" : "h-[20px]"
                    }`}
                    src={stickIcon}
                    alt="구분선"
                  />
                  <textarea
                    className={`h-full focus:outline-none  focus:border-[0.5px] py-[8px] focus:border-[#caabff] p-xs-regular resize-none   rounded-[5px] border-[0.5px] border-[#BABABA] bg-[#FFF]   placeholder:text-[rgba(0,0,0,0.17)] box-border ${
                      isSmallMobile ? "px-[3.125vw]   " : "px-[10px] w-[260px] "
                    }`}
                    placeholder="시기, 장소 등을 자유롭게 적어주세요."
                    value={form.stageComment ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 30) {
                        setForm((prev) => ({ ...prev, stageComment: value }));
                      }
                    }}
                  />
                </div>
                {/* 장과 막 */}
                <div className="scene-act">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={hasSceneOrAct ? puppleCheckIcon : grayCheckIcon}
                      className={`aspect-square ${
                        isSmallMobile ? "w-[5vw]" : "w-[20px]"
                      }`}
                      alt="입력 체크"
                    />
                    <span
                      className={` whitespace-nowrap translate-y-[1px] flex-grow ${
                        isSmallMobile
                          ? "p-12-bold  ml-[1.56vw]"
                          : " p-small-medium ml-[6px]"
                      }`}
                    >
                      막과 장
                    </span>
                  </div>
                  <img
                    src={stickIcon}
                    className={` my-auto ${
                      isSmallMobile ? "h-[16px]" : "h-[20px]"
                    }`}
                  />
                  <div className="flex flex-row items-center whitespace-nowrap">
                    <input
                      type="text"
                      placeholder="00"
                      id="act"
                      value={
                        form.act === 0 && !isTouched.act
                          ? ""
                          : String(form.act ?? "")
                      }
                      className={`box-border focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px] ${
                        isSmallMobile
                          ? "ml-[1.56vw] mr-[0.94vw] w-[7.81vw] p-12-regular "
                          : "ml-[5px] mr-[2px] w-[27px] p-small-regular "
                      }`}
                      onChange={(e) => {
                        const value = e.target.value;

                        setIsTouched((prev) => ({ ...prev, act: true }));

                        // 빈 문자열 입력 시 → 상태를 빈 문자열로 유지
                        if (value === "") {
                          setForm((prev) => ({ ...prev, act: undefined })); // 또는 null
                        } else if (/^\d{0,2}$/.test(value)) {
                          setForm((prev) => ({
                            ...prev,
                            act: Number(value),
                          }));
                        }
                      }}
                    />
                    <span
                      className={`whitespace-nowrap  ${
                        isSmallMobile ? "p-12-regular  " : "p-small-regular  "
                      }`}
                    >
                      막
                    </span>
                    <input
                      type="text"
                      placeholder="00"
                      id="scene"
                      value={
                        form.scene === 0 && !isTouched.scene
                          ? ""
                          : String(form.scene ?? "")
                      }
                      className={`box-border focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px] ${
                        isSmallMobile
                          ? "ml-[1.56vw] mr-[0.94vw] w-[7.81vw] p-12-regular "
                          : "ml-[5px] mr-[2px] w-[27px] p-small-regular "
                      }`}
                      onChange={(e) => {
                        const value = e.target.value;

                        setIsTouched((prev) => ({ ...prev, scene: true }));

                        // 빈 문자열 입력 시 → 상태를 빈 문자열로 유지
                        if (value === "") {
                          setForm((prev) => ({ ...prev, scene: undefined })); // 또는 null
                        } else if (/^\d{0,2}$/.test(value)) {
                          setForm((prev) => ({
                            ...prev,
                            scene: Number(value),
                          }));
                        }
                      }}
                    />
                    <span
                      className={`whitespace-nowrap  ${
                        isSmallMobile ? "p-12-regular  " : "p-small-regular  "
                      }`}
                    >
                      장
                    </span>
                  </div>
                </div>

                <img
                  src={puppleLine}
                  className="absolute left-[376px] pupple-contour"
                ></img>
              </div>
            </div>

            <div className="flex flex-col gap-[9px] mb-[15px]">
              <span
                className={`${
                  isSmallMobile ? "p-small-bold" : "p-medium-bold "
                }`}
              >
                작가 의도{" "}
              </span>
              <div className="intention-div relative  focus-within:outline-none focus-within:border-[0.5px]  focus-within:border-[#caabff] rounded-[5px] border-[0.5px] border-[#BABABA] ">
                <textarea
                  className="intention-text focus:outline-none border-none flex pl-[22px] pr-[50px] my-[8px] placeholder:text-[rgba(0,0,0,0.17)] resize-none bg-[#FFF]  p-small-regular  box-border "
                  placeholder="작품에 대한 작가의 의도를 입력해주세요. (최대 300자)"
                  value={form.intention ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if ([...value].length <= 300) {
                      setForm((prev) => ({ ...prev, intention: value }));
                    }
                  }}
                />
                <div className="absolute rounded-tl-[5px] rounded-br-[5px] border-r-[0.5px] border-b-[0.5px] border-[#BABABA] bg-[#F5F0FF] p-xs-regular px-[5px] text-[#777777] bottom-[0%] right-[0%]">
                  {form.intention ? [...form.intention].length : 0} / 300자
                </div>
              </div>
            </div>

            {/* --- 판매 상태 --- */}
            <div className="min-h-[103px] mb-[12px] ">
              <div className="mb-[12px] flex items-center gap-[7px] relative">
                <h2
                  className={`${
                    isSmallMobile ? "p-small-bold" : "p-medium-bold "
                  }`}
                >
                  판매 상태{" "}
                </h2>
                {/* <img
                  id="info-btn1"
                  className="cursor-pointer c-pointer w-[20px] h-[20px] [filter:invert(74%)_sepia(13%)_saturate(0%)_hue-rotate(220deg)_brightness(99%)_contrast(91%)]"
                  src={circleInfoBtn}
                  alt="circleInfoBtn"
                  onClick={() => {
                    setShowPopup(!showPopup);
                  }}
                />
                {showPopup ? (
                  <InfoPopup
                    message={
                      "포도알 스테이지에서는 공연권 가격을 5만원 이하로만 설정 가능합니다."
                    }
                    onClose={() => {
                      setShowPopup(!showPopup);
                    }}
                    style={{
                      top: "unset",
                      left: "0%",
                      padding: "10px",
                      transform: "translate(calc(20px + 75px), 0)",
                      width: `${isSmallMobile ? "52vw" : "299px"}`,
                    }}
                    buttonId="info-btn1"
                  />
                ) : null} */}
              </div>

              <div className={`sales-status  relative  items-center`}>
                <div className="script ">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      // src={
                      //   form.scriptPrice ?? 0 ? puppleCheckIcon : grayCheckIcon
                      // }
                      src={puppleCheckIcon}
                      className={`aspect-square ${
                        isSmallMobile ? "w-[5vw]" : "w-[20px]"
                      }`}
                      alt="입력 체크"
                    />
                    <span
                      className={`  whitespace-nowrap translate-y-[1px] flex-grow ${
                        isSmallMobile
                          ? "p-12-bold  ml-[0.94vw]"
                          : " p-small-medium ml-[6px]"
                      }`}
                    >
                      대본
                    </span>
                  </div>
                  <img
                    src={stickIcon}
                    className={` my-auto ${
                      isSmallMobile ? "h-[16px]" : "h-[20px]"
                    }`}
                  />
                  <input
                    type="text"
                    value="무료 (포도알 스테이지에서는 대본 가격이 무료로 고정됩니다.)"
                    disabled
                    placeholder="무료 (포도알 스테이지에서는 대본 가격이 무료로 고정됩니다.)"
                    className=" p-xs-regular px-[3.39%] py-[2%] focus:outline-none focus:border-[0.5px] focus:border-[#caabff]    placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                    // onChange={(e) => {
                    //   setForm((prev) => ({
                    //     ...prev,
                    //     scriptPrice: Number(e.target.value),
                    //   }));
                    // }}
                  />
                </div>
                <div className="flex items-center justify-end w-full ">
                  <select
                    className={`cursor-pointer  text-center focus:outline-none focus:border-[0.5px] focus:border-[#caabff]  border-[#BABABA] rounded-[5px] border-[0.5px] ${
                      isSmallMobile
                        ? "h-[32px] w-[64vw]  p-xs-regular"
                        : "h-[26px] w-full p-small-regular "
                    }`}
                    value={
                      podoStudioOpen ? "true" : form.script ? "true" : "false"
                    }
                    onChange={(e) => {
                      const isScript = e.target.value === "true";
                      setForm((prev) => ({
                        ...prev,
                        script: isScript,
                        performance: isScript ? prev.performance : false, // script가 false면 performance도 false로
                      }));
                    }}
                    disabled={podoStudioOpen ? true : false}
                  >
                    <option value="false">판매 중지</option>
                    <option value="true"> 판매 중</option>
                  </select>
                </div>
                <div className="performance ">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={
                        hasValidPerformancePrice
                          ? puppleCheckIcon
                          : grayCheckIcon
                      }
                      className={`aspect-square ${
                        isSmallMobile ? "w-[5vw]" : "w-[20px]"
                      }${form.script === false ? "opacity-50" : ""}`}
                      alt="입력 체크"
                    />
                    <span
                      className={`  whitespace-nowrap translate-y-[1px] flex-grow  ${
                        isSmallMobile
                          ? "p-12-bold  ml-[0.94vw]"
                          : " p-small-medium ml-[6px]"
                      } ${form.script === false ? "opacity-50" : "text-black"}`}
                    >
                      공연권
                    </span>
                  </div>
                  <img
                    src={stickIcon}
                    className={` ${form.script === false ? "opacity-50" : ""} ${
                      isSmallMobile ? "h-[16px]" : "h-[20px]"
                    } my-auto`}
                  />

                  <div
                    className={`relative ${
                      isSmallMobile ? "h-full" : "h-[26px]  my-auto "
                    }`}
                  >
                    <input
                      type="text"
                      disabled={
                        form.performance === false || form.script === false
                      }
                      placeholder="공연권 가격을 입력하세요."
                      className={` my-auto h-full w-full box-border p-xs-regular px-[3.39%] py-[2%] focus:outline-none focus:border-[0.5px] border-[#BABABA] focus:border-[#caabff] placeholder-[rgba(0,0,0,0.17)]  rounded-[5px] border-[0.5px]`}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          const numericValue = Number(value);

                          setForm((prev) => ({
                            ...prev,
                            performancePrice: numericValue,
                          }));
                          // if (numericValue > 50000) {
                          //   setShowPopup(true);
                          // } else {
                          //   setShowPopup(false);
                          // }
                        }
                      }}
                      value={form.performancePrice ?? ""}
                    />

                    <span
                      className={`absolute top-[20%] right-[5%] p-xs-regular ${
                        !form.performance || !form.script ? "opacity-50" : ""
                      }`}
                    >
                      원
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end w-full ">
                  {/* 공연권 오픈 할 때는 pointer-events-none opacity-50 삭제 및 disabled 주석 부분으로 변경 */}
                  <select
                    className={`pointer-events-none opacity-50 ${
                      form.script === false
                        ? "pointer-events-none opacity-50 "
                        : "cursor-pointer"
                    }   ${
                      isSmallMobile
                        ? "h-[32px] w-[64vw]  p-xs-regular "
                        : "h-[26px] w-full  p-small-regular"
                    } not-last:mr-[9.87%] text-center focus:outline-none focus:border-[0.5px] focus:border-[#caabff]  border-[#BABABA] rounded-[5px] border-[0.5px]`}
                    value={form.performance ? "true" : "false"}
                    disabled={true}
                    // disabled={podoStudioOpen ? true : form.script === false}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        performance: e.target.value === "true",
                      }))
                    }
                  >
                    <option value="false">판매 중지</option>
                    <option value="true"> 판매 중</option>
                  </select>
                </div>
              </div>
            </div>

            {/*  --- 작품 설명 --- */}
            <div className="mt-[2.57%]">
              <FileInputBox
                title="작품 설명"
                infoText={
                  "작품 설명은 5페이지 이내의\n PDF 형식 파일만 가능해요."
                }
                onFileUpload={(file) => {
                  setUploadedFile(file);
                }}
                style={
                  !isMobile
                    ? { width: "100%", height: "180px" }
                    : { width: "430px", height: "180px" }
                }
                className={isSmallMobile ? "p-small-bold" : "p-medium-bold "}
                grayInfoBtn={true}
              />
            </div>

            {/* 버튼 */}
            <div className="flex flex-row mt-[40px] justify-end gap-[2.38%]">
              <SmallOnOffBtn
                color="white"
                onClick={() => navigate("/mypage/scriptmanage")}
              >
                취소하기
              </SmallOnOffBtn>
              <SmallOnOffBtn
                color="purple"
                disabled={!isFormValid()}
                onClick={onClickModifyBtn}
              >
                수정하기
              </SmallOnOffBtn>
            </div>

            <div
              className="j-content-end mt-[80px] p-small-under cursor-pointer"
              onClick={() => {
                setShowDeleteAlertBox(true);
              }}
            >
              <p id="delete">작품 삭제</p>
            </div>

            {/* 작품 삭제 토글 */}
            {showDeleteAlertBox ? (
              <div className="top-[50%]">
                <DialogPopup
                  text="작품을 정말 삭제할까요?"
                  negativeBtn={{
                    text: "삭제하기",
                    onClick: () => {
                      onClickDeleteConfirm();
                    },
                  }}
                  positiveBtn={{
                    text: "취소하기",
                    onClick: () => {
                      setShowDeleteAlertBox(false);
                    },
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostManageDetail;
