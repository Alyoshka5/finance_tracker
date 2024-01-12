import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import useTransactions from '../../hooks/useTransactions';
import TransactionEntry from './TransactionEntry';

export default function TransactionTable() {
    const { transactions } = useTransactions();
    const theme = useTheme();

	const tableCellStyles = {
		fontWeight: 'bold',
		color: theme.palette.primary.contrastText,
		borderColor: `${theme.palette.primary.contrastDark}88`
	}

    return (
        <TableContainer>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow sx={{}}>
						<TableCell sx={{...tableCellStyles}}>
							Amount
						</TableCell>
						<TableCell sx={{...tableCellStyles}}>
							Date
						</TableCell>
						<TableCell sx={{...tableCellStyles}}>
							Type
						</TableCell>
						<TableCell sx={{...tableCellStyles}}>
							Category
						</TableCell>
						<TableCell sx={{...tableCellStyles}}>
							Description
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
				{transactions.map((transaction) => (
					<TransactionEntry key={transaction._id} transaction={transaction} />
				))}
				</TableBody>
			</Table>
        </TableContainer>
    );
}