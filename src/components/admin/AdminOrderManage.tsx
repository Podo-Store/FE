import React, { useState, useEffect } from "react";
import {
  Alert,
  CircularProgress,
  Pagination,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "@/api/api";
import Cookies from "js-cookie";

import TableCellCenter from "./TableCellCenter";

import { formatPrice } from "../../utils/formatPrice";

import { OrderStatus } from "@/types/orderStatus";

import { SERVER_URL } from "@/constants/ServerURL";

interface Order {
  id: number;
  orderDate: string;
  title: string;
  writer: string;
  customer: string;
  orderStatus: OrderStatus;
  script: boolean;
  performanceAmount: number;
  totalPrice: number;
}

interface ApiResponse {
  doneCnt: number;
  waitingCnt: number;
  orderCnt: number;
  orders: Order[];
}

const AdminOrderManage = () => {
  const [data, setData] = useState<Order[]>([]);
  const [inputText, setInputText] = useState<string>(""); // input 내부 필드 값
  const [searchText, setSearchText] = useState<string>(""); // API 요청용

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 카운트 상태
  const [totalCount, setTotalCount] = useState<number>(0);
  const [doneCount, setDoneCount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Dialog 상태
  const [changedStatus, setChangedStatus] = useState({
    id: -1 as number,
    newStatus: "WAIT" as OrderStatus, // initial value
  });
  const [open, setOpen] = useState(false);

  // 알림 상태
  const [showAlert, setShowAlert] = useState({
    show: false,
    success: false,
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: any = {
          page: page - 1, // API는 0부터 시작
        };
        if (searchText) {
          params.search = searchText;
        }

        const response = await api.get<ApiResponse>(`/admin/orders`, {
          params: params,
        });

        setData(response.data.orders);
        setDoneCount(response.data.doneCnt);
        setTotalCount(response.data.orderCnt);
        setTotalPages(Math.ceil(response.data.orderCnt / 10));
      } catch (error: any) {
        if (error.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("데이터를 불러오는 데 실패했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchText]);

  // 페이지 변경 핸들러
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      {/* 알림 */}
      <Snackbar
        open={showAlert.show}
        autoHideDuration={3000}
        onClose={() => setShowAlert({ ...showAlert, show: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={showAlert.success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {showAlert.message}
        </Alert>
      </Snackbar>

      {/* 상단 카운트 */}
      <div
        className="j-content-end"
        style={{ gap: "16px", marginBottom: "16px" }}
      >
        <Typography variant="h6">주문 완료: {doneCount}</Typography>
        {/* <Typography variant="h6">결제 대기: {waitingCount}</Typography> */}
      </div>

      <Paper style={{ padding: "16px" }}>
        {/* 검색 필드 */}
        <TextField
          label="작품 제목 / 작가명 / 주문 고객 명"
          variant="outlined"
          fullWidth
          margin="normal"
          value={inputText}
          onChange={(event) => {
            setInputText(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setSearchText(inputText);
              setPage(1);
            }
          }}
        />

        {/* 필터 버튼 */}
        <div
          className="j-content-between a-items-center"
          style={{ marginBottom: "16px" }}
        >
          <h4 className="h4-bold">전체 {totalCount}</h4>
        </div>

        {/* 테이블 */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCellCenter>주문번호</TableCellCenter>
                <TableCellCenter>주문 일자</TableCellCenter>
                <TableCellCenter>작품 제목</TableCellCenter>
                <TableCellCenter>작가 명</TableCellCenter>
                <TableCellCenter>주문 고객 명</TableCellCenter>
                <TableCellCenter>주문 내용</TableCellCenter>
                <TableCellCenter>금액</TableCellCenter>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography color="error">{error}</Typography>
                  </TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCellCenter>{item.id}</TableCellCenter>
                    <TableCellCenter>
                      {new Date(item.orderDate).toLocaleString()}
                    </TableCellCenter>
                    <TableCellCenter>{item.title}</TableCellCenter>
                    <TableCellCenter>{item.writer}</TableCellCenter>
                    <TableCellCenter>{item.customer}</TableCellCenter>
                    <TableCellCenter>
                      <Typography variant="body2">
                        대본: {item.script ? "O" : "X"}
                      </Typography>
                      <Typography variant="body2">
                        공연:{" "}
                        {item.performanceAmount > 0
                          ? item.performanceAmount
                          : "없음"}
                      </Typography>
                    </TableCellCenter>
                    <TableCellCenter>
                      {formatPrice(item.totalPrice)}
                    </TableCellCenter>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 페이지네이션 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </Paper>
    </>
  );
};

export default AdminOrderManage;
