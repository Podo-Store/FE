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
  >
>;

const PostManageDetail: React.FC = () => {
  const { scriptId } = useParams();
  const accessToken = Cookies.get("accessToken");
  const {
    widthConditions: { isMobile },
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
  });

  const [isTouched, setIsTouched] = useState({
    any: false,
    male: false,
    female: false,
    runningTime: false,
    scene: false,
    act: false,
  });

  //  이미지 수정
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

        setForm({ ...data, title: trimmedTitle });
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
  const hasValidPerformancePrice =
    form.script && form.performance
      ? (form.performancePrice ?? -1) <= 50000
      : true;

  const isFormValid = () => {
    return (
      hasValidTitle &&
      hasValidPlot &&
      hasValidStageComment &&
      hasActors &&
      hasRunningTime &&
      hasSceneOrAct &&
      hasValidPerformancePrice
    );
  };

  return (
    <div className="w-full">
      <OverLapPartialLoading isLoading={isPartialLoading} />

      {/* main */}
      <div className="mt-[3.426vh]">
        <HeaderWithBack
          backUrl="/mypage/scriptmanage"
          headerTitle="등록한 작품들을 관리할 수 있어요!"
          headerFont="h4-bold"
        />
        {/* head */}
        <div className="flex mt-[46px] border-b-1 border-[#B489FF] pb-[0.463vh]">
          <p id="p-medium-regular">작품 상세 페이지 수정</p>
        </div>
        {/* detail */}
        <div className="m-auto flex w-[32.8vw] min-w-[630px] flex-col pt-[3.241vh] pb-[11.389%]">
          {/* top info */}
          <div className=" grid grid-cols-[31%_69%]">
            {/* 이미지 */}
            <ThumbnailImg
              className="flex items-end justify-end w-full h-full "
              imagePath={
                InputtedThumbnailImgFile
                  ? InputtedThumbnailImgUrl
                  : form.imagePath
              }
            >
              <p
                className="p-xs-under c-pointer mb-[7.106%] mr-[10.66%]"
                onClick={onClickChangeThumbnailImg}
              >
                대표 이미지 수정하기
              </p>
            </ThumbnailImg>

            {/* 작품 정보 */}
            <div className="w-full cript-info-detail">
              <p className="p-medium-bold mb-[0.926vh] pl-[4.6%]">작품 정보</p>

              <div className="f-dir-column gap-[1.11vh]  ">
                {/* 제목 */}
                <div className="relative pl-[4.6%]">
                  <RectInputField
                    type="text"
                    placeholder="작품 제목을 입력해주세요. (최대 20자)"
                    value={form.title ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 20) {
                        setForm((prev) => ({ ...prev, title: value }));
                      }
                    }}
                    style={!isMobile ? {} : { width: "100%" }}
                    className="placeholder:text-[rgba(0,0,0,0.17)] "
                  />
                  <div className="absolute rounded-tl-[5px] rounded-br-[5px] border-r-[0.5px] border-b-[0.5px] border-[#BABABA] bg-[#F5F0FF] p-xs-regular px-[5px] text-[#777777] bottom-[0%] right-[0%]  ">
                    {form.title ? form.title.length : 0} / 20자
                  </div>
                </div>

                {/* 설명 */}
                <div className="relative h-[10vh]  pl-[4.6%]">
                  <textarea
                    className=" focus:outline-none focus:border-[0.5px] focus:border-[#caabff] p-small-regular placeholder:text-[rgba(0,0,0,0.17)] resize-none h-full w-full rounded-[5px] border-[0.5px] border-[#BABABA] bg-[#FFF] px-[1.15vw] py-[1.20vh] p-small-regular  box-border "
                    placeholder="간단한 줄거리를 입력해주세요. (최대 150자)"
                    value={form.plot ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 150) {
                        setForm((prev) => ({ ...prev, plot: value }));
                      }
                    }}
                  />
                  <div className="absolute rounded-tl-[5px] rounded-br-[5px] border-r-[0.5px] border-b-[0.5px] border-[#BABABA] bg-[#F5F0FF] p-xs-regular px-[5px] text-[#777777] bottom-[0%] right-[0%]">
                    {form.plot ? form.plot.length : 0} / 150자
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bottom info */}
          <div className="flex flex-col ">
            {/* --- 개요 --- */}
            <div className="flex flex-col mt-[15px] mb-[6px]">
              <h2 className="p-medium-bold">개요</h2>
              <div className="relative pl-[0.52vw]  grid grid-cols-[60%_40%] grid-rows-[40%_60%] h-[90px]">
                {/* 등장인물 */}
                <div className="grid grid-cols-[24%_76%] ">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={hasActors ? puppleCheckIcon : grayCheckIcon}
                      className=" aspect-square"
                      alt="입력 체크"
                    />
                    <span className=" ml-[6.67%] p-small-medium whitespace-nowrap translate-y-[1px] flex-grow ">
                      등장인물
                    </span>
                    <img src={stickIcon} className="" />
                  </div>

                  <div className=" flex flex-row items-center pl-[5.24%] p-small-regular whitespace-nowrap">
                    <span>성별 무관</span>
                    <input
                      type="text"
                      placeholder="00"
                      value={
                        form.any === 0 && !isTouched.any
                          ? ""
                          : String(form.any ?? "")
                      }
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center ml-[1.74%] mr-[0.7%] w-[9.44%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                      onChange={(e) => {
                        const value = e.target.value;

                        setIsTouched((prev) => ({ ...prev, any: true }));

                        // 빈 문자열 입력 시 → 상태를 빈 문자열로 유지
                        if (value === "") {
                          setForm((prev) => ({ ...prev, any: undefined })); // 또는 null
                        } else if (/^\d{0,2}$/.test(value)) {
                          setForm((prev) => ({ ...prev, any: Number(value) }));
                        }
                      }}
                    />
                    <span>명 / 남</span>
                    <input
                      type="text"
                      placeholder="00"
                      value={
                        form.male === 0 && !isTouched.male
                          ? ""
                          : String(form.male ?? "")
                      }
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  ml-[1.74%] mr-[0.7%] w-[9.44%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                      onChange={(e) => {
                        const value = e.target.value;

                        setIsTouched((prev) => ({ ...prev, male: true }));

                        // 빈 문자열 입력 시 → 상태를 빈 문자열로 유지
                        if (value === "") {
                          setForm((prev) => ({ ...prev, male: undefined })); // 또는 null
                        } else if (/^\d{0,2}$/.test(value)) {
                          setForm((prev) => ({ ...prev, male: Number(value) }));
                        }
                      }}
                    />
                    <span>명 / 여</span>
                    <input
                      value={
                        form.female === 0 && !isTouched.female
                          ? ""
                          : String(form.female ?? "")
                      }
                      type="text"
                      placeholder="00"
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  ml-[1.74%] mr-[0.7%] w-[9.44%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                      onChange={(e) => {
                        const value = e.target.value;

                        setIsTouched((prev) => ({ ...prev, female: true }));

                        // 빈 문자열 입력 시 → 상태를 빈 문자열로 유지
                        if (value === "") {
                          setForm((prev) => ({ ...prev, female: undefined })); // 또는 null
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
                </div>
                {/* 공연 시간*/}
                <div className="  grid grid-cols-[44.5%_55.5%] pl-[15.625%]">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={hasRunningTime ? puppleCheckIcon : grayCheckIcon}
                      className="aspect-square"
                      alt="입력 체크"
                    />
                    <span className=" ml-[6.67%] p-small-medium whitespace-nowrap translate-y-[1px] flex-grow ">
                      공연 시간
                    </span>
                    <img src={stickIcon} className="" />
                  </div>

                  <div className=" flex flex-row items-center pl-[6.14%] p-small-regular whitespace-nowrap">
                    <span>약</span>
                    <input
                      type="text"
                      placeholder="000"
                      value={
                        form.runningTime === 0 && !isTouched.runningTime
                          ? ""
                          : String(form.runningTime ?? "")
                      }
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center ml-[4.31%] mr-[1.72%] w-[31%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
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
                    <span>분</span>
                  </div>
                </div>
                {/* 무대 */}
                <div className="grid grid-cols-[17%_83%]  ">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={
                        hasValidStageComment ? puppleCheckIcon : grayCheckIcon
                      }
                      className=" aspect-square"
                      alt="입력 체크"
                    />
                    <span className="  ml-[9.09%]  p-small-medium whitespace-nowrap translate-y-[1px] flex-grow">
                      무대
                    </span>
                    <img src={stickIcon} alt="구분선" />
                  </div>

                  <textarea
                    className="focus:outline-none  focus:border-[0.5px] focus:border-[#caabff] p-xs-regular resize-none mt-[9px]  mb-[5px] ml-[4.83%] mr-[5.3%] rounded-[5px] border-[0.5px] border-[#BABABA] bg-[#FFF] px-[10px] py-[8px] p-small-regular placeholder:text-[rgba(0,0,0,0.17)] "
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
                <div className="  pl-[15.625%] grid grid-cols-[39%_61%]">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={hasSceneOrAct ? puppleCheckIcon : grayCheckIcon}
                      className="aspect-square"
                      alt="입력 체크"
                    />
                    <span className=" ml-[6.67%] p-small-medium whitespace-nowrap translate-y-[1px] flex-grow ">
                      장과 막
                    </span>
                    <img src={stickIcon} className="" />
                  </div>

                  <div className=" flex flex-row items-center  pl-[6.14%] p-small-regular whitespace-nowrap">
                    <input
                      type="text"
                      placeholder="00"
                      value={
                        form.scene === 0 && !isTouched.scene
                          ? ""
                          : String(form.scene ?? "")
                      }
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  mr-[1.56%] w-[21.1%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
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
                    <span>장</span>
                    <input
                      type="text"
                      placeholder="00"
                      value={
                        form.act === 0 && !isTouched.act
                          ? ""
                          : String(form.act ?? "")
                      }
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center ml-[3.9%]  mr-[1.56%] w-[21.1%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
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
                    <span>막</span>
                  </div>
                </div>

                <img src={puppleLine} className="absolute left-[62%]"></img>
              </div>

              {/* 공연 시간 */}
              {/* 장과 막 */}
            </div>

            {/* --- 판매 상태 --- */}
            <div className="min-h-[103px] mb-[12px] ">
              <div className="mb-[2%] flex items-center gap-[7px] relative">
                <h2 className="p-medium-bold">판매 상태 </h2>
                <img
                  id="info-btn"
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
                      padding: "11px",
                      transform: "translate(calc(20px + 75px), 0)",
                    }}
                    buttonId="info-btn1"
                  />
                ) : null}
              </div>

              <div className="relative pl-[0.52vw] grid grid-cols-[61%_39%] h-auto gap-y-[22.38%]">
                <div className="   grid grid-cols-[17.5%_82.5%] ">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      // src={
                      //   form.scriptPrice ?? 0 ? puppleCheckIcon : grayCheckIcon
                      // }
                      src={puppleCheckIcon}
                      className=" aspect-square"
                      alt="입력 체크"
                    />
                    <span className="  ml-[6.67%] p-small-medium whitespace-nowrap translate-y-[1px] flex-grow ">
                      대본
                    </span>
                    <img src={stickIcon} className="" />
                  </div>
                  <input
                    type="text"
                    value="무료 (포도알 스테이지에서는 대본 가격이 무료로 고정됩니다.)"
                    disabled
                    placeholder="무료 (포도알 스테이지에서는 대본 가격이 무료로 고정됩니다.)"
                    className=" p-xs-regular ml-[4.82%] px-[3.39%] py-[2%] focus:outline-none focus:border-[0.5px] focus:border-[#caabff]    placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                    // onChange={(e) => {
                    //   setForm((prev) => ({
                    //     ...prev,
                    //     scriptPrice: Number(e.target.value),
                    //   }));
                    // }}
                  ></input>
                </div>
                <select
                  className="ml-[9.05%] cursor-pointer mr-[9.87%] text-center focus:outline-none focus:border-[0.5px] focus:border-[#caabff]  border-[#BABABA] rounded-[5px] border-[0.5px]"
                  value={form.script ? "true" : "false"}
                  onChange={(e) => {
                    const isScript = e.target.value === "true";
                    setForm((prev) => ({
                      ...prev,
                      script: isScript,
                      performance: isScript ? prev.performance : false, // script가 false면 performance도 false로
                    }));
                  }}
                >
                  <option value="false">판매 중지</option>
                  <option value="true"> 판매 중</option>
                </select>
                <div className="grid grid-cols-[20.7%_79.3%] ">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={
                        hasValidPerformancePrice
                          ? puppleCheckIcon
                          : grayCheckIcon
                      }
                      className={`aspect-square ${
                        form.script === false ? "opacity-50" : ""
                      }`}
                      alt="입력 체크"
                    />
                    <span
                      className={` ml-[6.67%] p-small-medium whitespace-nowrap translate-y-[1px] flex-grow ${
                        form.script === false ? "opacity-50" : "text-black"
                      }`}
                    >
                      공연권
                    </span>
                    <img
                      src={stickIcon}
                      className={` ${
                        form.script === false ? "opacity-50" : ""
                      }`}
                    />
                  </div>
                  <div className="relative pr-[33px]">
                    <input
                      type="text"
                      disabled={
                        form.performance === false || form.script === false
                      }
                      placeholder="공연권 가격을 입력하세요."
                      className={`ml-[5.02%] p-xs-regular px-[3.39%] py-[2%] focus:outline-none focus:border-[0.5px]  ${
                        (form.performancePrice ?? 0) > 50000
                          ? "focus:border-[#fc040477] border-[#fc040477]"
                          : "border-[#BABABA] focus:border-[#caabff]"
                      }    placeholder-[rgba(0,0,0,0.17)]  rounded-[5px] border-[0.5px] w-full `}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          const numericValue = Number(value);

                          setForm((prev) => ({
                            ...prev,
                            performancePrice: numericValue,
                          }));
                          if (numericValue > 50000) {
                            setShowPopup(true);
                          } else {
                            setShowPopup(false);
                          }
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
                <select
                  className={`${
                    form.script === false ? "" : "cursor-pointer"
                  } ml-[9.05%] mr-[9.87%] text-center focus:outline-none focus:border-[0.5px] focus:border-[#caabff]  border-[#BABABA] rounded-[5px] border-[0.5px]`}
                  value={form.performance ? "true" : "false"}
                  disabled={form.script === false}
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
                titleStyle={{
                  fontSize: "1rem",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "1.5rem",
                }}
              />
            </div>

            {/* 버튼 */}
            <div className="flex flex-row mt-[3.99%] justify-end gap-[2.38%]">
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
              className="j-content-end mt-[7.99%] p-small-under cursor-pointer"
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
