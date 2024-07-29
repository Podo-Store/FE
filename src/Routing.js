import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./pages/auth/SignUp";
import SignUpSuccess from "./pages/auth/SignUpSuccess";
import SignIn from "./pages/auth/SignIn";
import FindBar from "./pages/auth/FindBar";
import PostWork from "./pages/work/PostWork";
import StoreMain from "./pages/StoreMain/StoreMain";
import NowPlaying from "./pages/NowPlaying";
import ScriptRegist from "./pages/ScriptRegist";
import ApplyScript from "./pages/ApplyScript";
import MonthAuthor from "./pages/MonthAuthor";
import { AuthProvider } from "./contexts/AuthContext";

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

            <Route path="/post" element={<PostWork />} />

            <Route path="/storemain" element={<StoreMain />} />
            <Route path="/nowplaying" element={<NowPlaying />} />
            <Route path="/scriptregist" element={<ScriptRegist />} />
            <Route path="/applyscript" element={<ApplyScript />} />
            <Route path="/monthauthor" element={<MonthAuthor />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
