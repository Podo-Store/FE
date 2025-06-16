import React, { useState } from "react";

import PolicyPopup from "../../popup/PolicyPopup.jsx";

import unChecked from "../../../assets/image/auth/signUp/checkbox/unChecked.svg";
import checked from "../../../assets/image/auth/signUp/checkbox/checked.svg";

import {
  COLLECT_AND_USE,
  HAND_OVER,
  POLICY,
} from "../../../constants/PopupTexts/SignUp4DetailTexts.js";

import "./SignUpCheckBox.css";
import "./../../../styles/colors.css";
import "./../../../styles/utilities.css";

const SignUpCheckBox = ({ setCheckBoxCondition }) => {
  const [items, setItems] = useState([
    { id: 1, name: "만 14세 이상", checked: false, key: "age" },
    {
      id: 2,
      name: "개인정보 수집 · 이용 동의",
      checked: false,
      key: "collectAndUse",
      popup: <PolicyPopup />,
      detail: COLLECT_AND_USE,
    },
    {
      id: 3,
      name: "개인정보 제3자 제공 동의",
      checked: false,
      key: "handOver",
      popup: <PolicyPopup />,
      detail: HAND_OVER,
    },
    {
      id: 4,
      name: "이용약관 동의",
      checked: false,
      key: "policy",
      popup: <PolicyPopup />,
      detail: POLICY,
    },
  ]);

  const [isAllChecked, setIsAllChecked] = useState(false);

  const [showPopup, setShowPopup] = useState({
    collectAndUse: false,
    handOver: false,
    policy: false,
  });

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
    const updatedItems = items.map((item) => ({ ...item, checked: newCheckedState }));
    setItems(updatedItems);
    setIsAllChecked(newCheckedState);

    const updatedConditions = updatedItems.reduce((acc, item) => {
      acc[item.key] = newCheckedState;
      return acc;
    }, {});
    setCheckBoxCondition(updatedConditions);
  };

  return (
    <div className="f-dir-column checkbox-container">
      {/* 전체 선택 체크박스 */}
      <div className="a-items-center c-pointer checkbox-item">
        <img
          src={isAllChecked ? checked : unChecked}
          alt={isAllChecked ? "Checked" : "Unchecked"}
          className="checkbox-icon"
          onClick={onChangeAllSelect}
        />
        <label
          className={`c-pointer p-small-medium ${isAllChecked ? "c-main" : "c-grey"}`}
          onClick={onChangeAllSelect}
        >
          모두 동의하기
        </label>
      </div>

      <hr />

      {/* 개별 항목 체크박스 */}
      {items.map((item) => (
        <div
          className={`a-items-center p-small-medium checkbox-item ${
            item.checked ? "c-main" : "c-grey"
          }`}
          key={item.id}
        >
          <img
            src={item.checked ? checked : unChecked}
            alt={item.checked ? "Checked" : "Unchecked"}
            className="c-pointer checkbox-icon"
            onClick={() => onChangeCheckbox(item.id)}
          />
          <label className="c-pointer" onClick={() => onChangeCheckbox(item.id)}>
            {item.name}
          </label>
          {item.key !== "age" ? (
            <p
              className="p-xs-under c-grey c-pointer"
              id="open"
              onClick={() => {
                setShowPopup({ ...showPopup, [item.key]: !showPopup[item.key] });
              }}
            >
              전문보기
            </p>
          ) : null}
          {item.popup && showPopup[item.key]
            ? item.popup &&
             React .cloneElement(item.popup, {
                title: item.name,
                detail: item.detail,
                setShowPopup: (state) => setShowPopup({ ...showPopup, [item.key]: state }),
                page: 0,
              })
            : null}
        </div>
      ))}
    </div>
  );
};

export default SignUpCheckBox;
