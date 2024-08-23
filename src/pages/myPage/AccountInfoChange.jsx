import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainNav from "../MainNav";
import Footer from "../Footer";

import MyPageMenu from "../../components/myPage/MyPageMenu";
import InputField from "./../../components/auth/InputField";
import EnterForm from "../../components/EnterForm";
import AuthInputField from "../../components/inputField/AuthInputField/AuthInputField";
import AuthPWInputField from "./../../components/inputField/AuthInputField/AuthPwInputField.jsx";

import AuthContext from "../../contexts/AuthContext";

import { SERVER_URL } from "../../constants/ServerURL";
import { PW_REGEX } from "../../constants/passwordRegex";

import check from "../../assets/image/myPage/check.svg";

import "./AccountInfoChange.css";
import "./AccountInfoChange_delete.css";
import AuthSideBtnInputField from "../../components/inputField/AuthInputField/AuthSideBtnInputField/AuthSideBtnInputField.jsx";

const AccountInfoChange = () => {
  let page;

  // 회원 정보 수정 진입
  const [changeShowPermission, setChangeShowPermission] = useState(false);
  const [typedPassword, setTypedPassword] = useState("");

  // 회원 정보 수정
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");

  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const [nickNameValid, setNickNameValid] = useState(false);

  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState(false);

  const [hasCompleteBtnClicked, setHasCompleteBtnClicked] = useState(false);

  // 계정 삭제
  const [isDeleteAccountBtnClicked, setIsDeleteAccountBtnClicked] = useState(false);
  const [isAccountSuccessfullyDeleted, setIsAccountSuccessfullyDeleted] = useState(false);

  const { userNickname } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickInputBtn = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}profile/confirm`,
        {
          password: typedPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      if (response.data === true) {
        setChangeShowPermission(true);
        fetchAccountInfo();
      }
    } catch (error) {
      if (error.response.data.error === "비밀번호 불일치") {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        alert("오류가 발생했습니다.");
      }
    }
  };

  const fetchAccountInfo = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}profile/account`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setId(response.data.userId);
      setNickName(response.data.nickname);
      setEmail(response.data.email);
    } catch (error) {
      alert("회원 정보 조회 실패");
    }
  };

  useEffect(() => {
    if (PW_REGEX.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }, [pw]);

  useEffect(() => {
    if (pw === pwCheck) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  }, [pw, pwCheck]);

  useEffect(() => {
    const regex = /^[가-힣a-zA-Z0-9]{3,8}$/;
    if (regex.test(nickName)) {
      setNickNameValid(true);
    } else {
      setNickNameValid(false);
    }
  }, [nickName]);

  const onClickCompleteBtn = async () => {
    // initialize
    setHasCompleteBtnClicked(false);
    if (!pwValid || !pwCheckValid || !nickNameValid) {
      setHasCompleteBtnClicked(true);
      if (!pwValid) {
        alert("비밀번호를 확인해주세요.");
      } else if (!pwCheckValid) {
        alert("재입력된 비밀번호를 확인해주세요.");
      } else if (!nickNameValid) {
        alert("닉네임을 확인해주세요.");
      }
    } else {
      try {
        await axios.post(
          `${SERVER_URL}profile/update`,
          {
            password: pw,
            confirmPassword: pwCheck,
            nickname: nickName,
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );

        alert("회원 정보 수정이 완료되었습니다.");
        window.location.reload();
      } catch (error) {
        // 중복 닉네임 처리
        if (error.response.data.error === "이미 존재하는 닉네임") {
          setIsDuplicatedNickname(true);
          // 오류 메시지 표시
          setHasCompleteBtnClicked(true);
        } else {
          alert(error.response.data.error);
        }
      }
    }
  };

  // 회원 탈퇴
  const onClickDeleteAccountConfirm = async () => {
    try {
      await axios.delete(`${SERVER_URL}auth/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      alert("계정이 성공적으로 삭제되었습니다.");
      setIsAccountSuccessfullyDeleted(true);
    } catch (error) {
      alert("회원 탈퇴 실패");
    }
  };

  return (
    <div className="account-info-change">
      <MainNav />
      <div className="account-info-change-wrap">
        <MyPageMenu nickname={userNickname} currentPage="2" />
        <div className="content-side">
          <div className="content-side-inside">
            <h1>회원 정보 수정</h1>
            {!changeShowPermission ? (
              <EnterForm onSubmit={onClickInputBtn}>
                {/* 진입 페이지 */}
                <h6>회원 정보 수정을 위해서 비밀번호를 다시 한번 입력해주세요.</h6>
                <div className="inputField-wrap">
                  <AuthSideBtnInputField
                    type="password"
                    placeholder="비밀번호 입력"
                    value={typedPassword}
                    onChange={(event) => {
                      setTypedPassword(event.target.value);
                    }}
                    sideBtnTitle="입력"
                    sideBtnOnClick={onClickInputBtn}
                  ></AuthSideBtnInputField>
                </div>
              </EnterForm>
            ) : isAccountSuccessfullyDeleted ? (
              <div>
                {/* 계정 삭제 성공 페이지 */}
                <div className="delete-complete-wrap">
                  {/* flex, translate 사용, 배경 하얀색으로 img 배치 */}
                  <div className="delete-complete-box">
                    <p>계정 삭제가 완료되었습니다.</p>
                    <p>그동안 포도상점을 이용해주셔서 진심으로 감사합니다.</p>
                    <p>더욱 성장하는 포도상점이 되겠습니다.</p>
                  </div>
                  <img src={check} alt="check"></img>
                </div>
                <button
                  className="main-page-btn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  메인 페이지
                </button>
              </div>
            ) : isDeleteAccountBtnClicked ? (
              <div>
                {/* 계정 삭제 페이지 */}
                <h6>잠깐! 정말 떠나실 건가요...?</h6>
                <div className="delete-wrap">
                  <p>아래 내용을 확인해주세요.</p>
                  <ul>
                    <li>등록한 작품 및 구매한 작품에 대한 기록이 사라져요.</li>
                    <li>프로필, 희망 대본 신청 내역이 모두 사라져요.</li>
                    <li>구매 작품에 대한 문의사항 및 후기는 삭제되지 않아요.</li>
                  </ul>
                </div>
                <div className="btn-wrap btn-second-wrap">
                  <button
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    취소
                  </button>
                  <button onClick={onClickDeleteAccountConfirm}>회원 탈퇴</button>
                </div>
              </div>
            ) : (
              <EnterForm onSubmit={onClickCompleteBtn}>
                {/* 수정 페이지 */}
                <AuthInputField
                  title="아이디"
                  type="text"
                  className="input"
                  placeholder="podostore"
                  value={id}
                  errorMessage=" "
                  readOnly={true}
                />

                <AuthPWInputField
                  title="비밀번호"
                  placeholder="5~11자 영문, 숫자, 특수문자"
                  value={pw}
                  onChange={(event) => {
                    setPw(event.target.value);
                  }}
                  errorMessage="5~11자의 영문, 숫자, 특수문자를 포함해야 합니다."
                  validMessage="사용 가능한 비밀번호 입니다."
                  isValid={pwValid}
                  showErrorMsg={hasCompleteBtnClicked}
                />
                <AuthInputField
                  title="비밀번호 확인"
                  type="password"
                  placeholder="비밀번호 재입력"
                  value={pwCheck}
                  onChange={(event) => {
                    setPwCheck(event.target.value);
                  }}
                  errorMessage="비밀번호가 일치하지 않습니다."
                  validMessage="비밀번호가 일치합니다."
                  isValid={pwCheckValid}
                  showErrorMsg={hasCompleteBtnClicked}
                />
                <AuthInputField
                  title="닉네임"
                  type="text"
                  placeholder="3~8자의 한글, 영문, 숫자"
                  value={nickName}
                  onChange={(event) => {
                    setNickName(event.target.value);
                  }}
                  errorMessage="3~8자의 한글, 영문, 숫자만 사용 가능합니다."
                  validMessage="사용 가능한 닉네임 입니다."
                  isValid={nickNameValid}
                  isDuplicated={isDuplicatedNickname}
                  showErrorMsg={hasCompleteBtnClicked}
                />
                <AuthInputField
                  title="이메일"
                  type="text"
                  placeholder="podo@store.com"
                  value={email}
                  readOnly={true}
                />

                <div className="btn-wrap">
                  <button
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    취소
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteAccountBtnClicked(true);
                    }}
                  >
                    회원 탈퇴
                  </button>
                </div>
                <div className="complete-btn-wrap">
                  <button id="complete-btn" type="submit" onClick={onClickCompleteBtn}>
                    수정 완료
                  </button>
                </div>
              </EnterForm>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountInfoChange;
