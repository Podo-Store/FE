// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";

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
import SignInDialog from "./components/auth/SignInDialog";

import PostGallery from "./pages/work/postList/PostGallery";

import Detail from "./pages/work/Detail.tsx";
import ReviewWrite from "./pages/work/review/reviewWrite";

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

import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";
import PerformedWork from "./pages/work/review/performedWork/performedWork";
import CompanyProfile from "./pages/company/companyProfile";

import BrowserWarning from "./components/BrowserWarning";

import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";
import "./styles/colors.css";
// import "./styles/text.css";
import "./styles/utilities.css";

function App() {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="App">
      {/* <BrowserWarning /> */}

      <Routes location={state?.background ?? location}>
        <Route path="/company" element={<CompanyProfile />} />

        <Route path="/" element={<DefaultLayout />}>
          <Route path="admin/scriptManage" element={<AdminSwitch page={0} />} />
          <Route path="admin/orderManage" element={<AdminSwitch page={1} />} />
          <Route
            path="admin/statisticManage"
            element={<AdminSwitch page={2} />}
          />

          <Route index element={<MainVer2 />} />
          <Route path="v1" element={<MainVer1 />} />

          {/* <Route path="list" element={<List />} /> */}

          <Route element={<MarginLayout />}>
            <Route path="signup" element={<SignUpDefault />} />
            <Route path="signup/success" element={<SignUpSuccess />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signin/v2" element={<SignInV2 />} />
            <Route path="signin/find/:id" element={<FindBar />} />
            <Route path="list" element={<PostGallery />} />
            <Route path="list/detail/:id" element={<Detail />} />
            <Route path="list/view/:id" element={<PostView />} />
            <Route path="list/review/:id" element={<ReviewWrite />} />
            <Route path="policy/:id" element={<PolicyBar />} />

            <Route
              path="purchase/success"
              element={<ProtectedRoute element={<PurchaseSuccess />} />}
            />
            <Route
              path="purchase/abort"
              element={<ProtectedRoute element={<Abort />} />}
            />
            <Route
              path="purchase/:id"
              element={<ProtectedRoute element={<Purchase />} />}
            />
            <Route path="post" element={<PostWork />} />
            <Route
              path="mypage/purchased/performance-info/:id"
              element={<ProtectedRoute element={<PerformanceInfo />} />}
            />
            <Route
              path="mypage/purchased/performance-refund/:id"
              element={<ProtectedRoute element={<PerformanceRefund />} />}
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
            <Route
              path="mypage/scriptmanage"
              element={<ProtectedRoute element={<ScriptManage />} />}
            />
            <Route
              path="mypage/liked"
              element={<ProtectedRoute element={<LikedWorks />} />}
            />
            <Route
              path="mypage/purchased"
              element={<ProtectedRoute element={<PurchasedScript />} />}
            />
            <Route path="/performedWork" element={<PerformedWork />} />
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
        </Routes>
      )}
    </div>
  );
}

export default App;
