import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import AdminOrderManage from "../../components/admin/AdminOrderManage";
import AdminScriptManage from "../../components/admin/AdminScriptManage";
import AdminStatisticManage from "../../components/admin/AdminStatisticManage";
const AdminSwitch = ({ page = 0 }) => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center w-full">
      <div className="mt-[70px] w-[1280px]">
        <div className="d-flex gap-[87px] user-select: none;">
          <h1
            className={`h1-bold c-pointer  ${
              page === 0 ? "c-black" : "c-grey"
            }`}
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

          <h1
            className={`h1-bold c-pointer ${page === 2 ? "c-black" : "c-grey"}`}
            onClick={() => {
              navigate("/admin/statisticManage");
            }}
          >
            통계
          </h1>
        </div>

        <div className={clsx(page === 0 && "block", page !== 0 && "hidden")}>
          <AdminScriptManage />
        </div>

        <div className={clsx(page === 1 && "block", page !== 1 && "hidden")}>
          <AdminOrderManage />
        </div>
        <div className={clsx(page === 2 && "block", page !== 2 && "hidden")}>
          <AdminStatisticManage />
        </div>
      </div>
    </main>
  );
};

export default AdminSwitch;
