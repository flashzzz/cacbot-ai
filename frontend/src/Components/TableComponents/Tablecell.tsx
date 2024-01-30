import { TableCell, TableCellProps, styled } from "@mui/material";

export const CustomTableCell = styled((props: TableCellProps) => (
  <TableCell {...props} />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
))(({ theme }) => ({
  "& .MuiTableCell-sizeMedium": {
    padding: "10px 20px",
  },
}));
