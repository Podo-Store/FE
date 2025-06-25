import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GoBack from "../../components/button/GoBack.tsx";
import RoundBtnLargeBold from "../../components/button/RoundBtnLargeBold";
import { AuthInputField } from "../../components/inputField";
import ThumbnailImg from "../../components/thumbnail/ThumbnailImg";
import ScriptManageEachTopBtn from "@/components/myPage/ScriptManageEachTopBtn";

import Loading from "../Loading.jsx";

import { useRequest } from "../../hooks/useRequest";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import formatDateCutSec from "../../utils/formatDateCutSec";
import { formatPrice } from "../../utils/formatPrice";

import { SERVER_URL } from "../../constants/ServerURL";

import listCloseBtn from "../../assets/image/button/listCloseBtn.svg";
import listOpenBtn from "../../assets/image/button/listOpenBtn.svg";

import "./AskedPerformManage.scss";
import "./PerformanceTop.scss";

const AskedPerformManage = () => {
  const [isExist, setIsExist] = useState(true);
  const [list, setList] = useState([]);
  const [productInfo, setProductInfo] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useRequest(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}profile/requested`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        params: {
          id,
        },
      });

      setProductInfo(response.data.productInfo);
      // 공연 신청 정보가 없을 때
      if (response.data.dateRequestedList.length === 0) {
        setIsExist(false);
        setIsLoading(false);
        return;
      }
      const mappedList = response.data.dateRequestedList.map((item) => ({
        date: item.date,
        lists: item.requestedInfo.map((subItem) => ({
          amount: subItem.amount,
          name: subItem.name,
          phone: subItem.phoneNumber,
          address: subItem.address,
          performDate: subItem.performanceDateList?.map((dateObj) => {
            return formatDateCutSec(dateObj.date);
          }),
        })),
      }));

      setList(mappedList);
    } catch (error) {
      alert(error.response.data.error);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="asked-perform-manage">
      <div className="min-height perform-info perform-top">
        <GoBack url="/mypage/scriptmanage" />
        <h4 className="h4-bold">등록한 작품들을 관리할 수 있어요!</h4>

        <p className="p-medium-regular">공연 신청 정보</p>
        <hr />
        <div className=" contents">
          <div className=" script-info f-dir-column a-items-center j-content-between">
            <div className=" script-info-title f-dir-column a-items-center">
              <ThumbnailImg />
              <div style={{ height: "12px" }}></div>
              <p className="p-large-bold">{productInfo.title || "제목"}</p>
              <hr />
              <p className="p-large-medium">{productInfo.writer || "작가"}</p>
              <p className="summary p-small-regular t-center">
                {productInfo.plot || "줄거리"}
              </p>
            </div>
            <div className=" sales-status-box-wrap f-dir-column">
              <div className="sales-status-box">
                <div className="title j-content-between a-items-end">
                  <p className="p-large-bold">대본</p>
                  <ScriptManageEachTopBtn disabled={!productInfo.script}>
                    {productInfo.script ? "대본 판매 중" : "대본 판매 중지"}
                  </ScriptManageEachTopBtn>
                </div>
                <div className="content j-content-center">
                  <div className="f-dir-column a-items-center">
                    <p className="p-small-regular">
                      {formatPrice(productInfo.scriptPrice)}원
                    </p>
                    <p className="p-small-regular c-grey5">가격</p>
                  </div>
                  <hr />
                  <div className="f-dir-column a-items-center">
                    <p className="p-small-regular">
                      {productInfo.scriptQuantity}개
                    </p>
                    <p className="p-small-regular c-grey5">판매 수</p>
                  </div>
                </div>
              </div>
              <div className="sales-status-box">
                <div className="title j-content-between a-items-end">
                  <p className="p-large-bold">공연권</p>
                  <ScriptManageEachTopBtn disabled={!productInfo.perform}>
                    {productInfo.perform
                      ? "공연권 판매 중"
                      : "공연권 판매 중지"}
                  </ScriptManageEachTopBtn>
                </div>
                <div className="content j-content-center">
                  <div className="f-dir-column a-items-center">
                    <p className="p-small-regular">
                      {formatPrice(productInfo.performancePrice)}원
                    </p>
                    <p className="p-small-regular c-grey5">가격</p>
                  </div>
                  <hr />
                  <div className="f-dir-column a-items-center">
                    <p className="p-small-regular">
                      {productInfo.performanceQuantity}개
                    </p>
                    <p className="p-small-regular c-grey5">판매 수</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="asked-perform-wrap">
            {isExist ? (
              list.map((item, index) => (
                <div
                  key={index}
                  className="asked-perform-box"
                  style={
                    index !== item.lists.length - 1
                      ? { marginBottom: "2.685vh" }
                      : {}
                  }
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
                            <ShortInputField
                              value={subItem.name}
                              readOnly={true}
                            />
                            <ShortInputField
                              value={subItem.phone}
                              readOnly={true}
                            />
                          </div>
                          <LongInputField
                            value={subItem.address}
                            readOnly={true}
                          />
                        </div>
                        <div className="content-inside">
                          <p className="p-medium-bold">예상 공연 일자</p>
                          <div className="date-list">
                            {subItem.performDate.map((date, dateIndex) => (
                              <ShortInputField
                                key={dateIndex}
                                value={date}
                                readOnly={true}
                              />
                            ))}
                            {subItem.performDate.length < subItem.amount &&
                              Array.from(
                                {
                                  length:
                                    subItem.amount - subItem.performDate.length,
                                },
                                (_, index) => (
                                  <ShortInputField
                                    key={index}
                                    value="미 입력"
                                    readOnly={true}
                                  />
                                )
                              )}
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
              <div className="flex flex-col justify-center items-center gap-[2.685vh] w-full h-full">
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

const LongInputField = ({ ...props }) => {
  const { widthConditions } = useWindowDimensions();

  return (
    <AuthInputField
      style={
        widthConditions.isMobile
          ? { width: "358px", height: "42px" }
          : widthConditions.isTablet
          ? { width: "596px", height: "42px" }
          : { width: "100%", height: "42px" }
      }
      {...props}
    />
  );
};

const ShortInputField = ({ ...props }) => {
  const { widthConditions } = useWindowDimensions();

  return (
    <AuthInputField
      style={
        widthConditions.isMobile
          ? { width: "170px", height: "42px" }
          : widthConditions.isTablet
          ? { width: "285px", height: "42px" }
          : { width: "355px", height: "42px" }
      }
      {...props}
    />
  );
};
