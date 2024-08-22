import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./pages/auth/SignUp";
import SignUpSuccess from "./pages/auth/SignUpSuccess";
import SignIn from "./pages/auth/SignIn";
import FindBar from "./pages/auth/FindBar";
import List from "./pages/work/List";
import Detail from "./pages/work/Detail";
import PostWork from "./pages/work/PostWork";
import { AuthProvider } from "./contexts/AuthContext";
import Purchase from "./pages/payment/Purchase";
import PurchasedScript from "./pages/myPage/PurchasedScript";
import PurchaseSuccess from "./pages/payment/PurchaseSuccess";
import AccountInfoChange from "./pages/myPage/AccountInfoChange";
import ScriptManage from "./pages/myPage/ScriptManage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import ScriptManageDetail from "./pages/myPage/ScriptManageDetail";

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

            {/* legacy code
            <Route path="/storemain" element={<StoreMain />} />
            <Route path="/nowplaying" element={<NowPlaying />} />
            <Route path="/scriptregist" element={<ScriptRegist />} />
            <Route path="/applyscript" element={<ApplyScript />} />
            <Route path="/monthauthor" element={<MonthAuthor />} />
            */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
