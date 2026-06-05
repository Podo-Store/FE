import { api } from "@/api/api";
import { useState } from "react";
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
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  useRequest(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/profile/requested`, {
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
          performDate:
            subItem.performanceDateList?.map((dateObj) =>
              dateObj.date ? formatDateCutSec(dateObj.date) : null
            ) || [],
          isRefunded: subItem.performanceDateList?.some((dateObj) => dateObj.isRefunded) || false,
        })),
      }));

      // 첫번째 item 열려있도록
      const newList = [...mappedList];
      newList[0].open = true;
      setList(newList);
    } catch (error) {
      alert(error.response.data.error);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="asked-perform-manage perform-top">
      <div className="min-height perform-info">
        <GoBack url="/author/mypage/scriptmanage" />
        <h4 className="p-medium-bold sm:h4-bold">등록한 작품들을 관리할 수 있어요!</h4>

        <p className="p-xs-regular sm:p-medium-regular">공연 신청 정보</p>
        <hr />
        <div className="contents">
          <div className="flex flex-col items-center justify-between script-info">
            <div className="flex flex-col items-center script-info-title">
              <ThumbnailImg imagePath={productInfo.imagePath} />
              <div className="h-[12px]"></div>
              <p className="p-small-bold sm:p-large-bold">{productInfo.title || "제목"}</p>
              <hr />
              <p className="p-12-bold sm:p-large-medium">{productInfo.writer || "작가"}</p>
              <p className="text-center summary p-xs-regular sm:p-small-regular">
                {productInfo.plot || "줄거리"}
              </p>
            </div>
            <div className="flex flex-col sales-status-box-wrap">
              <div className="sales-status-box">
                <div className="flex items-end justify-between title">
                  <p className="p-small-bold sm:p-large-bold">대본</p>
                  <ScriptManageEachTopBtn disabled={!productInfo.script}>
                    {!isSmallMobile && "대본"} {productInfo.script ? "판매 중" : "판매 중지"}
                  </ScriptManageEachTopBtn>
                </div>
                <div className="flex items-center justify-center content">
                  <div className="flex flex-col items-center sales-status-box-value">
                    <p className="p-xs-regular sm:p-small-regular">
                      {formatPrice(productInfo.scriptPrice)}원
                    </p>
                    <p className="p-xs-regular sm:p-small-regular text-grey-5">가격</p>
                  </div>
                  <hr />
                  <div className="sales-status-box-value f-dir-column a-items-center">
                    <p className="p-xs-regular sm:p-small-regular">
                      {productInfo.scriptQuantity}개
                    </p>
                    <p className="p-xs-regular sm:p-small-regular text-grey-5">판매 수</p>
                  </div>
                </div>
              </div>
              <div className="sales-status-box">
                <div className="flex items-end justify-between title">
                  <p className="p-small-bold sm:p-large-bold">공연권</p>
                  <ScriptManageEachTopBtn disabled={!productInfo.performance}>
                    {!isSmallMobile && "공연권"} {productInfo.performance ? "판매 중" : "판매 중지"}
                  </ScriptManageEachTopBtn>
                </div>
                <div className="flex justify-center content">
                  <div className="flex flex-col items-center sales-status-box-value">
                    <p className="p-xs-regular sm:p-small-regular">
                      {formatPrice(productInfo.performancePrice)}원
                    </p>
                    <p className="p-xs-regular sm:p-small-regular text-grey-5">가격</p>
                  </div>
                  <hr />
                  <div className="sales-status-box-value f-dir-column a-items-center">
                    <p className="p-xs-regular sm:p-small-regular">
                      {productInfo.performanceQuantity}개
                    </p>
                    <p className="p-xs-regular sm:p-small-regular text-grey-5">판매 수</p>
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
                  style={index !== item.lists.length - 1 ? { marginBottom: "2.685vh" } : {}}
                >
                  <div className="flex items-center justify-between date">
                    <p className=" p-small-bold sm:p-large-bold text-[#8f8f8f]">{item.date}</p>
                    {item.open ? (
                      <img
                        className="cursor-pointer"
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
                        className="cursor-pointer"
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
                          <div className="flex justify-between user-info">
                            <ShortInputField value={subItem.name} readOnly={true} />
                            <ShortInputField value={subItem.phone} readOnly={true} />
                          </div>
                          <LongInputField value={subItem.address} readOnly={true} />
                        </div>
                        <div className="content-inside">
                          <p className="p-medium-bold">예상 공연 일자</p>
                          <div className="date-list">
                            {subItem.isRefunded ? (
                              <ShortInputField value="환불된 공연입니다." readOnly={true} />
                            ) : (
                              <>
                                {subItem.performDate.filter(Boolean).map((date, dateIndex) => (
                                  <ShortInputField key={dateIndex} value={date} readOnly={true} />
                                ))}

                                {subItem.performDate.filter(Boolean).length < subItem.amount &&
                                  Array.from(
                                    {
                                      length:
                                        subItem.amount - subItem.performDate.filter(Boolean).length,
                                    },
                                    (_, index) => (
                                      <ShortInputField
                                        key={`empty-${index}`}
                                        value="공연 일자가 아직 등록되지 않았습니다."
                                        readOnly={true}
                                      />
                                    )
                                  )}
                              </>
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
                    navigate("/author/mypage/scriptmanage");
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
        widthConditions.isSmallMobile
          ? { width: "220px", height: "42px" }
          : widthConditions.isMobile
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
        widthConditions.isSmallMobile
          ? { width: "220px", height: "42px" }
          : widthConditions.isMobile
            ? { width: "170px", height: "42px" }
            : widthConditions.isTablet
              ? { width: "285px", height: "42px" }
              : { width: "355px", height: "42px" }
      }
      {...props}
    />
  );
};
