import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useTransactions from '../../hooks/useTransactions';
import TransactionEntry from './TransactionEntry';

export default function TransactionTable() {
    const { transactions } = useTransactions();

    return (
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold'}}>Amount</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Date</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Type</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Category</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Description</TableCell>
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