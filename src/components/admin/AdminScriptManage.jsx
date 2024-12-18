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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { tableData } from "../../pages/admin/data";
import TableCellCenter from "./TableCellCenter";

import DownloadSvg from "../../assets/image/component/DownloadSvg";
import AcceptSvg from "../../assets/image/component/AcceptSvg";
import DenySvg from "../../assets/image/component/DenySvg";

const AdminScriptManage = () => {
  const [data, setData] = useState(tableData);
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
          item.author.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 상태 필터링
    if (filterStatus !== "전체") {
      let permissionValue;
      switch (filterStatus) {
        case "수락":
          permissionValue = 1;
          break;
        case "거절":
          permissionValue = 2;
          break;
        case "대기":
          permissionValue = 0;
          break;
        default:
          permissionValue = null;
      }
      if (permissionValue !== null) {
        filtered = filtered.filter((item) => item.permission === permissionValue);
      }
    }

    return filtered;
  }, [searchText, data, filterStatus]);

  // 장편극 / 단편극 변경
  const onChangeClassification = (id, newClassification) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? { ...item, classification: newClassification !== null ? newClassification : 0 }
        : item
    );
    setData(updatedData);
  };

  // status 및 permission 변경
  // permission 값에 따른 status 매핑
  const permissionToStatus = {
    0: "대기",
    1: "수락",
    2: "거절",
  };

  const onChangePermission = (id, newPermission) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? {
            ...item,
            permission: newPermission,
            status: permissionToStatus[newPermission],
          }
        : item
    );
    setData(updatedData);
  };

  return (
    <>
      <div className="j-content-end" style={{ gap: "16px" }}>
        <h2>등록 수락: {data.filter((item) => item.permission === 1).length}</h2>
        <h2>등록 대기: {data.filter((item) => item.permission === 0).length}</h2>
      </div>
      <Paper style={{ padding: "16px" }}>
        <TextField
          label="작품 제목 / 작가명"
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
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCellCenter>{index + 1}</TableCellCenter>
                    <TableCellCenter>{item.submitDate}</TableCellCenter>
                    <TableCellCenter>{item.title}</TableCellCenter>
                    <TableCellCenter>{item.author}</TableCellCenter>
                    <TableCellCenter
                      sx={{
                        backgroundColor: "#E2E2E2",
                      }}
                    >
                      {item.status}
                    </TableCellCenter>
                    <TableCellCenter>
                      <ToggleButtonGroup
                        value={item.classification}
                        exclusive
                        onChange={(event, newAlignment) => {
                          if (newAlignment !== null) {
                            onChangeClassification(item.id, newAlignment);
                          } else {
                            onChangeClassification(item.id, 0);
                          }
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
                      {item.classification === 0 ? (
                        <div className="j-content-between" style={{ marginRight: "16px" }}>
                          <DownloadSvg fill="#bababa" />
                          <AcceptSvg fill="#bababa" />
                          <DenySvg fill="#bababa" />
                        </div>
                      ) : (
                        <div className="j-content-between" style={{ marginRight: "16px" }}>
                          <DownloadSvg />
                          {item.permission === 0 ? (
                            <>
                              {/* 대기 */}
                              <AcceptSvg
                                className="c-pointer"
                                onClick={() => {
                                  onChangePermission(item.id, 1);
                                }}
                              />
                              <DenySvg
                                className="c-pointer"
                                onClick={() => {
                                  onChangePermission(item.id, 2);
                                }}
                              />
                            </>
                          ) : item.permission === 1 ? (
                            <>
                              {/* 승인 */}
                              <AcceptSvg fill="#6A39C0" opacity="0.5" />
                              <DenySvg
                                fill="#bababa"
                                className="c-pointer"
                                onClick={() => {
                                  onChangePermission(item.id, 2);
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
                                  onChangePermission(item.id, 1);
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
      </Paper>
    </>
  );
};

export default AdminScriptManage;
