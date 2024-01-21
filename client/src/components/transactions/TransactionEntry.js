import { TableRow, TableCell, useTheme } from "@mui/material";
import useOpenModal from "../../hooks/useOpenModal";
import TransactionDetailModal from './TransactionDetailModal';
import useFormatDate from "../../hooks/useFormatDate";

export default function TransactionEntry({ transaction }) {
    const openModal = useOpenModal();
    const formatDate = useFormatDate();
    const theme = useTheme();

    const tableCellStyles = {
        color: theme.palette.primary.contrastText,
        borderColor: `${theme.palette.primary.contrastDark}88`
    }

    return (
        <TableRow
            sx={{ 
                '&:last-child td, &:last-child th': { border: 0 }, 
                '&:hover': { backgroundColor: theme.palette.primary.lighterMain, cursor: 'pointer' },
                color: theme.palette.primary.contrastText,
            }}
            onClick={() => openModal(<TransactionDetailModal transaction={transaction} />)}
        >
            <TableCell component="th" scope="row"  sx={{fontWeight: 'bold', ...tableCellStyles}}
            >
                $ {transaction.amount.toFixed(2)}
            </TableCell>
            <TableCell sx={tableCellStyles}>
                {formatDate(transaction.date, false)}
            </TableCell>
            <TableCell sx={tableCellStyles}>
                {transaction.type}
            </TableCell>
            <TableCell sx={tableCellStyles}>
                {transaction.category || '—'}
            </TableCell>
            <TableCell sx={tableCellStyles}>
                {transaction.description.length > 70 ? `${transaction.description.substring(0, 70)}...` : transaction.description}
            </TableCell>
        </TableRow>
    );
}
