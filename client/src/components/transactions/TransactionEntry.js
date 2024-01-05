import { TableRow, TableCell } from "@mui/material";
import useOpenModal from "../../hooks/useOpenModal";
import TransactionDetailModal from './TransactionDetailModal';
import useFormatDate from "../../hooks/useFormatDate";

export default function TransactionEntry({ transaction }) {
    const openModal = useOpenModal();
    const formatDate = useFormatDate();

    return (
        <TableRow
            sx={{ 
                '&:last-child td, &:last-child th': { border: 0 }, 
                '&:hover': { backgroundColor: '#ddd', cursor: 'pointer' }
            }}
            onClick={() => openModal(<TransactionDetailModal transaction={transaction} />)}
        >
            <TableCell component="th" scope="row"  sx={{fontWeight: 'bold'}}>
                $ {transaction.amount.toFixed(2)}
            </TableCell>
            <TableCell>{formatDate(transaction.date, false)}</TableCell>
            <TableCell>{transaction.type}</TableCell>
            <TableCell>{transaction.category || '—'}</TableCell>
            <TableCell>
                {transaction.description.length > 70 ? `${transaction.description.substring(0, 70)}...` : transaction.description}
            </TableCell>
        </TableRow>
    );
}
