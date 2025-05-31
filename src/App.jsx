// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
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

import PostGallery from "./pages/work/postList/PostGallery";
import PostGalleryShort from "./pages/work/postList/PostGalleryShort";
import PostGalleryLong from "./pages/work/postList/PostGalleryLong";
import Detail from "./pages/work/Detail";
import PostView from "./pages/work/PostView";
import PostWork from "./pages/work/PostWork";
import Purchase from "./pages/payment/Purchase";
import PurchaseSuccess from "./pages/payment/PurchaseSuccess";
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
import AccountInfoChange from "./pages/myPage/AccountInfoChange";
import LikedWorks from "./pages/myPage/Liked/LikedWorks";
import LikedLong from "./pages/myPage/Liked/LikedLong";
import LikedShort from "./pages/myPage/Liked/LikedShort";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";

import BrowserWarning from "./components/BrowserWarning";

import ProtectedRoute from "./routes/ProtectedRoute";

import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";
import "./styles/colors.css";
import "./styles/text.css";
import "./styles/utilities.css";

function App() {
  return (
    <div className="App">
      <BrowserWarning />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route
                path="admin/scriptManage"
                element={<AdminSwitch page={0} />}
              />
              <Route
                path="admin/orderManage"
                element={<AdminSwitch page={1} />}
              />

              <Route index element={<MainVer2 />} />
              <Route path="v1" element={<MainVer1 />} />

              <Route path="signup" element={<SignUpDefault />} />
              <Route path="signup/success" element={<SignUpSuccess />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signin/v2" element={<SignInV2 />} />
              <Route path="signin/find/:id" element={<FindBar />} />

              {/* <Route path="list" element={<List />} /> */}
              <Route path="list" element={<PostGallery />} />
              <Route path="list/long" element={<PostGalleryLong />} />
              <Route path="list/short" element={<PostGalleryShort />} />
              <Route path="list/detail/:id" element={<Detail />} />
              <Route path="list/view/:id" element={<PostView />} />
              <Route
                path="purchase/:id"
                element={<ProtectedRoute element={<Purchase />} />}
              />

              <Route element={<MarginLayout />}>
                <Route path="policy/:id" element={<PolicyBar />} />

                <Route
                  path="purchase/success"
                  element={<ProtectedRoute element={<PurchaseSuccess />} />}
                />
                <Route
                  path="purchase/abort"
                  element={<ProtectedRoute element={<Abort />} />}
                />
                <Route path="post" element={<PostWork />} />

                <Route
                  path="mypage/liked"
                  element={<ProtectedRoute element={<LikedWorks />} />}
                />
                <Route
                  path="mypage/liked/long"
                  element={<ProtectedRoute element={<LikedLong />} />}
                />
                <Route
                  path="mypage/liked/short"
                  element={<ProtectedRoute element={<LikedShort />} />}
                />
                <Route
                  path="mypage/purchased"
                  element={<ProtectedRoute element={<PurchasedScript />} />}
                />
                <Route
                  path="mypage/purchased/performance-info/:id"
                  element={<ProtectedRoute element={<PerformanceInfo />} />}
                />
                <Route
                  path="mypage/purchased/performance-refund/:id"
                  element={<ProtectedRoute element={<PerformanceRefund />} />}
                />
                <Route
                  path="mypage/scriptmanage"
                  element={<ProtectedRoute element={<ScriptManage />} />}
                />
                <Route
                  path="mypage/scriptmanage/detail/:scriptId"
                  element={<ProtectedRoute element={<ScriptManageDetail />} />}
                />
                <Route
                  path="mypage/scriptmanage/askedperform/:id"
                  element={<AskedPerformManage />}
                />
                <Route
                  path="mypage/infochange"
                  element={<ProtectedRoute element={<AccountInfoChange />} />}
                />

                <Route path="*" element={<NotFound />} />

                {/* 테스트용 routing */}
                <Route path="test/loading" element={<Loading />} />
                <Route path="test/404" element={<NotFound />} />
                <Route path="test/signup" element={<SignUpDefault />} />
                <Route path="test/delete" element={<AccountInfoChange />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
