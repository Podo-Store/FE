import { useEffect, useState } from "react";
import MyPageMenu from "../../components/myPage/MyPageMenu";
import Footer from "../Footer";
import MainNav from "../MainNav";
import InputField from "./../../components/auth/InputField.jsx";
import "./AccountInfoChange.css";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../components/constants/ServerURL.js";

const AccountInfoChange = () => {
  const [changeShowPermission, setChangeShowPermission] = useState(false);
  const [typedPassword, setTypedPassword] = useState("");

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");

  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const [nickNameValid, setNickNameValid] = useState(false);

  const [hasCompleteBtnClicked, setHasCompleteBtnClicked] = useState(false);

  const handleInputBtn = async () => {
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
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,11}$/;
    if (regex.test(pw)) {
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
  }, [pwCheck]);

  useEffect(() => {
    const regex = /^[가-힣a-zA-Z0-9]{3,8}$/;
    if (regex.test(nickName)) {
      setNickNameValid(true);
    } else {
      setNickNameValid(false);
    }
  }, [nickName]);
  /*
   * 미리 띄워줘야 할 정보 구분
   * id: 보여줌, 수정 불가
   * pw: 공란, text ? password? 일단 password로
   * pwCheck: 공란, password
   * nickname: 보여줌
   * email: 보여줌, 수정 불가
   */
  return (
    <div className="account-info-change">
      <MainNav />
      <div className="account-info-change-wrap">
        <MyPageMenu nickname="nickname" currentPage="2" />
        <div className="content-side">
          <div className="content-side-inside">
            <h1>회원 정보 수정</h1>
            {!changeShowPermission ? (
              <div>
                {/* 진입 페이지 */}
                <h6>회원 정보 수정을 위해서 비밀번호를 다시 한번 입력해주세요.</h6>
                <div className="inputField-wrap">
                  <InputField
                    type="password"
                    placeholder="비밀번호 입력"
                    value={typedPassword}
                    onChange={(event) => {
                      setTypedPassword(event.target.value);
                    }}
                  ></InputField>
                  {/* TODO: InsideBtn 대신 해당 컴포넌트 분리 및 사용 */}
                  <button className="input-btn" onClick={handleInputBtn}>
                    입력
                  </button>
                </div>
              </div>
            ) : (
              <div className="change-page">
                {/* 수정 페이지 */}
                <InputField
                  title="아이디"
                  type="text"
                  className="input"
                  placeholder="podostore"
                  value={id}
                  errorMessage=" "
                  readOnly={true}
                />

                <InputField
                  title="비밀번호"
                  type="password"
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
                <InputField
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
                <InputField
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
                  // TODO: API 연결 후 '닉네임 중복' 받을 경우 true로 변경
                  isDuplicated={false}
                  showErrorMsg={hasCompleteBtnClicked}
                />
                <InputField
                  title="이메일"
                  type="text"
                  placeholder="podo@store.com"
                  value={email}
                  readOnly={true}
                />

                <div className="btn-wrap">
                  <button>취소</button>
                  <button>계정 삭제</button>
                </div>
                <div className="complete-btn-wrap">
                  <button id="complete-btn">수정 완료</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountInfoChange;
