import { Box, Button, Typography, useTheme } from "@mui/material";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import useOpenModal from "../../hooks/useOpenModal";

export default function TransactionTableContainer() {
    const openModal = useOpenModal();
    const theme = useTheme();

    return (
        <Box
            display='flex'
            flexDirection='column'
            gap='0.5rem'
            padding='1rem 1.2rem'
            borderRight={`1px solid ${theme.palette.primary.contrastDark}`}
        >
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Typography variant='h4'>Transactions</Typography>
                <Button variant='outlined' onClick={() => openModal(<TransactionForm />)}>Add Transaction</Button>
            </Box>
            <TransactionTable />
        </Box>
    )
}