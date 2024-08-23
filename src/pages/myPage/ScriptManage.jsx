import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useState } from "react";

import { useRequest } from "../../hooks/useRequest";

import AuthContext from "../../contexts/AuthContext";

import MainNav from "../MainNav";
import Footer from "../Footer";

import MyPageMenu from "../../components/myPage/MyPageMenu";
import ScriptContent from "../../components/myPage/ScriptContent";
import ScriptManageBtn from "../../components/myPage/ScriptManageBtn";

import { SERVER_URL } from "../../constants/ServerURL";

import "./MyPageContentsDefault.css";

const ScriptManage = () => {
  const [productList, setProductList] = useState([]);
  const { userNickname } = useContext(AuthContext);

  useRequest(async () => {
    try {
      const response = await axios.get(`${SERVER_URL}profile/scripts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setProductList(response.data.productList);
    } catch (error) {
      alert("오류가 발생했습니다.");
    }
  });

  return (
    <div className="myPage-contents-default">
      <MainNav />
      <div className="myPage-contents-default-wrap">
        <MyPageMenu nickname={userNickname} currentPage="1" />
        <div className="content-side">
          <h1>등록한 작품들을 관리할 수 있어요!</h1>
          {productList.map((order, index) => (
            <ScriptContent order={order} index={index} currentPage="1" Button={ScriptManageBtn} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScriptManage;
