import { api } from "@/api/api";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GoBack from "../../components/button/GoBack.tsx";
import {
  PerformInputField,
  PerformDateInputField,
} from "../../components/inputField";
import { CheckerMessage, ErrorMessage } from "../../components/auth/signUp";
import SmallOnOffBtn from "../../components/button/RoundBtn_135_40";
import InfoPopup from "../../components/popup/InfoPopup";
import ThumbnailImg from "../../components/thumbnail/ThumbnailImg";

import { useRequest } from "../../hooks/useRequest";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import formatDateCutSec from "../../utils/formatDateCutSec";

import {
  USER_INFO,
  PERFORM_DATE,
} from "../../constants/PopupTexts/PerformInfoTexts";
import { SERVER_URL } from "../../constants/ServerURL";

import circleInfoBtn from "../../assets/image/button/circleInfoBtn.svg";
import circleAddBtn from "../../assets/image/button/circleAddBtn.svg";

import "./PerformanceInfo.scss";
import "./PerformanceTop.scss";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

const PerformanceInfo = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [applicantInfo, setApplicantInfo] = useState({});
  const [fetchedDates, setFetchedDates] = useState([]);
  const [performAmount, setPerformAmount] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const [showPopup, setShowPopup] = useState({
    userInfo: false,
    performDate: false,
  });

  const [dates, setDates] = useState([""]);
  const [inputFields, setInputFields] = useState([0]); // 입력 필드 관리
  const [dateChecker, setDateChecker] = useState([
    {
      show: false,
      format: false,
    },
  ]);

  const { isSmallMobile } = useWindowDimensions().widthConditions;

  useRequest(async () => {
    try {
      const response = await api.get(`/profile/apply`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          id,
        },
      });

      setThumbnail(response.data.imagePath);
      setTitle(response.data.title);
      setAuthor(response.data.writer);
      setApplicantInfo(response.data.applicant);
      setFetchedDates(response.data.performanceDate);
      setPerformAmount(response.data.performanceAmount);
    } catch (error) {
      alert(error.response.data.error);
    }
  });

  const onDateChange = (index, newDate) => {
    const newDates = [...dates];
    newDates[index] = newDate; // 해당 인덱스의 날짜 업데이트
    setDates(newDates);

    // 날짜 형식 검사
    const isValidFormat = checkDateFormat(newDate);

    const newDateChecker = [...dateChecker];
    newDateChecker[index] = { ...newDateChecker[index], format: isValidFormat };
    setDateChecker(newDateChecker);
  };

  // THX to: 'CHATGPT'
  // X 버튼 클릭 시
  const onDeleteField = (index) => {
    if (inputFields.length === 1) {
      return;
    }

    // 입력 필드를 삭제
    setInputFields((prevFields) => prevFields.filter((_, i) => i !== index));
    // 날짜 배열과 dateChecker 배열에서도 해당 필드를 삭제
    setDates((prevDates) => prevDates.filter((_, i) => i !== index));
    setDateChecker((prevChecker) => prevChecker.filter((_, i) => i !== index));
  };

  // THX to: 'CHATGPT'
  const checkDateFormat = (dateString) => {
    // 날짜 형식이 YYYY-MM-DD HH:mm인지 검사
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }

    // 날짜 값 추출
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);

    // 유효한 날짜인지 dayjs로 검사
    const inputDate = dayjs(`${year}-${month}-${day} ${hour}:${minute}`);
    if (!inputDate.isValid()) {
      return false;
    }

    // 월, 일, 시, 분이 범위를 넘지 않는지 검사
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (hour < 0 || hour > 23) return false;
    if (minute < 0 || minute > 59) return false;

    // 일자가 주어진 달의 최대 일수를 초과하는지 검사 (2월의 29일 등)
    if (day > dayjs(`${year}-${month}`, "YYYY-MM").daysInMonth()) {
      return false;
    }

    // 현재보다 과거 날짜인지 판단
    const currentDate = dayjs(); // 현재 날짜
    if (inputDate.isBefore(currentDate)) {
      return false;
    }

    return true;
  };

  const isDateOverThreeMonths = (date) => {
    const currentDate = dayjs(); // 현재 날짜
    const inputDate = dayjs(date); // 입력한 날짜
    return (
      inputDate.isValid() && inputDate.isAfter(currentDate.add(3, "month"))
    ); // 3개월 이전인지 판단
  };

  const onClickDateInput = (index) => {
    const newDateChecker = [...dateChecker];
    // 해당 index의 check message 표시
    newDateChecker[index] = { ...newDateChecker[index], show: true };
    setDateChecker(newDateChecker);
  };

  const onBlurDateInput = (index) => {
    const newDateChecker = [...dateChecker];
    // 해당 index의 check message 숨김
    newDateChecker[index] = { ...newDateChecker[index], show: false };
    setDateChecker(newDateChecker);
  };

  const onClickAddField = () => {
    // 현재: performAmount가 전체 공연권 수
    if (inputFields.length >= performAmount - fetchedDates.length) {
      return;
    }
    // 필드 추가될 때마다 설정
    setInputFields([...inputFields, inputFields.length]);
    setDateChecker([...dateChecker, false]);
  };

  const onClickApply = async () => {
    // 날짜가 유효하지 않을 경우
    if (dates.length === 0 || dates.every((date) => !checkDateFormat(date))) {
      alert("날짜를 올바르게 입력해주세요.");
      return;
    }

    // 날짜가 하나라도 비어있을 경우
    for (const date of dates) {
      if (!date || date.trim() === "") {
        alert("날짜를 올바르게 입력해주세요.");
        return;
      }
    }

    const localDates = dates.map((date) => ({
      date: dayjs(date).format("YYYY-MM-DDTHH:mm:ss"),
    }));
    try {
      await api.post(
        `/profile/apply`,
        {
          orderItemId: id,
          performanceDate: localDates,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("신청이 완료되었습니다.");
      navigate("/mypage/purchased");
    } catch (error) {
      alert(
        error.response.data.error || "오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  // 모든 날짜들에 대해 유효성 검사
  const isApplyDisabled = useMemo(() => {
    if (inputFields.length === 0) return true;

    return (
      dates.length === 0 ||
      dates.some((date) => !checkDateFormat(date)) ||
      dates.some((date) => isDateOverThreeMonths(date))
    );
  }, [dates, inputFields.length]);

  return (
    <div>
      <div className="min-height perform-info perform-top">
        <GoBack url="/mypage/purchased" />
        <h4 className={!isSmallMobile ? "h4-bold" : "p-medium-bold"}>
          구매한 작품들을 볼 수 있어요!
        </h4>

        <p className={!isSmallMobile ? "p-medium-regular" : "p-xs-regular"}>
          공연권 신청
        </p>
        <hr />
        <section className="f-dir-column a-items-center">
          <div className="script">
            <div className="d-flex">
              <ThumbnailImg imagePath={thumbnail} />
              <div className="script-detail">
                <div className="script-tag">
                  <div className="d-flex a-items-center" id="title">
                    <p
                      className={
                        !isSmallMobile ? "p-large-bold" : "p-small-bold"
                      }
                      id="title"
                    >
                      {title}
                    </p>
                  </div>
                  <hr></hr>
                  <p
                    className={!isSmallMobile ? "p-large-medium" : "p-12-bold"}
                    id="author"
                  >
                    {author}
                  </p>
                  {!isSmallMobile && (
                    <p className="p-xs-regular" id="warning">
                      * 공연권 사용 시 홍보물에 반드시 저작자의 이름과 대본이
                      저작자의 것임을 표시해야 하며, 대본이 '포도상점'을 통하여
                      제공되었음을 표시하여야 합니다.
                    </p>
                  )}
                </div>
              </div>
            </div>
            {isSmallMobile && (
              <>
                <p className="mt-[15px] px-[25px] p-xs-regular">
                  * 공연권 사용 시 홍보물에 반드시 저작자의 이름과 대본이
                  저작자의 것임을 표시해야 하며, 대본이 '포도상점'을 통하여
                  제공되었음을 표시하여야 합니다.
                </p>
                <hr
                  className="m-[0] mt-[15px]"
                  style={{ borderColor: "#9E9E9E" }}
                />
              </>
            )}

            <div className="a-items-center" id="info">
              <p className={!isSmallMobile ? "p-medium-bold" : "p-small-bold"}>
                신청자 정보
              </p>
              <img
                className="c-pointer"
                id="popup-btn1"
                src={circleInfoBtn}
                alt="circleInfoBtn"
                onClick={() => {
                  setShowPopup({ ...showPopup, userInfo: !showPopup.userInfo });
                }}
              />
              {showPopup.userInfo ? (
                <InfoPopup
                  message={USER_INFO}
                  onClose={() =>
                    setShowPopup({ ...showPopup, userInfo: false })
                  }
                  style={{
                    padding: "0.5rem 0.62rem",
                    left: "10px",
                  }}
                  buttonId="popup-btn1"
                />
              ) : null}
            </div>

            <PerformInputField
              placeholder={applicantInfo.name}
              readOnly={true}
            />
            <div id="margin"></div>
            <PerformInputField
              placeholder={applicantInfo.phoneNumber}
              readOnly={true}
            />
            <div id="margin"></div>
            <PerformInputField
              placeholder={applicantInfo.address}
              readOnly={true}
            />

            <div
              className="j-content-between a-items-center width-629"
              id="days"
            >
              <div className="a-items-center" id="days-left">
                <p
                  className={!isSmallMobile ? "p-medium-bold" : "p-small-bold"}
                >
                  공연 예상 일자
                </p>
                <img
                  className="c-pointer"
                  id="popup-btn2"
                  src={circleInfoBtn}
                  alt="circleInfoBtn"
                  onClick={() => {
                    setShowPopup({
                      ...showPopup,
                      performDate: !showPopup.performDate,
                    });
                  }}
                />
                {showPopup.performDate ? (
                  <InfoPopup
                    message={PERFORM_DATE}
                    onClose={() =>
                      setShowPopup({ ...showPopup, performDate: false })
                    }
                    style={{
                      padding: "0.5rem 0.62rem",
                      left: "24px",
                    }}
                    buttonId="popup-btn2"
                  />
                ) : null}
              </div>
              <p className="p-small-regular">
                {performAmount - fetchedDates.length > 0
                  ? fetchedDates.length + inputFields.length
                  : performAmount}
                &nbsp;/&nbsp;{performAmount}
              </p>
            </div>

            {/*
             * fetchedDates 형식:
             * [
             *  {
             *    "date": "2024-09-05T18:00:00"
             *  },
             *  {
             *    "date": "2024-09-01T15:39:50"
             *  },
             *  {
             *    "date": "2024-10-01T15:39:50"
             *  }
             * ]
             */}
            {/* fetchedDates: 이미 예약된 날짜들 */}
            {fetchedDates.map((dateObject, index) => (
              <div key={index}>
                <PerformDateInputField
                  placeholder={formatDateCutSec(dateObject.date)}
                  readOnly={true}
                />
                <div id="margin"></div>
              </div>
            ))}

            {/* inputFields: 새로 날짜 추가 */}
            {/* 소지 공연권을 전부 신청했을 경우 표시 X */}
            {performAmount - fetchedDates.length > 0 &&
              inputFields.map((_, index) => (
                <div key={index}>
                  <PerformDateInputField
                    placeholder="공연 예상 일자를 입력해주세요. (예) 2024-02-27 13:00"
                    value={dates[index] || ""}
                    onChange={(e) => onDateChange(index, e.target.value)}
                    onClick={() => onClickDateInput(index)}
                    onBlur={() => onBlurDateInput(index)}
                    onDelete={() => onDeleteField(index)} // X 버튼 클릭 시
                  />
                  <div
                    style={
                      !dateChecker[index]?.show
                        ? { height: "1rem" }
                        : { height: "6px" }
                    }
                  ></div>
                  {/* dateChecker[index]?.show: optional chaining(없을 경우 undefined) */}
                  {dateChecker[index]?.show && (
                    <CheckerMessage
                      message="일자 및 시간을 올바르게 입력해주세요. (ex. 2024-02-27 13:00)"
                      checkedFlag={dateChecker[index]?.format}
                    />
                  )}
                  {isDateOverThreeMonths(dates[index]) ? (
                    <div style={{ marginTop: "5px" }}>
                      <ErrorMessage message="구매 시점으로부터 3개월 이내만 작성 가능해요." />
                    </div>
                  ) : null}
                  <div
                    style={!dateChecker[index]?.show ? {} : { height: "15px" }}
                  ></div>
                </div>
              ))}

            {performAmount - fetchedDates.length > 0 && (
              <div className="j-content-center width-629" id="circle-add-btn">
                <img
                  src={circleAddBtn}
                  alt="add"
                  className="c-pointer"
                  onClick={onClickAddField}
                />
              </div>
            )}

            <div className="j-content-end width-629" id="btn">
              <SmallOnOffBtn
                color="white"
                onClick={() => {
                  navigate("/mypage/purchased");
                }}
              >
                취소하기
              </SmallOnOffBtn>
              <SmallOnOffBtn
                color="purple"
                disabled={isApplyDisabled}
                onClick={onClickApply}
              >
                신청하기
              </SmallOnOffBtn>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PerformanceInfo;
