import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useState } from "react";

import FloatingBtn from "@/components/button/FloatingBtn";
import PartialLoading from "../../components/loading/PartialLoading";
import {
  MyPageMenu,
  ScriptContent,
  ScriptManageBtn,
  NullScriptContent,
} from "../../components/myPage";

import { useRequest } from "../../hooks/useRequest";

import AuthContext from "../../contexts/AuthContext";

import { SERVER_URL } from "../../constants/ServerURL";

import "./MyPageContentsDefault.scss";

const ScriptManage = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userNickname } = useContext(AuthContext);

  const [isNull, setIsNull] = useState(false);

  useRequest(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}profile/work`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      if (response.data.dateWorks.length === 0) {
        setIsNull(true);
      }
      setProductList(response.data.dateWorks);
    } catch (error) {
      alert("오류가 발생했습니다.");
    }
    setIsLoading(false);
  });

  return (
    <div className="myPage-contents-default">
      <FloatingBtn />

      <div className="myPage-contents-default-wrap">
        <MyPageMenu nickname={userNickname} currentPage="1" />
        <div className="content-side">
          <h1>등록한 작품들을 관리할 수 있어요!</h1>

          <div style={{ height: "3.889vh" }}></div>

          {isLoading ? (
            <PartialLoading />
          ) : !isNull ? (
            productList.map((order, index) => (
              <ScriptContent
                order={order}
                index={index}
                currentPage="1"
                Button={ScriptManageBtn}
                isRoute={true}
              />
            ))
          ) : (
            <NullScriptContent currentPage={1} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScriptManage;
