import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
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
						<TableCell sx={{...tableCellStyles, width: '15%'}}>
							Amount
						</TableCell>
						<TableCell sx={{...tableCellStyles, width: '15%'}}>
							Date
						</TableCell>
						<TableCell sx={{...tableCellStyles, width: '15%'}}>
							Type
						</TableCell>
						<TableCell sx={{...tableCellStyles, width: '15%'}}>
							Category
						</TableCell>
						<TableCell sx={{...tableCellStyles, width: '40%'}}>
							Description
						</TableCell>
					</TableRow>
				</TableHead>
				{
					transactions.length === 0 ?
						''
					:
						<TableBody>
						{transactions.map((transaction) => (
							<TransactionEntry key={transaction._id} transaction={transaction} />
						))}
						</TableBody>
				}
			</Table>
			{
				transactions.length === 0 ?
					<Typography
						sx={{
							padding: '0.8rem 0.5rem'
						}}
						variant='body1'
					>
						No transactions to display.
					</Typography>
				:
					''
			}
        </TableContainer>
    );
}