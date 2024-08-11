import { useEffect, useState } from "react";
import MyPageMenu from "../../components/myPage/MyPageMenu";
import Footer from "../Footer";
import MainNav from "../MainNav";
import InputField from "./../../components/auth/InputField.jsx";
import "./AccountInfoChange.css";

const AccountInfoChange = () => {
  const [changeShowPermission, setChangeShowPermission] = useState(true);
  const [typedPassword, setTypedPassword] = useState("");

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");

  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const [nickNameValid, setNickNameValid] = useState(false);

  const [isCompleteBtnClicked, setIsCompleteBtnClicked] = useState(false);

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
                  <button className="input-btn">입력</button>
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
                  readonly={true}
                />

                <InputField
                  title="비밀번호"
                  type="password"
                  placeholder="5~11자의 영문, 숫자, 특수문자 포함"
                  value={pw}
                  onChange={(event) => {
                    setPw(event.target.value);
                  }}
                  errorMessage="5~11자의 영문, 숫자, 특수문자를 포함해야 합니다."
                  validMessage="사용 가능한 비밀번호 입니다."
                  isValid={pwValid}
                  showErrorMsg={isCompleteBtnClicked}
                />
                <InputField
                  title="비밀번호 확인"
                  type="password"
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  value={pwCheck}
                  onChange={(event) => {
                    setPwCheck(event.target.value);
                  }}
                  errorMessage="비밀번호가 일치하지 않습니다."
                  validMessage="비밀번호가 일치합니다."
                  isValid={pwCheckValid}
                  showErrorMsg={isCompleteBtnClicked}
                />
                <InputField
                  title="닉네임"
                  type="text"
                  placeholder="3~8자의 한글, 영문, 숫자 사용 가능"
                  value={nickName}
                  onChange={(event) => {
                    setNickName(event.target.value);
                  }}
                  errorMessage="3~8자의 한글, 영문, 숫자만 사용 가능합니다."
                  validMessage="사용 가능한 닉네임 입니다."
                  isValid={nickNameValid}
                  // TODO: API 연결 후 '닉네임 중복' 받을 경우 true로 변경
                  isDuplicated={false}
                  showErrorMsg={isCompleteBtnClicked}
                />
                <InputField
                  title="이메일"
                  type="text"
                  placeholder="podo@store.com"
                  value={email}
                  readonly={true}
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
