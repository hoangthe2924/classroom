import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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
function handleClickOpen() {

}
const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);

export default function GradeStructureTabs() {
    return (<TableContainer component={Paper}>
        <Button
            variant="outlined"
            sx={{ float: "right" }}
            onClick={handleClickOpen}
            href="/testgrade"
            endIcon={<EditIcon/>}
        >
            Edit
        </Button>
        <Table sx={{ minWidth: 500 }} aria-label="spanning table">
            <TableHead>
                <TableRow>
                    <TableCell align="left" colSpan={1}>
                        Details
                    </TableCell>
                    <TableCell align="right" >Price</TableCell>
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
                    <TableCell colSpan={1}>Subtotal</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
    );
}