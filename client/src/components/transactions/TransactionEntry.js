import { TableRow, TableCell } from "@mui/material";

export default function TransactionEntry({ transaction }) {
    
    return (
        <TableRow
            sx={{ 
                '&:last-child td, &:last-child th': { border: 0 }, 
                '&:hover': { backgroundColor: '#ddd', cursor: 'pointer' }
            }}
        >
            <TableCell component="th" scope="row"  sx={{fontWeight: 'bold'}}>
                $ {transaction.amount}
            </TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.type}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{transaction.description}</TableCell>
        </TableRow>
    );
}