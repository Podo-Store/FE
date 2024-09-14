import React, { useState } from "react";

import Popup from "../popup/Popup.jsx";

import {
  PURCHASE_AGREEMENT,
  REFUND_POLICY,
} from "../../constants/PopupTexts/PurchaseDetailTexts.js";

import checked from "./../../assets/image/auth/signUp/checkbox/checked.svg";
import unChecked from "./../../assets/image/auth/signUp/checkbox/unChecked.svg";

import "./PurchaseCheckBox.css";
import "./../../styles/text.css";
import "./../../styles/utilities.css";

const PurchaseCheckBox = ({ setCheckBoxCondition }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "구매 조건 확인 및 결제 진행 동의",
      checked: false,
      key: "purchaseAgreement",
      popup: <Popup />,
      detail: PURCHASE_AGREEMENT,
    },
    {
      id: 2,
      name: "환불 유의사항",
      checked: false,
      key: "refundPolicy",
      popup: <Popup />,
      detail: REFUND_POLICY,
    },
  ]);

  const [showPopup, setShowPopup] = useState({
    purchaseAgreement: false,
    refundPolicy: false,
  });

  const onChangeCheckbox = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);

    const updatedConditions = updatedItems.reduce((acc, item) => {
      acc[item.key] = item.checked;
      return acc;
    }, {});
    setCheckBoxCondition(updatedConditions);
  };

  return (
    <div className="f-dir-column purchase-checkbox">
      {/* 개별 항목 체크박스 */}
      {items.map((item) => (
        <div className="a-items-center" id="checkbox-content" key={item.id}>
          <img
            src={item.checked ? checked : unChecked}
            alt={item.checked ? "Checked" : "Unchecked"}
            className="c-pointer"
            id="checkbox"
            onClick={() => onChangeCheckbox(item.id)}
          />
          <label className="p-small-medium c-pointer" onClick={() => onChangeCheckbox(item.id)}>
            {item.name}
          </label>
          <p
            className="p-xs-under c-pointer"
            onClick={() => setShowPopup({ ...showPopup, [item.key]: !showPopup[item.key] })}
          >
            자세히 보기
          </p>
          {showPopup[item.key] && (
            <div>
              {React.cloneElement(item.popup, {
                title: item.name,
                detail: item.detail,
                setShowPopup: (state) => setShowPopup({ ...showPopup, [item.key]: state }),
                page: item.id === 1 ? 1 : 2,
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PurchaseCheckBox;
