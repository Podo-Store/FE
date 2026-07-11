import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoutePrefix } from "@/hooks/useRoutePrefix";
import { updateSettlementAccount } from "@/api/user/profile/settlementApi";
import { AuthInputField } from "@/components/inputField";
import SmallOnOffBtn from "@/components/button/RoundBtn_135_40.jsx";
import { BANK_LIST, type Bank } from "@/constants/banks";
import downDropIcon from "@/assets/image/post/ic_arrow_down.svg";
import { twJoin } from "tailwind-merge";

const AccountInfoChangeAccount = () => {
  const prefix = useRoutePrefix();
  const navigate = useNavigate();

  const [bank, setBank] = useState<Bank | "">("");
  const [isBankOpen, setIsBankOpen] = useState(false);
  const bankDropdownRef = useRef<HTMLDivElement>(null);

  const [accountNumber, setAccountNumber] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bankDropdownRef.current && !bankDropdownRef.current.contains(event.target as Node)) {
        setIsBankOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onChangeDisableCondition = () => {
    return !bank || !accountNumber || !name;
  };

  const onClickCompleteBtn = async () => {
    if (!bank && !accountNumber && !name) {
      window.location.reload();
      return;
    }

    try {
      await updateSettlementAccount({
        bankName: bank as Bank,
        accountNumber,
        accountHolderName: name,
      });

      alert("정산 계좌 등록이 완료되었습니다.");
      navigate(`${prefix}/mypage/info`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
    }
  };

  return (
    <div className="info-change-main">
      <div className="flex flex-col gap-[10px] sm:gap-[45px] mb-[20px] sm:mb-[36px]">
        <p className="p-medium-bold sm:h4-bold">정산 계좌</p>
        <p className="p-medium-medium">정산 받을 계좌번호를 입력해주세요.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-[10px]">
        <div className="relative w-full" ref={bankDropdownRef}>
          <button
            type="button"
            onClick={() => setIsBankOpen((prev) => !prev)}
            className={twJoin(
              "w-full h-[3.75rem] flex items-center justify-between px-[1.25rem] rounded-[0.5rem] border border-grey-4 sm:w-[180px] sm:h-[62px]"
            )}
          >
            <span className={bank ? "p-small-regular" : "p-small-regular text-grey-4"}>
              {bank || "은행 선택"}
            </span>
            <img
              src={downDropIcon}
              className={`transition-transform ${isBankOpen ? "rotate-180" : ""}`}
              alt="은행 선택"
            />
          </button>

          {isBankOpen && (
            <ul className="absolute z-10 mt-[5px] w-full max-h-[300px] overflow-y-auto flex flex-col list-none bg-white border border-grey-3 rounded-[5px] p-0">
              {BANK_LIST.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setBank(option);
                    setIsBankOpen(false);
                  }}
                  className={`cursor-pointer px-[1.25rem] py-[10px] p-small-regular hover:bg-grey-1 ${
                    bank === option ? "p-small-bold" : "text-grey-6"
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <AuthInputField
          placeholder="계좌번호를 입력해주세요."
          value={accountNumber}
          onChange={(event) => {
            setAccountNumber(event.target.value.replace(/[^0-9]/g, ""));
          }}
        />
      </div>
      <AuthInputField
        placeholder="예금주명을 입력해주세요."
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />

      <div className="j-content-end" id="btn-wrap">
        <SmallOnOffBtn onClick={() => navigate(`${prefix}/mypage/info`)} color="white">
          취소하기
        </SmallOnOffBtn>
        <SmallOnOffBtn
          type="submit"
          disabled={onChangeDisableCondition()}
          onClick={onClickCompleteBtn}
          color="purple"
        >
          수정하기
        </SmallOnOffBtn>
      </div>
    </div>
  );
};

export default AccountInfoChangeAccount;
