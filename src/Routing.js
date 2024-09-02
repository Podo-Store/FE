import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

import SignUp from "./pages/auth/SignUp";
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
import ScriptManage from "./pages/myPage/ScriptManage";
import ScriptManageDetail from "./pages/myPage/ScriptManageDetail";
import AccountInfoChange from "./pages/myPage/AccountInfoChange";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/routes/ProtectedRoute";

import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";

function Routing() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/success" element={<SignUpSuccess />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signin/find" element={<FindBar />} />

            <Route path="/list" element={<List />} />
            <Route path="/list/detail/:id" element={<Detail />} />
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
              path="/mypage/scriptmanage"
              element={<ProtectedRoute element={<ScriptManage />} />}
            />
            <Route
              path="/mypage/scriptmanage/detail/:id"
              element={<ProtectedRoute element={<ScriptManageDetail />} />}
            />
            <Route
              path="/mypage/infochange"
              element={<ProtectedRoute element={<AccountInfoChange />} />}
            />

            {/* 테스트용 routing */}
            <Route path="/test/loading" element={<Loading />} />
            <Route path="/test/404" element={<NotFound />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
