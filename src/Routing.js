import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import PolicyBar from "./pages/footer/PolicyBar";
import SignUpDefault from "./pages/auth/SignUpDefault";
import SignUpSuccess from "./pages/auth/SignUpSuccess";
import SignIn from "./pages/auth/SignIn";
import FindBar from "./pages/auth/FindBar";
import List from "./pages/work/List";
import Detail from "./pages/work/Detail";
import PostWork from "./pages/work/PostWork";
import Purchase from "./pages/payment/Purchase";
import PurchaseSuccess from "./pages/payment/PurchaseSuccess";
import Abort from "./pages/payment/Abort";
import PurchasedScript from "./pages/myPage/PurchasedScript";
import PerformanceInfo from "./pages/myPage/PerformanceInfo";
import PerformanceRefund from "./pages/myPage/PerformanceRefund";
import ScriptManage from "./pages/myPage/ScriptManage";
import ScriptManageDetail from "./pages/myPage/ScriptManageDetail";
import AskedPerformManage from "./pages/myPage/AskedPerformManage";
import AccountInfoChange from "./pages/myPage/AccountInfoChange";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";

function Routing() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/policy/:id" element={<PolicyBar />} />

            <Route path="/signup" element={<SignUpDefault />} />
            <Route path="/signup/success" element={<SignUpSuccess />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signin/find/:id" element={<FindBar />} />

            <Route path="/list" element={<List />} />
            {/*<Route path="/list/detail/:id" element={<Detail />} />*/}
            <Route path="/list/detail/:id" element={<Detail testFlag={1} />} />
            <Route path="/list/detail/v2/:id" element={<Detail testFlag={0} />} />

            <Route path="/purchase/:id" element={<ProtectedRoute element={<Purchase />} />} />
            <Route
              path="/purchase/success"
              element={<ProtectedRoute element={<PurchaseSuccess />} />}
            />
            <Route path="/purchase/abort" element={<ProtectedRoute element={<Abort />} />} />
            <Route path="/post" element={<PostWork />} />

            <Route
              path="/mypage/purchased"
              element={<ProtectedRoute element={<PurchasedScript />} />}
            />
            <Route
              path="/mypage/purchased/performance-info/:id"
              element={<ProtectedRoute element={<PerformanceInfo />} />}
            />
            <Route
              path="/mypage/purchased/performance-refund/:id"
              element={<ProtectedRoute element={<PerformanceRefund />} />}
            />
            <Route
              path="/mypage/scriptmanage"
              element={<ProtectedRoute element={<ScriptManage />} />}
            />
            <Route
              path="/mypage/scriptmanage/detail/:id"
              element={<ProtectedRoute element={<ScriptManageDetail />} />}
            />
            <Route path="/mypage/scriptmanage/askedperform/:id" element={<AskedPerformManage />} />
            <Route
              path="/mypage/infochange"
              element={<ProtectedRoute element={<AccountInfoChange />} />}
            />

            <Route path="*" element={<NotFound />} />

            {/* 테스트용 routing */}
            <Route path="/test/loading" element={<Loading />} />
            <Route path="/test/404" element={<NotFound />} />
            <Route path="/test/signup" element={<SignUpDefault />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
