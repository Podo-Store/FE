import {
  Button,
  CircularProgress,
  Pagination,
  Paper,
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
import { api } from "@/api/api";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

import TableCellCenter from "./TableCellCenter";

import { toastAlert } from "@/utils/ToastAlert";

import { OrderStatus } from "@/types/orderStatus";
import { FilterStatus } from "./types/filterStatus";

import { SERVER_URL } from "@/constants/ServerURL";

import DownloadSvg from "../../assets/image/component/DownloadSvg";
import AcceptSvg from "../../assets/image/component/AcceptSvg";
import DenySvg from "../../assets/image/component/DenySvg";

type PlayType = "LONG" | "SHORT" | null; // undefined: 선택 안함

interface Product {
  id: string;
  createdAt: string;
  title: string;
  writer: string;
  checked: OrderStatus;
  playType: PlayType;
}

interface ApiResponse {
  passCnt: number;
  waitCnt: number;
  productCnt: number;
  products: Product[];
}

const AdminScriptManage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [inputText, setInputText] = useState<string>(""); // input 내부 필드 값
  const [searchText, setSearchText] = useState<string>(""); // API 요청용
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 작품 제목 / 작가명 변경
  const [tempTitleMap, setTempTitleMap] = useState<Record<string, string>>({});
  const [tempWriterMap, setTempWriterMap] = useState<Record<string, string>>({});

  // 전체
  const [totalCount, setTotalCount] = useState<number>(0);
  // 수락
  const [passedCount, setPassedCount] = useState<number>(0);
  // 대기
  const [waitingCount, setWaitingCount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
        if (filterStatus !== "ALL") {
          params.status = filterStatus;
        }

        const response = await api.get<ApiResponse>(`/admin/products`, {
          params: params,
          headers: {
            "Content-Type": "application/json",
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

  // 제목 변경
  const handleUpdateTitle = async (id: string) => {
    const newTitle = tempTitleMap[id];
    // 새로 입력하지 않았거나 기존 제목과 같으면 API 호출 X
    if (!newTitle || newTitle === data.find((item) => item.id === id)?.title) {
      return;
    }

    toastAlert("수정사항 반영 중...", "info");
    try {
      await api.patch(
        `/admin/products/title`,
        {
          productId: id,
          title: newTitle,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toastAlert("수정사항이 반영되었습니다.", "success");
    } catch (error) {
      toastAlert("오류가 발생했습니다. 새로고침 후 다시 시도해주세요.", "error");
    }
  };

  // 작가명 변경
  const handleUpdateWriter = async (id: string) => {
    const newWriter = tempWriterMap[id];
    // 새로 입력하지 않았거나 기존 제목과 같으면 API 호출 X
    if (!newWriter || newWriter === data.find((item) => item.id === id)?.writer) {
      return;
    }

    toastAlert("수정사항 반영 중...", "info");
    try {
      await api.patch(
        `/admin/products/writer`,
        {
          productId: id,
          writer: newWriter,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toastAlert("수정사항이 반영되었습니다.", "success");
    } catch (error) {
      toastAlert("오류가 발생했습니다. 새로고침 후 다시 시도해주세요.", "error");
    }
  };

  // 장편극 / 단편극 변경
  const onChangeClassification = (id: string, newClassification: PlayType) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? {
            ...item,
            playType: newClassification || null,
          }
        : item
    );
    setData(updatedData);
  };

  // 대본 다운로드
  const onClickDownload = async (id: string, title: string) => {
    toastAlert("다운로드 중입니다.", "info");

    try {
      const response = await api.get(`/admin/download/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.pdf`); // 파일명 추출 및 설정
      document.body.appendChild(link);
      link.click(); // 링크 클릭으로 다운로드 시작
      link.remove(); // 링크 요소 제거
    } catch (error: any) {
      alert(error.response.data?.error);
    }
  };

  const onChangePermission = async (id: string, newPermission: OrderStatus) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: newPermission,
          }
        : item
    );
    setData(updatedData);

    const type = updatedData.find((item) => item.id === id)?.playType;

    try {
      await api.patch(
        `/admin/products/${id}`,
        {
          playType: type,
          productStatus: newPermission,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toastAlert("수정이 완료되었습니다.", "success");
    } catch (error) {
      toastAlert("오류가 발생했습니다. 새로고침 후 다시 시도해주세요.", "error");
    }
  };

  const permissionToStatus = {
    WAIT: "대기",
    PASS: "수락",
    REJECT: "거절",
  };

  return (
    <>
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

        <div className="j-content-between a-items-center">
          <h4 className="h4-bold">전체 {totalCount}</h4>
          <span className="d-flex" style={{ gap: "8px" }}>
            <Button
              variant={filterStatus === "ALL" ? "contained" : "outlined"}
              onClick={() => setFilterStatus("ALL")}
            >
              전체
            </Button>
            <Button
              variant={filterStatus === "PASS" ? "contained" : "outlined"}
              onClick={() => setFilterStatus("PASS")}
            >
              등록 수락
            </Button>
            <Button
              variant={filterStatus === "WAIT" ? "contained" : "outlined"}
              onClick={() => setFilterStatus("WAIT")}
            >
              등록 대기
            </Button>
            <Button
              variant={filterStatus === "REJECT" ? "contained" : "outlined"}
              onClick={() => setFilterStatus("REJECT")}
            >
              등록 거절
            </Button>
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
                    <TableCellCenter>
                      <TextField
                        variant="standard"
                        value={tempTitleMap[item.id] ?? item.title}
                        onChange={(event) => {
                          setTempTitleMap((prev) => ({ ...prev, [item.id]: event.target.value }));
                        }}
                        onBlur={() => {
                          handleUpdateTitle(item.id);
                        }}
                      ></TextField>
                    </TableCellCenter>
                    <TableCellCenter>
                      <TextField
                        variant="standard"
                        value={tempWriterMap[item.id] ?? item.writer}
                        onChange={(event) => {
                          setTempWriterMap((prev) => ({ ...prev, [item.id]: event.target.value }));
                        }}
                        onBlur={() => {
                          handleUpdateWriter(item.id);
                        }}
                      ></TextField>
                    </TableCellCenter>
                    <TableCellCenter
                      sx={{
                        backgroundColor:
                          item.checked === "PASS"
                            ? "#C8E6C9"
                            : item.checked === "REJECT"
                            ? "#FFCDD2"
                            : "#E2E2E2",
                      }}
                    >
                      {permissionToStatus[item.checked]}
                    </TableCellCenter>
                    <TableCellCenter>
                      <ToggleButtonGroup
                        value={item.playType || undefined}
                        exclusive
                        onChange={(event, newAlignment) => {
                          onChangeClassification(item.id, newAlignment);
                        }}
                        aria-label="구분"
                      >
                        <ToggleButton value={"LONG"} aria-label="장편극">
                          L
                        </ToggleButton>
                        <ToggleButton value={"SHORT"} aria-label="단편극">
                          S
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </TableCellCenter>
                    <TableCellCenter>
                      <div className="j-content-between" style={{ marginRight: "16px" }}>
                        <DownloadSvg
                          className="c-pointer"
                          onClick={() => {
                            onClickDownload(item.id, item.title);
                          }}
                        />
                        {/* 장편극 / 단편극 선택 여부에 따른 변화 */}
                        {item.playType === null ? (
                          <>
                            <AcceptSvg fill="#bababa" />
                            <DenySvg fill="#bababa" />
                          </>
                        ) : item.checked === "WAIT" ? (
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
                            <AcceptSvg
                              fill="#6A39C0"
                              opacity="0.5"
                              className="c-pointer"
                              onClick={() => {
                                onChangePermission(item.id, "WAIT");
                              }}
                            />
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
                            <DenySvg
                              fill="#6A39C0"
                              opacity="0.5"
                              className="c-pointer"
                              onClick={() => {
                                onChangePermission(item.id, "WAIT");
                              }}
                            />
                          </>
                        )}
                      </div>
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
