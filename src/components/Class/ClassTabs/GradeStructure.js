import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Button, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}
const rows = [
  createRow("Midterm", 100, 1.15),
  createRow("Final term", 10, 45.99),
  createRow("Exercise", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
export default function GradeStructure({ onChangeTab, item }) {
  console.log("role", item?.requesterRole);
  return (
    <TableContainer component={Paper}>
      <Typography variant={"h5"} marginLeft="10px" style={{ float: "left" }}>
        Grade Structure
      </Typography>
      {item?.requesterRole === "teacher" && (
        <IconButton
          color="primary"
          sx={{ float: "right" }}
          onClick={() => onChangeTab(2)}
        >
          <EditIcon />
        </IconButton>
      )}
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={1}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
