import React, { useState, useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import { tableData2 } from "../../pages/admin/data2";
import TableCellCenter from "./TableCellCenter";

import { formatPrice } from "../../utils/formatPrice";

import AcceptSvg from "../../assets/image/component/AcceptSvg";
import DenySvg from "../../assets/image/component/DenySvg";

const AdminOrderManage = () => {
  const [data, setData] = useState(tableData2);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("전체");

  // 데이터 필터링
  const filteredData = useMemo(() => {
    let filtered = data;

    // 검색어 필터링
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          item.author.toLowerCase().includes(searchText.toLowerCase()) ||
          item.customer.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 상태 필터링
    if (filterStatus !== "전체") {
      let statusValue;
      switch (filterStatus) {
        case "완료":
          statusValue = 1;
          break;
        case "대기":
          statusValue = 0;
          break;
        default:
          statusValue = null;
      }
      if (statusValue !== null) {
        filtered = filtered.filter((item) => item.statusNum === statusValue);
      }
    }

    return filtered;
  }, [searchText, data, filterStatus]);

  // status 및 statusNum 변경
  // statusNum 값에 따른 status 매핑
  const statusNumToStatus = {
    0: "대기",
    1: "완료",
    2: "취소",
  };

  const onChangeStatusNum = (id, newStatusNum) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? {
            ...item,
            statusNum: newStatusNum,
            status: statusNumToStatus[newStatusNum],
          }
        : item
    );
    setData(updatedData);
  };

  return (
    <>
      <div className="j-content-end" style={{ gap: "16px" }}>
        <h2>결제 완료: {data.filter((item) => item.statusNum === 1).length}</h2>
        <h2>결제 대기: {data.filter((item) => item.statusNum === 0).length}</h2>
      </div>
      <Paper style={{ padding: "16px" }}>
        <TextField
          label="작품 제목 / 작가명 / 주문 고객 명"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="j-content-between a-items-center">
          <h4 className="h4-bold">전체 {filteredData.length}</h4>
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
                setFilterStatus("완료");
              }}
            >
              결제 완료
            </button>
            <button
              onClick={() => {
                setFilterStatus("대기");
              }}
            >
              결제 대기
            </button>
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
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCellCenter>{index + 1}</TableCellCenter>
                    <TableCellCenter>{item.orderDate}</TableCellCenter>
                    <TableCellCenter>{item.title}</TableCellCenter>
                    <TableCellCenter>{item.author}</TableCellCenter>
                    <TableCellCenter>{item.customer}</TableCellCenter>
                    <TableCellCenter
                      sx={{
                        backgroundColor: "#E2E2E2",
                      }}
                    >
                      {item.status}
                    </TableCellCenter>
                    <TableCellCenter>
                      <p>대본 {item.orderedScript}</p>
                      <p>공연 {item.orderedPerform}</p>
                    </TableCellCenter>
                    <TableCellCenter>{formatPrice(item.price)}</TableCellCenter>
                    <TableCellCenter>
                      <div className="j-content-between" style={{ marginRight: "16px" }}>
                        {item.statusNum === 0 ? (
                          <>
                            {/* 대기 */}
                            <AcceptSvg
                              className="c-pointer"
                              onClick={() => {
                                onChangeStatusNum(item.id, 1);
                              }}
                            />
                            <DenySvg
                              className="c-pointer"
                              onClick={() => {
                                onChangeStatusNum(item.id, 2);
                              }}
                            />
                          </>
                        ) : item.statusNum === 1 ? (
                          <>
                            {/* 완료 */}
                            <AcceptSvg fill="#6A39C0" opacity="0.5" />
                            <DenySvg
                              fill="#bababa"
                              className="c-pointer"
                              onClick={() => {
                                onChangeStatusNum(item.id, 2);
                              }}
                            />
                          </>
                        ) : (
                          <>
                            {/* 취소 */}
                            <AcceptSvg
                              fill="#bababa"
                              className="c-pointer"
                              onClick={() => {
                                onChangeStatusNum(item.id, 1);
                              }}
                            />
                            <DenySvg fill="#6A39C0" opacity="0.5" />
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
      </Paper>
    </>
  );
};

export default AdminOrderManage;
