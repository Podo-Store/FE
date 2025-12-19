# AccountInfo 모듈 구조 문서

## 📁 디렉토리 구조

```
AccountInfo/
├── AccountInfo.tsx                    # 메인 회원 정보 페이지
├── AccountInfoChange.jsx              # [Deprecated] 구버전 회원 정보 변경 페이지
├── AccountInfoChange.css              # 스타일 파일
│
├── AccountInfoChange/                 # 회원 정보 변경 모듈
│   ├── ChangeWrapper.tsx              # 회원 정보 변경 래퍼 컴포넌트
│   ├── ChangeNickname.tsx             # 닉네임 변경 컴포넌트
│   ├── ChangeEnter.jsx                # 비밀번호 변경 진입 페이지 (비밀번호 확인)
│   ├── ChangePassword.jsx             # 비밀번호 변경 컴포넌트
│   └── ChangeEnter.scss               # 비밀번호 변경 진입 스타일
│   ├── ChangePassword.scss            # 비밀번호 변경 스타일
│
└── AccountDelete/                     # 계정 삭제 모듈
    ├── AccountDeleteWrapper.tsx       # 계정 삭제 래퍼 컴포넌트
    ├── AccountDelete.jsx              # 계정 삭제 확인 컴포넌트
    ├── AccountDeleteSuccess.jsx       # 계정 삭제 완료 컴포넌트
    ├── AccountDelete.scss             # 계정 삭제 스타일
    └── AccountDeleteSuccess.scss      # 계정 삭제 완료 스타일
```

## 세부 구조

- `ChangeWrapper.tsx`, `AccountDeleteWrapper.tsx` 래퍼 컴포넌트: 페이지 진입 지점
  ```html
  <Route path="mypage/delete" element="{<ProtectedRoute" element="{<AccountDeleteWrapper" />} />} />
  <Route
    path="mypage/info/nickname"
    element="{<ProtectedRoute"
    element="{<AccountInfoChangeWrapper"
    type="nickname"
  />} />} />
  <Route
    path="mypage/info/password"
    element="{<ProtectedRoute"
    element="{<AccountInfoChangeWrapper"
    type="password"
  />} />} />
  ```
- 나머지 컴포넌트에서 세부 렌더링 진행
