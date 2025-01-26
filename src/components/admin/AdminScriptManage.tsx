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
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

import TableCellCenter from "./TableCellCenter";

import { SERVER_URL } from "@/constants/ServerURL";

import DownloadSvg from "../../assets/image/component/DownloadSvg";
import AcceptSvg from "../../assets/image/component/AcceptSvg";
import DenySvg from "../../assets/image/component/DenySvg";

interface Product {
  id: string;
  createdAt: string;
  title: string;
  writer: string;
  checked: "PASS" | "WAIT" | "REJECT";
  playType: "LONG" | "SHORT" | null;
}

interface ApiResponse {
  passCnt: number;
  waitCnt: number;
  productCnt: number;
  products: Product[];
}

const AdminScriptManage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("전체");

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 전체
  const [totalCount, setTotalCount] = useState<number>(0);
  // 수락
  const [passedCount, setPassedCount] = useState<number>(0);
  // 대기
  const [waitingCount, setWaitingCount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 변경 완료 알림
  const [showAlert, setShowAlert] = useState({
    show: false,
    success: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: any = {
          page: page - 1, // api 상 page: 0부터 시작
        };
        if (searchText) {
          params.search = searchText;
        }
        if (filterStatus !== "전체") {
          switch (filterStatus) {
            case "수락":
              params.status = "PASS";
              break;
            case "거절":
              params.status = "REJECT";
              break;
            case "대기":
              params.status = "WAIT";
              break;
            default:
              break;
          }
        }

        const response = await axios.get<ApiResponse>(`${SERVER_URL}admin/products`, {
          params: params,
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookies.get("accessToken")
              ? `Bearer ${Cookies.get("accessToken")}`
              : undefined,
          },
        });

        setData(response.data.products);
        setPassedCount(response.data.passCnt);
        setWaitingCount(response.data.waitCnt);
        setTotalCount(response.data.productCnt);
        setTotalPages(Math.ceil(response.data.productCnt / 10));
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

  // 장편극 / 단편극 변경
  const onChangeClassification = (id: string, newClassification: number | null) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? {
            ...item,
            playType:
              newClassification === 1
                ? ("LONG" as "LONG")
                : newClassification === 2
                ? ("SHORT" as "SHORT")
                : null,
          }
        : item
    );
    setData(updatedData);
  };

  const onChangePermission = async (id: string, newPermission: "PASS" | "REJECT" | "WAIT") => {
    const updatedData = data.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: newPermission,
          }
        : item
    );
    setData(updatedData);

    try {
      await axios.patch(
        `${SERVER_URL}admin/products`,
        {
          type: updatedData.find((item) => item.id === id)?.playType || null,
          status: newPermission,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookies.get("accessToken")
              ? `Bearer ${Cookies.get("accessToken")}`
              : undefined,
          },
          params: {
            productId: id,
          },
        }
      );

      setShowAlert({ ...showAlert, success: true });
    } catch (error) {
      setShowAlert({ ...showAlert, success: false });
    } finally {
      setShowAlert({ ...showAlert, show: true });
    }
  };

  const permissionToStatus = {
    WAIT: "대기",
    PASS: "수락",
    REJECT: "거절",
  };

  return (
    <>
      <Snackbar
        open={showAlert.show}
        autoHideDuration={3000}
        onClose={() => setShowAlert({ ...showAlert, show: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={showAlert.success ? "success" : "error"} sx={{ width: "100%" }}>
          {showAlert.success
            ? "수정이 완료되었습니다."
            : "오류가 발생했습니다. 새로고침 후 다시 시도해주세요."}
        </Alert>
      </Snackbar>

      <div className="j-content-end" style={{ gap: "16px" }}>
        <Typography variant="h6">등록 수락: {passedCount}</Typography>
        <Typography variant="h6">등록 대기: {waitingCount}</Typography>
      </div>
      <Paper style={{ padding: "16px" }}>
        <TextField
          label="작품 제목 / 작가명"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            setPage(1);
          }}
        />

        <div className="j-content-between a-items-center">
          <h4 className="h4-bold">전체 {totalCount}</h4>
          <span>
            <button
              onClick={() => {
                setFilterStatus("전체");
              }}
            >
              전체
            </button>
            <button
              onClick={() => {
                setFilterStatus("수락");
              }}
            >
              등록 수락
            </button>
            <button
              onClick={() => {
                setFilterStatus("거절");
              }}
            >
              등록 거절
            </button>
            <button
              onClick={() => {
                setFilterStatus("대기");
              }}
            >
              등록 대기
            </button>
          </span>
        </div>

        {/* 테이블 */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCellCenter>순번</TableCellCenter>
                <TableCellCenter>신청 일자</TableCellCenter>
                <TableCellCenter>작품 제목</TableCellCenter>
                <TableCellCenter>작가 명</TableCellCenter>
                <TableCellCenter>상태</TableCellCenter>
                <TableCellCenter>구분</TableCellCenter>
                <TableCellCenter>&nbsp;</TableCellCenter>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="error">{error}</Typography>
                  </TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCellCenter>{totalCount - ((page - 1) * 10 + index)}</TableCellCenter>
                    <TableCellCenter>{item.createdAt}</TableCellCenter>
                    <TableCellCenter>{item.title}</TableCellCenter>
                    <TableCellCenter>{item.writer}</TableCellCenter>
                    <TableCellCenter
                      sx={{
                        backgroundColor: "#E2E2E2",
                      }}
                    >
                      {permissionToStatus[item.checked]}
                    </TableCellCenter>
                    <TableCellCenter>
                      <ToggleButtonGroup
                        value={item.playType === "LONG" ? 1 : item.playType === "SHORT" ? 2 : 0}
                        exclusive
                        onChange={(event, newAlignment) => {
                          onChangeClassification(item.id, newAlignment);
                        }}
                        aria-label="구분"
                      >
                        <ToggleButton value={1} aria-label="장편극">
                          L
                        </ToggleButton>
                        <ToggleButton value={2} aria-label="단편극">
                          S
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </TableCellCenter>
                    <TableCellCenter>
                      {/* 장편극 / 단편극 선택 여부 */}
                      {item.playType === null ? (
                        <div className="j-content-between" style={{ marginRight: "16px" }}>
                          <DownloadSvg fill="#bababa" />
                          <AcceptSvg fill="#bababa" />
                          <DenySvg fill="#bababa" />
                        </div>
                      ) : (
                        <div className="j-content-between" style={{ marginRight: "16px" }}>
                          <DownloadSvg />
                          {item.checked === "WAIT" ? (
                            <>
                              {/* 대기 */}
                              <AcceptSvg
                                className="c-pointer"
                                onClick={() => {
                                  onChangePermission(item.id, "PASS");
                                }}
                              />
                              <DenySvg
                                className="c-pointer"
                                onClick={() => {
                                  onChangePermission(item.id, "REJECT");
                                }}
                              />
                            </>
                          ) : item.checked === "PASS" ? (
                            <>
                              {/* 승인 */}
                              <AcceptSvg fill="#6A39C0" opacity="0.5" />
                              <DenySvg
                                fill="#bababa"
                                className="c-pointer"
                                onClick={() => {
                                  onChangePermission(item.id, "REJECT");
                                }}
                              />
                            </>
                          ) : (
                            <>
                              {/* 거절 */}
                              <AcceptSvg
                                fill="#bababa"
                                className="c-pointer"
                                onClick={() => {
                                  onChangePermission(item.id, "PASS");
                                }}
                              />
                              <DenySvg fill="#6A39C0" opacity="0.5" />
                            </>
                          )}
                        </div>
                      )}
                    </TableCellCenter>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

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

export default AdminScriptManage;
