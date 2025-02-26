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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

import TableCellCenter from "./TableCellCenter";

import { formatPrice } from "../../utils/formatPrice";

import { OrderStatus } from "@/types/orderStatus";

import { SERVER_URL } from "@/constants/ServerURL";

import AcceptSvg from "../../assets/image/component/AcceptSvg";
import DenySvg from "../../assets/image/component/DenySvg";

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
  const [filterStatus, setFilterStatus] = useState<"전체" | "완료" | "대기">("전체");

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 카운트 상태
  const [totalCount, setTotalCount] = useState<number>(0);
  const [doneCount, setDoneCount] = useState<number>(0);
  const [waitingCount, setWaitingCount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Dialog 상태
  const [changedStatus, setChangedStatus] = useState({
    id: -1 as number,
    newStatus: null as OrderStatus,
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
        if (filterStatus === "완료") {
          params.checked = true;
        } else if (filterStatus === "대기") {
          params.checked = false;
        }

        const response = await axios.get<ApiResponse>(`${SERVER_URL}admin/orders`, {
          params: params,
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookies.get("accessToken")
              ? `Bearer ${Cookies.get("accessToken")}`
              : undefined,
          },
        });

        setData(response.data.orders);
        setDoneCount(response.data.doneCnt);
        setWaitingCount(response.data.waitingCnt);
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
  }, [page, searchText, filterStatus]);

  // 페이지 변경 핸들러
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onClickStatusChange = (id: number, newStatus: OrderStatus) => {
    setChangedStatus({ id, newStatus });
    setOpen(true);
  };

  // 주문 상태 변경 핸들러
  const onChangeStatus = async (id: number, newStatus: OrderStatus) => {
    try {
      await axios.patch(
        `${SERVER_URL}admin/orders/${id}`,
        { orderStatus: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookies.get("accessToken")
              ? `Bearer ${Cookies.get("accessToken")}`
              : undefined,
          },
        }
      );

      setOpen(false);

      // 상태 업데이트
      const updatedData = data.map((item) =>
        item.id === id
          ? {
              ...item,
              orderStatus: newStatus,
            }
          : item
      );
      setData(updatedData);

      // 알림 표시
      setShowAlert({
        show: true,
        success: true,
        message: "주문 상태가 변경되었습니다.",
      });
    } catch (error: any) {
      setShowAlert({
        show: true,
        success: false,
        message: "주문 상태 변경에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  // 상태 매핑
  const statusToLabel = (orderStatus: OrderStatus): string => {
    return orderStatus === "WAIT" ? "대기" : orderStatus === "PASS" ? "완료" : "취소";
  };

  return (
    <>
      {/* 변경 확인 / 취소 Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">정말 변경하시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            변경 시 사용자에게 메일이 발송되며, 다시 변경할 수 있지만 이는 큰 책임을 수반합니다.
            결제 내역을 다시 한번 확인하시기 바랍니다. 계속하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} autoFocus>
            취소 (기존 상태 유지)
          </Button>
          <Button onClick={() => onChangeStatus(changedStatus.id, changedStatus.newStatus)}>
            확인 (메일 전송)
          </Button>
        </DialogActions>
      </Dialog>

      {/* 알림 */}
      <Snackbar
        open={showAlert.show}
        autoHideDuration={3000}
        onClose={() => setShowAlert({ ...showAlert, show: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={showAlert.success ? "success" : "error"} sx={{ width: "100%" }}>
          {showAlert.message}
        </Alert>
      </Snackbar>

      {/* 상단 카운트 */}
      <div className="j-content-end" style={{ gap: "16px", marginBottom: "16px" }}>
        <Typography variant="h6">결제 완료: {doneCount}</Typography>
        <Typography variant="h6">결제 대기: {waitingCount}</Typography>
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
        <div className="j-content-between a-items-center" style={{ marginBottom: "16px" }}>
          <Typography variant="h6" className="h4-bold">
            전체 {totalCount}
          </Typography>
          <span>
            <Button
              variant={filterStatus === "전체" ? "contained" : "outlined"}
              onClick={() => setFilterStatus("전체")}
              style={{ marginRight: "8px" }}
            >
              전체
            </Button>
            <Button
              variant={filterStatus === "완료" ? "contained" : "outlined"}
              onClick={() => setFilterStatus("완료")}
              style={{ marginRight: "8px" }}
            >
              결제 완료
            </Button>
            <Button
              variant={filterStatus === "대기" ? "contained" : "outlined"}
              onClick={() => setFilterStatus("대기")}
            >
              결제 대기
            </Button>
          </span>
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
                <TableCellCenter>상태</TableCellCenter>
                <TableCellCenter>주문 내용</TableCellCenter>
                <TableCellCenter>금액</TableCellCenter>
                <TableCellCenter>처리</TableCellCenter>
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
                    <TableCellCenter>{(page - 1) * 10 + index + 1}</TableCellCenter>
                    <TableCellCenter>{new Date(item.orderDate).toLocaleString()}</TableCellCenter>
                    <TableCellCenter>{item.title}</TableCellCenter>
                    <TableCellCenter>{item.writer}</TableCellCenter>
                    <TableCellCenter>{item.customer}</TableCellCenter>
                    <TableCellCenter
                      sx={{
                        backgroundColor:
                          item.orderStatus === "PASS"
                            ? "#C8E6C9"
                            : item.orderStatus === "REJECT"
                            ? "#FFCDD2"
                            : "#FFFFFF",
                      }}
                    >
                      {statusToLabel(item.orderStatus)}
                    </TableCellCenter>
                    <TableCellCenter>
                      <Typography variant="body2">대본: {item.script ? "O" : "X"}</Typography>
                      <Typography variant="body2">
                        공연: {item.performanceAmount > 0 ? item.performanceAmount : "없음"}
                      </Typography>
                    </TableCellCenter>
                    <TableCellCenter>{formatPrice(item.totalPrice)}</TableCellCenter>
                    <TableCellCenter>
                      <div className="j-content-between" style={{ gap: "8px" }}>
                        {item.orderStatus === "WAIT" ? (
                          <>
                            <AcceptSvg
                              className="c-pointer"
                              onClick={() => onClickStatusChange(item.id, "PASS")}
                            />
                            <DenySvg
                              className="c-pointer"
                              onClick={() => onClickStatusChange(item.id, "REJECT")}
                            />
                          </>
                        ) : item.orderStatus === "PASS" ? (
                          <>
                            <AcceptSvg fill="#6A39C0" opacity="0.5" />
                            <DenySvg
                              fill="#bababa"
                              className="c-pointer"
                              onClick={() => onClickStatusChange(item.id, "REJECT")}
                            />
                          </>
                        ) : (
                          <>
                            <AcceptSvg
                              fill="#bababa"
                              className="c-pointer"
                              onClick={() => onClickStatusChange(item.id, "PASS")}
                            />
                            <DenySvg fill="#F44336" opacity="0.5" />
                          </>
                        )}
                      </div>
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
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        </div>
      </Paper>
    </>
  );
};

export default AdminOrderManage;
