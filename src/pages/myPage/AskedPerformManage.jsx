import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import GoBack from "../../components/button/GoBack";
import RoundBtnLargeBold from "../../components/button/RoundBtnLargeBold";
import RoundBtnXsBold from "../../components/button/RoundBtnXsBold";
import { AuthInputField } from "../../components/inputField";
import ThumbnailImg from "../../components/thumbnail/ThumbnailImg";

import listCloseBtn from "../../assets/image/button/listCloseBtn.svg";
import listOpenBtn from "../../assets/image/button/listOpenBtn.svg";

import "./AskedPerformManage.css";
import "./PerformanceTop.css";

const AskedPerformManage = () => {
  const [isExist, setIsExist] = useState(false);
  const [list, setList] = useState([
    {
      date: "2024-01-01",
      open: false,
      lists: [
        {
          name: "테스트",
          phone: "010-1234-5678",
          address: "서울특별시 강남구",
          performDate: ["2024-01-01 13:00", "2024-02-02 15:00"],
        },
        {
          name: "홍길동",
          phone: "010-8765-4321",
          address: "부산광역시 해운대구",
          performDate: ["2024-01-02 14:00", "2024-02-03 16:00"],
        },
      ],
    },
    {
      date: "2024-01-02",
      open: false,
      lists: [
        {
          name: "홍길동",
          phone: "010-8765-4321",
          address: "부산광역시 해운대구",
          performDate: ["2024-01-02 14:00", "2024-02-03 16:00"],
        },
        {
          name: "테스트",
          phone: "010-1234-5678",
          address: "서울특별시 강남구",
          performDate: ["2024-01-01 13:00", "2024-02-02 15:00"],
        },
      ],
    },
  ]);
  const navigate = useNavigate();

  return (
    <div className="asked-perform-manage">
      <div className="min-height perform-info perform-top">
        <GoBack url="/mypage/scriptmanage" />
        <h4 className="h4-bold">등록한 작품들을 관리할 수 있어요!</h4>

        <p className="p-medium-regular">공연 신청 정보</p>
        <hr />
        <div className="contents d-flex">
          <div className="script-info f-dir-column a-items-center j-content-between">
            <div className="script-info-title f-dir-column a-items-center">
              <ThumbnailImg />
              <div style={{ height: "12px" }}></div>
              <p className="p-large-bold">작품 제목</p>
              <hr />
              <p className="p-large-medium">작가</p>
              <p className="summary p-small-regular t-center">
                줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리줄거리
              </p>
            </div>
            <div className="sales-status-box-wrap f-dir-column">
              <div className="sales-status-box">
                <div className="title j-content-between a-items-end">
                  <p className="p-large-bold">대본</p>
                  <RoundBtnXsBold color="purple" style={{ cursor: "default" }}>
                    대본 판매 중
                  </RoundBtnXsBold>
                </div>
                <div className="content j-content-center">
                  <div className="f-dir-column a-items-center">
                    <p className="p-small-regular">20,000원</p>
                    <p className="p-small-regular c-grey5">가격</p>
                  </div>
                  <hr />
                  <div className="f-dir-column a-items-center">
                    <p className="p-small-regular">N개</p>
                    <p className="p-small-regular c-grey5">판매 수</p>
                  </div>
                </div>
              </div>
              <div className="sales-status-box">
                <div className="title j-content-between a-items-end">
                  <p className="p-large-bold">공연권</p>
                  <RoundBtnXsBold color="purple" style={{ cursor: "default" }}>
                    공연권 판매 중
                  </RoundBtnXsBold>
                </div>
                <div className="content j-content-center">
                  <div className="f-dir-column a-items-center">
                    <p className="p-small-regular">20,000원</p>
                    <p className="p-small-regular c-grey5">가격</p>
                  </div>
                  <hr />
                  <div className="f-dir-column a-items-center">
                    <p className="p-small-regular">N개</p>
                    <p className="p-small-regular c-grey5">판매 수</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="asked-perform-wrap">
            {!isExist ? (
              list.map((item, index) => (
                <div
                  key={index}
                  className="asked-perform-box"
                  style={index !== item.lists.length - 1 ? { marginBottom: "2.685vh" } : {}}
                >
                  <div className="date j-content-between">
                    <p className="p-large-bold" style={{ color: "#8f8f8f" }}>
                      {item.date}
                    </p>
                    {item.open ? (
                      <img
                        className="c-pointer"
                        src={listCloseBtn}
                        alt="close"
                        onClick={() => {
                          const newList = [...list];
                          newList[index].open = false;
                          setList(newList);
                        }}
                      />
                    ) : (
                      <img
                        className="c-pointer"
                        src={listOpenBtn}
                        alt="open"
                        onClick={() => {
                          const newList = [...list];
                          newList[index].open = true;
                          setList(newList);
                        }}
                      />
                    )}
                  </div>
                  {item.open &&
                    item.lists.map((subItem, subIndex) => (
                      <div key={subIndex}>
                        <div className="content-inside">
                          <p className="p-medium-bold">신청자 정보</p>
                          <div className="user-info j-content-between">
                            <AuthInputField
                              value={subItem.name}
                              readOnly={true}
                              style={{ width: "355px", height: "42px" }}
                            />
                            <AuthInputField
                              value={subItem.phone}
                              readOnly={true}
                              style={{ width: "355px", height: "42px" }}
                            />
                          </div>
                          <AuthInputField
                            value={subItem.address}
                            readOnly={true}
                            style={{ width: "724px", height: "42px" }}
                          />
                        </div>
                        <div className="content-inside">
                          <p className="p-medium-bold">예상 공연 일자</p>
                          <div className="date-list">
                            {subItem.performDate.map((date, dateIndex) => (
                              <AuthInputField
                                key={dateIndex}
                                value={date}
                                readOnly={true}
                                style={{ width: "355px", height: "42px" }}
                              />
                            ))}
                          </div>
                        </div>
                        {
                          // 마지막 요소
                          subIndex !== item.lists.length - 1 && <hr />
                        }
                      </div>
                    ))}
                </div>
              ))
            ) : (
              <div
                className="f-dir-column f-center"
                style={{ gap: "2.685vh", width: "44.427vw", height: "100%" }}
              >
                <p className="p-large-bold">아직 공연이 신청되지 않았어요.</p>
                <RoundBtnLargeBold
                  color="purple"
                  onClick={() => {
                    navigate("/mypage/scriptmanage");
                  }}
                >
                  작품 관리하러 가기
                </RoundBtnLargeBold>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskedPerformManage;
