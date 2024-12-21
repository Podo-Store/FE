import { TableCell } from "@mui/material";

const TableCellCenter = ({ children, ...props }) => {
  return (
    <TableCell align="center" {...props}>
      {children}
    </TableCell>
  );
};

export default TableCellCenter;
