import React, { useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

import PolicyPopup from "../../popup/PolicyPopup.jsx";
import PolicyDialog from "./PolicyDialog";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

import unChecked from "../../../assets/image/auth/signUp/checkbox/unChecked.svg";
import checked from "../../../assets/image/auth/signUp/checkbox/checked.svg";

import {
  COLLECT_AND_USE,
  HAND_OVER,
  POLICY,
} from "../../../constants/PopupTexts/SignUp4DetailTexts.js";

import "./../../../styles/colors.css";
import "./../../../styles/utilities.css";

/**
 * @param {object} props
 * @param {number} props.type - 0: 회원가입 4단계, 1: 소셜 로그인 약관 동의
 * @param {function} props.setCheckBoxCondition - 체크박스 조건 설정 함수
 * @returns
 */
const SignUpCheckBox = ({ type = 0, setCheckBoxCondition }) => {
  const className =
    type === 0
      ? "gap-[8px] mt-[28px] p-xs-medium sm:p-small-medium"
      : "gap-[15px] sm:gap-[20px] p-small-medium sm:p-large-medium";
  const checkboxClassName =
    type === 0
      ? "mr-[3px] sm:mr-[5px] w-[14px] h-[14px] sm:w-[20px] sm:h-[20px]"
      : "mr-[5px] sm:mr-[10px] w-[20px] h-[20px] sm:w-[28px] sm:h-[28px]";
  const textWrapperClassName =
    type === 0
      ? "flex items-center gap-[10px] sm:gap-[17px]"
      : "flex justify-between items-center flex-1";
  /** 전문 보기 */
  const allTextClassName = type === 0 ? "p-xs-under" : "p-xs-under sm:p-small-under";
  const popup = <PolicyPopup />;

  const [items, setItems] = useState([
    { id: 1, name: "만 14세 이상", checked: false, key: "age" },
    {
      id: 2,
      name: "개인정보 수집 · 이용 동의",
      checked: false,
      key: "collectAndUse",
      popup,
      detail: COLLECT_AND_USE,
    },
    {
      id: 3,
      name: "개인정보 제3자 제공 동의",
      checked: false,
      key: "handOver",
      popup,
      detail: HAND_OVER,
    },
    {
      id: 4,
      name: "이용약관 동의",
      checked: false,
      key: "policy",
      popup,
      detail: POLICY,
    },
  ]);

  const [isAllChecked, setIsAllChecked] = useState(false);

  const [showPopup, setShowPopup] = useState({
    collectAndUse: false,
    handOver: false,
    policy: false,
  });

  const { isSmallMobile } = useWindowDimensions().widthConditions;

  // 개별 체크박스 선택
  const onChangeCheckbox = (id) => {
    const updatedItems = items.map(
      (item) =>
        // 클릭된 checkbox와 같은 id를 가진 항목 찾기
        item.id === id ? { ...item, checked: !item.checked } : item // 다른 id의 경우 그대로 반환
    );
    // 만들어진 복사본을 새로이 저장
    setItems(updatedItems);

    // 전체 선택 여부 업데이트
    const allChecked = updatedItems.every((item) => item.checked);
    setIsAllChecked(allChecked);

    const updatedConditions = updatedItems.reduce((acc, item) => {
      acc[item.key] = item.checked;
      return acc;
    }, {});
    setCheckBoxCondition(updatedConditions);
  };

  // 전체 선택/해제 처리
  const onChangeAllSelect = () => {
    const newCheckedState = !isAllChecked;
    const updatedItems = items.map((item) => ({
      ...item,
      checked: newCheckedState,
    }));
    setItems(updatedItems);
    setIsAllChecked(newCheckedState);

    const updatedConditions = updatedItems.reduce((acc, item) => {
      acc[item.key] = newCheckedState;
      return acc;
    }, {});
    setCheckBoxCondition(updatedConditions);
  };

  return (
    <div className={twMerge("checkbox-container flex flex-col", className)}>
      {/* 전체 선택 체크박스 */}
      <div className="flex items-center w-full">
        <button
          className={twJoin("checkbox-icon cursor-pointer", checkboxClassName)}
          onClick={onChangeAllSelect}
        >
          <img
            className="w-full h-full"
            src={isAllChecked ? checked : unChecked}
            alt={isAllChecked ? "Checked" : "Unchecked"}
          />
        </button>
        <label
          className={twJoin("cursor-pointer", isAllChecked ? "c-main" : "c-grey")}
          onClick={onChangeAllSelect}
        >
          모두 동의하기
        </label>
      </div>

      <div className="w-full h-[0.5px] bg-[#caabff]" />

      {/* 개별 항목 체크박스 */}
      {items.map((item) => (
        <div
          className={twJoin("flex items-center w-full", item.checked ? "c-main" : "c-grey")}
          key={item.id}
        >
          <button
            className={twJoin("checkbox-icon cursor-pointer", checkboxClassName)}
            onClick={() => onChangeCheckbox(item.id)}
          >
            <img
              className="w-full h-full"
              src={item.checked ? checked : unChecked}
              alt={item.checked ? "Checked" : "Unchecked"}
            />
          </button>
          <div className={textWrapperClassName}>
            <label className="cursor-pointer" onClick={() => onChangeCheckbox(item.id)}>
              {item.name}
            </label>
            {item.key !== "age" ? (
              <p
                className={twMerge("c-grey c-pointer", allTextClassName)}
                id="open"
                onClick={() => {
                  setShowPopup({
                    ...showPopup,
                    [item.key]: !showPopup[item.key],
                  });
                }}
              >
                전문보기
              </p>
            ) : null}
            {item.popup && showPopup[item.key] ? (
              type === 1 ? (
                <PolicyDialog
                  open={showPopup[item.key]}
                  title={item.name}
                  detail={item.detail}
                  onClose={() => setShowPopup({ ...showPopup, [item.key]: false })}
                />
              ) : (
                item.popup &&
                React.cloneElement(item.popup, {
                  title: item.name,
                  detail: item.detail,
                  setShowPopup: (state) => setShowPopup({ ...showPopup, [item.key]: state }),
                  page: 0,
                })
              )
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SignUpCheckBox;
