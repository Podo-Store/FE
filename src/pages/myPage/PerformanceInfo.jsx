import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import GoBack from "../../components/button/GoBack";
import { PerformInputField, PerformDateInputField } from "../../components/inputField";
import { CheckerMessage, ErrorMessage } from "../../components/auth/signUp";
import SmallOnOffBtn from "../../components/button/SmallOnOffBtn";
import InfoPopup from "../../components/popup/InfoPopup";

import { USER_INFO, PERFORM_DATE } from "../../constants/PopupTexts/PerformInfoTexts";

import circleInfoBtn from "../../assets/image/button/circleInfoBtn.svg";
import circleAddBtn from "../../assets/image/button/circleAddBtn.svg";
import defaultThumbnail from "../../assets/image/defaultThumbnail.svg";

import "./PerformanceInfo.css";
import "./PerformanceTop.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

const PerformanceInfo = () => {
  const navigate = useNavigate();

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

  const isDateOverOneYear = (date) => {
    const currentDate = dayjs(); // 현재 날짜
    const inputDate = dayjs(date); // 입력한 날짜
    return inputDate.isValid() && inputDate.isAfter(currentDate.add(1, "year")); // 1년 이전인지 판단
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

  return (
    <div>
      <MainNav />
      <div className="min-height perform-info perform-top">
        <GoBack url="/mypage/purchased" />
        <h4 className="h4-bold">구매한 작품들을 볼 수 있어요!</h4>

        <p className="p-medium-regular">공연권 신청</p>
        <hr />
        <div className="script">
          <div className="d-flex">
            <div
              className="script-thumbnail"
              style={{
                backgroundImage: `url(${"default_image_url_here"})`,
              }}
            ></div>
            <div className="script-detail">
              <div className="script-tag">
                <div className="d-flex a-items-center" id="title">
                  <p className="p-large-bold" id="title">
                    Archive
                  </p>
                </div>
                <hr></hr>
                <p className="p-large-medium" id="author">
                  작가명작가명작가
                </p>
              </div>
            </div>
          </div>

          <div className="a-items-center" id="info">
            <p className="p-medium-bold">신청자 정보</p>
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
                onClose={() => setShowPopup({ ...showPopup, userInfo: false })}
                style={{ padding: "0.5rem 0.62rem", transform: "translate(6.75rem, 1rem)" }}
                buttonId="popup-btn1"
              />
            ) : null}
          </div>

          <PerformInputField placeholder="홍길동" readOnly={true} />
          <div id="margin"></div>
          <PerformInputField placeholder="010-1234-5678" readOnly={true} />
          <div id="margin"></div>
          <PerformInputField placeholder="서울특별시" readOnly={true} />

          <div className="j-content-between a-items-center width-629" id="days">
            <div className="a-items-center" id="days-left">
              <p className="p-medium-bold">공연 예상 일자</p>
              <img
                className="c-pointer"
                id="popup-btn2"
                src={circleInfoBtn}
                alt="circleInfoBtn"
                onClick={() => {
                  setShowPopup({ ...showPopup, performDate: !showPopup.performDate });
                }}
              />
              {showPopup.performDate ? (
                <InfoPopup
                  message={PERFORM_DATE}
                  onClose={() => setShowPopup({ ...showPopup, performDate: false })}
                  style={{ padding: "0.5rem 0.62rem", transform: "translate(8rem, 2rem)" }}
                  buttonId="popup-btn2"
                />
              ) : null}
            </div>
            <p className="p-small-regular">{inputFields.length}/10</p>
          </div>

          {inputFields.map((_, index) => (
            <div key={index}>
              <PerformDateInputField
                placeholder="공연 예상 일자를 입력해주세요. (예) 2024-02-27 13:00"
                value={dates[index] || ""}
                onChange={(e) => onDateChange(index, e.target.value)}
                onClick={() => onClickDateInput(index)}
                onBlur={() => onBlurDateInput(index)}
                onDelete={() => onDeleteField(index)} // X 버튼 클릭 시
              />
              <div id="margin"></div>
              {/* dateChecker[index]?.show: optional chaining(없을 경우 undefined) */}
              {dateChecker[index]?.show && (
                <CheckerMessage
                  message="일자 및 시간을 올바르게 입력해주세요. (ex. 2024-02-27 13:00)"
                  checkedFlag={dateChecker[index]?.format}
                />
              )}
              {isDateOverOneYear(dates[index]) ? (
                <div>
                  <div style={{ height: "0.5rem" }}></div>
                  <ErrorMessage message="구매 시점으로부터 1년 이내만 작성 가능해요." />
                </div>
              ) : null}
            </div>
          ))}

          <div className="j-content-center width-629" id="circle-add-btn">
            <img
              src={circleAddBtn}
              alt="add"
              className="c-pointer"
              onClick={() => {
                // 필드 추가될 때마다 설정
                setInputFields([...inputFields, inputFields.length]);
                setDateChecker([...dateChecker, false]);
              }}
            />
          </div>

          <div className="j-content-end width-629" id="btn">
            <SmallOnOffBtn
              text="취소하기"
              color="white"
              onClick={() => {
                navigate("/mypage/purchased");
              }}
            />
            <SmallOnOffBtn text="신청하기" color="purple" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PerformanceInfo;
