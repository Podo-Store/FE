import { useNavigate } from "react-router-dom";

import AdminOrderManage from "../../components/admin/AdminOrderManage";
import AdminScriptManage from "../../components/admin/AdminScriptManage";

import "./AdminSwitch.css";

const AdminSwitch = ({ page = 0 }) => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center w-full">
      <div className="admin-switch">
        <div className="d-flex switch-bar">
          <h1
            className={`h1-bold c-pointer  ${page === 0 ? "c-black" : "c-grey"}`}
            onClick={() => {
              navigate("/admin/scriptManage");
            }}
          >
            작품 관리
          </h1>
          <h1
            className={`h1-bold c-pointer ${page === 1 ? "c-black" : "c-grey"}`}
            onClick={() => {
              navigate("/admin/orderManage");
            }}
          >
            주문 관리
          </h1>
        </div>

        <div style={{ padding: "20px" }}>
          {page === 0 ? <AdminScriptManage /> : <AdminOrderManage />}
        </div>
      </div>
    </main>
  );
};

export default AdminSwitch;
