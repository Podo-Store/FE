// App.jsx
import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import AuthorLayout from "./layouts/AuthorLayout";
import MarginLayout from "./layouts/MarginLayout";

import MainVer1 from "./pages/MainVer1";
import MainVer2 from "./pages/MainVer2";
import PolicyBar from "./pages/footer/PolicyBar";
import AdminSwitch from "./pages/admin/AdminSwitch";
import SignUpDefault from "./pages/auth/SignUpDefault";
import SignUpSuccess from "./pages/auth/SignUpSuccess";
import SignIn from "./pages/auth/SignIn";
import SignInV2 from "./pages/auth/SignInV2";
import FindBar from "./pages/auth/FindBar";
import SignInDialog from "./components/auth/SignInDialog";
import OAuthCallback from "./components/auth/OAuthCallback";

import PostGallery from "./pages/work/postList/PostGallery";
import ReviewWrite from "./pages/work/review/reviewWrite";

import PostWork from "./pages/work/PostWork";
import Purchase from "./pages/payment/Purchase";
import PurchaseSuccess from "./pages/payment/PurchaseSuccess";
// import PurchaseRedirect from "./pages/payment/PurchaseRedirect";
import Abort from "./pages/payment/Abort";
import PurchasedScript from "./pages/myPage/PurchasedScript";
import PerformanceInfo from "./pages/myPage/PerformanceInfo";
import PerformanceRefund from "./pages/myPage/PerformanceRefund";
import ScriptManage from "./pages/myPage/ScriptManage";

//Ver 1.1.0
// import ScriptManageDetail from "./pages/myPage/ScriptManageDetail";
// import List from "./pages/work/List";

//Ver 2.2.0
import ScriptManageDetail from "./pages/myPage/PostManage/PostManageDetail";

import AskedPerformManage from "./pages/myPage/AskedPerformManage";
import AccountInfoChange from "./pages/myPage/AccountInfo/AccountInfoChange";
import LikedWorks from "./pages/myPage/Liked/LikedWorks";

import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";
import PerformedWork from "./pages/work/review/performedWork/performedWork";
import PerformanceNews from "./pages/performanceNews/performanceNews";
import AddPerformanceNews from "./pages/performanceNews/addPerformanceNews";
import CompanyProfile from "./pages/company/companyProfile";

import BrowserWarning from "./components/BrowserWarning";

import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";
import "./styles/colors.css";
// import "./styles/text.css";
import "./styles/utilities.css";
import AccountInfo from "./pages/myPage/AccountInfo/AccountInfo";
import AuthorAccountInfo from "./pages/myPage/AccountInfo/AuthorAccountInfo";
import AccountDeleteWrapper from "./pages/myPage/AccountInfo/AccountDelete/AccountDeleteWrapper";
import AccountInfoChangeWrapper from "./pages/myPage/AccountInfo/AccountInfoChange/ChangeWrapper";

const Detail = lazy(() => import("./pages/work/Detail.tsx"));
const PostView = lazy(() => import("./pages/work/PostView"));

function App() {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="App">
      {/* <BrowserWarning /> */}

      <Routes location={state?.background ?? location}>
        <Route path="/company" element={<CompanyProfile />} />

        <Route path="/author" element={<AuthorLayout />}>
          <Route index element={<MainVer2 />} />
          <Route path="post" element={<PostWork />} />

          {/* 작가 마이페이지 */}
          <Route path="mypage/scriptmanage" element={<ProtectedRoute><ScriptManage /></ProtectedRoute>} />
          <Route path="mypage/scriptmanage/detail/:scriptId" element={<ProtectedRoute><ScriptManageDetail /></ProtectedRoute>} />
          <Route path="mypage/scriptmanage/askedperform/:id" element={<ProtectedRoute><AskedPerformManage /></ProtectedRoute>} />

          {/* 공용 - 회원정보 */}
          <Route path="mypage/info" element={<ProtectedRoute><AuthorAccountInfo /></ProtectedRoute>} />
          <Route path="mypage/delete" element={<ProtectedRoute><AccountDeleteWrapper /></ProtectedRoute>} />
          <Route path="mypage/info/nickname" element={<ProtectedRoute><AccountInfoChangeWrapper type="nickname" /></ProtectedRoute>} />
          <Route path="mypage/info/password" element={<ProtectedRoute><AccountInfoChangeWrapper type="" /></ProtectedRoute>} />
          <Route path="mypage/infochange" element={<AccountInfoChange />} />

          {/* 공용 - 인증 */}
          <Route path="signup" element={<SignUpDefault />} />
          <Route path="signup/success" element={<SignUpSuccess />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signin/find/:id" element={<FindBar />} />
          <Route path="auth/callback" element={<OAuthCallback />} />

          {/* 공용 - 약관 */}
          <Route path="policy/:id" element={<PolicyBar />} />
        </Route>

        <Route path="/" element={<DefaultLayout />}>
          <Route path="admin/scriptManage" element={<AdminSwitch page={0} />} />
          <Route path="admin/orderManage" element={<AdminSwitch page={1} />} />
          <Route path="admin/statisticManage" element={<AdminSwitch page={2} />} />

          <Route index element={<PostGallery />} />
          <Route path="v1" element={<MainVer1 />} />

          <Route path="signup" element={<SignUpDefault />} />
          <Route path="signup/success" element={<SignUpSuccess />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signin/v2" element={<SignInV2 />} />
          <Route path="signin/find/:id" element={<FindBar />} />
          <Route path="auth/callback" element={<OAuthCallback />} />

          <Route
            path="detail/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Detail />
              </Suspense>
            }
          />
          <Route
            path="view/:id"
            element={
              <Suspense fallback={<Loading />}>
                <PostView />
              </Suspense>
            }
          />
          <Route path="review/:id" element={<ReviewWrite />} />
          <Route
            path="purchase/:id"
            element={
              <ProtectedRoute>
                <Purchase />
              </ProtectedRoute>
            }
          />

          <Route
            path="mypage/liked"
            element={
              <ProtectedRoute>
                <LikedWorks />
              </ProtectedRoute>
            }
          />
          <Route
            path="mypage/purchased"
            element={
              <ProtectedRoute>
                <PurchasedScript />
              </ProtectedRoute>
            }
          />
          <Route
            path="mypage/purchased/performance-refund/:id"
            element={
              <ProtectedRoute>
                <PerformanceRefund />
              </ProtectedRoute>
            }
          />
          <Route
            path="mypage/purchased/performance-info/:id"
            element={
              <ProtectedRoute>
                <PerformanceInfo />
              </ProtectedRoute>
            }
          />

          <Route
            path="mypage/info"
            element={
              <ProtectedRoute>
                <AccountInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="mypage/delete"
            element={
              <ProtectedRoute>
                <AccountDeleteWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="mypage/info/nickname"
            element={
              <ProtectedRoute>
                <AccountInfoChangeWrapper type="nickname" />
              </ProtectedRoute>
            }
          />
          <Route
            path="mypage/info/password"
            element={
              <ProtectedRoute>
                <AccountInfoChangeWrapper type="" />
              </ProtectedRoute>
            }
          />

          <Route element={<MarginLayout />}>
            <Route path="policy/:id" element={<PolicyBar />} />

            <Route
              path="purchase/success"
              element={
                <ProtectedRoute>
                  <PurchaseSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="purchase/abort"
              element={
                <ProtectedRoute>
                  <Abort />
                </ProtectedRoute>
              }
            />
            <Route path="mypage/infochange" element={<AccountInfoChange />} />
            <Route path="/performanceNews" element={<PerformanceNews />} />

            <Route
              path="/performanceNews/edit/:id"
              element={
                <ProtectedRoute>
                  <AddPerformanceNews mode="edit" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/performanceNews/register"
              element={
                <ProtectedRoute>
                  <AddPerformanceNews mode="create" />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/performedWork" element={<PerformedWork />} /> */}
            <Route path="*" element={<NotFound />} />
            {/* 테스트용 routing */}
            <Route path="test/loading" element={<Loading />} />
            <Route path="test/404" element={<NotFound />} />
            <Route path="test/signup" element={<SignUpDefault />} />
            <Route path="test/delete" element={<AccountInfoChange />} />
          </Route>
        </Route>
      </Routes>

      {state?.background && (
        <Routes>
          <Route path="/signin" element={<SignInDialog />} />
          <Route path="/author/signin" element={<SignInDialog />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
