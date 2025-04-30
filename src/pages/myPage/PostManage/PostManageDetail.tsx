import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OverLapPartialLoading from "@/components/loading/OverLapPartialLoading";
import GoBack from "@/components/button/GoBack";
import ThumbnailImg from "@/components/thumbnail/ThumbnailImg";
import RectInputField from "@/components/inputField/RectInputField";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import DialogPopup from "@/components/popup/DialogPopup";
import grayCheckIcon from "@/assets/image/myPage/ic_gray_check.svg";
import puppleCheckIcon from "@/assets/image/myPage/ic_pupple_check.svg";
import stickIcon from "@/assets/image/myPage/ic_stick.svg";
import puppleLine from "@/assets/image/myPage/pupple_line.svg";
import FileInputBox from "@/components/file/FileInputBox";
import SmallOnOffBtn from "@/components/button/RoundBtn_135_40";

const PostManageDetail: React.FC = () => {
  const [title, setTitle] = useState("");
  const [isPartialLoading, setPartialLoading] = useState(false);
  const [InputtedThumbnailImgFile, setInputtedThumbnailImgFile] =
    useState<File | null>(null);
  const [performPrice, setPerformPrice] = useState("0");
  // imgFile: 입력받은 이미지 파일, imgUrl: 입력받은 이미지 파일 -> URL
  const [InputtedThumbnailImgUrl, setInputtedThumbnailImgUrl] = useState("");
  // getThumbnailImgUrl: API 요청으로부터 받아온 이미지 URL
  const [getThumbnailImgUrl, setGetThumbnailImgUrl] = useState("");
  const [plot, setPlot] = useState("");

  const [stage, setStage] = useState("");
  const {
    widthConditions: { isMobile },
  } = useWindowDimensions();
  const [file, setFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const navigate = useNavigate();
  const [scriptPrice, setScriptPrice] = useState("0");
  // 삭제하기 클릭 시 경고 박스
  const [showDeleteAlertBox, setShowDeleteAlertBox] = useState(false);
  // 업로드된 설명 파일
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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
        setUploadedFile(file); // ✅ File | null
      }
    };
    fileInput.click();
  };

  const onClickModifyBtn = async () => {};

  const onClickDeleteConfirm = async () => {};
  return (
    <div className="w-full">
      <OverLapPartialLoading isLoading={isPartialLoading} />

      {/* main */}
      <div className=" mt-[3.426vh]   ">
        <GoBack url="/mypage/scriptmanage" />

        {/* head */}
        <div className="flex flex-col gap-[4.259vh] border-b-1 border-[#B489FF] pb-[0.463vh]">
          <h1 className="h4-bold">등록한 작품들을 관리할 수 있어요!</h1>
          <p id="p-medium-regular">작품 상세 페이지 수정</p>
        </div>

        {/* detail */}
        <div className="m-auto flex w-[32.8vw] min-w-[630px] flex-col pt-[3.241vh] pb-[11.389%]">
          {/* top info */}
          <div className="  grid grid-cols-[31%_69%]">
            {/* 이미지 */}
            <ThumbnailImg
              className="flex items-end justify-end w-full h-full"
              imagePath={
                InputtedThumbnailImgFile
                  ? InputtedThumbnailImgUrl
                  : getThumbnailImgUrl
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
              <p className="p-medium-bold mb-[0.926vh] pl-[4.6%]">작품 정보*</p>

              <div className="f-dir-column gap-[1.11vh]  ">
                {/* 제목 */}
                <div className="relative pl-[4.6%]">
                  <RectInputField
                    type="text"
                    placeholder="작품 제목을 입력해주세요. (최대 20자)"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    style={!isMobile ? {} : { width: "100%" }}
                    className="placeholder:text-[rgba(0,0,0,0.17)] "
                  />
                  <div className="absolute rounded-tl-[5px] rounded-br-[5px] border-r-[0.5px] border-b-[0.5px] border-[#BABABA] bg-[#F5F0FF] p-xs-regular px-[5px] text-[#777777] bottom-[0%] right-[0%]  ">
                    {title ? title.length : 0} / 20자
                  </div>
                </div>

                {/* 설명 */}
                <div className="relative h-[10vh]  pl-[4.6%]">
                  <textarea
                    className=" focus:outline-none focus:border-[0.5px] focus:border-[#caabff] p-small-regular placeholder:text-[rgba(0,0,0,0.17)] resize-none h-full w-full rounded-[5px] border-[0.5px] border-[#BABABA] bg-[#FFF] px-[1.15vw] py-[1.20vh] p-small-regular  box-border "
                    placeholder="간단한 줄거리를 입력해주세요. (최대 150자)"
                    value={plot}
                    onChange={(e) => {
                      setPlot(e.target.value);
                    }}
                  />
                  <div className="absolute rounded-tl-[5px] rounded-br-[5px] border-r-[0.5px] border-b-[0.5px] border-[#BABABA] bg-[#F5F0FF] p-xs-regular px-[5px] text-[#777777] bottom-[0%] right-[0%]">
                    {plot ? plot.length : 0} / 150자
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
                      src={grayCheckIcon}
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
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center ml-[1.74%] mr-[0.7%] w-[9.44%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                    />
                    <span>명 / 남</span>
                    <input
                      type="text"
                      placeholder="00"
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  ml-[1.74%] mr-[0.7%] w-[9.44%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                    />
                    <span>명 / 여</span>
                    <input
                      type="text"
                      placeholder="00"
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  ml-[1.74%] mr-[0.7%] w-[9.44%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                    />
                    <span>명</span>
                  </div>
                </div>
                {/* 공연 시간*/}
                <div className="  grid grid-cols-[44.5%_55.5%] pl-[15.625%]">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={grayCheckIcon}
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
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center ml-[4.31%] mr-[1.72%] w-[31%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                    />
                    <span>분</span>
                  </div>
                </div>
                {/* 무대 */}
                <div className="grid grid-cols-[17%_83%]  ">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={grayCheckIcon}
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
                    value={stage}
                    onChange={(e) => {
                      setStage(e.target.value);
                    }}
                  />
                </div>
                {/* 장과 막 */}
                <div className="  pl-[15.625%] grid grid-cols-[39%_61%]">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={grayCheckIcon}
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
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center  mr-[1.56%] w-[21.1%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                    />
                    <span>장</span>
                    <input
                      type="text"
                      placeholder="00"
                      className="focus:outline-none focus:border-[0.5px] focus:border-[#caabff] text-center ml-[3.9%]  mr-[1.56%] w-[21.1%] placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
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
              <h2 className=" p-medium-bold mb-[2%]">판매 상태</h2>
              <div className="relative pl-[0.52vw] grid grid-cols-[61%_39%] h-auto gap-y-[22.38%]">
                <div className="   grid grid-cols-[17.5%_82.5%] ">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={grayCheckIcon}
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
                    placeholder="무료 (포도알 스테이지에서는 대본 가격이 무료로 고정됩니다.)"
                    className="p-xs-regular ml-[4.82%] px-[3.39%] py-[2%] focus:outline-none focus:border-[0.5px] focus:border-[#caabff]    placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                  ></input>
                </div>
                <select className="ml-[9.05%] mr-[9.87%] text-center focus:outline-none focus:border-[0.5px] focus:border-[#caabff]  border-[#BABABA] rounded-[5px] border-[0.5px]">
                  <option>판매 중지</option>
                  <option> 판매 중</option>
                </select>
                <div className="grid grid-cols-[20.7%_79.3%] ">
                  <div className="box-border flex flex-row items-center ">
                    {" "}
                    <img
                      src={grayCheckIcon}
                      className=" aspect-square"
                      alt="입력 체크"
                    />
                    <span className=" ml-[6.67%] p-small-medium whitespace-nowrap translate-y-[1px] flex-grow ">
                      공연권
                    </span>
                    <img src={stickIcon} className="" />
                  </div>
                  <input
                    type="text"
                    placeholder="공연권 가격을 입력하세요."
                    className="ml-[5.02%] p-xs-regular px-[3.39%] py-[2%] focus:outline-none focus:border-[0.5px] focus:border-[#caabff]    placeholder-[rgba(0,0,0,0.17)] border-[#BABABA] rounded-[5px] border-[0.5px]"
                  ></input>
                </div>
                <select className="ml-[9.05%] mr-[9.87%] text-center focus:outline-none focus:border-[0.5px] focus:border-[#caabff]  border-[#BABABA] rounded-[5px] border-[0.5px]">
                  <option>판매 중지</option>
                  <option> 판매 중</option>
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
                disabled={
                  title === "" || scriptPrice === "" || performPrice === ""
                }
                onClick={onClickModifyBtn}
              >
                수정하기
              </SmallOnOffBtn>
            </div>

            <div className="j-content-end mt-[7.99%] p-small-under">
              <p
                id="delete"
                onClick={() => {
                  setShowDeleteAlertBox(true);
                }}
              >
                작품 삭제
              </p>
            </div>

            {/* 작품 삭제 토글 */}
            {showDeleteAlertBox ? (
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
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostManageDetail;
