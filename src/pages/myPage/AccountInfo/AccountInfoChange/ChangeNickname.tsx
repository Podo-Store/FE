import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/api";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { NAME_FORMAT_REGEX, NAME_LENGTH_REGEX } from "@/constants/regex";
import EnterForm from "@/components/EnterForm";
import PartialLoading from "@/components/loading/PartialLoading";
import { AuthInputField } from "@/components/inputField";
import SmallOnOffBtn from "@/components/button/RoundBtn_135_40.jsx";
import { AxiosError } from "axios";

const AccountInfoChangeNickname = () => {
  // prevName: 수정 전 닉네임(placeholder)
  const [name, setName] = useState("");
  const [nameChecker, setNameChecker] = useState({
    show: false,
    format: false,
    length: false,
  });
  const [nameDuplicated, setNameDuplicated] = useState(false);
  const [hasClickedNameInputFlag, setHasClickedNameInputFlag] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const { isSmallMobile } = useWindowDimensions().widthConditions;

  const navigate = useNavigate();

  useEffect(() => {
    const checker = {
      ...nameChecker,
      format: NAME_FORMAT_REGEX.test(name),
      length: NAME_LENGTH_REGEX.test(name),
    };
    setNameChecker(checker);

    // 길이가 0일 경우 format 체크를 해제
    if (name.length === 0) {
      setNameChecker({ ...nameChecker, format: false });
    }

    // name이 바뀔 때, 만약 '입력을 위해' 클릭이 된 상황일 경우 중복 체크를 해제
    if (hasClickedNameInputFlag) {
      setNameDuplicated(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, hasClickedNameInputFlag]);

  const checkNameDuplicated = async (name: string) => {
    // 닉네임 중복 체크 API 연결
    try {
      const response = await api.post(`/auth/checkNickname`, {
        nickname: name,
      });
      if (response.data === true) {
        setNameDuplicated(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.error === "닉네임 중복") {
          setNameDuplicated(true);
        }
      } else {
        alert("오류가 발생했습니다.");
      }
    }
  };

  const onChangeDisableCondition = () => {
    // 이름이 빈칸일 때 비활성화
    if (!name) {
      return true;
    }

    // 유효성 검사 실패 시 비활성화
    if (!nameChecker.format || !nameChecker.length) {
      return true;
    }

    // 중복 닉네임일 때 비활성화
    if (nameDuplicated) {
      return true;
    }

    return false;
  };

  const onClickCompleteBtn = async () => {
    // 모든 필드가 공란일 경우
    if (!name) {
      window.location.reload();
      return;
    }
    // 닉네임 입력 시, 유효성 검사
    if (name) {
      if (!nameChecker.format || !nameChecker.length) {
        alert("닉네임을 확인해주세요.");
        return;
      }
    }

    try {
      await api.patch("/profile/updateNickname", {
        nickname: name || "",
      });

      alert("닉네임 변경이 완료되었습니다.");
      // 닉네임 변경 사항 세션 반영
      localStorage.removeItem("userNickname");
      localStorage.setItem("userNickname", name || "");

      navigate("/mypage/info");
    } catch (error) {
      // 중복 닉네임 처리
      if (error instanceof AxiosError) {
        if (error.response?.data.error === "이미 존재하는 닉네임") {
          setNameDuplicated(true);
        } else {
          alert(error.response?.data.error);
        }
      } else {
        alert("오류가 발생했습니다.");
      }
    }
  };

  if (isLoading) {
    return <PartialLoading />;
  }

  return (
    <EnterForm onSubmit={onClickCompleteBtn}>
      <div className="info-change-main">
        <div className="flex flex-col gap-[45px] mb-[36px]">
          <p className="p-medium-bold sm:h4-bold">닉네임 변경</p>
          <p className="p-medium-medium">새로운 닉네임을 입력해주세요.</p>
        </div>

        <AuthInputField
          placeholder="닉네임을 입력해주세요."
          value={name}
          onClick={() => {
            setNameChecker({ ...nameChecker, show: true });
            setHasClickedNameInputFlag(true);
          }}
          onChange={(event) => {
            setName(event.target.value);
          }}
          onBlur={() => {
            setNameChecker({ ...nameChecker, show: false });
            setHasClickedNameInputFlag(false);
            checkNameDuplicated(name);
          }}
          checkerShowFlag={nameChecker.show}
          checkerMessages={[
            {
              checkedFlag: nameChecker.format,
              message: "한글, 영어, 숫자만 사용 가능해요.",
            },
            { checkedFlag: nameChecker.length, message: "3 ~ 8자만 가능해요." },
          ]}
          errorFlag={nameDuplicated}
          errorMessage="중복된 닉네임입니다."
          fontMode={isSmallMobile ? "12" : "default"}
          style={{
            width: "100%",
            ...(isSmallMobile ? { height: "48px" } : {}),
          }}
        />

        <div className="j-content-end" id="btn-wrap">
          <SmallOnOffBtn
            onClick={() => {
              window.location.reload();
            }}
            color="white"
          >
            취소
          </SmallOnOffBtn>
          <SmallOnOffBtn
            type="submit"
            disabled={onChangeDisableCondition()}
            onClick={onClickCompleteBtn}
            color="purple"
          >
            수정 완료
          </SmallOnOffBtn>
        </div>
      </div>
    </EnterForm>
  );
};

export default AccountInfoChangeNickname;
